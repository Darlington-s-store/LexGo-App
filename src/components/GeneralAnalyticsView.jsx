import React from 'react';

const BarChart = ({ data }) => {
  const maxVal = 400;
  
  return (
    <div className="flex gap-4 items-stretch relative min-h-[220px] max-w-sm w-full pt-4 pl-12 pb-6">
      {/* Y-axis Label */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 origin-left text-[9px] font-extrabold text-gray-400 uppercase tracking-wider select-none whitespace-nowrap">
        Number of Students
      </div>

      {/* Y-axis values */}
      <div className="flex flex-col justify-between text-[10px] font-extrabold text-gray-400 h-[160px] pr-2 select-none text-right w-8">
        <span>400</span>
        <span>300</span>
        <span>200</span>
        <span>100</span>
        <span>0</span>
      </div>

      {/* Graph Area */}
      <div className="flex-1 flex flex-col justify-between relative h-[160px]">
        {/* Gridlines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          <div className="w-full border-t border-dashed border-gray-100" />
          <div className="w-full border-t border-dashed border-gray-100" />
          <div className="w-full border-t border-dashed border-gray-100" />
          <div className="w-full border-t border-dashed border-gray-100" />
          <div className="w-full border-b border-slate-200" />
        </div>

        {/* Bars Container */}
        <div className="absolute inset-0 flex items-end justify-around px-2">
          {data.map((bar, idx) => {
            const heightPct = (bar.value / maxVal) * 100;
            return (
              <div key={idx} className="flex flex-col items-center gap-2 w-8 group relative z-10">
                {/* Tooltip */}
                <div className="absolute -top-7 bg-lexgo-dark text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition duration-150 shadow-xs pointer-events-none whitespace-nowrap z-50">
                  {bar.value} students
                </div>
                {/* Bar */}
                <div 
                  className="w-5 bg-[#0A1128] rounded-t-xs hover:opacity-85 transition duration-200" 
                  style={{ height: `${heightPct}%` }}
                />
                <span className="text-[10px] font-extrabold text-lexgo-dark select-none mt-1">{bar.label}</span>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* X-axis Label */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 text-[9px] font-extrabold text-gray-400 uppercase tracking-wider select-none">
        Percentage Score
      </div>
    </div>
  );
};

const PieChart = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 max-w-md w-full">
      <div className="relative w-40 h-40 shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Blue (C) */}
          <path d="M50,50 L90,50 A40,40 0 0,1 37.6,88 L50,50 Z" fill="#3B82F6" />
          {/* Light Green (D) */}
          <path d="M50,50 L37.6,88 A40,40 0 0,1 17.6,26.5 L50,50 Z" fill="#4CD964" />
          {/* Red (A) */}
          <path d="M50,50 L17.6,26.5 A40,40 0 0,1 50,10 L50,50 Z" fill="#EF4444" />
          {/* Teal (F) */}
          <path d="M50,50 L50,10 A40,40 0 0,1 73.5,17.6 L50,50 Z" fill="#0D9488" />
          {/* Orange (E) */}
          <path d="M50,50 L73.5,17.6 A40,40 0 0,1 85.3,26.5 L50,50 Z" fill="#F2994A" />
          {/* Dark Green (B+) */}
          <path d="M50,50 L85.3,26.5 A40,40 0 0,1 90,50 L50,50 Z" fill="#15803D" />

          {/* Labels on top of slices */}
          <text x="65" y="52" fill="white" fontSize="4" fontWeight="black" textAnchor="middle">32%</text>
          <text x="35" y="58" fill="white" fontSize="4" fontWeight="black" textAnchor="middle">32%</text>
          <text x="36" y="32" fill="white" fontSize="4" fontWeight="black" textAnchor="middle">15%</text>
          <text x="56" y="24" fill="white" fontSize="4" fontWeight="black" textAnchor="middle">14.3%</text>
          <text x="68" y="34" fill="white" fontSize="4" fontWeight="black" textAnchor="middle">8.0%</text>
          <text x="73" y="44" fill="white" fontSize="4" fontWeight="black" textAnchor="middle">15.4%</text>
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-2 text-xs font-semibold text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
          <span>A</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#15803D]" />
          <span>B+</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#3B82F6]" />
          <span>C</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#4CD964]" />
          <span>D</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#F2994A]" />
          <span>E</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
          <span>F</span>
        </div>
      </div>
    </div>
  );
};

const GeneralAnalyticsView = () => {
  const barChartData = [
    { label: "A", value: 160 },
    { label: "B+", value: 120 },
    { label: "C", value: 220 },
    { label: "D", value: 310 },
    { label: "E", value: 160 },
    { label: "F", value: 70 }
  ];

  return (
    <div className="space-y-8 animate-fade-in max-h-[60vh] overflow-y-auto pr-2">
      {/* 1. Overall Grading Section */}
      <div className="space-y-4">
        <div>
          <h4 className="text-base font-black text-lexgo-dark">Overall Grading</h4>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Bar Chart Block */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-lexgo-dark block">Bar chart Distribution for Final Exam</span>
            <BarChart data={barChartData} />
          </div>

          {/* Pie Chart Block */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-lexgo-dark block">Graph Distribution for Final Exam</span>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-gray-400 block">Total Students</span>
              <span className="text-xl font-extrabold text-lexgo-dark block">200</span>
            </div>
            <PieChart />
          </div>
        </div>
      </div>

      {/* 2. Final Exams Section */}
      <div className="space-y-4 pt-6 border-t border-gray-100">
        <div>
          <h4 className="text-base font-black text-lexgo-dark">Final Exams</h4>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Bar Chart Block */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-lexgo-dark block">Bar chart Distribution for Final Exam</span>
            <BarChart data={barChartData} />
          </div>

          {/* Pie Chart Block */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-lexgo-dark block">Graph Distribution for Final Exam</span>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-gray-400 block">Total Students</span>
              <span className="text-xl font-extrabold text-lexgo-dark block">200</span>
            </div>
            <PieChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralAnalyticsView;
