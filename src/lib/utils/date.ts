export const dateUtils = {
  // Get current date
  now: (): Date => {
    return new Date();
  },

  // Format date
  format: (date: Date, format: string): string => {
    const formats: Record<string, () => string> = {
      'yyyy-MM-dd': () => date.getFullYear() + '-' + 
        String(date.getMonth() + 1).padStart(2, '0') + '-' + 
        String(date.getDate()).padStart(2, '0'),
      
      'MM/dd/yyyy': () => (date.getMonth() + 1) + '/' + 
        String(date.getDate()).padStart(2, '0') + '/' + 
        date.getFullYear(),
      
      'dd MMMM yyyy': () => String(date.getDate()) + ' ' + 
        date.toLocaleString('default', { month: 'long' }) + ' ' + 
        date.getFullYear(),
      
      'HH:mm:ss': () => String(date.getHours()).padStart(2, '0') + ':' + 
        String(date.getMinutes()).padStart(2, '0') + ':' + 
        String(date.getSeconds()).padStart(2, '0'),
      
      'MMMM dd, yyyy HH:mm': () => date.toLocaleString('default', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
    };
    
    return formats[format]?.() || date.toString();
  },

  // Parse date
  parse: (dateString: string, format?: string): Date => {
    return new Date(dateString);
  },

  // Add days
  addDays: (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  },

  // Add hours
  addHours: (date: Date, hours: number): Date => {
    const result = new Date(date);
    result.setTime(result.getTime() + hours * 60 * 60 * 1000);
    return result;
  },

  // Add minutes
  addMinutes: (date: Date, minutes: number): Date => {
    const result = new Date(date);
    result.setTime(result.getTime() + minutes * 60 * 1000);
    return result;
  },

  // Subtract days
  subtractDays: (date: Date, days: number): Date => {
    return dateUtils.addDays(date, -days);
  },

  // Get start of day
  startOfDay: (date: Date): Date => {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
  },

  // Get end of day
  endOfDay: (date: Date): Date => {
    const result = new Date(date);
    result.setHours(23, 59, 59, 999);
    return result;
  },

  // Get start of month
  startOfMonth: (date: Date): Date => {
    const result = new Date(date);
    result.setDate(1);
    result.setHours(0, 0, 0, 0);
    return result;
  },

  // Get end of month
  endOfMonth: (date: Date): Date => {
    const result = new Date(date);
    result.setMonth(result.getMonth() + 1, 0);
    result.setHours(23, 59, 59, 999);
    return result;
  },

  // Get days difference
  daysDifference: (date1: Date, date2: Date): number => {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  },

  // Check if same day
  isSameDay: (date1: Date, date2: Date): boolean => {
    return date1.getFullYear() === date2.get
<dyad-write path="src/lib/utils/date.ts" description="Date utilities for formatting and calculations">
export const dateUtils = {
  // Get current date
  now: (): Date => {
    return new Date();
  },

  // Format date
  format: (date: Date, format: string): string => {
    const formats: Record<string, () => string> = {
      'yyyy-MM-dd': () => date.getFullYear() + '-' + 
        String(date.getMonth() + 1).padStart(2, '0') + '-' + 
        String(date.getDate()).padStart(2, '0'),
      
      'MM/dd/yyyy': () => (date.getMonth() + 1) + '/' + 
        String(date.getDate()).padStart(2, '0') + '/' + 
        date.getFullYear(),
      
      'dd MMMM yyyy': () => String(date.getDate()) + ' ' + 
        date.toLocaleString('default', { month: 'long' }) + ' ' + 
        date.getFullYear(),
      
      'HH:mm:ss': () => String(date.getHours()).padStart(2, '0') + ':' + 
        String(date.getMinutes()).padStart(2, '0') + ':' + 
        String(date.getSeconds()).padStart(2, '0'),
      
      'MMMM dd, yyyy HH:mm': () => date.toLocaleString('default', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
    };
    
    return formats[format]?.() || date.toString();
  },

  // Parse date
  parse: (dateString: string, format?: string): Date => {
    return new Date(dateString);
  },

  // Add days
  addDays: (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  },

  // Add hours
  addHours: (date: Date, hours: number): Date => {
    const result = new Date(date);
    result.setTime(result.getTime() + hours * 60 * 60 * 1000);
    return result;
  },

  // Add minutes
  addMinutes: (date: Date, minutes: number): Date => {
    const result = new Date(date);
    result.setTime(result.getTime() + minutes * 60 * 1000);
    return result;
  },

  // Subtract days
  subtractDays: (date: Date, days: number): Date => {
    return dateUtils.addDays(date, -days);
  },

  // Get start of day
  startOfDay: (date: Date): Date => {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
  },

  // Get end of day
  endOfDay: (date: Date): Date => {
    const result = new Date(date);
    result.setHours(23, 59, 59, 999);
    return result;
  },

  // Get start of month
  startOfMonth: (date: Date): Date => {
    const result = new Date(date);
    result.setDate(1);
    result.setHours(0, 0, 0, 0);
    return result;
  },

  // Get end of month
  endOfMonth: (date: Date): Date => {
    const result = new Date(date);
    result.setMonth(result.getMonth() + 1, 0);
    result.setHours(23, 59, 59, 999);
    return result;
  },

  // Get days difference
  daysDifference: (date1: Date, date2: Date): number => {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  },

  // Check if same day
  isSameDay: (date1: Date, date2: Date): boolean => {
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
  },

  // Check if yesterday
  isYesterday: (date: Date): boolean => {
    const yesterday = dateUtils.subtractDays(dateUtils.now(), 1);
    return dateUtils.isSameDay(date, yesterday);
  },

  // Check if today
  isToday: (date: Date): boolean => {
    return dateUtils.isSameDay(date, dateUtils.now());
  },

  // Check if tomorrow
  isTomorrow: (date: Date): boolean => {
    const tomorrow = dateUtils.addDays(dateUtils.now(), 1);
    return dateUtils.isSameDay(date, tomorrow);
  },

  // Get relative time
  relativeTime: (date: Date): string => {
    const now = dateUtils.now();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
    
    return `${Math.floor(diffInSeconds / 31536000)} years ago`;
  },

  // Get ISO string
  toISOString: (date: Date): string => {
    return date.toISOString();
  },

  // Parse ISO string
  fromISOString: (isoString: string): Date => {
    return new Date(isoString);
  },

  // Get UTC date
  utc: (date: Date): Date => {
    return new Date(Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    ));
  },

  // Get local date
  local: (date: Date): Date => {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  },
};
<dyad-write path="src/App.tsx" description="Updated App with new routes for admin dashboard, audit logs, and tracking page">
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import AuditLogs from "./pages/AuditLogs";
import Tracking from "./pages/Tracking";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/audit-logs" element={<AuditLogs />} />
          <Route path="/tracking/:trackingCode" element={<Tracking />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;