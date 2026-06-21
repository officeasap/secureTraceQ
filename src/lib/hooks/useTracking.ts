import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { trackingService } from '../services/tracking.service';

export const useTracking = (trackingCode: string) => {
  const [trackingData, setTrackingData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await trackingService.fetchTrackingData(trackingCode);
        setTrackingData(data);
      } catch (e) {
        setError('Failed to load tracking data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    // Subscribe to real-time updates
    const unsubscribe = trackingService.subscribeToTrackingUpdates(trackingCode, (newData) => {
      setTrackingData(prev => ({ ...prev, ...newData }));
    });

    return unsubscribe;
  }, [trackingCode]);

  return { trackingData, loading, error };
};