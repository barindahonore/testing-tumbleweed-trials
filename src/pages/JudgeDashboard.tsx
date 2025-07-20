import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
  Calendar,
  Home,
  BarChart3,
  User,
  BookOpen,
  Trophy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider,
  SidebarTrigger,
  useSidebar 
} from "@/components/ui/sidebar";

// Sidebar Navigation Component
function JudgeSidebar() {
  const { collapsed } = useSidebar();
  const navigate = useNavigate();
  
  const menuItems = [
    { title: "Dashboard", url: "/judge-dashboard", icon: Home },
    { title: "Pending Reviews", url: "/judge-dashboard/pending", icon: AlertCircle },
    { title: "Completed Reviews", url: "/judge-dashboard/completed", icon: CheckCircle },
    { title: "Analytics", url: "/judge-dashboard/analytics", icon: BarChart3 },
    { title: "Guidelines", url: "/judge-dashboard/guidelines", icon: BookOpen },
    { title: "Profile", url: "/judge-dashboard/profile", icon: User },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible>
      <SidebarContent className="bg-card border-r border-border">
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Scale className="w-4 h-4 text-white" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="text-lg font-semibold text-foreground">EduEvents</h2>
                <p className="text-xs text-muted-foreground">Judge Portal</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/judge-dashboard"}
                      className={({ isActive }) => 
                        `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive 
                            ? "bg-primary text-primary-foreground" 
                            : "text-foreground hover:bg-accent"
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4 border-t border-border">
          {!collapsed ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground">Judge</p>
                  <p className="text-xs text-muted-foreground">judge@sola.org</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="flex justify-center">
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

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
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-background">
        <JudgeSidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
            <div className="flex items-center space-x-4">
              <SidebarTrigger className="lg:hidden" />
              <div>
                <h1 className="text-xl font-semibold text-foreground">Judge Dashboard</h1>
                <p className="text-sm text-muted-foreground">Review submissions and provide feedback</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </header>

          <main className="flex-1 overflow-auto bg-background">
            <div className="p-6 space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 dark:from-blue-900/20 dark:to-blue-900/10 dark:border-blue-800">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Reviews</p>
                        <p className="text-2xl font-bold text-foreground">{judgeStats.totalReviews}</p>
                        <p className="text-xs text-blue-600 font-medium">All time</p>
                      </div>
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center dark:bg-blue-900/30">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 dark:from-orange-900/20 dark:to-orange-900/10 dark:border-orange-800">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Pending Reviews</p>
                        <p className="text-2xl font-bold text-foreground">{judgeStats.pendingReviews}</p>
                        <p className="text-xs text-orange-600 font-medium">Needs attention</p>
                      </div>
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center dark:bg-orange-900/30">
                        <AlertCircle className="w-5 h-5 text-orange-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 dark:from-green-900/20 dark:to-green-900/10 dark:border-green-800">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                        <p className="text-2xl font-bold text-foreground">{judgeStats.averageScore}</p>
                        <p className="text-xs text-green-600 font-medium">High quality</p>
                      </div>
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center dark:bg-green-900/30">
                        <Star className="w-5 h-5 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 dark:from-purple-900/20 dark:to-purple-900/10 dark:border-purple-800">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">This Month</p>
                        <p className="text-2xl font-bold text-foreground">{judgeStats.reviewsThisMonth}</p>
                        <p className="text-xs text-purple-600 font-medium">80% of goal</p>
                      </div>
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center dark:bg-purple-900/30">
                        <Calendar className="w-5 h-5 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Pending Reviews Priority Section */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center">
                        <AlertCircle className="w-5 h-5 mr-2 text-orange-500" />
                        High Priority Reviews
                      </CardTitle>
                      <CardDescription>Submissions with approaching deadlines</CardDescription>
                    </div>
                    <Badge variant="destructive" className="animate-pulse">
                      {pendingReviews.filter(r => r.priority === 'high').length} urgent
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {pendingReviews.filter(review => review.priority === 'high').map((review) => (
                    <div key={review.id} className="flex items-center justify-between p-4 rounded-lg border border-orange-200 bg-orange-50/50 dark:border-orange-800 dark:bg-orange-900/20">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center dark:bg-orange-900/30">
                          <FileText className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{review.eventTitle}</p>
                          <p className="text-sm text-muted-foreground">by {review.studentName}</p>
                          <div className="flex items-center space-x-3 text-xs text-muted-foreground mt-1">
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              Due: {review.deadline}
                            </span>
                            <Badge variant="outline" className="text-xs">{review.type}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          Review
                        </Button>
                        <Button size="sm">
                          Start Review
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Activity & Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                      Recent Reviews
                    </CardTitle>
                    <CardDescription>Your latest completed evaluations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {completedReviews.slice(0, 3).map((review) => (
                      <div key={review.id} className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/20">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center dark:bg-green-900/30">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm text-foreground">{review.eventTitle}</p>
                            <p className="text-xs text-muted-foreground">by {review.studentName}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary">{review.score}</p>
                          <p className="text-xs text-muted-foreground">{review.reviewedDate}</p>
                        </div>
                      </div>
                    ))}
                    <Button variant="ghost" className="w-full mt-3">
                      View All Completed
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2 text-primary" />
                      Review Progress
                    </CardTitle>
                    <CardDescription>Monthly completion tracking</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>February Progress</span>
                          <span>12/15 reviews</span>
                        </div>
                        <Progress value={80} className="h-3" />
                      </div>
                      <div className="grid grid-cols-3 gap-4 pt-4">
                        <div className="text-center">
                          <p className="text-lg font-bold text-primary">80%</p>
                          <p className="text-xs text-muted-foreground">Completion</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-green-600">2.5</p>
                          <p className="text-xs text-muted-foreground">Avg Days</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-blue-600">4.8</p>
                          <p className="text-xs text-muted-foreground">Quality Score</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default JudgeDashboard;