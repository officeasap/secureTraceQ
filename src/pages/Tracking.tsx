import { useParams } from 'react-router-dom';
import { useTracking } from '../lib/hooks/useTracking';
import { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

const Tracking = () => {
  const { trackingCode } = useParams<{ trackingCode: string }>();
  const { trackingData, loading, error } = useTracking(trackingCode || '');
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (!trackingCode) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Refresh data when timer reaches 0
          window.location.reload();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [trackingCode]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-lg">Loading tracking data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <a href="/" className="text-blue-600 hover:text-blue-800">Return to Home</a>
        </div>
      </div>
    );
  }

  if (!trackingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Tracking Code Not Found</h1>
          <p className="text-gray-600 mb-4">The tracking code "{trackingCode}" could not be found.</p>
          <a href="/" className="text-blue-600 hover:text-blue-800">Return to Home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-blue-600 text-white px-6 py-4">
              <h1 className="text-2xl font-bold">Tracking: {trackingCode}</h1>
              <p className="text-blue-100 mt-1">Real-time status updates</p>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <p className="text-lg">{trackingData.category}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reference</label>
                    <p className="text-lg font-mono">{trackingData.reference}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Departure</label>
                    <p className="text-lg">{trackingData.departure}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sorting Center</label>
                    <p className="text-lg">{trackingData.sortingCenter}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Status</label>
                    <div className="mt-2">
                      <span className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${
                        trackingData.currentStatus === 'SORTING' ? 'bg-yellow-100 text-yellow-800' :
                        trackingData.currentStatus === 'IN_TRANSIT' ? 'bg-blue-100 text-blue-800' :
                        trackingData.currentStatus === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {trackingData.currentStatus}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Front URL</label>
                    <a href={trackingData.cardFrontUrl} target="_blank" rel="noopener noreferrer" 
                       className="text-blue-600 hover:text-blue-800 underline">
                      View Card Front
                    </a>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Back URL</label>
                    <a href={trackingData.cardBackUrl} target="_blank" rel="noopener noreferrer" 
                       className="text-blue-600 hover:text-blue-800 underline">
                      View Card Back
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Real-time Updates</h2>
                  <div className="text-sm text-gray-500">
                    Auto-refresh in {timeLeft} seconds
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    <span className="text-sm text-gray-600">Live tracking active</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    This page updates automatically when the tracking status changes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tracking;