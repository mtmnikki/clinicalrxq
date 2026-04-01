interface CheckboxGroupProps {
  options: { value: string; label: string }[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export function CheckboxGroup({ options, selected, onChange }: CheckboxGroupProps) {
  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mt-0.5">
      {options.map((option) => {
        const isChecked = selected.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => toggleOption(option.value)}
            className={`
              flex items-center gap-1.5 cursor-pointer px-2.5 py-1.5
              border font-mono text-[0.72rem] transition-all select-none
              ${isChecked
                ? 'bg-[#1B3460] text-white border-[#1B3460]'
                : 'bg-[#F4EFE5] border-[#DDD5C0] hover:border-[#1A1825] hover:bg-[#EAE3D1]'
              }
            `}
          >
            <span
              className={`
                w-3 h-3 border-[1.5px] flex items-center justify-center shrink-0
                ${isChecked ? 'border-white' : 'border-current'}
              `}
            >
              {isChecked && <span className="text-[9px] font-bold">✓</span>}
            </span>
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
