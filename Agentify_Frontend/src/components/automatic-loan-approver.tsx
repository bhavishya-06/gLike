import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { getLoanApproval } from "@/service/apiService";
import { CheckCircle2, XCircle } from "lucide-react";

export function AutomaticLoanApproverComponent() {
  const [formData, setFormData] = useState({
    Gender: "Male",
    Married: "Yes",
    Dependents: "0",
    Education: "Graduate",
    Self_Employed: "No",
    ApplicantIncome: "",
    CoapplicantIncome: "",
    LoanAmount: "",
    Loan_Amount_Term: "",
    Credit_History: "1",
    Property_Area: "Urban",
  });

  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // Convert string values to numbers where needed
      const processedData = {
        ...formData,
        ApplicantIncome: Number(formData.ApplicantIncome),
        CoapplicantIncome: Number(formData.CoapplicantIncome),
        LoanAmount: Number(formData.LoanAmount),
        Loan_Amount_Term: Number(formData.Loan_Amount_Term),
        Credit_History: Number(formData.Credit_History),
      };

      const response = await getLoanApproval(processedData);
      
      if (response.Loan_Approval_Prediction === "Y") {
        setResult("approved");
      } else if (response.Loan_Approval_Prediction === "N") {
        setResult("rejected");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      setError("An error occurred while processing your loan application. Please try again.");
      console.error("Loan approval error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleServiceChange = (value: string) => {
    if (value === "advisor") {
      navigate("/");
    } else if (value === "analysis") {
      navigate("/analysis");
    } else if (value === "loan") {
      navigate("/loan-approver");
    }
  };

  return (
    <div className="flex flex-col h-full space-y-4 p-4">
      <h2 className="text-3xl font-bold text-center mb-6">
        <span className="bg-gradient-to-r from-blue-500 to-pink-500 text-transparent bg-clip-text">
          Automatic Loan Approver
        </span>
      </h2>
      <div className="mb-4">
        <Select defaultValue="loan" onValueChange={handleServiceChange}>
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
      <Card className="flex-grow">
        <CardHeader>
          <CardTitle>Loan Application Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-20">
              <div className=" w-2/3 flex items-center justify-between gap-6 space-y-2">
                <Label htmlFor="Gender">Gender</Label>
                <Select
                  name="Gender"
                  value={formData.Gender}
                  onValueChange={(value) => handleSelectChange("Gender", value)}
                >
                  <SelectTrigger id="Gender">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className=" w-2/3 flex items-center justify-between gap-6 space-y-2">
                <Label htmlFor="Married">Married</Label>
                <Select
                  name="Married"
                  value={formData.Married}
                  onValueChange={(value) =>
                    handleSelectChange("Married", value)
                  }
                >
                  <SelectTrigger id="Married">
                    <SelectValue placeholder="Select Marital Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className=" w-2/3 flex items-center justify-between gap-6 space-y-2">
                <Label htmlFor="Dependents">Dependents</Label>
                <Input
                  className="w-[160px]"
                  type="number"
                  id="Dependents"
                  name="Dependents"
                  value={formData.Dependents}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
              <div className=" w-2/3 flex items-center justify-between gap-6 space-y-2">
                <Label htmlFor="Education">Education</Label>
                <Select
                  name="Education"
                  value={formData.Education}
                  onValueChange={(value) =>
                    handleSelectChange("Education", value)
                  }
                >
                  <SelectTrigger id="Education">
                    <SelectValue placeholder="Select Education" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Graduate">Graduate</SelectItem>
                    <SelectItem value="Not Graduate">Not Graduate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className=" w-2/3 flex items-center justify-between gap-6 space-y-2">
                <Label htmlFor="Self_Employed">Self Employed</Label>
                <Select
                  name="Self_Employed"
                  value={formData.Self_Employed}
                  onValueChange={(value) =>
                    handleSelectChange("Self_Employed", value)
                  }
                >
                  <SelectTrigger id="Self_Employed">
                    <SelectValue placeholder="Select Self Employment Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className=" w-2/3 flex items-center justify-between gap-6 space-y-2">
                <Label htmlFor="ApplicantIncome">Applicant Income</Label>
                <Input
                  className="w-[160px]"
                  type="number"
                  id="ApplicantIncome"
                  name="ApplicantIncome"
                  value={formData.ApplicantIncome}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
              <div className=" w-2/3 flex items-center justify-between gap-6 space-y-2">
                <Label htmlFor="CoapplicantIncome">Coapplicant Income</Label>
                <Input
                  className="w-[160px]"
                  type="number"
                  id="CoapplicantIncome"
                  name="CoapplicantIncome"
                  value={formData.CoapplicantIncome}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
              <div className=" w-2/3 flex items-center justify-between gap-6 space-y-2">
                <Label htmlFor="LoanAmount">Loan Amount</Label>
                <Input
                  className="w-[160px]"
                  type="number"
                  id="LoanAmount"
                  name="LoanAmount"
                  value={formData.LoanAmount}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
              <div className=" w-2/3 flex items-center justify-between gap-6 space-y-2">
                <Label htmlFor="Loan_Amount_Term">Loan Amount Term</Label>
                <Input
                  className="w-[160px]"
                  type="number"
                  id="Loan_Amount_Term"
                  name="Loan_Amount_Term"
                  value={formData.Loan_Amount_Term}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
              <div className=" w-2/3 flex items-center justify-between gap-6 space-y-2">
                <Label htmlFor="Credit_History">Credit History</Label>
                <Select
                  name="Credit_History"
                  value={formData.Credit_History}
                  onValueChange={(value) =>
                    handleSelectChange("Credit_History", value)
                  }
                >
                  <SelectTrigger id="Credit_History">
                    <SelectValue placeholder="Select Credit History" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 (Good)</SelectItem>
                    <SelectItem value="0">0 (Bad)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className=" w-2/3 flex items-center justify-between gap-6 space-y-2">
                <Label htmlFor="Property_Area">Property Area</Label>
                <Select
                  name="Property_Area"
                  value={formData.Property_Area}
                  onValueChange={(value) =>
                    handleSelectChange("Property_Area", value)
                  }
                >
                  <SelectTrigger id="Property_Area">
                    <SelectValue placeholder="Select Property Area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Urban">Urban</SelectItem>
                    <SelectItem value="Rural">Rural</SelectItem>
                    <SelectItem value="Semiurban">Semiurban</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Processing..." : "Submit Application"}
            </Button>
          </form>
        </CardContent>
      </Card>
      {(result || error) && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Loan Application Result</CardTitle>
          </CardHeader>
          <CardContent>
            {result && (
              <div className={`flex items-center gap-2 p-4 rounded-lg ${
                result === "approved" 
                  ? "bg-green-50 border border-green-200" 
                  : "bg-red-50 border border-red-200"
              }`}>
                {result === "approved" ? (
                  <>
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                    <div>
                      <h3 className="font-semibold text-green-800">Congratulations!</h3>
                      <p className="text-green-700">Your loan application has been approved.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="h-6 w-6 text-red-600" />
                    <div>
                      <h3 className="font-semibold text-red-800">Application Status</h3>
                      <p className="text-red-700">We regret to inform you that your loan application has been rejected.</p>
                    </div>
                  </>
                )}
              </div>
            )}
            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                <XCircle className="h-6 w-6 text-red-600" />
                <div>
                  <h3 className="font-semibold text-red-800">Error</h3>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}