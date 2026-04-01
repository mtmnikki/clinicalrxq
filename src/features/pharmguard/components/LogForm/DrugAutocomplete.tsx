import { useState, useRef, useEffect } from 'react';
import { useDrugSearch } from '../../hooks/useDrugSearch';

interface DrugAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (drugName: string) => void;
  placeholder?: string;
  hasError?: boolean;
}

export function DrugAutocomplete({
  value,
  onChange,
  onSelect,
  placeholder = 'Begin typing drug name...',
  hasError
}: DrugAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { results, searchDrugs, clearResults } = useDrugSearch();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    searchDrugs(newValue);
    setIsOpen(true);
  };

  const handleSelect = (drugName: string) => {
    onChange(drugName);
    onSelect(drugName);
    setIsOpen(false);
    clearResults();
  };

  return (
    <div ref={wrapperRef} className="relative">
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={() => results.length > 0 && setIsOpen(true)}
        placeholder={placeholder}
        autoComplete="off"
        className={`
          font-mono text-[0.82rem] text-[#1A1825] bg-[#F4EFE5]
          border-2 border-[#1A1825] px-2.5 py-2 outline-none w-full
          transition-shadow focus:shadow-[2px_2px_0_#1A1825] focus:border-[#254FA0]
          ${hasError ? 'border-[#B81818] bg-[#FAEAEA]' : ''}
        `}
      />
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-0.5 bg-[#F4EFE5] border-2 border-[#1A1825] shadow-[4px_4px_0_#1A1825] z-50 max-h-[200px] overflow-y-auto">
          {results.map((result, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelect(result.name)}
              className="w-full px-2.5 py-2 font-mono text-[0.78rem] text-left cursor-pointer border-b border-[#EAE3D1] last:border-b-0 flex items-center gap-2 hover:bg-[#EAF0FD]"
            >
              <span className="text-[0.6rem] bg-[#0A6B72] text-white px-1 py-px tracking-wide shrink-0">
                RxNorm
              </span>
              {result.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
