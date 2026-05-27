import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, MoreVertical, Eye, Pencil, Trash2, X, Plus, Users } from 'lucide-react';

/* ── Avatar helpers ──────────────────────────────────────────── */
const avatarColors = [
  'bg-[#0A1128]', 'bg-indigo-600', 'bg-emerald-600',
  'bg-amber-500',  'bg-rose-600',   'bg-violet-600', 'bg-cyan-600',
];
const getInitials = (name) =>
  name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');

/* ── Available courses list ──────────────────────────────────── */
const COURSES = [
  { code: 'Law001', title: 'Introduction to Law' },
  { code: 'Law002', title: 'Evidence Law' },
  { code: 'Law003', title: 'Family Law' },
  { code: 'Law004', title: 'Property Law' },
  { code: 'Law005', title: 'Constitutional Law' },
  { code: 'Law006', title: 'Criminal Law' },
  { code: 'Law007', title: 'Law of Contract' },
];

/* ── Sample course assignments per lecturer ──────────────────── */
const SAMPLE_ASSIGNED = {
  'Dr. Yaw Atta': [
    { code: 'Law001', title: 'Introduction to Legal Studies', level: 'Level 100', programme: 'LMM', sem: '1st SEM', students: 130 },
    { code: 'Law002', title: 'Introduction to Evidence Law',  level: 'Level 100', programme: 'LMM', sem: '1st SEM', students: 130 },
  ],
  default: [
    { code: 'Law003', title: 'Family Law',    level: 'Level 200', programme: 'LLB', sem: '2nd SEM', students: 95 },
    { code: 'Law004', title: 'Property Law',  level: 'Level 200', programme: 'LLB', sem: '1st SEM', students: 112 },
    { code: 'Law005', title: 'Constitutional Law', level: 'Level 300', programme: 'LMM', sem: '2nd SEM', students: 87 },
  ],
};

/* ── View Profile Modal ──────────────────────────────────────── */
const ViewProfileModal = ({ lecturer, avatarBg, onClose, onAssign }) => {
  const assigned = SAMPLE_ASSIGNED[lecturer.name] ?? SAMPLE_ASSIGNED.default;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-50">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl ${avatarBg} text-white flex items-center justify-center font-extrabold text-sm shrink-0`}>
              {getInitials(lecturer.name)}
            </div>
            <div>
              <h3 className="font-extrabold text-lexgo-dark text-base leading-tight">{lecturer.name}</h3>
              <span className="text-xs font-semibold text-gray-400">{lecturer.id}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-500 flex items-center justify-center border-0 cursor-pointer transition"
          >
            <X size={17} />
          </button>
        </div>

        {/* Course list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {assigned.map((course, i) => (
            <div key={i} className="border-b border-gray-50 pb-4 last:border-0 last:pb-0 space-y-3">
              <p className="text-sm font-extrabold text-lexgo-dark">{course.code}: {course.title}</p>
              <div className="flex flex-wrap gap-2">
                {[course.level, course.programme, course.sem].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 border border-gray-200 rounded-full text-[11px] font-bold text-gray-600 bg-white"
                  >
                    {tag}
                  </span>
                ))}
                <span className="px-3 py-1 border border-gray-200 rounded-full text-[11px] font-bold text-gray-600 bg-white flex items-center gap-1">
                  <Users size={11} />
                  {course.students} Students
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-50">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-lexgo-dark hover:bg-gray-50 transition cursor-pointer bg-white"
          >
            Cancel
          </button>
          <button
            onClick={() => { onClose(); onAssign(lecturer); }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A1128] text-white text-sm font-bold hover:bg-opacity-90 transition cursor-pointer border-0"
          >
            <Plus size={15} strokeWidth={3} />
            Assign New Course
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── Assign Course Modal ─────────────────────────────────────── */
const AssignCourseModal = ({ lecturer, onClose }) => {
  const [selectedCourse, setSelectedCourse] = useState(COURSES[0].code);
  const [academicYear] = useState('2026/27');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Assignment logic would go here
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-50">
          <h3 className="font-extrabold text-lexgo-dark text-base">
            Assign Course to {lecturer.name}
          </h3>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-500 flex items-center justify-center border-0 cursor-pointer transition"
          >
            <X size={17} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Select Course */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-gray-500 block">Select Course</label>
            <div className="relative">
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-4 py-3 bg-[#FAF6F6] rounded-2xl text-sm font-semibold text-lexgo-dark focus:outline-none appearance-none border-0 cursor-pointer pr-9"
              >
                {COURSES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code}: {c.title}
                  </option>
                ))}
              </select>
              <ChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            {/* Course list preview */}
            <div className="bg-[#FAF6F6] rounded-2xl px-4 py-3 space-y-1.5">
              {COURSES.slice(0, 4).map((c) => (
                <p key={c.code} className="text-xs font-semibold text-gray-600">
                  {c.code}: {c.title}
                </p>
              ))}
            </div>
          </div>

          {/* Academic Year */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-gray-500 block">Academic Year</label>
            <div className="px-4 py-3 bg-[#FAF6F6] rounded-2xl text-sm font-semibold text-lexgo-dark">
              {academicYear}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-lexgo-dark hover:bg-gray-50 transition cursor-pointer bg-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A1128] text-white text-sm font-bold hover:bg-opacity-90 transition cursor-pointer border-0"
            >
              <Plus size={15} strokeWidth={3} />
              Assign Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ── Row action menu ─────────────────────────────────────────── */
const RowMenu = ({ onView, onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 cursor-pointer border-0 bg-transparent transition"
      >
        <MoreVertical size={16} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-gray-100 rounded-xl shadow-xl z-50 py-1 animate-fade-in">
          <button
            onClick={() => { setOpen(false); onView?.(); }}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-gray-600 hover:bg-slate-50 hover:text-lexgo-dark transition cursor-pointer border-0 bg-transparent text-left"
          >
            <Eye size={13} /> View Profile
          </button>
          <button
            onClick={() => { setOpen(false); onEdit?.(); }}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-gray-600 hover:bg-slate-50 hover:text-lexgo-dark transition cursor-pointer border-0 bg-transparent text-left"
          >
            <Pencil size={13} /> Assign Course
          </button>
          <button
            onClick={() => { setOpen(false); onDelete?.(); }}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-50 hover:text-red-600 transition cursor-pointer border-0 bg-transparent text-left"
          >
            <Trash2 size={13} /> Remove
          </button>
        </div>
      )}
    </div>
  );
};

