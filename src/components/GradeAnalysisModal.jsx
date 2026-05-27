import React from 'react';
import { X } from 'lucide-react';

const GradeAnalysisModal = ({ item, onClose }) => {
  if (!item) return null;

  // Render the bar chart data based on the mockup exactly:
  // 0-50 (160), 51-60 (120), 61-70 (220), 71-80 (310), 81-90 (150), 91-100 (70)
  const barChartData = [
    { label: '0-50', count: 160, height: '40%' },
    { label: '51-60', count: 120, height: '30%' },
    { label: '61-70', count: 220, height: '55%' },
    { label: '71-80', count: 310, height: '77.5%' },
    { label: '81-90', count: 150, height: '37.5%' },
    { label: '91-100', count: 70, height: '17.5%' }
  ];

  // Pie chart legend categories and colors matching the mockup
  const legendItems = [
    { label: '91-100', color: 'bg-[#14B8A6]' }, // teal (matching the 2.5% slice)
    { label: '81-90', color: 'bg-[#15803D]' },  // dark green (matching the 15.4% slice)
    { label: '71-80', color: 'bg-[#3B82F6]' },  // blue (matching the 32% slice)
    { label: '61-70', color: 'bg-[#22C55E]' },  // lime green (matching the 32% slice)
    { label: '51-60', color: 'bg-[#F97316]' },  // orange (matching the 3.1% slice)
    { label: '0-50', color: 'bg-[#EF4444]' }    // red (matching the 15% slice)
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-fade-in font-sans">
      {/* Backdrop */}
      <div className="absolute inset-0 cursor-default" onClick={onClose} />
      
      <div className="bg-[#F8FAFC] rounded-[24px] max-w-4xl w-full p-8 relative shadow-2xl border border-gray-100 flex flex-col z-10 animate-scale-up max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Analysis</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-slate-600 transition bg-transparent border-0 cursor-pointer p-1.5 hover:bg-slate-100 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-8">
          
          {/* Section 1: Score Graph Distribution */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 tracking-tight">
              Score Graph Distribution for Quiz 1
            </h4>
            
            {/* Grid Chart Container */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <div className="flex gap-2 items-stretch">
                {/* Column 1: Rotated Title */}
                <div className="flex items-center justify-center w-6 mr-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest -rotate-90 whitespace-nowrap origin-center">
                    Number of Students
                  </span>
                </div>
                
                {/* Column 2: Y-axis Numbers */}
                <div className="flex flex-col justify-between text-[11px] text-slate-400 font-semibold py-1 text-right w-8 select-none pr-2">
                  <span>400</span>
                  <span>300</span>
                  <span>200</span>
                  <span>100</span>
                  <span>0</span>
                </div>

                {/* Column 3: Graph Grid Area */}
                <div className="flex-1 flex flex-col">
                  <div className="h-44 relative flex items-end justify-between px-6 border-b border-slate-200 pb-0">
                    {/* Dotted horizontal grid lines corresponding to 400, 300, 200, 100, 0 */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-0">
                      <div className="w-full border-t border-dotted border-slate-200" />
                      <div className="w-full border-t border-dotted border-slate-200" />
                      <div className="w-full border-t border-dotted border-slate-200" />
                      <div className="w-full border-t border-dotted border-slate-200" />
                      <div className="w-full h-0" />
                    </div>

                    {/* Bars */}
                    {barChartData.map((bar, idx) => (
                      <div key={idx} className="w-12 flex flex-col items-center justify-end h-full group/bar relative z-10">
                        {/* Bar fill */}
                        <div 
                          className="w-[18px] bg-[#0A1128] rounded-t-full hover:bg-slate-800 transition-all duration-300 relative shadow-sm"
                          style={{ height: bar.height }}
                        >
                          {/* Tooltip on hover */}
                          <span className="absolute top-[-24px] left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover/bar:opacity-100 transition pointer-events-none whitespace-nowrap z-20 shadow">
                            {bar.count}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* X Axis Labels under each bar */}
                  <div className="flex justify-between px-6 text-[11px] text-slate-400 font-semibold pt-2">
                    {barChartData.map((bar, idx) => (
                      <span key={idx} className="w-12 text-center select-none">{bar.label}</span>
                    ))}
                  </div>

                  {/* X Axis Title */}
                  <div className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-4 select-none">
                    Percentage Score
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Pie Chart Distribution */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 tracking-tight">
              Pie Chart Distribution for Quiz 1
            </h4>

            {/* Pie Chart Card Container */}
            <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-8 sm:gap-12">
              
              {/* Total Students Info block */}
              <div className="space-y-1 w-full sm:w-auto text-center sm:text-left select-none">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Students</p>
                <p className="text-4xl font-black text-slate-950 tracking-tight">200</p>
              </div>

              {/* SVG Custom Pie Chart - Unrotated for correct starting alignment */}
              <div className="relative w-44 h-44 flex items-center justify-center flex-shrink-0">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  {/* Segment 1: Blue (32% = 115.2 deg, starts at 12 o'clock / 50 0) */}
                  <path 
                    d="M 50 50 L 50 0 A 50 50 0 0 1 95.2 71.3 Z" 
                    fill="#3B82F6" 
                  />
                  {/* Segment 2: Dark Green (15.4% = 55.4 deg, cumulative 170.6 deg) */}
                  <path 
                    d="M 50 50 L 95.2 71.3 A 50 50 0 0 1 58.2 99.3 Z" 
                    fill="#15803D" 
                  />
                  {/* Segment 3: Orange (3.1% = 11.2 deg, cumulative 181.8 deg) */}
                  <path 
                    d="M 50 50 L 58.2 99.3 A 50 50 0 0 1 48.4 99.9 Z" 
                    fill="#F97316" 
                  />
                  {/* Segment 4: Teal (2.5% = 9 deg, cumulative 190.8 deg) */}
                  <path 
                    d="M 50 50 L 48.4 99.9 A 50 50 0 0 1 40.6 99.1 Z" 
                    fill="#14B8A6" 
                  />
                  {/* Segment 5: Red (15% = 54 deg, cumulative 244.8 deg) */}
                  <path 
                    d="M 50 50 L 40.6 99.1 A 50 50 0 0 1 4.8 71.3 Z" 
                    fill="#EF4444" 
                  />
                  {/* Segment 6: Lime Green (32% = 115.2 deg, cumulative 360 deg) */}
                  <path 
                    d="M 50 50 L 4.8 71.3 A 50 50 0 0 1 50 0 Z" 
                    fill="#22C55E" 
                  />

                  {/* Text Labels centered inside segments, adjusted coordinates for unrotated orientation */}
                  <text x="75" y="34" fill="white" fontSize="6.5" fontWeight="bold" textAnchor="middle">
                    32%
                  </text>
                  <text x="68" y="74" fill="white" fontSize="6.5" fontWeight="bold" textAnchor="middle">
                    15.4%
                  </text>
                  <text x="32" y="74" fill="white" fontSize="6.5" fontWeight="bold" textAnchor="middle">
                    15%
                  </text>
                  <text x="25" y="34" fill="white" fontSize="6.5" fontWeight="bold" textAnchor="middle">
                    32%
                  </text>
                </svg>
              </div>

              {/* Legend Grid Panel */}
              <div className="grid grid-cols-2 gap-y-3 gap-x-8">
                {legendItems.map((legend, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs font-bold text-slate-500">
                    <span className={`w-3 h-3 rounded-full ${legend.color} inline-block shadow-sm`} />
                    <span>{legend.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeAnalysisModal;

