import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BarChart3, Calculator, Brain, TrendingUp, Shield, Users, Award, Bell, Clock } from 'lucide-react';
import '../App.css';

const HomePage = () => {
  const features = [
    {
      title: "Stock Past Analysis",
      description: "Analyze historical stock performance and trends with advanced analytics tools",
      icon: <BarChart3 className="h-8 w-8 text-blue-500" />,
      path: "/analysis",
      stat: "98% accuracy"
    },
    {
      title: "Automatic Loan Approver",
      description: "Get instant loan approval decisions using our AI-powered system",
      icon: <Calculator className="h-8 w-8 text-green-500" />,
      path: "/loan-approver",
      stat: "3min average"
    },
    {
      title: "AI Financial Advisor",
      description: "Receive personalized financial advice powered by advanced AI algorithms",
      icon: <Brain className="h-8 w-8 text-purple-500" />,
      path: "/",
      stat: "24/7 available"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      content: "This platform transformed how I manage my business finances. The AI advisor provided insights I never would have considered.",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw9GFcYYBlO9bXtNf0FEnaHPuyU8zwtyMgDg&s"
    },
    {
      name: "Michael Chen",
      role: "Personal Investor",
      content: "The stock analysis tools are incredible. I've seen a 40% improvement in my investment returns since I started using this platform.",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5vFXEVWT_Lj34kz617xaNrBzB45CnQk7Ydg&s"
    },
    {
      name: "Emily Rodriguez",
      role: "First-time Homebuyer",
      content: "The loan approval process was so smooth and quick. I got my pre-approval in minutes!",
      avatar: "https://www.shutterstock.com/image-photo/photo-unsatisfied-young-person-arm-260nw-2327405409.jpg"
    }
  ];

  const stats = [
    { label: "Active Users", value: "50K+", icon: <Users className="h-6 w-6" /> },
    { label: "Processing Time", value: "3 mins", icon: <Clock className="h-6 w-6" /> },
    { label: "Success Rate", value: "99.9%", icon: <Award className="h-6 w-6" /> },
    { label: "Secure Transactions", value: "1M+", icon: <Shield className="h-6 w-6" /> }
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
      {/* Diagonal overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-blue-100"></div>
        <div 
          className="absolute inset-0 bg-purple-600 transform -skew-y-6 origin-top-right"
          style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
        ></div>
      </div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
            Smart Finance Solutions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Harness the power of AI to make smarter financial decisions. 
            Get real-time insights, instant loan approvals, and personalized advice.
          </p>
          <div className="flex justify-center gap-4">
          <Link 
          to="/financial-advisor"  // Use the "to" prop to specify the path
          className="inline-flex items-center"
        >
          <button 
            id="btn" 
  className="inline-flex items-center"
          >
            Go To Site
          </button>
        </Link>
          </div>
        </div>
      </div>
    </div>


      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Powerful Features for Your Financial Success
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our comprehensive suite of tools helps you make informed decisions
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link 
              key={index} 
              to={feature.path}
              className="transform transition-all duration-200 hover:scale-105"
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-200">
                <CardHeader>
                  <div className="flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl text-center">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {feature.stat}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2 text-white opacity-80">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied users who have transformed their financial journey
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-10 w-10 rounded-full mr-3"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-600">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-12 md:p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Transform Your Financial Future?
              </h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of users who are already making smarter financial decisions 
                with our AI-powered platform.
              </p>
              <div className="flex justify-center gap-4">
                <Link 
                  to="/register" 
                  className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Get Started Now
                </Link>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-400 transition-colors"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Updates Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Latest Updates
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay informed about new features and improvements
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <div className="flex items-center text-blue-500 mb-2">
                <Bell className="h-5 w-5 mr-2" />
                <span className="text-sm">New Feature</span>
              </div>
              <CardTitle className="text-lg">Enhanced Stock Analysis</CardTitle>
              <CardDescription>
                Now with advanced technical indicators and real-time market data
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center text-green-500 mb-2">
                <TrendingUp className="h-5 w-5 mr-2" />
                <span className="text-sm">Improvement</span>
              </div>
              <CardTitle className="text-lg">Faster Loan Processing</CardTitle>
              <CardDescription>
                Reduced approval time by 50% with our new AI algorithm
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center text-purple-500 mb-2">
                <Shield className="h-5 w-5 mr-2" />
                <span className="text-sm">Security</span>
              </div>
              <CardTitle className="text-lg">Enhanced Security</CardTitle>
              <CardDescription>
                Implemented advanced encryption for all transactions
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;