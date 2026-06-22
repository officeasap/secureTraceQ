interface TrackingTimelineProps {
  departure: string;
  sortingCenter: string;
  currentStatus: 'SORTING' | 'IN TRANSIT' | 'ARRIVED' | 'DELIVERED';
}

export const TrackingTimeline = ({
  departure,
  sortingCenter,
  currentStatus,
}: TrackingTimelineProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SORTING':
        return 'securesoft-status-sorting';
      case 'IN TRANSIT':
        return 'securesoft-status-transit';
      case 'ARRIVED':
      case 'DELIVERED':
        return 'securesoft-status-destination';
      default:
        return 'securesoft-status-sorting';
    }
  };

  return (
    <div className="securesoft-card depth-5">
      <h2 className="tracking-label mb-4">Tracking Timeline</h2>

      <div className="space-y-4">
        <div className="relative pl-4">
          <div className="absolute left-0 top-4 bottom-0 w-px bg-[#2A2F35]" />
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#2A2F35] mt-1.5 flex-shrink-0" />
            <div>
              <p className="tracking-label">DEPARTURE</p>
              <p className="tracking-value">{departure}</p>
            </div>
          </div>
        </div>

        <div className="relative pl-4">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#D97A0C] mt-1.5 flex-shrink-0" />
            <div>
              <p className="tracking-label">SORTING</p>
              <p className="tracking-value-sorting">{sortingCenter}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-[#2A2F35]">
        <div className="flex justify-between items-center">
          <p className="tracking-label">Status</p>
          <span className={`securesoft-status ${getStatusColor(currentStatus)}`}>
            {currentStatus}
          </span>
        </div>
      </div>
    </div>
  );
};