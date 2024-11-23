import React, { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Import the API function
import { askQuestion } from "@/service/apiService";

export default function FinancialAdvisor() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Welcome to the Financial Advisor! How can I assist you with your financial planning today?",
    },
    
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
  if (scrollAreaRef.current) {
    scrollAreaRef.current.scrollTo(0, scrollAreaRef.current.scrollHeight);
  }
}, [messages]);


  const handleSend = async () => {
    if (input.trim() && !isLoading) {
      const userMessage = input.trim();
      setIsLoading(true);
      setMessages(prev => [...prev, { role: "user", content: userMessage }]);
      setInput("");

      try {
        // Call the API
        const response = await askQuestion(userMessage);
        
        // Add the AI's response to the messages
        setMessages(prev => [
          ...prev,
          {
            role: "assistant",
            content: response.answer,
          },
        ]);
      } catch (error) {
        console.error("Error sending message:", error);
        // Add an error message to the chat
        setMessages(prev => [
          ...prev,
          {
            role: "assistant",
            content: "I apologize, but I encountered an error processing your request. Please try again.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleNavigation = (value: string) => {
    switch (value) {
      case "advisor":
        navigate("/")
        break
      case "analysis":
        navigate("/analysis")
        break
      case "loan":
        navigate("/loan-approver")
        break
      default:
        break
    }
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex-none p-4">
        <h2 className="text-3xl font-bold text-center">
          <span className="bg-gradient-to-r from-blue-500 to-pink-500 text-transparent bg-clip-text">
            Financial Advisor
          </span>
        </h2>
      </div>

      <div className="flex-none px-4 pb-4">
        <Select defaultValue="advisor" onValueChange={handleNavigation}>
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

      <div className="flex-grow px-4 pb-4 overflow-hidden">
        <Card className="h-full flex flex-col bg-transparent transition-colors duration-200 hover:bg-black/10">
          <CardHeader className="flex-none border-b bg-transparent">
            <CardTitle>Chat with Financial AI</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col p-4 overflow-hidden">
            <ScrollArea className="flex-grow pr-4" ref={scrollAreaRef}>
              <div className="flex flex-col gap-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex items-start max-w-[80%] ${
                        message.role === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <Avatar className={`w-8 h-8 ${message.role === "user" ? "ml-2" : "mr-2"}`}>
                        <AvatarImage
                          src={
                            message.role === "user"
                              ? "/placeholder-user.jpg"
                              : "/placeholder-ai.jpg"
                          }
                          alt={message.role === "user" ? "User Avatar" : "AI Avatar"}
                        />
                        <AvatarFallback>
                          {message.role === "user" ? "U" : "AI"}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`rounded-lg p-3 ${
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
              </div>
            </ScrollArea>
            
            <div className="flex-none flex gap-2 pt-4">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about financial advice..."
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-grow"
              />
              <Button 
                onClick={handleSend} 
                size="icon"
                disabled={isLoading || !input.trim()}
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}