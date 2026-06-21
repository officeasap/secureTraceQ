import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { authService } from '../services/auth.service';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [remainingAttempts, setRemainingAttempts] = useState(5);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTimer, setLockoutTimer] = useState(0);

  // Load session on mount
  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsAuthenticated(true);
        setToken(session.access_token);
      }
    };
    fetchSession();
  }, []);

  const verify = async (code: string) => {
    const ip = '127.0.0.1'; // placeholder IP
    const result = await authService.verifyDriverCode(code, ip);
    if (result.success) {
      setIsAuthenticated(true);
      setToken(result.token);
      setRemainingAttempts(result.remainingAttempts ?? 5);
      setLocked(false);
      setLockoutTimer(0);
    } else {
      setIsLocked(result.isLocked ?? false);
      const remaining = await authService.getRemainingAttempts(ip);
      setRemainingAttempts(remaining);
    }
  };

  const logout = () => {
    supabase.auth.signOut();
    setIsAuthenticated(false);
    setToken(null);
    setRemainingAttempts(5);
    setLocked(false);
    setLockoutTimer(0);
  };

  return {
    isAuthenticated,
    token,
    remainingAttempts,
    isLocked,
    lockoutTimer,
    verify,
    logout,
  };
};