import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  isError?: boolean;
  onClose: () => void;
}

export function Toast({ message, isError = false, onClose }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 250);
    }, 3200);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`
        fixed bottom-6 right-6 bg-[#1A1825] text-white
        font-mono text-[0.75rem] px-4 py-3
        border-2 border-[#1A1825] shadow-[4px_4px_0_#1A1825]
        z-[9999] flex items-center gap-2.5
        transition-all duration-250
        ${visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
      `}
    >
      <div
        className="w-2 h-2 rounded-full shrink-0"
        style={{ backgroundColor: isError ? '#FF6B6B' : '#5EE875' }}
      />
      <span>{message}</span>
    </div>
  );
}
