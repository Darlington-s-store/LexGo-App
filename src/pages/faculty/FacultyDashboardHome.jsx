import React from 'react';
import { 
  Book, 
  TrendingUp, 
  Users, 
  PlusCircle, 
  FileText, 
  Upload, 
  UserCheck, 
  CheckCircle2, 
  Sparkles,
  UserPlus,
  UserMinus,
  BarChart2,
  ChevronRight
} from 'lucide-react';

const FacultyDashboardHome = ({ setTab }) => {
  const stats = [
    {
      title: "Total Students",
      value: "250",
      subtext: "249 active",
      icon: Users,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
      overlayColor: "bg-blue-100/50"
    },
    {
      title: "Average GPA",
      value: "3.5",
      subtext: "+1.5%",
      subtextGreen: true,
      icon: TrendingUp,
      iconColor: "text-emerald-600",
      bgColor: "bg-emerald-50",
      overlayColor: "bg-emerald-100/50"
    },
    {
      title: "Total Courses",
      value: "10",
      subtext: "Active in portal",
      icon: Book,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
      overlayColor: "bg-blue-100/50"
    }
  ];

  const quickActions = [
    {
      title: "Create Course",
      icon: PlusCircle,
      action: () => setTab('Courses'),
      color: "text-lexgo-dark"
    },
    {
      title: "View Assessments",
      icon: FileText,
      action: () => setTab('Student'),
      color: "text-lexgo-dark"
    },
    {
      title: "View Students",
      icon: Users,
      action: () => setTab('Student'),
      color: "text-lexgo-dark"
    },
    {
      title: "Upload Exam Scores",
      icon: Upload,
      action: () => setTab('Analysis'),
      color: "text-lexgo-dark"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "onboarded",
      title: "New Student Onboarded",
      desc: "John Smith(12345678) • 2 mins ago",
      tag: "Exams",
      icon: UserPlus,
      iconBg: "bg-blue-50 text-blue-600"
    },
    {
      id: 2,
      type: "approved_exam",
      title: "LAW-001 Examination Approved",
      desc: "Elkanah Wiseman • 2 mins ago",
      tag: "Exams",
      icon: CheckCircle2,
      iconBg: "bg-emerald-50 text-emerald-600"
    },
    {
      id: 3,
      type: "approved_results",
      title: "Approved exam results for Law100",
      desc: "Elkanah Wiseman • 2 mins ago",
      tag: "Exams",
      icon: CheckCircle2,
      iconBg: "bg-emerald-50 text-emerald-600"
    },
    {
      id: 4,
      type: "approved_results_2",
      title: "Approved exam results for Law100",
      desc: "Elkanah Wiseman • 2 mins ago",
      tag: "Exams",
      icon: CheckCircle2,
      iconBg: "bg-emerald-50 text-emerald-600"
    }
  ];

  const aiInsights = [
    {
      id: 1,
      title: "12 new top performers",
      desc: "2 mins ago",
      tag: "Students",
      icon: UserCheck,
      iconBg: "bg-emerald-50 text-emerald-600"
    },
    {
      id: 2,
      title: "2 Level 100 students at risk",
      desc: "2 mins ago",
      tag: "Students",
      icon: UserMinus,
      iconBg: "bg-rose-50 text-rose-500"
    },
    {
      id: 3,
      title: "2 new Second upper students",
      desc: "2 mins ago",
      tag: "Students",
      icon: TrendingUp,
      iconBg: "bg-emerald-50 text-emerald-600"
    },
    {
      id: 4,
      title: "Average GPA has increase by 0.5",
      desc: "2 mins ago",
      tag: "Students",
      icon: BarChart2,
      iconBg: "bg-emerald-50 text-emerald-600"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Banner */}
      <div className="bg-[#0A1128] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden pattern-bg">
        {/* Faint overlay to ensure high contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-lexgo-dark/95 to-lexgo-dark/80 z-[1]" />
        
        <div className="relative z-10 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Faculty Dashboard</h1>
            <p className="text-gray-300 text-sm sm:text-base max-w-xl font-medium leading-relaxed">
              Welcome to LexGo Faculty Management system. AI powered insights, natural language search, and comprehensive analytics
            </p>
          </div>

          {/* Academic Info Chips */}
          <div className="flex flex-wrap gap-4 pt-2">
            <div className="bg-white/10 backdrop-blur-md border border-white/10 px-5 py-3 rounded-2xl flex flex-col justify-center min-w-[130px]">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Academic Year</span>
              <span className="text-base font-extrabold text-white">2026/27</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/10 px-5 py-3 rounded-2xl flex flex-col justify-center min-w-[130px]">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Current Semester</span>
              <span className="text-base font-extrabold text-white">1st Sem</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/10 px-5 py-3 rounded-2xl flex flex-col justify-center min-w-[130px]">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Program</span>
              <span className="text-base font-extrabold text-white">LL.B Program</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
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
                {stat.subtextGreen ? (
                  <div className="flex items-center gap-1 text-emerald-600 font-extrabold text-xs">
                    <TrendingUp size={12} />
                    <span>{stat.subtext}</span>
                  </div>
                ) : (
                  <span className="text-xs font-semibold text-gray-500 block">{stat.subtext}</span>
                )}
              </div>
              <div className={`w-14 h-14 ${stat.bgColor} rounded-full flex items-center justify-center relative z-10 ${stat.iconColor}`}>
                <Icon size={24} />
              </div>
              {/* Subtle background blob to match mockup style */}
              <div className={`absolute -right-4 -bottom-4 w-28 h-28 ${stat.overlayColor} rounded-full blur-xl pointer-events-none`} />
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-extrabold text-lexgo-dark">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <button
                key={idx}
                onClick={action.action}
                className="bg-white border border-gray-100 hover:border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition duration-200 flex flex-col items-center justify-center text-center gap-3 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-lexgo-dark group-hover:bg-gray-50 transition">
                  <Icon size={20} className="stroke-[2.5]" />
                </div>
                <span className="text-sm font-bold text-lexgo-dark">{action.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lower Section (Activity & Insights) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-7 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-extrabold text-lexgo-dark">Recent Activity</h2>
          </div>

          <div className="divide-y divide-gray-50">
            {recentActivity.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${activity.iconBg}`}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-lexgo-dark leading-snug">{activity.title}</h4>
                      <p className="text-xs font-semibold text-gray-400">{activity.desc}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold text-gray-500 uppercase bg-gray-50 px-2.5 py-1 rounded-md tracking-wider">
                    {activity.tag}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Powered Insights */}
        <div className="lg:col-span-5 bg-[#EAE8F9] rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sparkles size={20} className="text-indigo-600 fill-indigo-600/20" />
                <h2 className="text-lg font-extrabold text-indigo-950">AI powered Insights</h2>
              </div>
              <button 
                onClick={() => setTab('Analysis')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition flex items-center gap-0.5 cursor-pointer"
              >
                <span>View All</span>
                <ChevronRight size={14} />
              </button>
            </div>

            <div className="space-y-4">
              {aiInsights.map((insight) => {
                const Icon = insight.icon;
                return (
                  <div key={insight.id} className="bg-white rounded-2xl p-4 flex items-center justify-between gap-3 shadow-xs border border-indigo-50/50">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${insight.iconBg}`}>
                        <Icon size={16} />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-indigo-950 leading-tight">{insight.title}</h4>
                        <p className="text-[10px] font-semibold text-gray-400">{insight.desc}</p>
                      </div>
                    </div>
                    <span className="text-[9px] font-extrabold text-indigo-500 uppercase bg-indigo-50 px-2 py-0.5 rounded-md tracking-wider">
                      {insight.tag}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboardHome;
