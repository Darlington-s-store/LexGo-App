import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  BookOpen, 
  BarChart3, 
  Users, 
  GraduationCap, 
  ShieldCheck, 
  Settings, 
  LogOut,
  Bell,
  Menu,
  X,
  ChevronDown,
  UserCircle
} from 'lucide-react';

// Subcomponents
import FacultyDashboardHome from './FacultyDashboardHome';
import FacultyStudents from './FacultyStudents';
import FacultyCourses from './FacultyCourses';
import FacultyAnalysis from './FacultyAnalysis';
import FacultyMembers from './FacultyMembers';
import FacultyLecturers from './FacultyLecturers';
import FacultyAuditLog from './FacultyAuditLog';
import FacultySettings from './FacultySettings';
import FacultyNotifications from './FacultyNotifications';

/* ─── Logo SVG (shared) ─────────────────────────────────────── */
const LogoIcon = () => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6 text-white"
  >
    <circle cx="50" cy="9.5" r="4.5" fill="currentColor" />
    <line x1="50" y1="14" x2="50" y2="22" strokeWidth="3" />
    <line x1="16" y1="24" x2="84" y2="24" strokeWidth="4" />
    <path d="M 6,54 L 16,24 L 26,54" strokeWidth="2.5" />
    <path d="M 6,54 L 26,54 A 10,9 0 0 1 6,54 Z" fill="currentColor" />
    <path d="M 74,54 L 84,24 L 94,54" strokeWidth="2.5" />
    <path d="M 74,54 L 94,54 A 10,9 0 0 1 74,54 Z" fill="currentColor" />
    <path d="M 44,24 L 56,24 C 55,26 53,28 53,30 L 53,68 C 53,74 55,78 57,82 L 43,82 C 45,78 47,74 47,68 L 47,30 C 47,28 45,26 44,24 Z" fill="currentColor" />
    <path d="M 21,88 L 79,88 C 79,85 78,82 75,82 L 25,82 C 22,82 21,85 21,88 Z" fill="currentColor" />
  </svg>
);

/* ─── Nav items ─────────────────────────────────────────────── */
const menuItems = [
  { name: 'Dashboard',      icon: LayoutDashboard },
  { name: 'Student',        icon: User },
  { name: 'Courses',        icon: BookOpen },
  { name: 'Analysis',       icon: BarChart3 },
  { name: 'Faculty Members',icon: Users },
  { name: 'Lecturers',      icon: GraduationCap },
  { name: 'Audit Log',      icon: ShieldCheck },
  { name: 'Settings',       icon: Settings },
];

