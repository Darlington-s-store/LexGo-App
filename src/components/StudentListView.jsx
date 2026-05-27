import React, { useState } from 'react';
import { Download, Search } from 'lucide-react';

const StudentListView = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const studentData = [
    { initials: "AC", name: "Adjei Caleb", id: "#12345678", program: "UnderGraduate", stream: "Regular", email: "studentemail.com", phone: "+233 234 567 890", level: "Level 400", status: "Active" },
    { initials: "MM", name: "Mahmoud Mambwe", id: "#12345678", program: "UnderGraduate", stream: "Regular", email: "studentemail.com", phone: "+233 234 567 890", level: "Level 400", status: "Active" },
    { initials: "MA", name: "Mahmoud Ababio", id: "#12345678", program: "UnderGraduate", stream: "Regular", email: "studentemail.com", phone: "+233 234 567 890", level: "Level 400", status: "Active" },
    { initials: "JA", name: "Jawan Adébáyò", id: "#12345678", program: "UnderGraduate", stream: "Regular", email: "studentemail.com", phone: "+233 234 567 890", level: "Level 400", status: "Active" },
    { initials: "TG", name: "Tawana Gbeho", id: "#12345678", program: "UnderGraduate", stream: "Regular", email: "studentemail.com", phone: "+233 234 567 890", level: "Level 400", status: "Active" },
    { initials: "DB", name: "Dalilah Bankole", id: "#12345678", program: "UnderGraduate", stream: "Regular", email: "studentemail.com", phone: "+233 234 567 890", level: "Level 400", status: "Active" }
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = studentData.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.id.includes(searchQuery)
  );

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Export Header row */}
      <div className="flex justify-end">
        <button className="bg-[#0A1128] text-white text-xs font-bold py-2.5 px-5 rounded-xl flex items-center gap-1.5 hover:bg-opacity-95 transition cursor-pointer shadow-2xs border-0">
          <Download size={14} />
          <span>Export Student List</span>
        </button>
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
      </div>

      {/* Student List Table */}
      <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-2xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase tracking-wider bg-slate-50/50">
              <th className="p-4">Student</th>
              <th className="p-4">Program</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone Number</th>
              <th className="p-4">Level</th>
              <th className="p-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-lexgo-dark font-semibold">
            {filteredData.length > 0 ? (
              filteredData.map((row, idx) => (
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
                  <td className="p-4 leading-none">
                    <h4 className="font-bold text-lexgo-dark">{row.program}</h4>
                    <span className="text-[9px] text-gray-400 font-semibold block mt-1">{row.stream}</span>
                  </td>
                  <td className="p-4 text-gray-700 font-medium">{row.email}</td>
                  <td className="p-4 text-gray-700 font-medium">{row.phone}</td>
                  <td className="p-4 text-gray-600 font-bold">{row.level}</td>
                  <td className="p-4 text-right">
                    <span className="bg-[#E2F0D9] text-[#385723] text-[10px] font-bold px-3 py-1 rounded-md">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))
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

export default StudentListView;
