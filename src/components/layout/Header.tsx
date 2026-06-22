import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="py-4 px-4 sm:px-6 border-b border-[#2A2F35] bg-background">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">
        <Link to="/" className="flex flex-col">
          <span className="securesoft-logo">SecureTrace</span>
          <span className="securesoft-logo-sub">Corporate Verification Portal</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-secondary text-xs hidden sm:block">
            ISO 27001 · SOC2
          </span>
          <div className="w-2 h-2 rounded-full bg-[#1F7A3B] animate-pulse-subtle" />
        </div>
      </div>
    </header>
  );
};