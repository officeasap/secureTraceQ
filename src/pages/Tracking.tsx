import { useParams } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { CardViewer } from '../components/card/CardViewer';
import { TrackingTimeline } from '../components/tracking/TrackingTimeline';
import { EmailModule } from '../components/email/EmailModule';

export default function Tracking() {
  const { code } = useParams<{ code: string }>();

  const mockTrackingData = {
    trackingCode: code || 'AU-Y0312J9',
    category: 'CLASSIC CATEGORIE',
    reference: 'NT903147',
    cardFront: '/assets/card-front.png',
    cardBack: '/assets/card-back.png',
    departure: 'Bole | Addis Ababa',
    sortingCenter: 'Addis Ababa Sorting Center',
    currentStatus: 'SORTING' as const,
  };

  return (
    <div className="min-h-screen bg-[#303131] flex flex-col">
      <Header />

      <main className="flex-1 px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <CardViewer
                frontImage={mockTrackingData.cardFront}
                backImage={mockTrackingData.cardBack}
                category={mockTrackingData.category}
                reference={mockTrackingData.reference}
              />
            </div>

            <div className="space-y-6">
              <TrackingTimeline
                departure={mockTrackingData.departure}
                sortingCenter={mockTrackingData.sortingCenter}
                currentStatus={mockTrackingData.currentStatus}
              />

              <EmailModule trackingCode={mockTrackingData.trackingCode} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}