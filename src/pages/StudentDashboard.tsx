import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  BookOpen, 
  Trophy, 
  Clock, 
  Users, 
  Bell,
  Search,
  Filter,
  Settings,
  LogOut,
  ChevronRight,
  Star,
  Download,
  Upload
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const StudentDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const upcomingEvents = [
    {
      id: 1,
      title: "Global Leadership Summit",
      date: "2024-02-15",
      time: "09:00 AM",
      status: "registered",
      category: "Leadership",
      participants: 124
    },
    {
      id: 2,
      title: "Innovation Workshop",
      date: "2024-02-20",
      time: "02:00 PM",
      status: "available",
      category: "Technology",
      participants: 89
    },
    {
      id: 3,
      title: "Entrepreneurship Bootcamp",
      date: "2024-02-25",
      time: "10:00 AM",
      status: "waitlist",
      category: "Business",
      participants: 156
    }
  ];

  const mySubmissions = [
    {
      id: 1,
      title: "Leadership Essay Competition",
      submitted: "2024-01-28",
      status: "under_review",
      score: null
    },
    {
      id: 2,
      title: "Innovation Project Showcase",
      submitted: "2024-01-25",
      status: "scored",
      score: 95
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "registered": return "bg-primary/10 text-primary border-primary/20";
      case "available": return "bg-green-50 text-green-700 border-green-200";
      case "waitlist": return "bg-orange-50 text-orange-700 border-orange-200";
      case "under_review": return "bg-blue-50 text-blue-700 border-blue-200";
      case "scored": return "bg-green-50 text-green-700 border-green-200";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "registered": return "Registered";
      case "available": return "Available";
      case "waitlist": return "Waitlist";
      case "under_review": return "Under Review";
      case "scored": return "Scored";
      default: return status;
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
                  <Trophy className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-semibold text-foreground">EduEvents Hub</span>
              </Link>
              <div className="h-6 w-px bg-border" />
              <span className="text-sm text-muted-foreground font-medium">Student Portal</span>
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
                <AvatarFallback className="text-xs bg-primary text-primary-foreground">ST</AvatarFallback>
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, Student!</h1>
          <p className="text-muted-foreground">Track your progress, discover new opportunities, and excel in your educational journey.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Events Registered</p>
                  <p className="text-2xl font-bold text-foreground">3</p>
                </div>
                <Calendar className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Submissions</p>
                  <p className="text-2xl font-bold text-foreground">2</p>
                </div>
                <Upload className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Average Score</p>
                  <p className="text-2xl font-bold text-foreground">95</p>
                </div>
                <Star className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Certificates</p>
                  <p className="text-2xl font-bold text-foreground">1</p>
                </div>
                <Trophy className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="events" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50">
            <TabsTrigger value="events" className="font-medium">My Events</TabsTrigger>
            <TabsTrigger value="submissions" className="font-medium">Submissions</TabsTrigger>
            <TabsTrigger value="explore" className="font-medium">Explore</TabsTrigger>
          </TabsList>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Upcoming Events</CardTitle>
                    <CardDescription>Events you're registered for and upcoming opportunities</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 border border-border rounded-lg bg-card hover:bg-accent/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{event.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {event.date} at {event.time}
                            </span>
                            <span className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {event.participants} participants
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(event.status)}>
                          {getStatusText(event.status)}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Submissions Tab */}
          <TabsContent value="submissions" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">My Submissions</CardTitle>
                    <CardDescription>Track your submitted work and scores</CardDescription>
                  </div>
                  <Button>
                    <Upload className="w-4 h-4 mr-2" />
                    New Submission
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mySubmissions.map((submission) => (
                    <div key={submission.id} className="flex items-center justify-between p-4 border border-border rounded-lg bg-card">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{submission.title}</h3>
                          <p className="text-sm text-muted-foreground">Submitted on {submission.submitted}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {submission.score && (
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">{submission.score}</p>
                            <p className="text-xs text-muted-foreground">Score</p>
                          </div>
                        )}
                        <Badge className={getStatusColor(submission.status)}>
                          {getStatusText(submission.status)}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Explore Tab */}
          <TabsContent value="explore" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Discover Events</CardTitle>
                    <CardDescription>Find new opportunities to grow and learn</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input 
                      placeholder="Search events..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-64"
                    />
                    <Button variant="outline" size="sm">
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Explore New Events</h3>
                  <p className="text-muted-foreground mb-4">Discover exciting opportunities to enhance your skills and knowledge.</p>
                  <Button>Browse All Events</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default StudentDashboard;