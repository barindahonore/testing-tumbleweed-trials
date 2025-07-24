import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://vierry-api.ishimwe.rw/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth data and redirect to login
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Dashboard data types
export interface StudentDashboardData {
  upcomingRegistrations: Array<{
    id: string;
    userId: string;
    eventId: string;
    status: string;
    registeredAt: string;
    event: {
      id: string;
      title: string;
      description: string;
      startTime: string;
      endTime: string;
      location: string;
      status: string;
    };
  }>;
  activeTeams: Array<{
    id: string;
    name: string;
    invitationCode: string;
    competitionId: string;
    competition: {
      event: {
        title: string;
        endTime: string;
      };
    };
  }>;
  recentResults: Array<{
    id: string;
    finalScore: number;
    team: {
      name: string;
    };
    competition: {
      event: {
        title: string;
      };
    };
  }>;
}

export interface JudgeDashboardData {
  competitionsToJudge: Array<{
    id: string;
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    location: string;
    status: string;
    submissionsAwaitingEvaluation: number;
  }>;
}

export interface AdminDashboardData {
  platformStats: {
    totalUsers: number;
    totalRegistrations: number;
    totalCompetitions: number;
    eventsByStatus: {
      published: number;
      in_progress: number;
      completed: number;
      draft: number;
    };
  };
  recentActivity: {
    recentEvents: Array<{
      id: string;
      title: string;
      status: string;
      createdAt: string;
    }>;
    recentUsers: Array<{
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      createdAt: string;
      role: {
        name: string;
      };
    }>;
  };
}

export type DashboardData = StudentDashboardData | JudgeDashboardData | AdminDashboardData;

// API function to get dashboard data
export const getDashboardData = async (): Promise<DashboardData> => {
  const response = await api.get('/dashboard');
  return response.data.data;
};

export default api;