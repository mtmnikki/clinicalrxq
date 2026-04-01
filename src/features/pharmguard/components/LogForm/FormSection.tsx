import { ReactNode } from 'react';

interface FormSectionProps {
  number: string;
  title: string;
  description: string;
  children: ReactNode;
}

export function FormSection({ number, title, description, children }: FormSectionProps) {
  return (
    <div className="bg-white/55 border-2 border-[#1A1825] shadow-[3px_3px_0_#1A1825] sm:shadow-[4px_4px_0_#1A1825] p-3 sm:p-5 mb-3 sm:mb-5">
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4 pb-2 border-b-2 border-[#1A1825]">
        <div className="font-mono text-[0.6rem] sm:text-[0.65rem] font-bold text-white bg-[#1A1825] px-1.5 sm:px-2 py-0.5 tracking-wide shrink-0">
          {number}
        </div>
        <div className="font-serif text-sm sm:text-base font-bold tracking-tight">{title}</div>
        <div className="text-[0.7rem] sm:text-[0.78rem] text-[#888099] italic w-full sm:w-auto sm:ml-auto mt-1 sm:mt-0">{description}</div>
      </div>
      {children}
    </div>
  );
}
