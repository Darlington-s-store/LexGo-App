import React, { useState } from 'react';
import { Search, ChevronUp, ChevronDown } from 'lucide-react';

const AllResultsView = () => {
  const [activeSubTab, setActiveSubTab] = useState('All Results');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const subTabs = ['All Results', 'Quiz 1', 'Quiz 2', 'Quiz 3', 'Mid Sem', 'Final'];

  const resultsData = [
    { initials: "AC", name: "Adjei Caleb", id: "#12345678", q1: 14, q2: 14, mid: 16, final: 45, grade: "-" },
    { initials: "MM", name: "Mahmoud Mambwe", id: "#12345678", q1: 14, q2: 13, mid: 20, final: 18, grade: "-" },
    { initials: "MA", name: "Mahmoud Ababio", id: "#12345678", q1: 13, q2: 15, mid: 20, final: 20, grade: "-" },
    { initials: "JA", name: "Jawan Adébáyò", id: "#12345678", q1: 10, q2: 9, mid: 17, final: 18, grade: "-" },
    { initials: "TG", name: "Tawana Gbeho", id: "#12345678", q1: 14, q2: 14, mid: 14, final: 20, grade: "-" },
    { initials: "DB", name: "Dalilah Bankole", id: "#12345678", q1: 10, q2: 13, mid: 20, final: 20, grade: "-" },
    { initials: "TO", name: "Tawana Okere", id: "#12345678", q1: 12, q2: 11, mid: 15, final: 38, grade: "-" }
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = resultsData.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.id.includes(searchQuery)
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Sub-tab selection bar */}
      <div className="flex gap-2 pb-2 overflow-x-auto">
        {subTabs.map((subTab) => (
          <button
            key={subTab}
            onClick={() => setActiveSubTab(subTab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 border-0 ${
              activeSubTab === subTab
                ? 'bg-[#0A1128] text-white shadow-2xs'
                : 'bg-[#FAF6F6] text-lexgo-dark hover:bg-gray-100'
            }`}
          >
            {subTab}
          </button>
        ))}
      </div>

      {/* Controls Row */}
      <div className="flex justify-between items-center gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search Student"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-9 pr-4 py-2.5 bg-white text-lexgo-dark border border-gray-100 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-lexgo-dark placeholder-gray-400 shadow-2xs"
          />
          <Search size={14} className="absolute left-3 top-3 text-gray-400" />
        </div>

        {/* Sort Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={() => setSortOrder('asc')}
            className={`w-8 h-8 rounded-lg border border-gray-100 flex items-center justify-center transition cursor-pointer ${
              sortOrder === 'asc' ? 'bg-[#0A1128] text-white' : 'bg-white text-gray-400 hover:text-lexgo-dark'
            }`}
          >
            <ChevronUp size={16} />
          </button>
          <button 
            onClick={() => setSortOrder('desc')}
            className={`w-8 h-8 rounded-lg border border-gray-100 flex items-center justify-center transition cursor-pointer ${
              sortOrder === 'desc' ? 'bg-[#0A1128] text-white' : 'bg-white text-gray-400 hover:text-lexgo-dark'
            }`}
          >
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Matrix Table */}
      <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-2xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase tracking-wider bg-slate-50/50">
              <th className="p-4">Student</th>
              <th className="p-4 text-center">Quiz 1(15)</th>
              <th className="p-4 text-center">Quiz 2(15)</th>
              <th className="p-4 text-center">Midsem(20)</th>
              <th className="p-4 text-center">Final Exam(50)</th>
              <th className="p-4 text-right">Grade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-lexgo-dark font-medium">
            {sortedData.length > 0 ? (
              sortedData.map((row, idx) => {
                const showQ1 = activeSubTab === 'All Results' || activeSubTab === 'Quiz 1';
                const showQ2 = activeSubTab === 'All Results' || activeSubTab === 'Quiz 2';
                const showMid = activeSubTab === 'All Results' || activeSubTab === 'Mid Sem';
                const showFinal = activeSubTab === 'All Results' || activeSubTab === 'Final';

                return (
                  <tr key={idx} className="hover:bg-slate-50/20 transition">
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#0B2545] text-white rounded-full flex items-center justify-center font-bold text-[10px]">
                        {row.initials}
                      </div>
                      <div className="leading-none">
                        <h4 className="font-bold text-lexgo-dark">{row.name}</h4>
                        <span className="text-[9px] text-gray-400 font-semibold block mt-1">{row.id}</span>
                      </div>
                    </td>
                    <td className="p-4 text-center font-semibold text-gray-700">{showQ1 ? row.q1 : '-'}</td>
                    <td className="p-4 text-center font-semibold text-gray-700">{showQ2 ? row.q2 : '-'}</td>
                    <td className="p-4 text-center font-semibold text-gray-700">{showMid ? row.mid : '-'}</td>
                    <td className="p-4 text-center font-semibold text-gray-700">{showFinal ? row.final : '-'}</td>
                    <td className="p-4 text-right font-extrabold text-gray-500">{row.grade}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-400 font-bold">
                  No students found matching "{searchQuery}".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllResultsView;
