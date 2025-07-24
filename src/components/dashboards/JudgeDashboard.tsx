import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ClipboardList, Clock, MapPin } from 'lucide-react';
import type { JudgeDashboardData } from '@/services/api';

interface JudgeDashboardProps {
  data: JudgeDashboardData;
}

const JudgeDashboard: React.FC<JudgeDashboardProps> = ({ data }) => {
  const { competitionsToJudge } = data;

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'IN_PROGRESS':
        return 'default';
      case 'UPCOMING':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5" />
            Competitions to Judge
          </CardTitle>
          <CardDescription>Events requiring your evaluation</CardDescription>
        </CardHeader>
        <CardContent>
          {competitionsToJudge.length === 0 ? (
            <p className="text-muted-foreground">No competitions pending evaluation</p>
          ) : (
            <div className="space-y-4">
              {competitionsToJudge.map((competition) => (
                <div key={competition.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="font-semibold">{competition.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {competition.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {new Date(competition.startTime).toLocaleDateString()} - {new Date(competition.endTime).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {competition.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant={getStatusVariant(competition.status)}>
                        {competition.status.replace('_', ' ')}
                      </Badge>
                      {competition.submissionsAwaitingEvaluation > 0 && (
                        <Badge variant="destructive">
                          {competition.submissionsAwaitingEvaluation} pending
                        </Badge>
                      )}
                    </div>
                  </div>
                  {competition.submissionsAwaitingEvaluation > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <Button className="w-full">
                        Review Submissions ({competition.submissionsAwaitingEvaluation})
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default JudgeDashboard;