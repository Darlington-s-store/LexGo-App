import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, MoreVertical, Mail, BookOpen, Eye, Pencil, Trash2 } from 'lucide-react';

/* ── Colour map for avatar initials ─────────────────────────── */
const avatarColors = [
  'bg-[#0A1128]',
  'bg-indigo-600',
  'bg-emerald-600',
  'bg-amber-500',
  'bg-rose-600',
  'bg-violet-600',
  'bg-cyan-600',
];

const getInitials = (name) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

/* ── Action dropdown per row ─────────────────────────────────── */
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
            <Pencil size={13} /> Edit Details
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

/* ── Main component ──────────────────────────────────────────── */
const FacultyLecturers = () => {
  const [lecturers, setLecturers] = useState([
    { id: '#30274837', name: 'Dr. Yaw Atta',      email: 'yawatta@gmail.com',     courses: 1, status: 'Active' },
    { id: '#38274638', name: 'Prof. Adjei Caleb', email: 'ac@gmail.com',           courses: 3, status: 'Active' },
    { id: '#38274836', name: 'Prof. Kofi Brown',  email: 'kofibrown@gmail.com',    courses: 3, status: 'Active' },
    { id: '#36274837', name: 'Dr. Mike Quaye',    email: 'mikequaye@gmail.com',    courses: 3, status: 'Active' },
    { id: '#36274837', name: 'Mr. Adam Adjei',    email: 'adamadjei@gmail.com',    courses: 3, status: 'Active' },
    { id: '#36274837', name: 'Mr. Adam Adjei',    email: 'adamadjei@gmail.com',    courses: 3, status: 'Active' },
    { id: '#36274837', name: 'Dr. Sarah Johnson', email: 'sarah.j@gmail.com',      courses: 2, status: 'Active' },
    { id: '#36274838', name: 'Prof. Ama Asante',  email: 'ama.asante@gmail.com',   courses: 4, status: 'Active' },
    { id: '#36274839', name: 'Mr. Eric Darko',    email: 'ericdarko@gmail.com',    courses: 2, status: 'Inactive' },
    { id: '#36274840', name: 'Dr. Nana Boateng',  email: 'nana.b@gmail.com',       courses: 3, status: 'Active' },
    { id: '#36274841', name: 'Prof. Abena Mensah',email: 'abena.m@gmail.com',      courses: 5, status: 'Active' },
    { id: '#36274842', name: 'Mr. Samuel Osei',   email: 'samuelosei@gmail.com',   courses: 2, status: 'Inactive' },
  ]);

  const [search, setSearch]       = useState('');
  const [typeFilter, setTypeFilter]       = useState('All Types');
  const [statusFilter, setStatusFilter]   = useState('All Priorities');

  /* derived stats */
  const totalLecturers      = lecturers.length;
  const activeLecturers     = lecturers.filter((l) => l.status === 'Active').length;
  const totalCourses        = lecturers.reduce((s, l) => s + l.courses, 0);
  const totalAssignments    = totalCourses; // same as courses for demo

  const filtered = lecturers.filter((l) => {
    const q = search.toLowerCase();
    const matchSearch =
      l.name.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      l.id.toLowerCase().includes(q);
    const matchStatus =
      statusFilter === 'All Priorities' ||
      (statusFilter === 'Active' && l.status === 'Active') ||
      (statusFilter === 'Inactive' && l.status === 'Inactive');
    return matchSearch && matchStatus;
  });

  const handleRemove = (idx) =>
    setLecturers((prev) => prev.filter((_, i) => i !== idx));

  const stats = [
    { label: 'Total Lecturers',    value: totalLecturers,   color: 'bg-blue-600' },
    { label: 'Active Lecturers',   value: activeLecturers,  color: 'bg-red-500' },
    { label: 'Total Courses',      value: totalCourses,     color: 'bg-yellow-400' },
    { label: 'Total Assignments',  value: totalAssignments, color: 'bg-emerald-500' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-2xs flex items-center gap-4 relative overflow-hidden">
            <div className={`w-1 h-10 ${s.color} rounded-full shrink-0`} />
            <div>
              <span className="text-[11px] font-bold text-gray-400 block">{s.label}</span>
              <span className="text-2xl font-extrabold text-lexgo-dark">{s.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Search + Filters ── */}
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        {/* Search */}
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

        {/* Type filter */}
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

        {/* Status filter */}
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
        {/* Table title */}
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
                  const initials   = getInitials(lec.name);
                  const avatarBg   = avatarColors[idx % avatarColors.length];
                  const isActive   = lec.status === 'Active';

                  return (
                    <tr key={idx} className="hover:bg-slate-50/60 transition">
                      {/* Lecturer */}
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

                      {/* Email */}
                      <td className="px-4 py-4">
                        <span className="text-sm font-semibold text-gray-600">{lec.email}</span>
                      </td>

                      {/* Courses */}
                      <td className="px-4 py-4">
                        <span className="text-sm font-bold text-lexgo-dark">{lec.courses}</span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4">
                        <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full ${
                          isActive
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'bg-rose-50 text-rose-500'
                        }`}>
                          {lec.status}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="px-4 py-4">
                        <RowMenu
                          onView={() => {}}
                          onEdit={() => {}}
                          onDelete={() => handleRemove(idx)}
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

        {/* Footer row count */}
        <div className="px-6 py-4 border-t border-gray-50 flex items-center justify-between">
          <span className="text-xs font-bold text-gray-400">
            Showing {filtered.length} of {lecturers.length} lecturers
          </span>
        </div>
      </div>
    </div>
  );
};

export default FacultyLecturers;
