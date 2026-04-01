interface KPICardProps {
  label: string;
  value: string | number;
  subtitle: string;
  color: 'blue' | 'green' | 'amber' | 'red';
  isDollar?: boolean;
}

const colorMap = {
  blue: 'before:bg-[#1B3460]',
  green: 'before:bg-[#1A6B38]',
  amber: 'before:bg-[#B07018]',
  red: 'before:bg-[#B81818]'
};

export function KPICard({ label, value, subtitle, color, isDollar }: KPICardProps) {
  return (
    <div
      className={`
        bg-white/60 border-2 border-[#1A1825] shadow-[3px_3px_0_#1A1825] sm:shadow-[4px_4px_0_#1A1825]
        px-2.5 sm:px-4 pt-2.5 sm:pt-4 pb-2 sm:pb-3.5 relative overflow-hidden
        before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1
        ${colorMap[color]}
      `}
    >
      <div className="font-mono text-[0.5rem] sm:text-[0.58rem] font-bold tracking-[0.1em] sm:tracking-[0.14em] uppercase text-[#888099] mb-1 sm:mb-2">
        {label}
      </div>
      <div className="font-mono text-[1.5rem] sm:text-[2.1rem] font-bold text-[#1A1825] leading-none tracking-tight">
        {isDollar && <span className="text-xs sm:text-base align-top mt-0.5 sm:mt-1.5 inline-block mr-0.5">$</span>}
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      <div className="font-sans text-[0.6rem] sm:text-[0.7rem] text-[#888099] mt-1 sm:mt-1.5">{subtitle}</div>
    </div>
  );
}
