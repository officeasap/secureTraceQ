import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

export default function Home() {
  const [trackingCode, setTrackingCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const code = trackingCode.trim().toUpperCase();

    if (!code) {
      setError('Please enter a tracking code');
      setIsLoading(false);
      return;
    }

    if (code.length < 8) {
      setError('Invalid tracking code format');
      setIsLoading(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      navigate(`/tracking/${code}`);
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-[480px]">
          <div className="securesoft-card depth-5">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="text-4xl font-extrabold tracking-wider text-primary">
                  SecureTrace
                </div>
              </div>
              <p className="text-secondary text-sm uppercase tracking-widest">
                Corporate Verification Portal
              </p>
              <div className="w-12 h-0.5 bg-[#2A2F35] mx-auto mt-4" />
            </div>

            <form onSubmit={handleVerify} className="space-y-5">
              <div>
                <label className="block text-secondary text-xs uppercase tracking-widest mb-2">
                  Tracking Code
                </label>
                <input
                  type="text"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
                  placeholder="e.g., AU-Y0312J9"
                  className="securesoft-input depth-3"
                  autoFocus
                />
                {error && (
                  <p className="text-red-400 text-xs mt-2">{error}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="securesoft-btn depth-4 depth-hover depth-active"
              >
                {isLoading ? 'Verifying...' : 'Verify'}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-[#2A2F35]">
              <div className="flex justify-center gap-4 text-[10px] text-secondary uppercase tracking-widest">
                <span>ISO 27001</span>
                <span className="text-[#2A2F35]">|</span>
                <span>SOC2 Compliant</span>
                <span className="text-[#2A2F35]">|</span>
                <span>Corporate Use Only</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}