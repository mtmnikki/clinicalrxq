interface BarChartProps {
  data: { label: string; count: number; color: string }[];
  emptyMessage?: string;
}

export function BarChart({ data, emptyMessage = 'No data yet.' }: BarChartProps) {
  if (!data.length) {
    return (
      <div className="text-center py-8 sm:py-12 px-4 sm:px-6 font-serif text-[#888099] italic text-[0.85rem] sm:text-[0.9rem] border-2 border-dashed border-[#DDD5C0]">
        {emptyMessage}
      </div>
    );
  }

  const maxCount = Math.max(...data.map((d) => d.count));

  return (
    <div className="flex flex-col gap-1.5 sm:gap-2">
      {data.map((item, idx) => (
        <div key={idx} className="flex items-center gap-1.5 sm:gap-2">
          <div
            className="font-mono text-[0.58rem] sm:text-[0.65rem] text-[#3D3B52] w-20 sm:w-28 shrink-0"
            title={item.label}
          >
            {item.label}
          </div>
          <div className="flex-1 h-[14px] sm:h-[18px] bg-[#EAE3D1] border border-[#DDD5C0] relative overflow-hidden">
            <div
              className="absolute left-0 top-0 bottom-0 transition-all duration-500"
              style={{
                width: `${(item.count / maxCount) * 100}%`,
                backgroundColor: item.color
              }}
            />
          </div>
          <div className="font-mono text-[0.58rem] sm:text-[0.65rem] font-bold text-[#1A1825] w-6 sm:w-7 text-right shrink-0">
            {item.count}
          </div>
        </div>
      ))}
    </div>
  );
}
