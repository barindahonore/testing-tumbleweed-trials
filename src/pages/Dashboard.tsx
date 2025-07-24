import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getDashboardData, type DashboardData } from '@/services/api';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import StudentDashboard from '@/components/dashboards/StudentDashboard';
import JudgeDashboard from '@/components/dashboards/JudgeDashboard';
import AdminDashboard from '@/components/dashboards/AdminDashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getDashboardData();
        setDashboardData(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  const renderDashboard = () => {
    if (!dashboardData || !user) return null;

    switch (user.role) {
      case 'STUDENT':
        return <StudentDashboard data={dashboardData as any} />;
      case 'JUDGE':
        return <JudgeDashboard data={dashboardData as any} />;
      case 'ADMIN':
        return <AdminDashboard data={dashboardData as any} />;
      default:
        return (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Unknown user role: {user.role}</AlertDescription>
          </Alert>
        );
    }
  };

  const getDashboardTitle = () => {
    switch (user?.role) {
      case 'STUDENT':
        return 'Student Dashboard';
      case 'JUDGE':
        return 'Judge Dashboard';
      case 'ADMIN':
        return 'Admin Dashboard';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold">{getDashboardTitle()}</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.firstName || user?.email || 'User'}
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto p-6">
        {renderDashboard()}
      </div>
    </div>
  );
};

export default Dashboard;