export const Footer = () => {
  return (
    <footer className="py-4 px-4 sm:px-6 border-t border-[#2A2F35] bg-background">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <span className="text-secondary text-xs">
            © SecureTrace — ISO 27001 Certified · SOC2 Type II
          </span>
          <div className="flex gap-4">
            <a href="#" className="securesoft-link">Terms</a>
            <a href="#" className="securesoft-link">Privacy</a>
            <a href="#" className="securesoft-link">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
};