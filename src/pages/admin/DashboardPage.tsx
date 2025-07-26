
import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Calendar, Trophy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import api from '@/services/api';
import StatCard from '@/components/admin/dashboard/StatCard';
import EventStatusSummary from '@/components/admin/dashboard/EventStatusSummary';
import RecentActivityFeed from '@/components/admin/dashboard/RecentActivityFeed';

interface PlatformStats {
  totalUsers: number;
  totalRegistrations: number;
  totalCompetitions: number;
  eventsByStatus: {
    draft: number;
    published: number;
    in_progress: number;
    completed: number;
  };
}

interface RecentEvent {
  id: string;
  title: string;
  status: string;
  createdAt: string;
}

interface RecentUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  role: {
    name: string;
  };
}

interface RecentActivity {
  recentEvents: RecentEvent[];
  recentUsers: RecentUser[];
}

interface DashboardData {
  platformStats: PlatformStats;
  recentActivity: RecentActivity;
}

const DashboardPage: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await api.get('/dashboard');
        
        if (response.data.success) {
          setDashboardData(response.data.data);
        } else {
          throw new Error(response.data.message || 'Failed to fetch dashboard data');
        }
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || 'Failed to load dashboard data';
        setError(errorMessage);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-4 max-w-md">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="text-xl font-bold text-foreground">Dashboard Error</h2>
          <p className="text-muted-foreground">{error || 'Unable to load dashboard data'}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const { platformStats, recentActivity } = dashboardData;

  return (
    <div className="p-6 space-y-6">
      {/* Platform Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={platformStats.totalUsers.toLocaleString()}
          icon={Users}
          description="Active platform users"
          trend={{ value: 12, isPositive: true }}
        />
        
        <StatCard
          title="Total Registrations"
          value={platformStats.totalRegistrations.toLocaleString()}
          icon={UserPlus}
          description="Event registrations"
          trend={{ value: 8, isPositive: true }}
        />
        
        <StatCard
          title="Total Competitions"
          value={platformStats.totalCompetitions.toLocaleString()}
          icon={Calendar}
          description="All-time competitions"
        />
        
        <StatCard
          title="Active Events"
          value={platformStats.eventsByStatus.published + platformStats.eventsByStatus.in_progress}
          icon={Trophy}
          description="Currently active"
          trend={{ value: 3, isPositive: true }}
        />
      </div>

      {/* Event Status and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EventStatusSummary eventsByStatus={platformStats.eventsByStatus} />
        <RecentActivityFeed 
          recentEvents={recentActivity.recentEvents}
          recentUsers={recentActivity.recentUsers}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
