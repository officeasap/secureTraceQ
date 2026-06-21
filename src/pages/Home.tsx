import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { useAuth } from '../lib/hooks/useAuth';
import { useTracking } from '../lib/hooks/useTracking';
import { auditService } from '../lib/services/audit.service';
import { supabase } from '../lib/supabase';

const Home = () => {
  const navigate = useNavigate();
  const {
    isAuthenticated,
    token,
    remainingAttempts,
    isLocked,
    lockoutTimer,
    verify,
    logout,
  } = useAuth();

  const [trackingCode, setTrackingCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [trackingInfo, setTrackingInfo] = useState(null);

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

    // Rate limiting check (placeholder IP)
    const ip = '127.0.0.1';
    const isLockedOut = await (async () => {
      const { isLockedOut } = await import('../lib/services/auth.service');
      return await isLockedOut(ip);
    })();

    if (isLockedOut) {
      setError('Account locked due to too many failed attempts. Try again later.');
      setIsLoading(false);
      return;
    }

    try {
      const result = await verify(code);
      if (result.success) {
        // Log audit entry
        await auditService.logVerificationAttempt({
          trackingCode: code,
          ipAddress: ip,
          userAgent: 'web',
          complianceTag: 'NAME-LAW-SECURETRACE',
        });

        // Navigate to tracking page
        navigate(`/tracking/${code}`);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Lockout timer countdown
  useEffect(() => {
    let interval = 0;
    if (isLocked) {
      interval = setInterval(() => {
        setLockoutTimer(prev => Math.max(prev - 1, 0));
        if (lockoutTimer <= 0) {
          // Auto‑unlock after timer ends (optional)
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLocked, lockoutTimer]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-[480px]">
          <div className="securesoft-card depth-5">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="text-4xl font-extrabold tracking-wider text-primary">SecureTrace</div>
              </div>
              <p className="text-secondary text-sm uppercase tracking-widest">Corporate Verification Portal</p>
              <div className="w-12 h-0.5 bg-[#2A2F35] mx-auto mt-4" />
            </div>

            <form onSubmit={handleVerify} className="space-y-5">
              <div>
                <label className="block text-secondary text-xs uppercase tracking-widest mb-2"> Tracking Code </label>
                <input
                  type="text"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
                  placeholder="e.g., AU-Y0312J9"
                  className="securesoft-input depth-3"
                  autoFocus
                />
                {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading || isLocked}
                className="securesoft-btn depth-4 depth-hover depth-active text-sm"
              >
                {isLoading ? 'Verifying...' : isLocked ? 'Locked Out' : 'Verify'}
              </button>
            </form>

            {/* Rate limit UI */}
            <div className="mt-4 text-secondary text-xs tracking-widest">
              Attempts left: {remainingAttempts}/5
            </div>

            {/* Lockout timer */}
            {isLocked && (
              <div className="mt-2 text-sm text-[#2A2F35]">
                Locked out for {lockoutTimer} seconds
              </div>
            )}

            {/* Audit logging note */}
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
};

export default Home;