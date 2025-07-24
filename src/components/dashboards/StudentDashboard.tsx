import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Trophy, Users } from 'lucide-react';
import type { StudentDashboardData } from '@/services/api';

interface StudentDashboardProps {
  data: StudentDashboardData;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ data }) => {
  const { upcomingRegistrations, activeTeams, recentResults } = data;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Events
            </CardTitle>
            <CardDescription>Events you're registered for</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingRegistrations.length === 0 ? (
              <p className="text-muted-foreground">No upcoming events</p>
            ) : (
              <div className="space-y-3">
                {upcomingRegistrations.map((registration) => (
                  <div key={registration.id} className="border rounded-lg p-3">
                    <h4 className="font-medium">{registration.event.title}</h4>
                    <p className="text-sm text-muted-foreground">{registration.event.location}</p>
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant="secondary">{registration.status}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(registration.event.startTime).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Active Teams */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Active Teams
            </CardTitle>
            <CardDescription>Your current team memberships</CardDescription>
          </CardHeader>
          <CardContent>
            {activeTeams.length === 0 ? (
              <p className="text-muted-foreground">No active teams</p>
            ) : (
              <div className="space-y-3">
                {activeTeams.map((team) => (
                  <div key={team.id} className="border rounded-lg p-3">
                    <h4 className="font-medium">{team.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {team.competition.event.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Code: {team.invitationCode}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Recent Results
            </CardTitle>
            <CardDescription>Your latest competition scores</CardDescription>
          </CardHeader>
          <CardContent>
            {recentResults.length === 0 ? (
              <p className="text-muted-foreground">No recent results</p>
            ) : (
              <div className="space-y-3">
                {recentResults.map((result) => (
                  <div key={result.id} className="border rounded-lg p-3">
                    <h4 className="font-medium">{result.competition.event.title}</h4>
                    <p className="text-sm text-muted-foreground">Team: {result.team.name}</p>
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant="outline">
                        Score: {result.finalScore.toFixed(1)}
                      </Badge>
                    </div>
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

export default StudentDashboard;