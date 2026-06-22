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
        <img
          src={isFront ? frontImage : backImage}
          alt={isFront ? 'Card Front' : 'Card Back'}
          className="w-full h-full object-contain max-h-[280px]"
          draggable={false}
        />
      </div>

      <div className="mt-3 flex justify-center text-secondary text-[10px] uppercase tracking-widest">
        {isFront ? 'Front View' : 'Back View'}
      </div>
    </div>
  );
};