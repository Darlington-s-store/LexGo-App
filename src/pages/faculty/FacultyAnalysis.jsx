import React, { useState } from 'react';
import { 
  TrendingUp, 
  ChevronDown, 
  ChevronRight, 
  Sparkles, 
  Eye, 
  ArrowUpRight, 
  ArrowDownRight,
  TrendingDown
} from 'lucide-react';

const FacultyAnalysis = () => {
  const [academicYear, setAcademicYear] = useState('2026/27');
  const [semester, setSemester] = useState('First Semester');
  const [course, setCourse] = useState('All Courses');
  const [category, setCategory] = useState('All Categories');
  const [level, setLevel] = useState('All Levels');

  // GPA Trend chart data points (Apr to Oct)
  const gpaTrendData = [
    { month: "Apr", gpa: 2.3 },
    { month: "May", gpa: 3.4 },
    { month: "June", gpa: 3.1 },
    { month: "July", gpa: 1.1 },
    { month: "Aug", gpa: 2.6 },
    { month: "Sep", gpa: 2.7 },
    { month: "oct", gpa: 2.7 } // matching lowercase 'oct' in mockup
  ];

  // At-Risk list
  const atRiskStudents = [
    { name: "Daniel Abbam", initials: "DA", level: "L300", gpa: "1.8", risk: "High Risk", trend: "down" },
    { name: "Jawan Adebayo", initials: "JA", level: "L100", gpa: "2.1", risk: "Low Risk", trend: "down" },
    { name: "Mahmoud Mambwe", initials: "MM", level: "L400", gpa: "2.4", risk: "Low Risk", trend: "down" },
    { name: "Patrick Owusu", initials: "PO", level: "L400", gpa: "2.3", risk: "Low Risk", trend: "down" },
    { name: "Adjei Caleb", initials: "AC", level: "L400", gpa: "1.9", risk: "Medium Risk", trend: "down" },
    { name: "Janice Mensah", initials: "JM", level: "L300", gpa: "2.3", risk: "Low Risk", trend: "down" }
  ];

  // Top Performers list
  const topPerformers = [
    { name: "Yaw Atta", initials: "YA", level: "L400", gpa: "3.9", trend: "up" },
    { name: "Adjei Caleb", initials: "AC", level: "L300", gpa: "3.8", trend: "up" },
    { name: "Mahmoud Ababio", initials: "MA", level: "L400", gpa: "3.9", trend: "up" },
    { name: "Cyril Plange", initials: "CP", level: "L400", gpa: "3.9", trend: "up" },
    { name: "Cyril Plange", initials: "CP", level: "L400", gpa: "3.9", trend: "up" },
    { name: "Cecil Amoah", initials: "CA", level: "L400", gpa: "3.9", trend: "up" }
  ];

  // Course performance progress bars
  const coursePerformance = [
    { code: "Law101", title: "Introduction to Legal Studies", avgGpa: "3.5", passRate: "92%" },
    { code: "Law200", title: "Constitutional Law", avgGpa: "3.4", passRate: "90%" },
    { code: "Law300", title: "Introduction Law", avgGpa: "3.2", passRate: "85%" },
    { code: "Law400", title: "Contract Law", avgGpa: "3.2", passRate: "85%" },
    { code: "Law300", title: "Criminal Law", avgGpa: "3.1", passRate: "80%" }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-lexgo-dark">Analysis</h1>
        <p className="text-gray-500 text-sm font-medium">Faculty of Law, Management</p>
      </div>

      {/* Filter Selectors Bar */}
      <div className="flex flex-wrap gap-4 items-center">
        {/* Academic Year */}
        <div className="relative">
          <select 
            value={academicYear} 
            onChange={(e) => setAcademicYear(e.target.value)}
            className="pl-4 pr-10 py-3 bg-[#FAF6F6] text-lexgo-dark border-0 rounded-2xl text-xs font-bold focus:outline-none appearance-none cursor-pointer min-w-[120px]"
          >
            <option value="2026/27">Academic Year</option>
            <option value="2025/26">2025/26</option>
            <option value="2026/27">2026/27</option>
          </select>
          <ChevronDown size={14} className="absolute right-3.5 top-4 text-gray-500 pointer-events-none" />
        </div>

        {/* Semester */}
        <div className="relative">
          <select 
            value={semester} 
            onChange={(e) => setSemester(e.target.value)}
            className="pl-4 pr-10 py-3 bg-[#FAF6F6] text-lexgo-dark border-0 rounded-2xl text-xs font-bold focus:outline-none appearance-none cursor-pointer min-w-[120px]"
          >
            <option value="First Semester">First Semester</option>
            <option value="Second Semester">Second Semester</option>
          </select>
          <ChevronDown size={14} className="absolute right-3.5 top-4 text-gray-500 pointer-events-none" />
        </div>

        {/* Courses */}
        <div className="relative">
          <select 
            value={course} 
            onChange={(e) => setCourse(e.target.value)}
            className="pl-4 pr-10 py-3 bg-[#FAF6F6] text-lexgo-dark border-0 rounded-2xl text-xs font-bold focus:outline-none appearance-none cursor-pointer min-w-[120px]"
          >
            <option value="All Courses">All Courses</option>
            <option value="Law101">Law101</option>
            <option value="Law200">Law200</option>
            <option value="Law300">Law300</option>
            <option value="Law400">Law400</option>
          </select>
          <ChevronDown size={14} className="absolute right-3.5 top-4 text-gray-500 pointer-events-none" />
        </div>

        {/* Categories */}
        <div className="relative">
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="pl-4 pr-10 py-3 bg-[#FAF6F6] text-lexgo-dark border-0 rounded-2xl text-xs font-bold focus:outline-none appearance-none cursor-pointer min-w-[120px]"
          >
            <option value="All Categories">All Categories</option>
            <option value="LMM">LMM</option>
            <option value="LLB">LLB</option>
          </select>
          <ChevronDown size={14} className="absolute right-3.5 top-4 text-gray-500 pointer-events-none" />
        </div>

        {/* Levels */}
        <div className="relative">
          <select 
            value={level} 
            onChange={(e) => setLevel(e.target.value)}
            className="pl-4 pr-10 py-3 bg-[#FAF6F6] text-lexgo-dark border-0 rounded-2xl text-xs font-bold focus:outline-none appearance-none cursor-pointer min-w-[120px]"
          >
            <option value="All Levels">All Levels</option>
            <option value="Level 100">Level 100</option>
            <option value="Level 200">Level 200</option>
            <option value="Level 300">Level 300</option>
            <option value="Level 400">Level 400</option>
          </select>
          <ChevronDown size={14} className="absolute right-3.5 top-4 text-gray-500 pointer-events-none" />
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Students */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-2xs hover:shadow-xs transition duration-200 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Total Students</span>
            <span className="text-2xl font-black text-lexgo-dark block">12</span>
          </div>
          {/* Trend sparkline (green) */}
          <div className="w-16 h-8 shrink-0">
            <svg viewBox="0 0 60 20" className="w-full h-full text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5,15 Q20,10 30,12 T55,5" />
              <circle cx="55" cy="5" r="2.5" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Average GPA */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-2xs hover:shadow-xs transition duration-200 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Average GPA</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-lexgo-dark">3.5</span>
              <span className="text-[10px] font-black text-emerald-600 flex items-center">
                <ArrowUpRight size={10} className="stroke-[3]" />
                +1.5%
              </span>
            </div>
          </div>
          {/* Trend sparkline (blue) */}
          <div className="w-16 h-8 shrink-0">
            <svg viewBox="0 0 60 20" className="w-full h-full text-blue-500" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5,15 Q20,10 30,8 T55,5" />
              <circle cx="55" cy="5" r="2.5" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Pass Rate */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-2xs hover:shadow-xs transition duration-200 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Pass Rate</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-lexgo-dark">80%</span>
              <span className="text-[10px] font-black text-emerald-600 flex items-center">
                <ArrowUpRight size={10} className="stroke-[3]" />
                +5.5%
              </span>
            </div>
          </div>
          {/* Trend sparkline (purple) */}
          <div className="w-16 h-8 shrink-0">
            <svg viewBox="0 0 60 20" className="w-full h-full text-purple-500" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5,15 Q20,12 30,14 T55,6" />
              <circle cx="55" cy="6" r="2.5" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* At-Risk */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-2xs hover:shadow-xs transition duration-200 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">At-Risk</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-lexgo-dark">36</span>
              <span className="text-[10px] font-black text-[#D97706] flex items-center">
                <ArrowDownRight size={10} className="stroke-[3]" />
                +6.7%
              </span>
            </div>
          </div>
          {/* Trend sparkline (yellow/orange) */}
          <div className="w-16 h-8 shrink-0">
            <svg viewBox="0 0 60 20" className="w-full h-full text-amber-500" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5,10 Q20,13 30,11 T55,5" />
              <circle cx="55" cy="5" r="2.5" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>

      {/* GPA Trend Analysis Chart Card */}
      <div className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-xs relative">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-extrabold text-lexgo-dark text-base">GPA Trend Analysis</h3>
          <button className="text-xs font-bold text-gray-400 hover:text-lexgo-dark transition flex items-center gap-0.5 cursor-pointer bg-transparent border-0">
            <span>View All</span>
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Graph Canvas */}
        <div className="relative w-full h-[250px] pt-4 pb-8 pr-4 select-none">
          <svg viewBox="0 0 800 200" className="w-full h-full overflow-visible" preserveAspectRatio="none">
            {/* Gradients */}
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#818CF8" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#818CF8" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Gridlines */}
            {[0, 1, 2, 3, 4].map((gridVal, i) => {
              const yVal = 180 - i * 40;
              return (
                <line 
                  key={i} 
                  x1="45" 
                  y1={yVal} 
                  x2="760" 
                  y2={yVal} 
                  stroke="#E2E8F0" 
                  strokeWidth="1" 
                  strokeDasharray="4 4" 
                />
              );
            })}

            {/* Left Y-axis labels */}
            <text x="15" y="185" className="text-[10px] font-bold fill-gray-400">0</text>
            <text x="15" y="145" className="text-[10px] font-bold fill-gray-400">1</text>
            <text x="15" y="105" className="text-[10px] font-bold fill-gray-400">2</text>
            <text x="15" y="65" className="text-[10px] font-bold fill-gray-400">3</text>
            <text x="15" y="25" className="text-[10px] font-bold fill-gray-400">3.5</text>

            {/* Gradient Fill Under Curve */}
            <path 
              d="M 50,113 C 100,60 150,15 200,20 C 250,22 300,32 350,32 C 400,32 450,165 500,160 C 550,158 600,105 650,98 C 700,95 725,95 750,95 L 750,180 L 50,180 Z" 
              fill="url(#areaGrad)" 
            />

            {/* Curved Trend Line */}
            <path 
              d="M 50,113 C 100,60 150,15 200,20 C 250,22 300,32 350,32 C 400,32 450,165 500,160 C 550,158 600,105 650,98 C 700,95 725,95 750,95" 
              fill="none" 
              stroke="#818CF8" 
              strokeWidth="3.5" 
              strokeLinecap="round"
            />

            {/* Scatter Dots on Line */}
            <circle cx="50" cy="113" r="5" fill="#818CF8" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="200" cy="20" r="5" fill="#818CF8" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="350" cy="32" r="5" fill="#818CF8" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="500" cy="160" r="5" fill="#818CF8" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="650" cy="98" r="5" fill="#818CF8" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="750" cy="95" r="5" fill="#818CF8" stroke="#FFFFFF" strokeWidth="1.5" />

            {/* Bottom X-axis labels */}
            <text x="45" y="198" className="text-[10px] font-bold fill-gray-400" textAnchor="middle">Apr</text>
            <text x="162" y="198" className="text-[10px] font-bold fill-gray-400" textAnchor="middle">May</text>
            <text x="280" y="198" className="text-[10px] font-bold fill-gray-400" textAnchor="middle">June</text>
            <text x="398" y="198" className="text-[10px] font-bold fill-gray-400" textAnchor="middle">July</text>
            <text x="515" y="198" className="text-[10px] font-bold fill-gray-400" textAnchor="middle">Aug</text>
            <text x="633" y="198" className="text-[10px] font-bold fill-gray-400" textAnchor="middle">Sep</text>
            <text x="750" y="198" className="text-[10px] font-bold fill-gray-400" textAnchor="middle">oct</text>
          </svg>
        </div>

        {/* AI Action button */}
        <button className="absolute bottom-6 right-6 w-12 h-12 bg-[#0A1128] text-white rounded-2xl flex items-center justify-center shadow-lg cursor-pointer hover:bg-opacity-95 transition border-0">
          <Sparkles size={20} className="fill-white/10" />
        </button>
      </div>

      {/* Side-by-Side Student Lists (At Risk & Top Performers) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* At-Risk Students Panel */}
        <div className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-xs space-y-4">
          <div className="flex justify-between items-center pb-2">
            <h3 className="font-extrabold text-lexgo-dark text-base">At-Risk Students Panel</h3>
            <button className="text-xs font-bold text-gray-400 hover:text-lexgo-dark transition flex items-center gap-0.5 cursor-pointer bg-transparent border-0">
              <span>View All</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[340px]">
              <thead>
                <tr className="border-b border-gray-50 text-[10px] font-bold uppercase text-gray-400 tracking-wider">
                  <th className="pb-3 pl-2">Student Name</th>
                  <th className="pb-3 text-center">Level</th>
                  <th className="pb-3 text-center">GPA</th>
                  <th className="pb-3 text-center">Risk Score</th>
                  <th className="pb-3 text-center">Trend</th>
                  <th className="pb-3 pr-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-xs">
                {atRiskStudents.map((student, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/40 transition">
                    <td className="py-3 pl-2 flex items-center gap-2.5">
                      <div className="w-7 h-7 bg-[#0A1128] text-white rounded-full flex items-center justify-center font-bold text-[9px] shrink-0">
                        {student.initials}
                      </div>
                      <span className="font-bold text-lexgo-dark">{student.name}</span>
                    </td>
                    <td className="py-3 text-center font-bold text-gray-400">{student.level}</td>
                    <td className="py-3 text-center font-bold text-gray-500">{student.gpa}</td>
                    <td className="py-3 text-center">
                      <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${
                        student.risk === 'High Risk' 
                          ? 'bg-red-50 text-red-500' 
                          : student.risk === 'Medium Risk'
                            ? 'bg-amber-50 text-amber-600'
                            : 'bg-emerald-50 text-emerald-600'
                      }`}>
                        {student.risk}
                      </span>
                    </td>
                    <td className="py-3 text-center">
                      <TrendingDown size={14} className="text-red-500 mx-auto" />
                    </td>
                    <td className="py-3 pr-2 text-right">
                      <button className="text-gray-400 hover:text-lexgo-dark bg-transparent border-0 cursor-pointer">
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Performers Panel */}
        <div className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-xs space-y-4">
          <div className="flex justify-between items-center pb-2">
            <h3 className="font-extrabold text-lexgo-dark text-base">Top Perfomers</h3> {/* mockup typo */}
            <button className="text-xs font-bold text-gray-400 hover:text-lexgo-dark transition flex items-center gap-0.5 cursor-pointer bg-transparent border-0">
              <span>View All</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[300px]">
              <thead>
                <tr className="border-b border-gray-50 text-[10px] font-bold uppercase text-gray-400 tracking-wider">
                  <th className="pb-3 pl-2">Student Name</th>
                  <th className="pb-3 text-center">Level</th>
                  <th className="pb-3 text-center">GPA</th>
                  <th className="pb-3 text-center">Trend</th>
                  <th className="pb-3 pr-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-xs">
                {topPerformers.map((student, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/40 transition">
                    <td className="py-3 pl-2 flex items-center gap-2.5">
                      <div className="w-7 h-7 bg-[#0A1128] text-white rounded-full flex items-center justify-center font-bold text-[9px] shrink-0">
                        {student.initials}
                      </div>
                      <span className="font-bold text-lexgo-dark">{student.name}</span>
                    </td>
                    <td className="py-3 text-center font-bold text-gray-400">{student.level}</td>
                    <td className="py-3 text-center font-bold text-gray-500">{student.gpa}</td>
                    <td className="py-3 text-center">
                      <TrendingUp size={14} className="text-emerald-500 mx-auto" />
                    </td>
                    <td className="py-3 pr-2 text-right">
                      <button className="text-gray-400 hover:text-lexgo-dark bg-transparent border-0 cursor-pointer">
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Course Performance (Progress bars list) */}
      <div className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-xs space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="font-extrabold text-lexgo-dark text-base">Course Peformance</h3> {/* mockup typo */}
          <button className="text-xs font-bold text-gray-400 hover:text-lexgo-dark transition flex items-center gap-0.5 cursor-pointer bg-transparent border-0">
            <span>View All</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="space-y-4">
          {coursePerformance.map((course, idx) => {
            const passRateNum = parseInt(course.passRate);
            return (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-end text-xs">
                  <span className="font-black text-lexgo-dark">{course.code}: {course.title}</span>
                  <div className="flex gap-4 font-bold text-gray-400">
                    <span>Avg GPA: <strong className="text-lexgo-dark">{course.avgGpa}</strong></span>
                    <span>Pass Rate: <strong className="text-lexgo-dark">{course.passRate}</strong></span>
                  </div>
                </div>
                {/* Progress outline */}
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#0A1128] h-full rounded-full transition-all duration-500" 
                    style={{ width: `${passRateNum}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Clustered and GPA charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Student Distribution grouped bar chart */}
        <div className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-xs space-y-6">
          <h3 className="font-extrabold text-lexgo-dark text-base">Student Distribution</h3>
          
          <div className="h-64 flex flex-col justify-between">
            <svg viewBox="0 0 400 200" className="w-full h-48 overflow-visible select-none">
              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map((gridVal, i) => (
                <line key={i} x1="30" y1={160 - i * 35} x2="390" y2={160 - i * 35} stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
              ))}
              
              {/* Y labels */}
              <text x="5" y="163" className="text-[8px] font-bold fill-gray-400">0</text>
              <text x="5" y="128" className="text-[8px] font-bold fill-gray-400">50</text>
              <text x="5" y="93" className="text-[8px] font-bold fill-gray-400">100</text>
              <text x="5" y="58" className="text-[8px] font-bold fill-gray-400">150</text>
              <text x="5" y="23" className="text-[8px] font-bold fill-gray-400">200</text>

              {/* Grouped Bars Level 100 */}
              <g>
                <rect x="50" y="50" width="8" height="110" fill="#0A1128" rx="2" />
                <rect x="60" y="110" width="8" height="50" fill="#EF4444" rx="2" />
                <rect x="70" y="80" width="8" height="80" fill="#10B981" rx="2" />
              </g>

              {/* Grouped Bars Level 200 */}
              <g>
                <rect x="140" y="40" width="8" height="120" fill="#0A1128" rx="2" />
                <rect x="150" y="120" width="8" height="40" fill="#EF4444" rx="2" />
                <rect x="160" y="70" width="8" height="90" fill="#10B981" rx="2" />
              </g>

              {/* Grouped Bars Level 300 */}
              <g>
                <rect x="230" y="45" width="8" height="115" fill="#0A1128" rx="2" />
                <rect x="240" y="105" width="8" height="55" fill="#EF4444" rx="2" />
                <rect x="250" y="75" width="8" height="85" fill="#10B981" rx="2" />
              </g>

              {/* Grouped Bars Level 400 */}
              <g>
                <rect x="320" y="35" width="8" height="125" fill="#0A1128" rx="2" />
                <rect x="330" y="130" width="8" height="30" fill="#EF4444" rx="2" />
                <rect x="340" y="60" width="8" height="100" fill="#10B981" rx="2" />
              </g>

              {/* X Labels */}
              <text x="65" y="175" className="text-[9px] font-bold fill-gray-400" textAnchor="middle">Level 100</text>
              <text x="155" y="175" className="text-[9px] font-bold fill-gray-400" textAnchor="middle">Level 200</text>
              <text x="245" y="175" className="text-[9px] font-bold fill-gray-400" textAnchor="middle">Level 300</text>
              <text x="335" y="175" className="text-[9px] font-bold fill-gray-400" textAnchor="middle">Level 400</text>
            </svg>

            {/* Legends Row */}
            <div className="flex justify-center gap-4 text-[9px] font-black text-gray-500">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-[#0A1128] rounded" />
                <span>Total Number</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-red-500 rounded" />
                <span>At Risk</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded" />
                <span>Top Performers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Overall GPA Distribution chart */}
        <div className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-xs space-y-6">
          <h3 className="font-extrabold text-lexgo-dark text-base">Overall GPA Distribution</h3>
          
          <div className="h-64 flex flex-col justify-between">
            <svg viewBox="0 0 400 200" className="w-full h-48 overflow-visible select-none">
              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map((gridVal, i) => (
                <line key={i} x1="30" y1={160 - i * 35} x2="390" y2={160 - i * 35} stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
              ))}
              
              {/* Y labels */}
              <text x="5" y="163" className="text-[8px] font-bold fill-gray-400">0</text>
              <text x="5" y="128" className="text-[8px] font-bold fill-gray-400">50</text>
              <text x="5" y="93" className="text-[8px] font-bold fill-gray-400">100</text>
              <text x="5" y="58" className="text-[8px] font-bold fill-gray-400">150</text>
              <text x="5" y="23" className="text-[8px] font-bold fill-gray-400">200</text>

              {/* Distribution columns */}
              <rect x="50" y="110" width="18" height="50" fill="#10B981" rx="2" />
              <rect x="110" y="30" width="18" height="130" fill="#FBBF24" rx="2" />
              <rect x="170" y="110" width="18" height="50" fill="#3B82F6" rx="2" />
              <rect x="230" y="40" width="18" height="120" fill="#818CF8" rx="2" />
              <rect x="290" y="70" width="18" height="90" fill="#F43F5E" rx="2" />
              <rect x="350" y="110" width="18" height="50" fill="#EF4444" rx="2" />

              {/* X Labels */}
              <text x="59" y="175" className="text-[8px] font-bold fill-gray-400" textAnchor="middle">GPA {'<'}2.0</text>
              <text x="119" y="175" className="text-[8px] font-bold fill-gray-400" textAnchor="middle">GPA 2.0-2.4</text>
              <text x="179" y="175" className="text-[8px] font-bold fill-gray-400" textAnchor="middle">GPA 2.5-2.9</text>
              <text x="239" y="175" className="text-[8px] font-bold fill-gray-400" textAnchor="middle">GPA 3.0-3.4</text>
              <text x="299" y="175" className="text-[8px] font-bold fill-gray-400" textAnchor="middle">GPA 3.5-3.7</text>
              <text x="359" y="175" className="text-[8px] font-bold fill-gray-400" textAnchor="middle">GPA 3.8-4.0</text>
            </svg>
            
            {/* Legend label */}
            <div className="text-center text-[9px] font-bold text-gray-400 pt-1">
              Distribution of student performance levels across all active academic years
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyAnalysis;
