import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Scale, 
  MessageSquare, 
  HelpCircle, 
  Notebook, 
  BookOpen, 
  Book, 
  ChevronRight 
} from 'lucide-react';

const DashboardHome = () => {
  const navigate = useNavigate();

  const handleActionClick = (action) => {
    if (action === 'Practice Quiz') {
      navigate('/dashboard/quiz');
    } else if (action === 'Ask AI') {
      navigate('/dashboard/ai');
    } else if (action === 'Dictionary') {
      navigate('/dashboard/dictionary');
    } else if (action === 'Take Notes') {
      navigate('/dashboard/notes');
    }
  };

  const quickActions = [
    {
      title: 'Practice Quiz',
      subtext: 'Test your knowledge',
      icon: MessageSquare,
      bg: 'bg-[#FEF6E4]',
      color: 'text-[#D97706]',
    },
    {
      title: 'Ask AI',
      subtext: 'Get instant help with legal concept',
      icon: HelpCircle,
      bg: 'bg-[#E0F2FE]',
      color: 'text-[#0284C7]',
    },
    {
      title: 'Take Notes',
      subtext: 'organize your thoughts',
      icon: Notebook,
      bg: 'bg-[#FCE7F3]',
      color: 'text-[#DB2777]',
    },
    {
      title: 'Dictionary',
      subtext: 'Study landmark decisions',
      icon: BookOpen,
      bg: 'bg-[#F3F4F6]',
      color: 'text-[#4B5563]',
    },
  ];

  const recentActivities = [];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Case of the Day Banner */}
      <section className="relative overflow-hidden bg-lexgo-dark text-white rounded-3xl p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center shadow-lg border border-slate-800">
        
        {/* Left Side Info */}
        <div className="z-10 max-w-xl space-y-4">
          <div className="flex items-center gap-2.5 text-slate-300 font-semibold text-sm sm:text-base">
            <Scale size={18} className="text-white" />
            <span className="tracking-wide">Case of the Day</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white/40">
            No Case of the Day Selected
          </h2>
          
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-light">
            Please add cases or select a landmark decision from the Cases page to feature it here.
          </p>
          
          <button 
            type="button" 
            disabled
            className="inline-flex items-center justify-center bg-slate-800/40 border border-slate-700/40 text-slate-500 text-sm font-semibold px-6 py-2.5 rounded-xl cursor-not-allowed shadow-sm select-none"
          >
            Read Full Case
          </button>
        </div>

        {/* Right Side Scale Watermark SVG */}
        <div className="absolute right-0 bottom-0 md:-right-4 md:-bottom-8 w-64 h-64 md:w-80 md:h-80 opacity-[0.06] md:opacity-[0.08] pointer-events-none text-white z-0">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full"
          >
            <circle cx="50" cy="9.5" r="4.5" fill="currentColor" />
            <line x1="50" y1="14" x2="50" y2="22" strokeWidth="3" />
            <line x1="16" y1="24" x2="84" y2="24" strokeWidth="4" />
            <path d="M 6,54 L 16,24 L 26,54" strokeWidth="2" />
            <path d="M 6,54 L 26,54 A 10,9 0 0 1 6,54 Z" fill="currentColor" />
            <path d="M 74,54 L 84,24 L 94,54" strokeWidth="2" />
            <path d="M 74,54 L 94,54 A 10,9 0 0 1 74,54 Z" fill="currentColor" />
            <path d="M 44,24 L 56,24 C 55,26 53,28 53,30 L 53,68 C 53,74 55,78 57,82 L 43,82 C 45,78 47,74 47,68 L 47,30 C 47,28 45,26 44,24 Z" fill="currentColor" />
            <path d="M 21,88 L 79,88 C 79,85 78,82 75,82 L 25,82 C 22,82 21,85 21,88 Z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section>
        <h3 className="text-lg sm:text-xl font-bold text-lexgo-dark mb-4 tracking-tight">
          Quick Actions
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <div
                key={action.title}
                onClick={() => handleActionClick(action.title)}
                className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center transition duration-200 hover:shadow-md hover:border-gray-200 cursor-pointer group"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition duration-200 group-hover:scale-105 ${action.bg} ${action.color}`}>
                  <Icon size={20} strokeWidth={2.5} />
                </div>
                
                <h4 className="font-bold text-lexgo-dark text-sm sm:text-base tracking-tight">
                  {action.title}
                </h4>
                
                <p className="text-gray-400 text-xs mt-1 leading-normal font-medium">
                  {action.subtext}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recent Activity Section */}
      <section>
        <h3 className="text-lg sm:text-xl font-bold text-lexgo-dark mb-4 tracking-tight">
          Recent Activity
        </h3>

        <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
          {recentActivities.length > 0 ? (
            <div className="divide-y divide-gray-50">
              {recentActivities.map((activity) => (
                <div 
                  key={activity.id}
                  onClick={() => navigate('/dashboard/cases')}
                  className="flex items-center justify-between p-4 sm:p-5 hover:bg-gray-50/50 transition cursor-pointer group"
                >
                  <div className="flex items-center min-w-0">
                    {/* Book icon wrapper */}
                    <div className="w-10 h-10 rounded-2xl bg-[#E6F4EA] text-[#137333] flex items-center justify-center flex-shrink-0 mr-4">
                      <Book size={18} strokeWidth={2.5} />
                    </div>
                    
                    <div className="min-w-0">
                      <h4 className="font-bold text-lexgo-dark text-sm sm:text-base tracking-tight truncate">
                        {activity.title}
                      </h4>
                      <span className="text-xs text-gray-400 font-medium">
                        {activity.time}
                      </span>
                    </div>
                  </div>

                  {/* Chevron icon right */}
                  <ChevronRight size={18} className="text-gray-300 group-hover:text-lexgo-dark transition duration-150 flex-shrink-0 ml-4" />
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-400 font-medium text-sm">
              No recent activity.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DashboardHome;
