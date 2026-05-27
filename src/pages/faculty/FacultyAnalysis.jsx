import React from 'react';
import { BarChart3, TrendingUp, Award, CheckCircle } from 'lucide-react';

const FacultyAnalysis = () => {
  // SVG distribution data
  const chartBars = [
    { label: "Level 100", height: "h-36", percent: "3.2 GPA", color: "bg-[#0A1128]" },
    { label: "Level 200", height: "h-40", percent: "3.4 GPA", color: "bg-[#0A1128]" },
    { label: "Level 300", height: "h-44", percent: "3.5 GPA", color: "bg-indigo-600" },
    { label: "Level 400", height: "h-48", percent: "3.7 GPA", color: "bg-indigo-600" }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-extrabold text-lexgo-dark">Faculty Performance Analysis</h1>
        <p className="text-gray-500 text-sm font-medium">Evaluate academic achievements, average GPAs, and performance across cohorts</p>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* GPA Cohort Distribution */}
        <div className="lg:col-span-8 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-extrabold text-lexgo-dark text-base">Average GPA by Level</h3>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md flex items-center gap-1">
              <TrendingUp size={12} />
              +1.5% overall increase
            </span>
          </div>

          {/* Dotted horizontal gridlines */}
          <div className="relative pt-6 pb-2">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none h-48 border-b border-gray-100">
              <div className="w-full border-t border-dashed border-gray-100" />
              <div className="w-full border-t border-dashed border-gray-100" />
              <div className="w-full border-t border-dashed border-gray-100" />
              <div className="w-full border-t border-dashed border-gray-100" />
            </div>

            {/* Bars */}
            <div className="relative z-10 flex items-end justify-around h-48 px-4">
              {chartBars.map((bar, idx) => (
                <div key={idx} className="flex flex-col items-center gap-3 w-16 group relative">
                  <div className="absolute -top-8 bg-lexgo-dark text-white text-[10px] font-extrabold px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition duration-150 shadow-xs pointer-events-none">
                    {bar.percent}
                  </div>
                  <div className={`w-10 sm:w-12 ${bar.height} ${bar.color} rounded-t-xl transition-all duration-300 group-hover:opacity-90`} />
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider text-center">{bar.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Grade Breakdowns */}
        <div className="lg:col-span-4 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-6">
          <h3 className="font-extrabold text-lexgo-dark text-base">Performance Breakdown</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                <span className="text-xs font-bold text-lexgo-dark">First Class Honours</span>
              </div>
              <span className="text-xs font-extrabold text-gray-600">32%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-indigo-500 rounded-full" />
                <span className="text-xs font-bold text-lexgo-dark">Second Class Upper</span>
              </div>
              <span className="text-xs font-extrabold text-gray-600">45%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-500 rounded-full" />
                <span className="text-xs font-bold text-lexgo-dark">Second Class Lower</span>
              </div>
              <span className="text-xs font-extrabold text-gray-600">18%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-rose-500 rounded-full" />
                <span className="text-xs font-bold text-lexgo-dark">Third Class / Pass</span>
              </div>
              <span className="text-xs font-extrabold text-gray-600">5%</span>
            </div>
          </div>

          <div className="bg-[#FAF6F6] rounded-2xl p-4 border border-gray-50 flex items-center gap-3">
            <Award className="text-amber-500 shrink-0" size={24} />
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-lexgo-dark">Excellent Performance</h4>
              <p className="text-[10px] text-gray-500 leading-normal font-semibold">LL.B cohort shows a positive trend in Contract Law GPA indexes.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyAnalysis;
