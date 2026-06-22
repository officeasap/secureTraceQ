import { useState } from 'react';

interface CardViewerProps {
  frontImage: string;
  backImage: string;
  category: string;
  reference: string;
}

export const CardViewer = ({
  frontImage,
  backImage,
  category,
  reference,
}: CardViewerProps) => {
  const [isFront, setIsFront] = useState(true);
  const [scale, setScale] = useState(1);

  const zoomIn = () => setScale(Math.min(scale + 0.25, 3.5));
  const zoomOut = () => setScale(Math.max(scale - 0.25, 1));
  const resetZoom = () => setScale(1);

  return (
    <div className="securesoft-card depth-5">
      <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
        <div>
          <p className="text-secondary text-[10px] uppercase tracking-widest">
            {category}
          </p>
          <p className="text-primary font-semibold text-lg tracking-wide">
            {reference}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsFront(true)}
            className={`px-4 py-1.5 text-xs font-medium uppercase tracking-wider rounded-lg transition-all duration-200 ${
              isFront ? 'bg-element text-primary depth-3' : 'text-secondary hover:text-primary'
            }`}
          >
            Front
          </button>
          <button
            onClick={() => setIsFront(false)}
            className={`px-4 py-1.5 text-xs font-medium uppercase tracking-wider rounded-lg transition-all duration-200 ${
              !isFront ? 'bg-element text-primary depth-3' : 'text-secondary hover:text-primary'
            }`}
          >
            Back
          </button>
        </div>
      </div>

      <div className="relative aspect-[1.4/1] bg-[#0F1114] rounded-xl overflow-hidden flex items-center justify-center depth-3">
        <div
          className="transition-transform duration-300 ease-out"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'center',
          }}
        >
          <img
            src={isFront ? frontImage : backImage}
            alt={isFront ? 'Card Front' : 'Card Back'}
            className="w-full h-full object-contain max-h-[280px]"
            draggable={false}
          />
        </div>

        <div className="absolute bottom-3 right-3 flex gap-2">
          <button
            onClick={zoomOut}
            className="w-8 h-8 rounded-lg bg-element text-primary depth-3 hover:bg-[#2A2F35] transition-all duration-200 text-sm flex items-center justify-center"
          >
            −
          </button>
          <button
            onClick={resetZoom}
            className="w-8 h-8 rounded-lg bg-element text-primary depth-3 hover:bg-[#2A2F35] transition-all duration-200 text-xs flex items-center justify-center"
          >
            ⟲
          </button>
          <button
            onClick={zoomIn}
            className="w-8 h-8 rounded-lg bg-element text-primary depth-3 hover:bg-[#2A2F35] transition-all duration-200 text-sm flex items-center justify-center"
          >
            +
          </button>
        </div>

        <div className="absolute bottom-3 left-3 text-secondary text-[10px] font-mono">
          {scale.toFixed(1)}x
        </div>
      </div>

      <div className="mt-3 flex justify-center text-secondary text-[10px] uppercase tracking-widest">
        {isFront ? 'Front View' : 'Back View'}
        <span className="mx-2 text-[#2A2F35]">|</span>
        Double-tap to reset
      </div>
    </div>
  );
};