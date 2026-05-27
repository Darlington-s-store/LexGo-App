import React, { useState } from 'react';
import { X, Image, ChevronDown } from 'lucide-react';

const AddCourseModal = ({ isOpen, onClose, onSubmit }) => {
  const [code, setCode] = useState('LAW 101');
  const [title, setTitle] = useState('Introduction to Law');
  const [description, setDescription] = useState(
    'This foundational course provides students with a comprehensive overview of basic legal principles and the structure of court systems. It covers essential topics such as the hierarchy of laws, the role of judicial processes, and key legal terminology. Students will explore various types of laws, including civil and criminal law, and gain an understanding of how court systems operate at both state and federal levels. Through case studies and discussions, learners will develop critical thinking skills necessary for analyzing legal issues and understanding the impact of legal decisions on society.'
  );
  const [level, setLevel] = useState('Level 100');
  const [creditHours, setCreditHours] = useState('3');
  const [semester, setSemester] = useState('1st sem');
  const [academicYear, setAcademicYear] = useState('2026/27');
  const [lecturerName, setLecturerName] = useState('Dr. Mary Coffie');
  const [lecturerEmail, setLecturerEmail] = useState('marycoffie@st.edu.gh');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      code,
      title,
      description,
      level,
      creditHours: parseInt(creditHours) || 3,
      semester,
      academicYear,
      lecturerName,
      lecturerEmail,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 animate-fade-in">
      <div className="bg-white rounded-[32px] max-w-xl w-full p-8 relative shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button 
          onClick={onClose}
          type="button"
          className="absolute right-6 top-6 w-9 h-9 rounded-xl text-lexgo-dark hover:bg-gray-100 bg-[#FAF6F6] transition cursor-pointer flex items-center justify-center border-0"
        >
          <X size={18} />
        </button>

        <div className="mb-6">
          <h3 className="text-xl font-black text-lexgo-dark">Add New Course</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Upload Area */}
          <div className="border-2 border-dashed border-gray-200 rounded-[20px] p-6 text-center bg-white flex flex-col items-center justify-center cursor-pointer hover:border-lexgo-dark transition">
            <Image size={24} className="text-gray-400" />
            <span className="text-xs font-semibold text-gray-500 mt-2">Click to Upload or drag and drop</span>
            <span className="text-[10px] text-gray-400 mt-1">PNG, JPEG less than 500MB</span>
          </div>

          {/* Grid fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Course Code (focused/active style as in mockup) */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-lexgo-dark block">Course Code*</label>
              <input 
                type="text" 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-4 py-3 bg-white text-lexgo-dark border-2 border-slate-800 rounded-xl text-sm font-semibold focus:outline-none"
                required
              />
            </div>

            {/* Course Title */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-lexgo-dark block">Course Title *</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-[#FAF6F6] text-lexgo-dark border border-transparent rounded-xl text-sm font-semibold focus:outline-none focus:bg-white focus:border-slate-800 transition"
                required
              />
            </div>
          </div>

          {/* Course description */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-lexgo-dark block">Course description *</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="w-full px-4 py-3 bg-[#FAF6F6] text-lexgo-dark border border-transparent rounded-xl text-sm font-semibold focus:outline-none focus:bg-white focus:border-slate-800 transition resize-none leading-relaxed"
              required
            />
          </div>

          {/* Grid fields row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-lexgo-dark block">Level *</label>
              <div className="relative">
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF6F6] text-lexgo-dark border border-transparent rounded-xl text-sm font-semibold focus:outline-none focus:bg-white focus:border-slate-800 transition appearance-none cursor-pointer"
                >
                  <option value="Level 100">Level 100</option>
                  <option value="Level 200">Level 200</option>
                  <option value="Level 300">Level 300</option>
                  <option value="Level 400">Level 400</option>
                </select>
                <ChevronDown size={16} className="absolute right-3.5 top-3.5 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-lexgo-dark block">Credit Hours *</label>
              <input 
                type="number" 
                value={creditHours}
                onChange={(e) => setCreditHours(e.target.value)}
                className="w-full px-4 py-3 bg-[#FAF6F6] text-lexgo-dark border border-transparent rounded-xl text-sm font-semibold focus:outline-none focus:bg-white focus:border-slate-800 transition"
                required
              />
            </div>
          </div>

          {/* Grid fields row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-lexgo-dark block">Semester *</label>
              <div className="relative">
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF6F6] text-lexgo-dark border border-transparent rounded-xl text-sm font-semibold focus:outline-none focus:bg-white focus:border-slate-800 transition appearance-none cursor-pointer"
                >
                  <option value="1st sem">1st sem</option>
                  <option value="2nd sem">2nd sem</option>
                </select>
                <ChevronDown size={16} className="absolute right-3.5 top-3.5 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-lexgo-dark block">Academic Year</label>
              <input 
                type="text" 
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="w-full px-4 py-3 bg-[#FAF6F6] text-lexgo-dark border border-transparent rounded-xl text-sm font-semibold focus:outline-none focus:bg-white focus:border-slate-800 transition"
              />
            </div>
          </div>

          {/* Grid fields row 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-lexgo-dark block">Lecturer Name</label>
              <div className="relative">
                <select
                  value={lecturerName}
                  onChange={(e) => {
                    setLecturerName(e.target.value);
                    if (e.target.value === 'Dr. Mary Coffie') setLecturerEmail('marycoffie@st.edu.gh');
                    else if (e.target.value === 'Dr. Johnson Abaitey') setLecturerEmail('jabaitey@st.edu.gh');
                    else if (e.target.value === 'Dr. Francis Lincoln') setLecturerEmail('flincoln@st.edu.gh');
                    else if (e.target.value === 'Dr. Caleb Joshua') setLecturerEmail('cjoshua@st.edu.gh');
                  }}
                  className="w-full px-4 py-3 bg-[#FAF6F6] text-lexgo-dark border border-transparent rounded-xl text-sm font-semibold focus:outline-none focus:bg-white focus:border-slate-800 transition appearance-none cursor-pointer"
                >
                  <option value="Dr. Mary Coffie">Dr. Mary Coffie</option>
                  <option value="Dr. Johnson Abaitey">Dr. Johnson Abaitey</option>
                  <option value="Dr. Francis Lincoln">Dr. Francis Lincoln</option>
                  <option value="Dr. Caleb Joshua">Dr. Caleb Joshua</option>
                </select>
                <ChevronDown size={16} className="absolute right-3.5 top-3.5 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-lexgo-dark block">Lecturer Email</label>
              <input 
                type="email" 
                value={lecturerEmail}
                onChange={(e) => setLecturerEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#FAF6F6] text-lexgo-dark border border-transparent rounded-xl text-sm font-semibold focus:outline-none focus:bg-white focus:border-slate-800 transition"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl border border-gray-300 text-lexgo-dark font-bold text-sm bg-white hover:bg-gray-50 transition cursor-pointer text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#0A1128] text-white font-bold text-sm hover:bg-opacity-95 transition cursor-pointer flex items-center gap-1.5 shadow-xs border-0"
            >
              <span>+ Add Course</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourseModal;
