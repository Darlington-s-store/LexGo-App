import React, { useState } from 'react';
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
  X
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

const FacultyLayout = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [headerSubtitle, setHeaderSubtitle] = useState('Faculty of Law, Management');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Student', icon: User },
    { name: 'Courses', icon: BookOpen },
    { name: 'Analysis', icon: BarChart3 },
    { name: 'Faculty Members', icon: Users },
    { name: 'Lecturers', icon: GraduationCap },
    { name: 'Audit Log', icon: ShieldCheck },
    { name: 'Settings', icon: Settings }
  ];

  const handleSignOut = () => {
    navigate('/role-selection');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <FacultyDashboardHome setTab={setActiveTab} />;
      case 'Student':
        return <FacultyStudents setHeaderSubtitle={setHeaderSubtitle} />;
      case 'Courses':
        return <FacultyCourses />;
      case 'Analysis':
        return <FacultyAnalysis />;
      case 'Faculty Members':
        return <FacultyMembers />;
      case 'Lecturers':
        return <FacultyLecturers />;
      case 'Audit Log':
        return <FacultyAuditLog />;
      case 'Settings':
        return <FacultySettings />;
      default:
        return <FacultyDashboardHome setTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans relative">
      {/* Mobile Drawer Slide-over */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity animate-fade-in"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Drawer content panel */}
          <aside className="relative w-64 max-w-xs bg-white flex flex-col justify-between h-full p-6 animate-slide-in shadow-2xl">
            <div className="space-y-8">
              {/* Close Button & Logo */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#0A1128] text-white rounded-xl flex items-center justify-center shrink-0">
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

              {/* Navigation Links */}
              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.name;
                  return (
                    <button
                      key={item.name}
                      onClick={() => {
                        setActiveTab(item.name);
                        setIsMobileMenuOpen(false);
                      }}
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
            </div>

            {/* Sign Out Button */}
            <div className="pt-6 border-t border-gray-50">
              <button 
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-rose-600 hover:bg-rose-50/50 rounded-xl text-sm font-bold transition cursor-pointer border-0 bg-transparent"
              >
                <LogOut size={18} className="rotate-180" />
                <span>Sign Out</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col justify-between shrink-0 hidden md:flex h-screen sticky top-0">
        <div className="p-6 space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0A1128] text-white rounded-xl flex items-center justify-center shrink-0">
              {/* Scale icon */}
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
            </div>
            <div>
              <h2 className="font-extrabold text-lexgo-dark text-base leading-none">LexGo</h2>
              <span className="text-[10px] font-bold text-gray-400">Faculty Application</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
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
        </div>

        {/* Sign Out Button */}
        <div className="p-6 border-t border-gray-50">
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-rose-600 hover:bg-rose-50/50 rounded-xl text-sm font-bold transition cursor-pointer border-0 bg-transparent"
          >
            <LogOut size={18} className="rotate-180" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Hamburger Button */}
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

          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <button className="w-10 h-10 border border-gray-100 rounded-full flex items-center justify-center hover:bg-gray-50 text-lexgo-dark transition relative cursor-pointer shadow-2xs bg-transparent">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-600 rounded-full" />
            </button>

            {/* Profile Avatar Card */}
            <div className="flex items-center gap-3 pl-2">
              <div className="w-10 h-10 bg-[#0A1128] text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                JS
              </div>
              <div className="hidden sm:block leading-none">
                <h4 className="text-sm font-bold text-lexgo-dark">John Smith</h4>
                <span className="text-[10px] font-semibold text-gray-400">Head of Faculty</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Container */}
        <main className="flex-1 p-6 overflow-y-auto max-w-7xl w-full mx-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default FacultyLayout;
