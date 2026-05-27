import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

const FacultyAuditLog = () => {
  const [logs, setLogs] = useState([
    {
      timestamp: "2026-02-16 10:30 AM",
      user: "Dr.John Smith",
      role: "Dean",
      action: "Uploaded syllabus for LAW200",
      category: "Students"
    },
    {
      timestamp: "2026-02-16 10:30 AM",
      user: "Dr.Mike Quaye",
      role: "Lecturer",
      action: "Uploaded Quiz",
      category: "Courses"
    },
    {
      timestamp: "2026-02-16 10:30 AM",
      user: "Dr.John Smith",
      role: "Dean",
      action: "Created Law001:Introduction to Law",
      category: "Courses"
    },
    {
      timestamp: "2026-02-16 10:30 AM",
      user: "Dr.John Smith",
      role: "Dean",
      action: "Exported Student performance report",
      category: "Reports"
    },
    {
      timestamp: "2026-02-16 10:30 AM",
      user: "Dr.John Smith",
      role: "Dean",
      action: "Uploaded syllabus for LAW200",
      category: "Students"
    },
    {
      timestamp: "2026-02-16 10:30 AM",
      user: "Mr.mark Coffie",
      role: "Admin",
      action: "changed student status to Active",
      category: "Students"
    },
    {
      timestamp: "2026-02-16 10:30 AM",
      user: "Dr.Adam Adjei",
      role: "Exam Officer",
      action: "Approved Exam results",
      category: "Exams"
    },
    {
      timestamp: "2026-02-16 10:30 AM",
      user: "Dr.Adam Adjei",
      role: "Exam Officer",
      action: "Approved Exam results",
      category: "Exams"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All roles');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          log.action.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = selectedRole === 'All roles' || log.role === selectedRole;
    
    const matchesCategory = selectedCategory === 'All Categories' || log.category === selectedCategory;

    return matchesSearch && matchesRole && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-lexgo-dark">Audit Log</h1>
        <p className="text-gray-500 text-sm font-medium">Faculty of Law, Management</p>
      </div>

      {/* Filters & Search Row */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-[450px]">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#FAF6F6] text-lexgo-dark border-0 rounded-2xl text-xs font-semibold focus:outline-none placeholder-gray-400"
          />
          <Search size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
        </div>

        {/* Filters */}
        <div className="flex gap-3 w-full md:w-auto">
          {/* Roles Filter */}
          <div className="relative flex-grow md:flex-grow-0">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full md:w-40 pl-4 pr-10 py-3 bg-[#FAF6F6] text-lexgo-dark border-0 rounded-2xl text-xs font-bold focus:outline-none appearance-none cursor-pointer"
            >
              <option value="All roles">All roles</option>
              <option value="Dean">Dean</option>
              <option value="Lecturer">Lecturer</option>
              <option value="Admin">Admin</option>
              <option value="Exam Officer">Exam Officer</option>
            </select>
            <ChevronDown size={16} className="absolute right-3.5 top-3.5 text-gray-500 pointer-events-none" />
          </div>

          {/* Categories Filter */}
          <div className="relative flex-grow md:flex-grow-0">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full md:w-40 pl-4 pr-10 py-3 bg-[#FAF6F6] text-lexgo-dark border-0 rounded-2xl text-xs font-bold focus:outline-none appearance-none cursor-pointer"
            >
              <option value="All Categories">All Categories</option>
              <option value="Students">Students</option>
              <option value="Courses">Courses</option>
              <option value="Reports">Reports</option>
              <option value="Exams">Exams</option>
            </select>
            <ChevronDown size={16} className="absolute right-3.5 top-3.5 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Audit Log Table Container */}
      <div className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-xs">
        <div className="mb-6">
          <h3 className="text-base font-extrabold text-lexgo-dark">Activity Tracking & Security Compliance</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-50 text-[11px] font-bold uppercase text-gray-400 tracking-wider">
                <th className="pb-4 pl-4">Timestamp</th>
                <th className="pb-4">User</th>
                <th className="pb-4">Role</th>
                <th className="pb-4">Action</th>
                <th className="pb-4 pr-4">Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-xs">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/40 transition">
                    <td className="py-4 pl-4 font-bold text-gray-400">{log.timestamp}</td>
                    <td className="py-4 font-bold text-gray-500">{log.user}</td>
                    <td className="py-4 font-bold text-gray-400">{log.role}</td>
                    <td className="py-4 font-bold text-lexgo-dark">{log.action}</td>
                    <td className="py-4 pr-4">
                      <span className="text-[9px] font-black text-white bg-[#0A1128] px-3.5 py-1.5 rounded-full inline-block">
                        {log.category}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-400 font-semibold">
                    No logs found matching filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FacultyAuditLog;