/* ── Main page ───────────────────────────────────────────────── */
const FacultyLecturers = () => {
  const [lecturers, setLecturers] = useState([
    { id: '#30274837', name: 'Dr. Yaw Atta',       email: 'yawatta@gmail.com',      courses: 1, status: 'Active' },
    { id: '#38274638', name: 'Prof. Adjei Caleb',  email: 'ac@gmail.com',            courses: 3, status: 'Active' },
    { id: '#38274836', name: 'Prof. Kofi Brown',   email: 'kofibrown@gmail.com',     courses: 3, status: 'Active' },
    { id: '#36274837', name: 'Dr. Mike Quaye',     email: 'mikequaye@gmail.com',     courses: 3, status: 'Active' },
    { id: '#36274837', name: 'Mr. Adam Adjei',     email: 'adamadjei@gmail.com',     courses: 3, status: 'Active' },
    { id: '#36274837', name: 'Mr. Adam Adjei',     email: 'adamadjei@gmail.com',     courses: 3, status: 'Active' },
    { id: '#36274838', name: 'Dr. Sarah Johnson',  email: 'sarah.j@gmail.com',       courses: 2, status: 'Active' },
    { id: '#36274839', name: 'Prof. Ama Asante',   email: 'ama.asante@gmail.com',    courses: 4, status: 'Active' },
    { id: '#36274840', name: 'Mr. Eric Darko',     email: 'ericdarko@gmail.com',     courses: 2, status: 'Inactive' },
    { id: '#36274841', name: 'Dr. Nana Boateng',   email: 'nana.b@gmail.com',        courses: 3, status: 'Active' },
    { id: '#36274842', name: 'Prof. Abena Mensah', email: 'abena.m@gmail.com',       courses: 5, status: 'Active' },
    { id: '#36274843', name: 'Mr. Samuel Osei',    email: 'samuelosei@gmail.com',    courses: 2, status: 'Inactive' },
  ]);

  const [search,       setSearch]       = useState('');
  const [typeFilter,   setTypeFilter]   = useState('All Types');
  const [statusFilter, setStatusFilter] = useState('All Priorities');

  // Modals
  const [viewLecturer,   setViewLecturer]   = useState(null); // { lecturer, avatarBg }
  const [assignLecturer, setAssignLecturer] = useState(null); // lecturer object

  /* stats */
  const totalLecturers   = lecturers.length;
  const activeLecturers  = lecturers.filter((l) => l.status === 'Active').length;
  const totalCourses     = lecturers.reduce((s, l) => s + l.courses, 0);
  const totalAssignments = totalCourses;

  const filtered = lecturers.filter((l) => {
    const q = search.toLowerCase();
    const matchSearch =
      l.name.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      l.id.toLowerCase().includes(q);
    const matchStatus =
      statusFilter === 'All Priorities' ||
      l.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const stats = [
    { label: 'Total Lecturers',   value: totalLecturers,   color: 'bg-blue-600' },
    { label: 'Active Lecturers',  value: activeLecturers,  color: 'bg-red-500' },
    { label: 'Total Courses',     value: totalCourses,     color: 'bg-yellow-400' },
    { label: 'Total Assignments', value: totalAssignments, color: 'bg-emerald-500' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-2xs flex items-center gap-4">
            <div className={`w-1 h-10 ${s.color} rounded-full shrink-0`} />
            <div>
              <span className="text-[11px] font-bold text-gray-400 block">{s.label}</span>
              <span className="text-2xl font-extrabold text-lexgo-dark">{s.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Filters ── */}
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <div className="relative flex-1 w-full">
          <Search size={15} className="absolute left-3.5 top-3.5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by title & description"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#FAF6F6] rounded-2xl text-xs font-semibold text-lexgo-dark placeholder-gray-400 focus:outline-none border-0"
          />
        </div>
        <div className="relative shrink-0">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="pl-4 pr-9 py-3 bg-[#FAF6F6] rounded-2xl text-xs font-bold text-lexgo-dark focus:outline-none appearance-none border-0 cursor-pointer"
          >
            <option>All Types</option>
            <option>Professor</option>
            <option>Doctor</option>
            <option>Mister</option>
          </select>
          <ChevronDown size={14} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
        </div>
        <div className="relative shrink-0">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-4 pr-9 py-3 bg-[#FAF6F6] rounded-2xl text-xs font-bold text-lexgo-dark focus:outline-none appearance-none border-0 cursor-pointer"
          >
            <option value="All Priorities">All Priorities</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <ChevronDown size={14} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-white border border-gray-100 rounded-3xl shadow-2xs overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-50">
          <h2 className="font-extrabold text-lexgo-dark text-base">All Lecturers</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="text-left px-6 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-wider w-[260px]">Lecturer</th>
                <th className="text-left px-4 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-wider">Email</th>
                <th className="text-left px-4 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-wider">Courses</th>
                <th className="text-left px-4 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-4 text-xs font-extrabold text-gray-400 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length > 0 ? (
                filtered.map((lec, idx) => {
                  const initials = getInitials(lec.name);
                  const avatarBg = avatarColors[idx % avatarColors.length];
                  const isActive = lec.status === 'Active';
                  return (
                    <tr key={idx} className="hover:bg-slate-50/60 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl ${avatarBg} text-white flex items-center justify-center font-extrabold text-sm shrink-0`}>
                            {initials}
                          </div>
                          <div>
                            <p className="text-sm font-extrabold text-lexgo-dark leading-tight">{lec.name}</p>
                            <p className="text-[11px] font-semibold text-gray-400">{lec.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm font-semibold text-gray-600">{lec.email}</span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm font-bold text-lexgo-dark">{lec.courses}</span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full ${
                          isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500'
                        }`}>
                          {lec.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <RowMenu
                          onView={() => setViewLecturer({ lecturer: lec, avatarBg })}
                          onEdit={() => setAssignLecturer(lec)}
                          onDelete={() => setLecturers((prev) => prev.filter((_, i) => i !== idx))}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-400 font-bold text-sm">
                    No lecturers match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-50">
          <span className="text-xs font-bold text-gray-400">
            Showing {filtered.length} of {lecturers.length} lecturers
          </span>
        </div>
      </div>

      {/* ── View Profile Modal ── */}
      {viewLecturer && (
        <ViewProfileModal
          lecturer={viewLecturer.lecturer}
          avatarBg={viewLecturer.avatarBg}
          onClose={() => setViewLecturer(null)}
          onAssign={(lec) => setAssignLecturer(lec)}
        />
      )}

      {/* ── Assign Course Modal ── */}
      {assignLecturer && (
        <AssignCourseModal
          lecturer={assignLecturer}
          onClose={() => setAssignLecturer(null)}
        />
      )}
    </div>
  );
};

export default FacultyLecturers;
