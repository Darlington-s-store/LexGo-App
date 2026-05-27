import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';

const RecordsPage = () => {
  const [activeTab, setActiveTab] = useState('Course List');

  const semestersData = [
    {
      title: "LEVEL 400 - 2ND SEM - 26/27",
      courses: [
        { code: "IAW001", name: "Introduction to Law", credits: "3 credit hrs" },
        { code: "IAW002", name: "Evidence Law", credits: "3 credit hrs" },
        { code: "IAW003", name: "Prosperity Law", credits: "3 credit hrs" }
      ]
    },
    {
      title: "LEVEL 400 - 1ST SEM - 26/27",
      courses: [
        { code: "IAW001", name: "Introduction to Law", credits: "3 credit hrs" },
        { code: "IAW002", name: "Evidence Law", credits: "2 credit hrs" },
        { code: "IAW003", name: "Prosperity Law", credits: "3 credit hrs" }
      ]
    },
    {
      title: "LEVEL 300 - 2ND SEM - 25/26",
      courses: [
        { code: "IAW001", name: "Introduction to Law", credits: "3 credit hrs" },
        { code: "IAW002", name: "Evidence Law", credits: "3 credit hrs" },
        { code: "IAW003", name: "Prosperity Law", credits: "3 credit hrs" }
      ]
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Tabs Row */}
      <div className="flex gap-2 pb-4 mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('Course List')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 ${
            activeTab === 'Course List'
              ? 'bg-[#0A1128] text-white shadow-2xs'
              : 'bg-[#FAF6F6] text-lexgo-dark hover:bg-gray-100'
          }`}
        >
          Course List
        </button>
        
        <button
          onClick={() => setActiveTab('Transcript')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 ${
            activeTab === 'Transcript'
              ? 'bg-[#0A1128] text-white shadow-2xs'
              : 'bg-[#FAF6F6] text-lexgo-dark hover:bg-gray-100'
          }`}
        >
          Transcript
        </button>
      </div>

      {activeTab === 'Course List' ? (
        <div className="space-y-6">
          {semestersData.map((semester, idx) => (
            <div key={idx} className="space-y-2.5">
              {/* Semester Header Banner */}
              <div className="bg-[#F4F2F2] rounded-xl px-4 py-3 font-extrabold text-lexgo-dark text-xs sm:text-sm uppercase tracking-wider">
                {semester.title}
              </div>
              
              {/* Course list */}
              <div className="px-4 py-1.5 space-y-4">
                {semester.courses.map((course, cIdx) => (
                  <div key={cIdx} className="flex justify-between items-center text-xs sm:text-sm font-semibold text-lexgo-dark">
                    <span>{course.code} - {course.name}</span>
                    <span className="font-extrabold text-slate-800">{course.credits}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Academic Transcript View */
        <div className="space-y-6 animate-fade-in pr-1">
          {/* Transcript Title and Export Header */}
          <div className="flex justify-between items-center pb-2">
            <h4 className="text-base font-black text-lexgo-dark">Academic Transcript</h4>
            <button className="bg-[#0A1128] text-white text-xs font-bold py-2.5 px-5 rounded-xl flex items-center gap-1.5 hover:bg-opacity-95 transition cursor-pointer shadow-2xs">
              <BookOpen size={14} />
              <span>Export</span>
            </button>
          </div>

          {/* Render Semester tables based on semestersData */}
          {semestersData.map((semester, idx) => (
            <div key={idx} className="space-y-2.5">
              <div className="bg-[#F4F2F2] rounded-xl px-4 py-3 font-extrabold text-lexgo-dark text-xs sm:text-sm uppercase tracking-wider">
                {semester.title}
              </div>
              <div className="px-4">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-150 text-[11px] font-extrabold uppercase text-gray-400 tracking-wider">
                      <th className="py-3 px-2 w-1/4">COURSE CODE</th>
                      <th className="py-3 px-2 w-1/2">COURSE TITLE</th>
                      <th className="py-3 px-2 w-1/8 text-center">CREDIT</th>
                      <th className="py-3 px-2 w-1/8 text-center">GRADE</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs sm:text-sm text-lexgo-dark">
                    {semester.courses.map((course, cIdx) => (
                      <tr key={cIdx} className="border-b border-gray-50/50">
                        <td className="py-4 px-2 font-bold">{course.code}</td>
                        <td className="py-4 px-2 font-semibold">{course.name}</td>
                        <td className="py-4 px-2 font-bold text-center">3</td>
                        <td className="py-4 px-2"></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecordsPage;
