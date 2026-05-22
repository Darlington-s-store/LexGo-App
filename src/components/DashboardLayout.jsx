import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Scale, 
  GraduationCap, 
  HelpCircle, 
  MessageSquare, 
  LineChart, 
  LogOut, 
  Bell, 
  User, 
  Menu, 
  X,
  ChevronDown,
  Sparkles
} from 'lucide-react';

const DashboardLayout = ({ children, title = 'Home' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Cases', path: '/dashboard/cases', icon: Scale },
    { name: 'Quiz', path: '/dashboard/quiz', icon: HelpCircle },
    { name: 'Courses', path: '/dashboard/courses', icon: GraduationCap },
    { name: 'AI Assistant', path: '/dashboard/ai', icon: Sparkles },
    { name: 'Companion', path: '/dashboard/companion', icon: MessageSquare },
    { name: 'Academic Record', path: '/dashboard/records', icon: LineChart },
    { name: 'Help Center', path: '/dashboard/help', icon: HelpCircle },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white text-lexgo-dark">
      {/* Branding Header */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-100/50">
        <svg 
          className="w-8 h-8 text-lexgo-dark flex-shrink-0" 
          viewBox="0 0 100 100" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {/* Top Ball */}
          <circle cx="50" cy="9.5" r="4.5" fill="currentColor" />
          
          {/* Stem */}
          <line x1="50" y1="14" x2="50" y2="22" strokeWidth="3" />
          
          {/* Crossbeam */}
          <line x1="16" y1="24" x2="84" y2="24" strokeWidth="4" />
          
          {/* Left Hanger Strings */}
          <path d="M 6,54 L 16,24 L 26,54" strokeWidth="2.5" />
          
          {/* Left Scale Pan */}
          <path d="M 6,54 L 26,54 A 10,9 0 0 1 6,54 Z" fill="currentColor" />
          
          {/* Right Hanger Strings */}
          <path d="M 74,54 L 84,24 L 94,54" strokeWidth="2.5" />
          
          {/* Right Scale Pan */}
          <path d="M 74,54 L 94,54 A 10,9 0 0 1 74,54 Z" fill="currentColor" />
          
          {/* Pillar */}
          <path 
            d="M 44,24 L 56,24 C 55,26 53,28 53,30 L 53,68 C 53,74 55,78 57,82 L 43,82 C 45,78 47,74 47,68 L 47,30 C 47,28 45,26 44,24 Z" 
            fill="currentColor" 
          />
          
          {/* Pedestal Base */}
          <path 
            d="M 21,88 L 79,88 C 79,85 78,82 75,82 L 25,82 C 22,82 21,85 21,88 Z" 
            fill="currentColor" 
          />
        </svg>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-lexgo-dark leading-none">LexGo</h2>
          <span className="text-[10px] text-gray-400 font-medium tracking-wide">Smart Legal Learning</span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition duration-150 cursor-pointer ${
                isActive 
                  ? 'bg-[#1E293B] text-white shadow-sm' 
                  : 'text-gray-500 hover:text-lexgo-dark hover:bg-gray-50'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-white' : 'text-gray-400'} />
              {item.name}
            </button>
          );
        })}
      </nav>

      {/* Quick Stats (Bottom Sidebar Section) */}
      <div className="p-4 border-t border-gray-100/50">
        <h3 className="text-xs uppercase tracking-wider text-lexgo-dark font-bold px-2 mb-3">
          Quick Stats
        </h3>
        <div className="space-y-2.5 px-2 pb-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 font-medium">Study Streak</span>
            <span className="text-[#E27D2C] font-bold">5 days</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 font-medium">Cases Studied</span>
            <span className="text-[#3B82F6] font-bold">23</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 font-medium">AI Chats</span>
            <span className="text-[#64748B] font-bold">47</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#FAFAFA]">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 lg:w-72 h-screen sticky top-0 border-r border-gray-100/80 bg-white flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 md:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer Panel */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white transition-transform duration-300 transform md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header Row */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-100/50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Hamburger button on mobile */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-1 text-gray-500 hover:text-lexgo-dark md:hidden rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              <Menu size={22} />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-lexgo-dark">
              {title}
            </h1>
          </div>

          <div className="flex items-center gap-6">
            {/* Alarm bell notification icon */}
            <div className="relative cursor-pointer hover:opacity-85 transition">
              <div className="p-2 text-lexgo-dark rounded-full bg-gray-50 hover:bg-gray-100">
                <Bell size={20} />
              </div>
              <span className="absolute -top-1 -right-1 bg-[#EA4335] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                6
              </span>
            </div>

            {/* Profile badge with dropdown */}
            <div className="relative">
              <div 
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-3 pl-2 border-l border-gray-100 cursor-pointer hover:opacity-85 transition select-none"
              >
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-semibold">
                  <User size={20} />
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-bold text-lexgo-dark leading-tight flex items-center gap-1">
                    <span>Law Student</span>
                    <ChevronDown size={14} className="text-gray-400" />
                  </div>
                  <div className="text-xs text-gray-400 font-medium">Elkanah Wiseman</div>
                </div>
              </div>

              {isProfileDropdownOpen && (
                <>
                  {/* Invisible backdrop to close dropdown on click outside */}
                  <div 
                    className="fixed inset-0 z-40 bg-transparent" 
                    onClick={() => setIsProfileDropdownOpen(false)}
                  />
                  {/* Dropdown Card */}
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 animate-fade-in">
                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        navigate('/dashboard/profile');
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:text-lexgo-dark hover:bg-gray-50 transition cursor-pointer text-left bg-transparent border-0"
                    >
                      <User size={16} className="text-gray-400" />
                      <span>My Profile</span>
                    </button>
                    
                    <hr className="border-gray-50 my-1" />

                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-red-500 hover:text-red-600 hover:bg-red-50/50 transition cursor-pointer text-left bg-transparent border-0"
                    >
                      <LogOut size={16} className="text-red-400" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Route Content */}
        <main className="flex-grow p-6 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Logout Confirmation Modal Overlay */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 relative shadow-2xl border border-gray-100 flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-lexgo-dark">Log Out</h3>
              <button 
                onClick={() => setIsLogoutModalOpen(false)}
                className="w-8 h-8 rounded-lg text-gray-500 hover:text-lexgo-dark bg-[#FAF6F6] hover:bg-gray-100 transition cursor-pointer flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Description */}
            <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium">
              Leaving already? You're about to log out. You can log back in anytime.
            </p>
            
            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-lexgo-dark text-lexgo-dark font-bold text-xs hover:bg-gray-50 transition cursor-pointer text-center"
              >
                No, Stay Logged In
              </button>
              <button
                onClick={() => {
                  setIsLogoutModalOpen(false);
                  navigate('/login');
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-lexgo-dark text-white font-bold text-xs hover:bg-opacity-95 transition cursor-pointer text-center"
              >
                Yes , Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
