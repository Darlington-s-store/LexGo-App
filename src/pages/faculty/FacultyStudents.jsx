import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  X, 
  TrendingUp, 
  ArrowUpRight, 
  ClipboardList, 
  MoreVertical,
  Calendar,
  Archive,
  Trash2,
  ChevronLeft,
  Search,
  ChevronDown,
  Eye,
  Download
} from 'lucide-react';

const FacultyStudents = ({ setHeaderSubtitle }) => {
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeDetailsTab, setActiveDetailsTab] = useState('Basic Information');

  const [batches, setBatches] = useState([
    {
      id: "BATCH-2023/24-001",
      yearGroup: "2023/2024 Year Group",
      level: "Level 400",
      program: "LLB",
      totalStudents: 180,
      activeStudents: 175,
      gpa: "3.45",
      startDate: "September 2023",
      endDate: "June 2027",
      status: "Active"
    },
    {
      id: "BATCH-2024/25-001",
      yearGroup: "2024/2025 Year Group",
      level: "Level 400",
      program: "LLB",
      totalStudents: 180,
      activeStudents: 175,
      gpa: "3.55",
      startDate: "September 2024",
      endDate: "June 2028",
      status: "Active"
    },
    {
      id: "BATCH-2025/26-001",
      yearGroup: "2025/2026 Year Group",
      level: "Level 400",
      program: "LLB",
      totalStudents: 180,
      activeStudents: 175,
      gpa: "3.62",
      startDate: "September 2025",
      endDate: "June 2029",
      status: "Active"
    },
    {
      id: "BATCH-2023/24-002",
      yearGroup: "2023/2024 Year Group",
      level: "Level 400",
      program: "LLB",
      totalStudents: 180,
      activeStudents: 170,
      gpa: "3.22",
      startDate: "September 2023",
      endDate: "June 2027",
      status: "Active"
    },
    {
      id: "BATCH-2024/25-002",
      yearGroup: "2024/2025 Year Group",
      level: "Level 400",
      program: "LLB",
      totalStudents: 180,
      activeStudents: 172,
      gpa: "3.31",
      startDate: "September 2024",
      endDate: "June 2028",
      status: "Active"
    },
    {
      id: "BATCH-2025/26-002",
      yearGroup: "2025/2026 Year Group",
      level: "Level 400",
      program: "LLB",
      totalStudents: 180,
      activeStudents: 174,
      gpa: "3.48",
      startDate: "September 2025",
      endDate: "June 2029",
      status: "Active"
    }
  ]);

  // Mock Students database for the details list view
  const [students, setStudents] = useState([
    { id: "12345678", name: "Adjei Caleb", initials: "AC", program: "UnderGraduate", stream: "Regular", level: "Level 400", gpa: "3.73", status: "Inactive", email: "adjeicaleb@st.lexgo.com", phone: "+233 123 456 789", batchId: "LEXGO-24/25", enrollDate: "Jan 1, 2024", gpaCurrent: "3.71", cgpa: "3.8" },
    { id: "12345678", name: "Mahmoud Mambwe", initials: "MM", program: "UnderGraduate", stream: "Regular", level: "Level 400", gpa: "3.73", status: "Active", email: "m.mambwe@st.lexgo.com", phone: "+233 123 456 790", batchId: "LEXGO-24/25", enrollDate: "Jan 1, 2024", gpaCurrent: "3.73", cgpa: "3.8" },
    { id: "12345678", name: "Mahmoud Ababio", initials: "MA", program: "UnderGraduate", stream: "Regular", level: "Level 400", gpa: "3.73", status: "Active", email: "m.ababio@st.lexgo.com", phone: "+233 123 456 791", batchId: "LEXGO-24/25", enrollDate: "Jan 1, 2024", gpaCurrent: "3.73", cgpa: "3.8" },
    { id: "12345678", name: "Jawan Adébáyò", initials: "JA", program: "UnderGraduate", stream: "Regular", level: "Level 400", gpa: "3.73", status: "Active", email: "j.adebayo@st.lexgo.com", phone: "+233 123 456 792", batchId: "LEXGO-24/25", enrollDate: "Jan 1, 2024", gpaCurrent: "3.73", cgpa: "3.8" },
    { id: "12345678", name: "Tawana Gbeho", initials: "TG", program: "UnderGraduate", stream: "Regular", level: "Level 400", gpa: "3.73", status: "Active", email: "t.gbeho@st.lexgo.com", phone: "+233 123 456 793", batchId: "LEXGO-24/25", enrollDate: "Jan 1, 2024", gpaCurrent: "3.73", cgpa: "3.8" },
    { id: "12345678", name: "Dalilah Bankole", initials: "DB", program: "UnderGraduate", stream: "Regular", level: "Level 400", gpa: "3.73", status: "Active", email: "d.bankole@st.lexgo.com", phone: "+233 123 456 794", batchId: "LEXGO-24/25", enrollDate: "Jan 1, 2024", gpaCurrent: "3.73", cgpa: "3.8" }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // Form States matching create dialog screenshot
  const [newBatchId, setNewBatchId] = useState('BATCH-2023/24-001');
  const [newBatchName, setNewBatchName] = useState('2023/2024 year group');
  const [newDate, setNewDate] = useState('07 Jan 2026');
  const [newAcademicYear, setNewAcademicYear] = useState('2026/27');

  // Search & Filters inside detail view
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedProgramFilter, setSelectedProgramFilter] = useState('All Programs');

  useEffect(() => {
    if (selectedBatch) {
      const cleanId = selectedBatch.id.replace('BATCH-', 'LEXGO');
      const cleanGroup = selectedBatch.yearGroup.toUpperCase();
      setHeaderSubtitle(`Students > ${cleanId} : #${cleanGroup}`);
    } else {
      setHeaderSubtitle('Faculty of Law, Management');
    }
  }, [selectedBatch, setHeaderSubtitle]);

  const stats = [
    {
      title: "Total Batches",
      value: batches.length.toString(),
      icon: ClipboardList,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
      overlayColor: "bg-blue-100/50"
    },
    {
      title: "Active Batches",
      value: batches.filter(b => b.status === "Active").length.toString(),
      icon: TrendingUp,
      iconColor: "text-emerald-600",
      bgColor: "bg-emerald-50",
      overlayColor: "bg-emerald-100/50"
    },
    {
      title: "Overall Avg.GPA",
      value: (batches.reduce((acc, curr) => acc + parseFloat(curr.gpa), 0) / batches.length).toFixed(1),
      icon: ArrowUpRight,
      iconColor: "text-emerald-600",
      bgColor: "bg-emerald-50",
      overlayColor: "bg-emerald-100/50"
    }
  ];

  const handleCreateBatch = (e) => {
    e.preventDefault();
    if (!newBatchId.trim() || !newBatchName.trim()) {
      alert('Please fill out all fields.');
      return;
    }

    const newBatch = {
      id: newBatchId.toUpperCase(),
      yearGroup: newBatchName,
      level: "Level 400",
      program: "LLB",
      totalStudents: 180,
      activeStudents: 175,
      gpa: "3.50",
      startDate: newDate,
      endDate: "June 2030",
      status: "Active"
    };

    setBatches([newBatch, ...batches]);
    setShowCreateModal(false);
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || student.id.includes(searchQuery);
    const matchesCategory = selectedCategory === 'All Categories' || student.status === selectedCategory;
    const matchesProgram = selectedProgramFilter === 'All Programs' || student.program === selectedProgramFilter;
    return matchesSearch && matchesCategory && matchesProgram;
  });

  // RENDER BATCH DETAIL PAGE
  if (selectedBatch) {
    return (
      <div className="space-y-6 animate-fade-in">
        {/* Back navigation Chevron */}
        <button
          onClick={() => setSelectedBatch(null)}
          className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-lexgo-dark flex items-center gap-1 hover:bg-gray-50 transition cursor-pointer shadow-2xs"
        >
          <ChevronLeft size={16} />
          <span>Back</span>
        </button>

        {/* Selected Batch Hero Banner */}
        <div className="bg-[#0A1128] text-white p-6 rounded-3xl space-y-4 relative overflow-hidden pattern-bg shadow-sm">
          <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />
          
          <div className="flex justify-between items-start gap-2 relative z-10">
            <div className="space-y-0.5">
              <h2 className="font-extrabold text-xl tracking-tight">{selectedBatch.id}</h2>
              <p className="text-slate-400 text-xs font-semibold">{selectedBatch.yearGroup}</p>
            </div>
            <span className="bg-emerald-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
              {selectedBatch.status}
            </span>
          </div>

          <div className="flex gap-2 pt-1 relative z-10">
            <span className="bg-white/10 backdrop-blur-xs text-white text-xs font-bold px-4 py-1 rounded-full border border-white/5">
              {selectedBatch.level}
            </span>
            <span className="bg-white/10 backdrop-blur-xs text-white text-xs font-bold px-4 py-1 rounded-full border border-white/5">
              {selectedBatch.program}
            </span>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white text-lexgo-dark border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-lexgo-dark placeholder-gray-400 font-semibold shadow-2xs"
            />
            <Search size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            {/* Category Filter */}
            <div className="relative flex-grow md:flex-grow-0">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full md:w-40 pl-4 pr-10 py-3 bg-white text-lexgo-dark border border-gray-100 rounded-2xl text-xs font-bold focus:outline-none shadow-2xs appearance-none cursor-pointer"
              >
                <option value="All Categories">All Categories</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <ChevronDown size={16} className="absolute right-3.5 top-3.5 text-gray-500 pointer-events-none" />
            </div>

            {/* Program Filter */}
            <div className="relative flex-grow md:flex-grow-0">
              <select
                value={selectedProgramFilter}
                onChange={(e) => setSelectedProgramFilter(e.target.value)}
                className="w-full md:w-40 pl-4 pr-10 py-3 bg-white text-lexgo-dark border border-gray-100 rounded-2xl text-xs font-bold focus:outline-none shadow-2xs appearance-none cursor-pointer"
              >
                <option value="All Programs">All Programs</option>
                <option value="UnderGraduate">UnderGraduate</option>
              </select>
              <ChevronDown size={16} className="absolute right-3.5 top-3.5 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Student Table */}
        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-100 text-xs font-bold uppercase text-gray-400 tracking-wider">
                <th className="p-6">Student</th>
                <th className="p-6">Program</th>
                <th className="p-6">Level</th>
                <th className="p-6">GPA</th>
                <th className="p-6">Status</th>
                <th className="p-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/30 transition">
                    <td className="p-6 flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#0A1128] text-white rounded-full flex items-center justify-center font-bold text-xs">
                        {student.initials}
                      </div>
                      <div className="leading-none">
                        <h4 className="font-bold text-lexgo-dark">{student.name}</h4>
                        <span className="text-[10px] text-gray-400 font-semibold block mt-1">#{student.id}</span>
                      </div>
                    </td>
                    <td className="p-6 leading-none">
                      <h4 className="font-bold text-lexgo-dark">{student.program}</h4>
                      <span className="text-[10px] text-gray-400 font-semibold block mt-1">{student.stream}</span>
                    </td>
                    <td className="p-6 font-bold text-gray-600">{student.level}</td>
                    <td className="p-6 font-bold text-gray-600">{student.gpa}</td>
                    <td className="p-6">
                      <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border ${
                        student.status === 'Active' 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                          : 'bg-amber-50 text-amber-700 border-amber-100'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="p-6">
                      <button 
                        onClick={() => {
                          setSelectedStudent(student);
                          setActiveDetailsTab('Basic Information');
                        }}
                        className="w-8 h-8 rounded-full border border-gray-100 hover:bg-gray-50 flex items-center justify-center text-gray-400 hover:text-lexgo-dark transition cursor-pointer"
                      >
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-gray-400 font-bold">
                    No students matching search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* High-Fidelity Student Details Modal overlay */}
        {selectedStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 animate-fade-in">
            <div className="bg-white rounded-[32px] max-w-4xl w-full p-8 relative shadow-2xl border border-gray-100 flex flex-col max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <button 
                onClick={() => setSelectedStudent(null)}
                className="absolute right-6 top-6 w-9 h-9 rounded-xl text-lexgo-dark hover:bg-gray-100 bg-[#FAF6F6] transition cursor-pointer flex items-center justify-center"
              >
                <X size={18} />
              </button>

              {/* Title */}
              <div className="mb-6">
                <h3 className="text-xl font-black text-lexgo-dark">Student Details</h3>
              </div>

              {/* Tab Toggles */}
              <div className="flex gap-2 pb-4 mb-6 overflow-x-auto">
                {['Basic Information', 'Course Info', 'Transcript'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveDetailsTab(tab)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 ${
                      activeDetailsTab === tab 
                        ? 'bg-[#0A1128] text-white shadow-2xs' 
                        : 'bg-[#FAF6F6] text-lexgo-dark hover:bg-gray-100'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Dynamic Modal Tab Content */}
              <div className="space-y-6">
                {/* 1. BASIC INFORMATION TAB */}
                {activeDetailsTab === 'Basic Information' && (
                  <div className="space-y-8 animate-fade-in">
                    {/* Header profile block */}
                    <div className="flex flex-wrap justify-between items-start gap-6 pb-6 border-b border-gray-100">
                      {/* Avatar & Name & Status */}
                      <div className="flex items-center gap-4 min-w-[280px]">
                        <div className="w-16 h-16 bg-[#0A1128] text-white rounded-2xl flex items-center justify-center font-bold text-xl shrink-0">
                          {selectedStudent.initials}
                        </div>
                        <div className="leading-tight">
                          <div className="flex items-center gap-2.5">
                            <h4 className="text-xl font-bold text-lexgo-dark">{selectedStudent.name}</h4>
                            <span className="bg-[#E2F0D9] text-[#385723] text-xs font-bold px-2.5 py-0.5 rounded-md">
                              {selectedStudent.status === 'Inactive' ? 'Active' : selectedStudent.status}
                            </span>
                          </div>
                          <div className="flex gap-6 mt-1 text-sm text-gray-400 font-semibold">
                            <span>#{selectedStudent.id}</span>
                            <span>Level 300</span>
                          </div>
                        </div>
                      </div>

                      {/* Email block */}
                      <div className="space-y-0.5 min-w-[200px]">
                        <span className="text-xs font-bold text-gray-400 block">Email</span>
                        <span className="font-extrabold text-lexgo-dark text-sm sm:text-base">{selectedStudent.email}</span>
                      </div>

                      {/* Phone block */}
                      <div className="space-y-0.5 min-w-[150px]">
                        <span className="text-xs font-bold text-gray-400 block">Phone</span>
                        <span className="font-extrabold text-lexgo-dark text-sm sm:text-base">{selectedStudent.phone}</span>
                      </div>
                    </div>

                    {/* Matrix Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 max-w-2xl">
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-gray-400 block">Batch ID</span>
                        <p className="text-sm sm:text-base font-extrabold text-lexgo-dark">{selectedStudent.batchId}</p>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-gray-400 block">Enrollment Date</span>
                        <p className="text-sm sm:text-base font-extrabold text-lexgo-dark">{selectedStudent.enrollDate}</p>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-gray-400 block">Program</span>
                        <p className="text-sm sm:text-base font-extrabold text-lexgo-dark">{selectedStudent.program}</p>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-gray-400 block">Program Category</span>
                        <p className="text-sm sm:text-base font-extrabold text-lexgo-dark">{selectedStudent.stream}</p>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-gray-400 block">current GPA</span>
                        <p className="text-sm sm:text-base font-extrabold text-lexgo-dark">{selectedStudent.gpaCurrent}</p>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-gray-400 block">CGPA</span>
                        <p className="text-sm sm:text-base font-extrabold text-lexgo-dark">{selectedStudent.cgpa}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. COURSE INFO TAB */}
                {activeDetailsTab === 'Course Info' && (
                  <div className="space-y-6 animate-fade-in max-h-[55vh] overflow-y-auto pr-1">
                    {/* LEVEL 400 - 2ND SEM - 26/27 */}
                    <div className="space-y-2.5">
                      <div className="bg-[#F4F2F2] rounded-xl px-4 py-3 font-extrabold text-lexgo-dark text-xs sm:text-sm uppercase tracking-wider">
                        LEVEL 400 - 2ND SEM - 26/27
                      </div>
                      <div className="px-4 py-1.5 space-y-4">
                        <div className="flex justify-between items-center text-xs sm:text-sm font-semibold text-lexgo-dark">
                          <span>IAW001 - Introduction to Law</span>
                          <span className="font-extrabold text-slate-800">3 credit hrs</span>
                        </div>
                        <div className="flex justify-between items-center text-xs sm:text-sm font-semibold text-lexgo-dark">
                          <span>IAW002-Evidence Law</span>
                          <span className="font-extrabold text-slate-800">3 credit hrs</span>
                        </div>
                        <div className="flex justify-between items-center text-xs sm:text-sm font-semibold text-lexgo-dark">
                          <span>IAW003-Prosperity Law</span>
                          <span className="font-extrabold text-slate-800">3 credit hrs</span>
                        </div>
                      </div>
                    </div>

                    {/* LEVEL 400 - 1ST SEM - 26/27 */}
                    <div className="space-y-2.5">
                      <div className="bg-[#F4F2F2] rounded-xl px-4 py-3 font-extrabold text-lexgo-dark text-xs sm:text-sm uppercase tracking-wider">
                        LEVEL 400 - 1ST SEM - 26/27
                      </div>
                      <div className="px-4 py-1.5 space-y-4">
                        <div className="flex justify-between items-center text-xs sm:text-sm font-semibold text-lexgo-dark">
                          <span>IAW001 - Introduction to Law</span>
                          <span className="font-extrabold text-slate-800">3 credit hrs</span>
                        </div>
                        <div className="flex justify-between items-center text-xs sm:text-sm font-semibold text-lexgo-dark">
                          <span>IAW002-Evidence Law</span>
                          <span className="font-extrabold text-slate-800">2 credit hrs</span>
                        </div>
                        <div className="flex justify-between items-center text-xs sm:text-sm font-semibold text-lexgo-dark">
                          <span>IAW003-Prosperity Law</span>
                          <span className="font-extrabold text-slate-800">3 credit hrs</span>
                        </div>
                      </div>
                    </div>

                    {/* LEVEL 300 - 2ND SEM - 25/26 */}
                    <div className="space-y-2.5">
                      <div className="bg-[#F4F2F2] rounded-xl px-4 py-3 font-extrabold text-lexgo-dark text-xs sm:text-sm uppercase tracking-wider">
                        LEVEL 300 - 2ND SEM - 25/26
                      </div>
                      <div className="px-4 py-1.5 space-y-4">
                        <div className="flex justify-between items-center text-xs sm:text-sm font-semibold text-lexgo-dark">
                          <span>IAW001 - Introduction to Law</span>
                          <span className="font-extrabold text-slate-800">3 credit hrs</span>
                        </div>
                        <div className="flex justify-between items-center text-xs sm:text-sm font-semibold text-lexgo-dark">
                          <span>IAW002-Evidence Law</span>
                          <span className="font-extrabold text-slate-800">3 credit hrs</span>
                        </div>
                        <div className="flex justify-between items-center text-xs sm:text-sm font-semibold text-lexgo-dark">
                          <span>IAW003-Prosperity Law</span>
                          <span className="font-extrabold text-slate-800">3 credit hrs</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. TRANSCRIPT TAB */}
                {activeDetailsTab === 'Transcript' && (
                  <div className="space-y-6 animate-fade-in max-h-[55vh] overflow-y-auto pr-1">
                    {/* Transcript Title and Export Header */}
                    <div className="flex justify-between items-center pb-2">
                      <h4 className="text-base font-black text-lexgo-dark">Academic Transcript</h4>
                      <button className="bg-[#0A1128] text-white text-xs font-bold py-2.5 px-5 rounded-xl flex items-center gap-1.5 hover:bg-opacity-95 transition cursor-pointer shadow-2xs">
                        <Download size={14} />
                        <span>Export</span>
                      </button>
                    </div>

                    {/* Semester 1 Block */}
                    <div className="space-y-2.5">
                      <div className="bg-[#F4F2F2] rounded-xl px-4 py-3 font-extrabold text-lexgo-dark text-xs sm:text-sm uppercase tracking-wider">
                        LEVEL 400 - 2ND SEM - 26/27
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
                            <tr className="border-b border-gray-50/50">
                              <td className="py-4 px-2 font-bold">IAW001</td>
                              <td className="py-4 px-2 font-semibold">Introduction to Law</td>
                              <td className="py-4 px-2 font-bold text-center">3</td>
                              <td className="py-4 px-2"></td>
                            </tr>
                            <tr className="border-b border-gray-50/50">
                              <td className="py-4 px-2 font-bold">IAW002</td>
                              <td className="py-4 px-2 font-semibold">Evidence Law</td>
                              <td className="py-4 px-2 font-bold text-center">3</td>
                              <td className="py-4 px-2"></td>
                            </tr>
                            <tr className="border-b border-gray-50/50">
                              <td className="py-4 px-2 font-bold">IAW003</td>
                              <td className="py-4 px-2 font-semibold">Prosperity Law</td>
                              <td className="py-4 px-2 font-bold text-center">3</td>
                              <td className="py-4 px-2"></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Semester 2 Block */}
                    <div className="space-y-2.5">
                      <div className="bg-[#F4F2F2] rounded-xl px-4 py-3 font-extrabold text-lexgo-dark text-xs sm:text-sm uppercase tracking-wider">
                        LEVEL 400 - 1ST SEM - 26/27
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
                            <tr className="border-b border-gray-50/50">
                              <td className="py-4 px-2 font-bold">IAW001</td>
                              <td className="py-4 px-2 font-semibold">Introduction to Law</td>
                              <td className="py-4 px-2 font-bold text-center">3</td>
                              <td className="py-4 px-2"></td>
                            </tr>
                            <tr className="border-b border-gray-50/50">
                              <td className="py-4 px-2 font-bold">IAW002</td>
                              <td className="py-4 px-2 font-semibold">Evidence Law</td>
                              <td className="py-4 px-2 font-bold text-center">3</td>
                              <td className="py-4 px-2"></td>
                            </tr>
                            <tr className="border-b border-gray-50/50">
                              <td className="py-4 px-2 font-bold">IAW003</td>
                              <td className="py-4 px-2 font-semibold">Prosperity Law</td>
                              <td className="py-4 px-2 font-bold text-center">3</td>
                              <td className="py-4 px-2"></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // RENDER BATCHES SUMMARY GRID
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Action Bar */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-lexgo-dark text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-2xl flex items-center gap-2 hover:bg-opacity-95 transition shadow-sm cursor-pointer shrink-0"
        >
          <Plus size={16} />
          <span>Add New Batch</span>
        </button>
      </div>

      {/* Stats Summary row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div 
              key={idx} 
              className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition duration-200 relative overflow-hidden flex items-center justify-between"
            >
              <div className="space-y-1 relative z-10">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">{stat.title}</span>
                <span className="text-3xl font-extrabold text-lexgo-dark block">{stat.value}</span>
              </div>
              <div className={`w-14 h-14 ${stat.bgColor} rounded-full flex items-center justify-center relative z-10 ${stat.iconColor}`}>
                <Icon size={24} />
              </div>
              <div className={`absolute -right-4 -bottom-4 w-28 h-28 ${stat.overlayColor} rounded-full blur-xl pointer-events-none`} />
            </div>
          );
        })}
      </div>

      {/* Grid of Batch Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {batches.map((batch, index) => {
          const progressPercent = (batch.activeStudents / batch.totalStudents) * 100;
          return (
            <div 
              key={index}
              className="bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition duration-200 overflow-hidden flex flex-col justify-between"
            >
              {/* Card Header Section */}
              <div className="bg-[#0A1128] text-white p-6 space-y-4 relative overflow-hidden">
                <div className="absolute right-0 bottom-0 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none" />
                
                <div className="flex justify-between items-start gap-2 relative z-10">
                  <div className="space-y-0.5">
                    <h3 className="font-extrabold text-sm sm:text-base tracking-tight">{batch.id}</h3>
                    <p className="text-slate-400 text-[10px] font-semibold">{batch.yearGroup}</p>
                  </div>
                  <span className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs ${
                    batch.status === 'Archived' 
                      ? 'bg-slate-500 text-white' 
                      : 'bg-emerald-500 text-white'
                  }`}>
                    {batch.status}
                  </span>
                </div>

                <div className="flex gap-2 pt-1 relative z-10">
                  <span className="bg-white/10 backdrop-blur-xs text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/5">
                    {batch.level}
                  </span>
                  <span className="bg-white/10 backdrop-blur-xs text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/5">
                    {batch.program}
                  </span>
                </div>
              </div>

              {/* Card Body Section */}
              <div className="p-6 space-y-6">
                {/* Stats Blocks */}
                <div className="flex gap-4">
                  <div className="bg-slate-50 border border-slate-100/50 rounded-2xl p-3 text-center flex-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Total Students</span>
                    <span className="text-lg font-black text-lexgo-dark">{batch.totalStudents}</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-100/50 rounded-2xl p-3 text-center flex-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Average GPA</span>
                    <span className="text-lg font-black text-lexgo-dark">{batch.gpa}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400 font-semibold">Active Students</span>
                    <span className="text-lexgo-dark font-extrabold">{batch.activeStudents} / {batch.totalStudents}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="space-y-2.5 pt-1 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-semibold">Start Date</span>
                    <span className="text-lexgo-dark font-bold">{batch.startDate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-semibold">Expected End</span>
                    <span className="text-lexgo-dark font-bold">{batch.endDate}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2 relative">
                  <button 
                    onClick={() => setSelectedBatch(batch)}
                    className="flex-1 bg-lexgo-dark hover:bg-opacity-95 text-white text-xs font-bold py-3 px-4 rounded-xl transition cursor-pointer text-center shadow-2xs"
                  >
                    View details
                  </button>
                  <button 
                    onClick={() => setOpenDropdownId(openDropdownId === batch.id ? null : batch.id)}
                    className="w-10 h-10 border border-gray-200 hover:bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-lexgo-dark transition cursor-pointer shrink-0"
                  >
                    <MoreVertical size={16} />
                  </button>

                  {/* Context Menu Dropdown */}
                  {openDropdownId === batch.id && (
                    <>
                      <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setOpenDropdownId(null)} />
                      <div className="absolute right-0 bottom-12 bg-white border border-gray-100 rounded-2xl shadow-xl py-3 px-4 z-50 animate-fade-in w-36 flex flex-col gap-2">
                        <button 
                          onClick={() => {
                            setBatches(batches.map(b => b.id === batch.id ? { ...b, status: b.status === 'Archived' ? 'Active' : 'Archived' } : b));
                            setOpenDropdownId(null);
                          }}
                          className="w-full flex items-center gap-2.5 py-1 text-xs font-bold text-lexgo-dark hover:text-black transition cursor-pointer text-left bg-transparent border-0"
                        >
                          <Archive size={16} className="text-gray-500" />
                          <span>Archieve</span>
                        </button>
                        <button 
                          onClick={() => {
                            setBatches(batches.filter(b => b.id !== batch.id));
                            setOpenDropdownId(null);
                          }}
                          className="w-full flex items-center gap-2.5 py-1 text-xs font-bold text-rose-500 hover:text-rose-600 transition cursor-pointer text-left bg-transparent border-0"
                        >
                          <Trash2 size={16} className="text-rose-500" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* High-Fidelity Create Batch Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl border border-gray-100 flex flex-col">
            {/* Close Button */}
            <button 
              onClick={() => setShowCreateModal(false)}
              className="absolute right-5 top-5 w-8 h-8 rounded-lg text-gray-400 hover:text-lexgo-dark bg-gray-50 hover:bg-gray-100 transition cursor-pointer flex items-center justify-center"
            >
              <X size={18} />
            </button>

            <div className="mb-6">
              <h3 className="text-xl font-black text-lexgo-dark">Create New Batch</h3>
            </div>

            <form onSubmit={handleCreateBatch} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Batch ID */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-lexgo-dark block">Batch ID *</label>
                  <input 
                    type="text" 
                    value={newBatchId}
                    onChange={(e) => setNewBatchId(e.target.value)}
                    className="w-full px-4 py-3 bg-[#FAF6F6] text-lexgo-dark border border-gray-100 rounded-xl text-sm focus:outline-none placeholder-gray-400 font-semibold"
                    required
                  />
                </div>

                {/* Batch Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-lexgo-dark block">Batch name *</label>
                  <input 
                    type="text" 
                    value={newBatchName}
                    onChange={(e) => setNewBatchName(e.target.value)}
                    className="w-full px-4 py-3 bg-white text-lexgo-dark border border-slate-800 rounded-xl text-sm focus:outline-none font-semibold"
                    required
                  />
                </div>

                {/* Date Picker */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-lexgo-dark block">Date *</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full pl-4 pr-10 py-3 bg-[#FAF6F6] text-lexgo-dark border border-gray-100 rounded-xl text-sm focus:outline-none font-semibold"
                      required
                    />
                    <Calendar size={18} className="absolute right-3.5 top-3.5 text-gray-500" />
                  </div>
                </div>

                {/* Academic Year */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-lexgo-dark block">Academic Year</label>
                  <input 
                    type="text" 
                    value={newAcademicYear}
                    onChange={(e) => setNewAcademicYear(e.target.value)}
                    className="w-full px-4 py-3 bg-[#FAF6F6] text-lexgo-dark border border-gray-100 rounded-xl text-sm focus:outline-none font-semibold"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-50">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-bold text-sm bg-white hover:bg-gray-50 transition cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-lexgo-dark text-white font-bold text-sm hover:bg-opacity-95 transition cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <Plus size={16} />
                  <span>Create Batch</span>
                </button>
              </div>
            </form>
          </div>
        </div>
        
      )}
    </div>
  );
};

export default FacultyStudents;
