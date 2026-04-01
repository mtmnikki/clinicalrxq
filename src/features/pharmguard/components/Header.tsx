import { useState, useEffect } from 'react';

interface HeaderProps {
  pharmacySite: string;
  pharmacistId: string;
  onPharmacySiteChange: (value: string) => void;
  onPharmacistIdChange: (value: string) => void;
}

export function Header({ pharmacySite, pharmacistId, onPharmacySiteChange, onPharmacistIdChange }: HeaderProps) {
  const [localSite, setLocalSite] = useState(pharmacySite);
  const [localRph, setLocalRph] = useState(pharmacistId);

  useEffect(() => {
    const savedSite = localStorage.getItem('pg_site') || '';
    const savedRph = localStorage.getItem('pg_rph') || '';
    setLocalSite(savedSite);
    setLocalRph(savedRph);
    onPharmacySiteChange(savedSite);
    onPharmacistIdChange(savedRph);
  }, [onPharmacySiteChange, onPharmacistIdChange]);

  const handleSiteChange = (value: string) => {
    setLocalSite(value);
    localStorage.setItem('pg_site', value);
    onPharmacySiteChange(value);
  };

  const handleRphChange = (value: string) => {
    setLocalRph(value);
    localStorage.setItem('pg_rph', value);
    onPharmacistIdChange(value);
  };

  return (
    <header className="bg-[#1B3460] text-white border-b-[3px] border-[#1A1825] px-4 sm:px-6 py-3 sm:py-0 sm:h-[62px] sticky top-0 z-50">
      <div className="flex items-center justify-between sm:h-full">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white text-[#1B3460] flex items-center justify-center font-mono font-bold text-xs sm:text-sm tracking-tighter border-2 border-white/40 shadow-[2px_2px_0_rgba(0,0,0,0.3)]">
            Rx
          </div>
          <div>
            <div className="font-serif text-lg sm:text-xl font-bold tracking-wide leading-tight">PharmGuard</div>
            <div className="font-mono text-[0.55rem] sm:text-[0.6rem] tracking-[0.14em] sm:tracking-[0.18em] uppercase opacity-65 mt-px hidden sm:block">
              Intervention Surveillance System
            </div>
          </div>
        </div>
        <div className="w-[7px] h-[7px] rounded-full bg-[#5EE875] shadow-[0_0_0_2px_rgba(94,232,117,0.3)] animate-pulse-custom sm:hidden" title="Live" />
        <div className="hidden sm:flex items-center gap-3">
          <span className="font-mono text-[0.6rem] tracking-[0.14em] uppercase opacity-65 mr-[-6px]">Site ID</span>
          <input
            type="text"
            value={localSite}
            onChange={(e) => handleSiteChange(e.target.value)}
            placeholder="Enter pharmacy name / site"
            maxLength={30}
            className="bg-white/10 border border-white/30 text-white px-2.5 py-1.5 font-mono text-[0.72rem] tracking-wide outline-none w-[210px] placeholder:text-white/50 placeholder:italic"
          />
          <span className="font-mono text-[0.6rem] tracking-[0.14em] uppercase opacity-65 mr-[-6px]">RPh</span>
          <input
            type="text"
            value={localRph}
            onChange={(e) => handleRphChange(e.target.value)}
            placeholder="Initials"
            maxLength={8}
            className="bg-white/10 border border-white/30 text-white px-2.5 py-1.5 font-mono text-[0.72rem] tracking-wide outline-none w-20 placeholder:text-white/50 placeholder:italic"
          />
          <div className="w-[7px] h-[7px] rounded-full bg-[#5EE875] shadow-[0_0_0_2px_rgba(94,232,117,0.3)] animate-pulse-custom" title="Live — multi-site data active" />
        </div>
      </div>
      <div className="flex sm:hidden items-center gap-2 mt-2 pt-2 border-t border-white/20">
        <div className="flex-1 flex items-center gap-1.5">
          <span className="font-mono text-[0.55rem] tracking-[0.1em] uppercase opacity-65 shrink-0">Site</span>
          <input
            type="text"
            value={localSite}
            onChange={(e) => handleSiteChange(e.target.value)}
            placeholder="Site name"
            maxLength={30}
            className="bg-white/10 border border-white/30 text-white px-2 py-1 font-mono text-[0.7rem] tracking-wide outline-none flex-1 min-w-0 placeholder:text-white/50 placeholder:italic"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[0.55rem] tracking-[0.1em] uppercase opacity-65 shrink-0">RPh</span>
          <input
            type="text"
            value={localRph}
            onChange={(e) => handleRphChange(e.target.value)}
            placeholder="Init."
            maxLength={8}
            className="bg-white/10 border border-white/30 text-white px-2 py-1 font-mono text-[0.7rem] tracking-wide outline-none w-14 placeholder:text-white/50 placeholder:italic"
          />
        </div>
      </div>
    </header>
  );
}
