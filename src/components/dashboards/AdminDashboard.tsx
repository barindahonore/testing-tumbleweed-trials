import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, Trophy, UserPlus, Activity } from 'lucide-react';
import type { AdminDashboardData } from '@/services/api';

interface AdminDashboardProps {
  data: AdminDashboardData;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ data }) => {
  const { platformStats, recentActivity } = data;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PUBLISHED':
        return 'default';
      case 'IN_PROGRESS':
        return 'secondary';
      case 'COMPLETED':
        return 'outline';
      case 'DRAFT':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Platform Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformStats.totalUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformStats.totalRegistrations}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Competitions</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformStats.totalCompetitions}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published Events</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformStats.eventsByStatus.published}</div>
          </CardContent>
        </Card>
      </div>

      {/* Event Status Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Events by Status</CardTitle>
          <CardDescription>Current status distribution of all events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{platformStats.eventsByStatus.published}</div>
              <p className="text-sm text-muted-foreground">Published</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{platformStats.eventsByStatus.in_progress}</div>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">{platformStats.eventsByStatus.completed}</div>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{platformStats.eventsByStatus.draft}</div>
              <p className="text-sm text-muted-foreground">Draft</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Events
            </CardTitle>
            <CardDescription>Latest event activity</CardDescription>
          </CardHeader>
          <CardContent>
            {recentActivity.recentEvents.length === 0 ? (
              <p className="text-muted-foreground">No recent events</p>
            ) : (
              <div className="space-y-3">
                {recentActivity.recentEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between border rounded-lg p-3">
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {new Date(event.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant={getStatusColor(event.status)}>
                      {event.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Recent Users
            </CardTitle>
            <CardDescription>Latest user registrations</CardDescription>
          </CardHeader>
          <CardContent>
            {recentActivity.recentUsers.length === 0 ? (
              <p className="text-muted-foreground">No recent users</p>
            ) : (
              <div className="space-y-3">
                {recentActivity.recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between border rounded-lg p-3">
                    <div>
                      <h4 className="font-medium">{user.firstName} {user.lastName}</h4>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="outline">
                      {user.role.name}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;