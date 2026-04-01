import { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
}

export function FormField({ label, required, error, children, className = '' }: FormFieldProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="font-mono text-[0.6rem] font-bold tracking-[0.12em] uppercase text-[#3D3B52]">
        {label}
        {required && <span className="text-[#B81818] ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <span className="font-mono text-[0.6rem] text-[#B81818]">{error}</span>
      )}
    </div>
  );
}
