import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Send } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { getPast5WeeksData,analyzeStockData } from "@/service/apiService";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface StockData {
  Date: string; // Date in string format (e.g., ISO 8601 or other format)
  Open: string; // Opening price as a string or number
  High: string; // Highest price
  Low: string; // Lowest price
  Close: string; // Closing price
}

export default function StockPastAnalysis() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Welcome to Stock Past Analysis! Please enter a company name to analyze.",
    },
  ]);
  const [input, setInput] = useState("");
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentCompany, setCurrentCompany] = useState("");
  const navigate = useNavigate();

  const handleNavigation = (value: string) => {
    if (value === "advisor") navigate("/");
    else if (value === "analysis") navigate("/analysis");
    else if (value === "loan") navigate("/loan-approver");
  };

  const fetchStockData = async (companyName: string) => {
    setLoading(true);
    try {
      const data = await getPast5WeeksData(companyName);
      setStockData(data);
      setCurrentCompany(companyName);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Sorry, I couldn't fetch the stock data. Please try again."
      }]);
    }
    setLoading(false);
  };

  const analyzeStock = async (companyName: string) => {
    try {
      const analysis = await analyzeStockData(companyName);
      return analysis.analysis;
    } catch (error) {
      return "I apologize, but I couldn't analyze the stock data at this moment. Please try again later.";
    }
  };

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = input.trim();
      setMessages(prev => [...prev, { role: "user", content: userMessage }]);
      setInput("");
      
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Fetching and analyzing stock data for " + userMessage + "..."
      }]);

      await fetchStockData(userMessage);
      const analysis = await analyzeStock(userMessage);
      
      setMessages(prev => [
        ...prev.filter(msg => msg.content !== "Fetching and analyzing stock data for " + userMessage + "..."),
        { role: "assistant", content: analysis }
      ]);
    }
  };

  // Transform stock data for the line chart
  const chartData = stockData.map(item => ({
    name: new Date(item.Date).toLocaleDateString(),
    price: parseFloat(item.Close)
  })).reverse();

  return (
    <div className="flex flex-col h-full space-y-4 p-4">
      <h2 className="text-3xl font-bold text-center mb-6">
        <span className="bg-gradient-to-r from-blue-500 to-pink-500 text-transparent bg-clip-text">
          Stock Past Analysis
        </span>
      </h2>
      <div className="mb-4">
        <Select defaultValue="analysis" onValueChange={handleNavigation}>
          <SelectTrigger className="w-[200px] bg-background">
            <SelectValue placeholder="Select service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="advisor">Financial Advisor</SelectItem>
            <SelectItem value="analysis">Stock Past Analysis</SelectItem>
            <SelectItem value="loan">Automatic Loan Approver</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-4 flex-grow">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{currentCompany ? `${currentCompany} Stock Price Trend` : 'Stock Price Trend'}</CardTitle>
              <CardDescription>
                Historical stock price data over the past 5 weeks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{currentCompany ? `${currentCompany} Recent Stock Data` : 'Recent Stock Data'}</CardTitle>
              <CardDescription>
                Detailed stock information for the past 5 weeks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Open</TableHead>
                    <TableHead>High</TableHead>
                    <TableHead>Low</TableHead>
                    <TableHead>Close</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stockData.map((row) => (
                    <TableRow key={row.Date}>
                      <TableCell>{new Date(row.Date).toLocaleDateString()}</TableCell>
                      <TableCell>{parseFloat(row.Open).toFixed(2)}</TableCell>
                      <TableCell>{parseFloat(row.High).toFixed(2)}</TableCell>
                      <TableCell>{parseFloat(row.Low).toFixed(2)}</TableCell>
                      <TableCell>{parseFloat(row.Close).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <Card className="flex flex-col h-full">
          <CardHeader>
            <CardTitle>Chat with Stock Analyst AI</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col">
            <ScrollArea className="flex-grow mb-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  } mb-4`}
                >
                  <div
                    className={`flex items-start ${
                      message.role === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <Avatar className="w-8 h-8 mr-2">
                      <AvatarImage
                        src={
                          message.role === "user"
                            ? "/placeholder-user.jpg"
                            : "/placeholder-ai.jpg"
                        }
                      />
                      <AvatarFallback>
                        {message.role === "user" ? "U" : "AI"}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`rounded-lg p-2 ${
                        message.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-700 text-gray-100"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter a company name..."
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                disabled={loading}
              />
              <Button onClick={handleSend} size="icon" disabled={loading}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

