import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/hooks/useAuth';

const AdminDashboard = () => {
  const { isAuthenticated } = useAuth();
  const [driverCodes, setDriverCodes] = useState([]);
  const [trackingUpdates, setTrackingUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
      const channel = supabase
        .channel('admin-updates')
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'driver_codes',
        }, () => fetchData())
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'tracking_updates',
        }, () => fetchData())
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [isAuthenticated]);

  const fetchData = async () => {
    try {
      const [codesResponse, updatesResponse] = await Promise.all([
        supabase.from('driver_codes').select('*'),
        supabase.from('tracking_updates').select('*').order('timestamp', { ascending: false })
      ]);

      if (codesResponse.error) throw codesResponse.error;
      if (updatesResponse.error) throw updatesResponse.error;

      setDriverCodes(codesResponse.data || []);
      setTrackingUpdates(updatesResponse.data || []);
    } catch (err) {
      setError('Failed to fetch admin data');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p>Please authenticate to access the admin dashboard.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Driver Codes */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Driver Codes</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Code</th>
                    <th className="text-left py-2">Category</th>
                    <th className="text-left py-2">Reference</th>
                    <th className="text-left py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {driverCodes.map((code) => (
                    <tr key={code.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 font-mono">{code.code}</td>
                      <td className="py-2">{code.category}</td>
                      <td className="py-2">{code.reference}</td>
                      <td className="py-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          code.current_status === 'SORTING' ? 'bg-yellow-100 text-yellow-800' :
                          code.current_status === 'IN_TRANSIT' ? 'bg-blue-100 text-blue-800' :
                          code.current_status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {code.current_status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tracking Updates */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Tracking Updates</h2>
            <div className="space-y-3">
              {trackingUpdates.slice(0, 10).map((update) => (
                <div key={update.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <span className="font-mono text-sm">{update.tracking_code}</span>
                    <span className="text-gray-500 text-sm ml-2">
                      {update.previous_status} → {update.new_status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(update.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;