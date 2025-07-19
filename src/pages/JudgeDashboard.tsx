import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Scale, 
  FileText, 
  Users, 
  Clock, 
  Star, 
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Download,
  Eye,
  CheckCircle,
  AlertCircle,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const JudgeDashboard = () => {
  const pendingReviews = [
    {
      id: 1,
      studentName: "Sarah Johnson",
      eventTitle: "Leadership Essay Competition",
      submittedDate: "2024-01-28",
      deadline: "2024-02-05",
      type: "Essay",
      status: "pending",
      priority: "high"
    },
    {
      id: 2,
      studentName: "Michael Chen",
      eventTitle: "Innovation Project Showcase",
      submittedDate: "2024-01-30",
      deadline: "2024-02-10",
      type: "Project",
      status: "pending",
      priority: "medium"
    },
    {
      id: 3,
      studentName: "Emily Davis",
      eventTitle: "Entrepreneurship Pitch",
      submittedDate: "2024-02-01",
      deadline: "2024-02-08",
      type: "Presentation",
      status: "in_progress",
      priority: "high"
    }
  ];

  const completedReviews = [
    {
      id: 4,
      studentName: "Alex Rivera",
      eventTitle: "Global Leadership Summit",
      reviewedDate: "2024-01-25",
      score: 92,
      type: "Essay",
      feedback: "Exceptional analysis and leadership insights"
    },
    {
      id: 5,
      studentName: "Sophie Wilson",
      eventTitle: "Innovation Workshop",
      reviewedDate: "2024-01-23",
      score: 88,
      type: "Project",
      feedback: "Creative solution with strong technical execution"
    }
  ];

  const judgeStats = {
    totalReviews: 47,
    pendingReviews: 3,
    averageScore: 89.5,
    reviewsThisMonth: 12
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-50 text-red-700 border-red-200";
      case "medium": return "bg-orange-50 text-orange-700 border-orange-200";
      case "low": return "bg-green-50 text-green-700 border-green-200";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-orange-50 text-orange-700 border-orange-200";
      case "in_progress": return "bg-blue-50 text-blue-700 border-blue-200";
      case "completed": return "bg-green-50 text-green-700 border-green-200";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <AlertCircle className="w-4 h-4" />;
      case "in_progress": return <Clock className="w-4 h-4" />;
      case "completed": return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-xl bg-background/80">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Scale className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-semibold text-foreground">EduEvents Hub</span>
              </Link>
              <div className="h-6 w-px bg-border" />
              <span className="text-sm text-muted-foreground font-medium">Judge Portal</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarImage src="" />
                <AvatarFallback className="text-xs bg-primary text-primary-foreground">JD</AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/">
                  <LogOut className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome, Judge!</h1>
          <p className="text-muted-foreground">Review submissions, provide feedback, and help students excel in their academic journey.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Total Reviews</p>
                  <p className="text-2xl font-bold text-foreground">{judgeStats.totalReviews}</p>
                </div>
                <FileText className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Pending Reviews</p>
                  <p className="text-2xl font-bold text-foreground">{judgeStats.pendingReviews}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Average Score</p>
                  <p className="text-2xl font-bold text-foreground">{judgeStats.averageScore}</p>
                </div>
                <Star className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">This Month</p>
                  <p className="text-2xl font-bold text-foreground">{judgeStats.reviewsThisMonth}</p>
                </div>
                <Calendar className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50">
            <TabsTrigger value="pending" className="font-medium">
              Pending Reviews 
              <Badge className="ml-2 bg-orange-100 text-orange-700">{judgeStats.pendingReviews}</Badge>
            </TabsTrigger>
            <TabsTrigger value="completed" className="font-medium">Completed</TabsTrigger>
            <TabsTrigger value="analytics" className="font-medium">Analytics</TabsTrigger>
          </TabsList>

          {/* Pending Reviews Tab */}
          <TabsContent value="pending" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-xl">Pending Reviews</CardTitle>
                <CardDescription>Submissions awaiting your evaluation and feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingReviews.map((review) => (
                    <div key={review.id} className="flex items-center justify-between p-4 border border-border rounded-lg bg-card hover:bg-accent/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{review.eventTitle}</h3>
                          <p className="text-sm text-muted-foreground">by {review.studentName}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                            <span>Submitted: {review.submittedDate}</span>
                            <span>Due: {review.deadline}</span>
                            <span className="capitalize">{review.type}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getPriorityColor(review.priority)}>
                          {review.priority} priority
                        </Badge>
                        <Badge className={getStatusColor(review.status)}>
                          {getStatusIcon(review.status)}
                          <span className="ml-1 capitalize">{review.status.replace('_', ' ')}</span>
                        </Badge>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                        <Button size="sm">
                          Review
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Completed Reviews Tab */}
          <TabsContent value="completed" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-xl">Completed Reviews</CardTitle>
                <CardDescription>Your recently completed evaluations and scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {completedReviews.map((review) => (
                    <div key={review.id} className="flex items-center justify-between p-4 border border-border rounded-lg bg-card">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{review.eventTitle}</h3>
                          <p className="text-sm text-muted-foreground">by {review.studentName}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Reviewed on {review.reviewedDate} • {review.type}
                          </p>
                          <p className="text-sm text-foreground mt-1 italic">"{review.feedback}"</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">{review.score}</p>
                          <p className="text-xs text-muted-foreground">Score</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Review Progress</CardTitle>
                  <CardDescription>Your monthly review completion rate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>February Progress</span>
                        <span>12/15 reviews</span>
                      </div>
                      <Progress value={80} className="h-2" />
                    </div>
                    <div className="text-center pt-4">
                      <p className="text-2xl font-bold text-primary">80%</p>
                      <p className="text-sm text-muted-foreground">Completion Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Score Distribution</CardTitle>
                  <CardDescription>Average scores by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Essays</span>
                      <span className="font-semibold">91.2</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Projects</span>
                      <span className="font-semibold">88.7</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Presentations</span>
                      <span className="font-semibold">89.1</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default JudgeDashboard;