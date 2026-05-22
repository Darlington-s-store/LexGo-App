import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';

const RecordsPage = () => {
  const [activeTab, setActiveTab] = useState('Course List');

  const semestersData = [];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Tabs Row */}
      <div className="flex gap-4 items-center mb-6">
        <button
          onClick={() => setActiveTab('Course List')}
          className={`px-4 py-2 text-sm font-bold rounded-lg transition duration-150 cursor-pointer ${
            activeTab === 'Course List'
              ? 'bg-lexgo-dark text-white shadow-sm'
              : 'text-gray-500 hover:text-lexgo-dark bg-transparent'
          }`}
        >
          Course List
        </button>
        
        <button
          onClick={() => setActiveTab('Transcript')}
          className={`px-4 py-2 text-sm font-bold rounded-lg transition duration-150 cursor-pointer ${
            activeTab === 'Transcript'
              ? 'bg-lexgo-dark text-white shadow-sm'
              : 'text-gray-500 hover:text-lexgo-dark bg-transparent'
          }`}
        >
          Transcript
        </button>
      </div>

      {activeTab === 'Course List' ? (
        <div className="space-y-6">
          {semestersData.length === 0 ? (
            <div className="flex flex-col items-center justify-center bg-white border border-gray-100 rounded-3xl p-12 text-center shadow-sm">
              <div className="w-16 h-16 bg-[#FAF6F6] rounded-full flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-lexgo-dark" />
              </div>
              <h3 className="text-lg font-bold text-lexgo-dark mb-1">No Courses Registered</h3>
              <p className="text-gray-400 max-w-sm text-sm">
                You have not registered for any courses yet. When you enroll in courses, they will appear here.
              </p>
            </div>
          ) : (
            semestersData.map((semester, idx) => (
              <div key={idx} className="space-y-2">
                {/* Semester Header Banner */}
                <div className="w-full bg-[#FAF6F6] px-5 py-3 rounded-xl font-bold text-lexgo-dark text-sm sm:text-base tracking-wide shadow-sm">
                  {semester.title}
                </div>
                
                {/* Course list */}
                <div className="divide-y divide-gray-50/50 bg-white px-5 rounded-2xl border border-gray-100 shadow-sm">
                  {semester.courses.map((course, cIdx) => (
                    <div key={cIdx} className="flex justify-between items-center py-4 text-sm sm:text-base">
                      <span className="text-gray-700 font-medium">
                        {course.code} - {course.name}
                      </span>
                      <span className="text-lexgo-dark font-semibold">
                        {course.credits}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        /* Academic Transcript View */
        <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          {/* Transcript Header info */}
          <div className="flex flex-col sm:flex-row justify-between gap-6 border-b border-gray-100 pb-6">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-lexgo-dark">Official Academic Transcript</h3>
              <p className="text-sm text-gray-400 font-medium">LexGo School of Jurisprudence</p>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs sm:text-sm text-gray-600">
              <div><span className="font-bold text-lexgo-dark">Student ID:</span> LXG-2026-9810</div>
              <div><span className="font-bold text-lexgo-dark">Enrollment Year:</span> 2024</div>
              <div><span className="font-bold text-lexgo-dark">Program:</span> LL.B. (Bachelor of Laws)</div>
              <div><span className="font-bold text-lexgo-dark">Standing:</span> N/A</div>
            </div>
          </div>

          {/* Transcript summary scores */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-center">
              <span className="text-xs text-gray-400 font-bold uppercase block mb-1">Cumulative GPA</span>
              <span className="text-3xl font-extrabold text-lexgo-dark">0.00 / 4.00</span>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-center">
              <span className="text-xs text-gray-400 font-bold uppercase block mb-1">Earned Credits</span>
              <span className="text-3xl font-extrabold text-lexgo-dark">0 Hrs</span>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-center">
              <span className="text-xs text-gray-400 font-bold uppercase block mb-1">Status</span>
              <span className="text-3xl font-extrabold text-gray-400">N/A</span>
            </div>
          </div>

          {/* Detailed Course Grades */}
          <div className="space-y-4 pt-4">
            <h4 className="font-bold text-lexgo-dark text-base border-b border-gray-50 pb-2">Academic Grade Sheets</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 font-bold">
                    <th className="py-2.5">Code</th>
                    <th className="py-2.5">Course Name</th>
                    <th className="py-2.5 text-center">Grade</th>
                    <th className="py-2.5 text-right">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-gray-700">
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-gray-400 font-medium">
                      No academic records available.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecordsPage;
