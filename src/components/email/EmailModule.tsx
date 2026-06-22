import { useState } from 'react';

interface EmailModuleProps {
  trackingCode: string;
}

export const EmailModule = ({ trackingCode }: EmailModuleProps) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setIsSubscribed(true);
      setEmail('');
    } catch (err) {
      setError('Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className="securesoft-card depth-5">
        <div className="text-center py-4">
          <div className="text-3xl mb-3">✓</div>
          <p className="text-primary font-medium">Subscribed</p>
          <p className="text-secondary text-xs mt-1">
            You'll receive updates for {trackingCode}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="securesoft-card depth-5">
      <h2 className="tracking-label mb-3">Email for Delivery Updates</h2>

      <form onSubmit={handleSubscribe} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className="securesoft-input depth-3 text-sm"
        />
        {error && (
          <p className="text-red-400 text-xs">{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="securesoft-btn depth-4 depth-hover depth-active text-sm"
        >
          {isLoading ? 'Sending...' : 'Send Email'}
        </button>

        <div className="space-y-1">
          <p className="text-[#c8dff9] text-[12px] leading-relaxed">
  We respect your privacy. Your email will only be used to send delivery
  status updates for this tracking code. You may unsubscribe at any time.
</p>

          <p className="text-[#c8dff9] text-[12px] leading-relaxed">
            No spam, ever.
          </p>
        </div>
      </form>
    </div>
  );
};