/* ─── Sidebar nav list (reused for desktop + mobile) ───────── */
const SidebarNav = ({ activeTab, onTabChange }) => (
  <nav className="space-y-1">
    {menuItems.map((item) => {
      const Icon = item.icon;
      const isActive = activeTab === item.name;
      return (
        <button
          key={item.name}
          onClick={() => onTabChange(item.name)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition cursor-pointer border-0 text-left ${
            isActive
              ? 'bg-gradient-to-r from-slate-800 to-[#0A1128] text-white shadow-xs'
              : 'text-gray-500 hover:bg-slate-50 hover:text-lexgo-dark bg-transparent'
          }`}
        >
          <Icon size={18} className="shrink-0" />
          <span>{item.name}</span>
        </button>
      );
    })}
  </nav>
);

/* ─── Profile dropdown (topbar) ─────────────────────────────── */
const ProfileDropdown = ({ onSignOut }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
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
        id="profile-dropdown-trigger"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-2xl hover:bg-slate-50 transition cursor-pointer border-0 bg-transparent"
      >
        <div className="w-9 h-9 bg-[#0A1128] text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
          JS
        </div>
        <div className="hidden sm:block leading-none text-left">
          <h4 className="text-sm font-bold text-lexgo-dark">John Smith</h4>
          <span className="text-[10px] font-semibold text-gray-400">Head of Faculty</span>
        </div>
        <ChevronDown
          size={14}
          className={`hidden sm:block text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden animate-fade-in">
          {/* User info header */}
          <div className="px-4 py-4 border-b border-gray-50 flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0A1128] text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
              JS
            </div>
            <div className="leading-none">
              <p className="text-sm font-extrabold text-lexgo-dark">John Smith</p>
              <span className="text-[10px] font-semibold text-gray-400">Head of Faculty</span>
            </div>
          </div>

          {/* Menu actions */}
          <div className="p-2 space-y-0.5">
            <button
              onClick={() => { setOpen(false); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-gray-500 hover:bg-slate-50 hover:text-lexgo-dark rounded-xl transition cursor-pointer border-0 bg-transparent text-left"
            >
              <UserCircle size={16} className="shrink-0" />
              <span>My Profile</span>
            </button>
            <button
              onClick={() => { setOpen(false); onSignOut(); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-gray-500 hover:bg-rose-50 hover:text-rose-600 rounded-xl transition cursor-pointer border-0 bg-transparent text-left"
            >
              <LogOut size={16} className="shrink-0" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* ─── Main layout ───────────────────────────────────────────── */
const FacultyLayout = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [headerSubtitle, setHeaderSubtitle] = useState('Faculty of Law, Management');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = () => navigate('/role-selection');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':      return <FacultyDashboardHome setTab={setActiveTab} />;
      case 'Student':        return <FacultyStudents setHeaderSubtitle={setHeaderSubtitle} />;
      case 'Courses':        return <FacultyCourses />;
      case 'Analysis':       return <FacultyAnalysis />;
      case 'Faculty Members':return <FacultyMembers />;
      case 'Lecturers':      return <FacultyLecturers />;
      case 'Audit Log':      return <FacultyAuditLog />;
      case 'Settings':       return <FacultySettings />;
      case 'Notifications':  return <FacultyNotifications />;
      default:               return <FacultyDashboardHome setTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">

      {/* ── Mobile Drawer ── */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer panel — solid white, no blur applied here */}
          <aside className="relative z-10 w-64 max-w-xs bg-white flex flex-col h-full p-6 shadow-2xl">
            {/* Close + Logo */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#0A1128] text-white rounded-xl flex items-center justify-center shrink-0">
                  <LogoIcon />
                </div>
                <div>
                  <h2 className="font-extrabold text-lexgo-dark text-base leading-none">LexGo</h2>
                  <span className="text-[10px] font-bold text-gray-400">Faculty Application</span>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-lexgo-dark hover:bg-slate-50 border-0 bg-transparent cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Nav */}
            <div className="flex-1 overflow-y-auto">
              <SidebarNav activeTab={activeTab} onTabChange={handleTabChange} />
            </div>
          </aside>
        </div>
      )}

      {/* ── Desktop Sidebar ── */}
      <aside className="w-64 bg-white border-r border-gray-100 shrink-0 hidden md:flex flex-col h-screen sticky top-0">
        <div className="p-6 space-y-8 flex-1 overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0A1128] text-white rounded-xl flex items-center justify-center shrink-0">
              <LogoIcon />
            </div>
            <div>
              <h2 className="font-extrabold text-lexgo-dark text-base leading-none">LexGo</h2>
              <span className="text-[10px] font-bold text-gray-400">Faculty Application</span>
            </div>
          </div>

          {/* Nav */}
          <SidebarNav activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
        {/* No sign-out here — moved to topbar dropdown */}
      </aside>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Hamburger (mobile only) */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl text-gray-500 hover:text-lexgo-dark hover:bg-slate-50 transition cursor-pointer border-0 bg-transparent shrink-0"
            >
              <Menu size={20} />
            </button>
            <div className="space-y-0.5">
              <h1 className="text-lg md:text-xl font-extrabold text-lexgo-dark leading-none">{activeTab}</h1>
              <span className="text-[10px] md:text-xs font-semibold text-gray-400">{headerSubtitle}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification Bell — wired to Notifications tab */}
            <button
              id="notifications-bell-btn"
              onClick={() => setActiveTab('Notifications')}
              className="relative w-10 h-10 border border-gray-100 rounded-full flex items-center justify-center hover:bg-gray-50 text-lexgo-dark transition cursor-pointer shadow-2xs bg-transparent"
            >
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-600 rounded-full" />
            </button>

            {/* Profile Dropdown */}
            <ProfileDropdown onSignOut={handleSignOut} />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto max-w-7xl w-full mx-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default FacultyLayout;
