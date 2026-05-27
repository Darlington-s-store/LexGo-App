import React, { useState } from 'react';
import { Calendar, BarChart2 } from 'lucide-react';
import GradeAnalysisModal from './GradeAnalysisModal';

const GradeBookView = () => {
  const [selectedGrade, setSelectedGrade] = useState(null);

  const grades = [
    {
      id: 1,
      title: 'Quiz 1: Intro to Law',
      dueDate: 'Due October 28,2025',
      score: '19/20',
      percentage: '99%'
    },
    {
      id: 2,
      title: 'Assignment 2: Evidence Law 1',
      dueDate: 'Due October 27,2025',
      score: '18/20',
      percentage: '99%'
    },
    {
      id: 3,
      title: 'Assignment 3: Evidence Law 2',
      dueDate: 'Due October 26,2025',
      score: '-/20',
      percentage: '--'
    },
    {
      id: 4,
      title: 'Assignment 3: Evidence Law 2',
      dueDate: 'Due October 25,2025',
      score: '-/20',
      percentage: '--'
    },
    {
      id: 5,
      title: 'Assignment 4: Evidence Law 3',
      dueDate: 'Due October 24,2025',
      score: '-/20',
      percentage: '--'
    }
  ];

  return (
    <div className="space-y-4 font-sans">
      {grades.map((item) => (
        <div 
          key={item.id}
          className="bg-white border border-gray-100 rounded-[20px] p-5 shadow-sm hover:border-gray-300 hover:shadow-md transition duration-150 flex items-center justify-between select-none"
        >
          {/* Left Side: Title & Due Date */}
          <div>
            <h4 className="text-sm sm:text-base font-black text-black leading-tight tracking-tight">
              {item.title}
            </h4>
            <div className="text-[10px] text-gray-400 font-semibold mt-1.5 flex items-center gap-1.5">
              <Calendar size={12} className="text-gray-400" />
              <span>{item.dueDate}</span>
            </div>
          </div>

          {/* Right Side: Score & Percentage */}
          <div className="flex flex-col items-end">
            <button 
              onClick={() => setSelectedGrade(item)}
              className="flex items-center gap-1.5 text-sm sm:text-base font-black text-black hover:text-sky-600 transition cursor-pointer bg-transparent border-0 p-0"
              title="View Grade Analysis"
            >
              <span>{item.score}</span>
              <BarChart2 size={16} className="text-slate-900" />
            </button>
            
            <div className="text-[10px] sm:text-xs font-black mt-1">
              {item.percentage === '--' ? (
                <span className="text-gray-400">--</span>
              ) : (
                <span className="text-emerald-600 bg-emerald-50/50 px-2 py-0.5 rounded-full border border-emerald-100/30">
                  {item.percentage}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Grade Analysis Modal Overlay */}
      {selectedGrade && (
        <GradeAnalysisModal 
          item={selectedGrade} 
          onClose={() => setSelectedGrade(null)} 
        />
      )}
    </div>
  );
};

export default GradeBookView;
