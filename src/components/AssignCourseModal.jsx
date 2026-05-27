import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

const AssignCourseModal = ({ isOpen, onClose, member, onAssignCourse }) => {
  const [selectedCourseStr, setSelectedCourseStr] = useState('Law001: Introduction to Law');
  const [academicYear, setAcademicYear] = useState('2026/27');

  if (!isOpen || !member) return null;

  // Predefined courses corresponding to the list in screenshot 4
  const availableCourses = [
    {
      code: 'Law001',
      title: 'Introduction to Law',
      level: 'Level 100',
      category: 'LMM',
      semester: '1st SEM',
      students: 130
    },
    {
      code: 'Law002',
      title: 'Evidence Law',
      level: 'Level 300',
      category: 'LLB',
      semester: '2nd SEM',
      students: 180
    },
    {
      code: 'Law003',
      title: 'Family Law',
      level: 'Level 200',
      category: 'LLB',
      semester: '1st SEM',
      students: 220
    },
    {
      code: 'Law004',
      title: 'Property Law',
      level: 'Level 400',
      category: 'LLB',
      semester: '2nd SEM',
      students: 150
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Find the course details
    const selectedCourseObj = availableCourses.find(
      c => `${c.code}: ${c.title}` === selectedCourseStr || `${c.code} : ${c.title}` === selectedCourseStr
    );

    if (selectedCourseObj) {
      onAssignCourse(member.id, {
        ...selectedCourseObj,
        academicYear
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/45 p-4 animate-fade-in">
      <div className="bg-white rounded-[32px] max-w-md w-full p-8 relative shadow-2xl">
        {/* Header Title */}
        <div className="mb-6">
          <h3 className="text-lg font-black text-lexgo-dark">
            Assign Course to {member.name}
          </h3>
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          type="button"
          className="absolute right-6 top-6 w-9 h-9 rounded-xl text-lexgo-dark hover:bg-gray-100 bg-[#FAF6F6] transition cursor-pointer flex items-center justify-center border-0"
        >
          <X size={18} />
        </button>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Select Course Dropdown */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-lexgo-dark block">Select Course</label>
            <div className="relative">
              <select
                value={selectedCourseStr}
                onChange={(e) => setSelectedCourseStr(e.target.value)}
                className="w-full px-4 py-3 bg-[#FAF6F6] text-lexgo-dark border border-transparent rounded-xl text-sm font-semibold focus:outline-none focus:bg-white focus:border-slate-800 transition appearance-none cursor-pointer"
              >
                <option value="Law001: Introduction to Law">Law001: Introduction to Law</option>
                <option value="Law002 : Evidence Law">Law002 : Evidence Law</option>
                <option value="Law003 : Family Law">Law003 : Family Law</option>
                <option value="Law004 : Property Law">Law004 : Property Law</option>
              </select>
              <ChevronDown size={16} className="absolute right-3.5 top-3.5 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Academic Year Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-lexgo-dark block">Academic Year</label>
            <input 
              type="text" 
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAF6F6] text-lexgo-dark border border-transparent rounded-xl text-sm font-semibold focus:outline-none focus:bg-white focus:border-slate-800 transition"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl border border-gray-300 text-lexgo-dark font-bold text-sm bg-white hover:bg-gray-50 transition cursor-pointer text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#0A1128] text-white font-bold text-sm hover:bg-opacity-95 transition cursor-pointer flex items-center gap-1.5 shadow-xs border-0"
            >
              <span>+ Assign Course</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignCourseModal;
