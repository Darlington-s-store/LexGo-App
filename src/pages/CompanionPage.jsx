import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  BookOpen, 
  Scale, 
  HelpCircle, 
  GraduationCap, 
  LineChart,
  ArrowRight,
  Shield,
  Lightbulb,
  FileText,
  Book,
  Notebook
} from 'lucide-react';

const CompanionPage = () => {
  const navigate = useNavigate();

  // Background Watermark Cells & Symbols
  const gridCells = useMemo(() => Array.from({ length: 24 }), []);
  const watermarkSymbols = useMemo(() => [Scale, BookOpen, Shield, Lightbulb, Sparkles, FileText, Book], []);

  const tools = [
    {
      title: 'Ask AI',
      description: 'Ask questions, clarify complex legal concepts, and get instant guidance on Ghanaian and common law.',
      icon: Sparkles,
      colorClass: 'text-violet-600 bg-violet-50 border-violet-100',
      route: '/dashboard/ai',
      badge: 'Interactive AI',
      buttonText: 'Launch Chat'
    },
    {
      title: 'Law Dictionary',
      description: 'Explore legal definitions, look up key terms alphabetically, and listen to spoken text-to-speech audio.',
      icon: BookOpen,
      colorClass: 'text-amber-600 bg-amber-50 border-amber-100',
      route: '/dashboard/dictionary',
      badge: 'Reference',
      buttonText: 'Open Dictionary'
    },
    {
      title: 'Take Notes',
      description: 'Organize your thoughts, draft brief legal summaries, and format your thoughts with our custom document editor.',
      icon: Notebook,
      colorClass: 'text-pink-600 bg-pink-50 border-pink-100',
      route: '/dashboard/notes',
      badge: 'Study Tool',
      buttonText: 'Open Notes'
    },
    {
      title: 'Landmark Cases',
      description: 'Analyze critical court rulings, facts, precedents, and judicial opinions of famous cases like Republic v. Mensah.',
      icon: Scale,
      colorClass: 'text-rose-600 bg-rose-50 border-rose-100',
      route: '/dashboard/cases',
      badge: 'Precedents',
      buttonText: 'Review Cases'
    },
    {
      title: 'Practice Quizzes',
      description: 'Reinforce your knowledge and prepare for exams with simulated multiple choice legal quizzes.',
      icon: HelpCircle,
      colorClass: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      route: '/dashboard/quiz',
      badge: 'Self-Test',
      buttonText: 'Start Quiz'
    },
    {
      title: 'Study Courses',
      description: 'Follow organized pathways through Contract Law, Constitutional Law, Criminal Law, and more.',
      icon: GraduationCap,
      colorClass: 'text-blue-600 bg-blue-50 border-blue-100',
      route: '/dashboard/courses',
      badge: 'Syllabus',
      buttonText: 'View Path'
    },
    {
      title: 'Academic Record',
      description: 'Monitor your quiz history, study streaks, active accomplishments, and course completion metrics.',
      icon: LineChart,
      colorClass: 'text-sky-600 bg-sky-50 border-sky-100',
      route: '/dashboard/records',
      badge: 'Analytics',
      buttonText: 'Open Record'
    }
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 min-h-[600px] shadow-sm relative overflow-hidden flex flex-col">
      
      {/* Rotating faint background watermark grid */}
      <div className="absolute inset-0 grid grid-cols-4 sm:grid-cols-6 grid-rows-4 gap-x-12 gap-y-16 p-8 opacity-[0.03] select-none pointer-events-none z-0">
        {gridCells.map((_, idx) => {
          const IconComponent = watermarkSymbols[idx % watermarkSymbols.length];
          return (
            <div key={idx} className="flex items-center justify-center transform rotate-12">
              <IconComponent className="w-12 h-12 stroke-[1.5]" />
            </div>
          );
        })}
      </div>

      {/* Header Info */}
      <div className="text-center max-w-xl mx-auto space-y-3 z-10 py-6">
        <div className="w-12 h-12 bg-lexgo-dark text-white rounded-2xl flex items-center justify-center shadow-md mx-auto">
          <BookOpen size={24} className="stroke-[2]" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-lexgo-dark tracking-tight">
          Study Companion Hub
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed">
          Access your digital learning toolbox. Query Ask AI, look up legal definitions, research cases, and review your course milestones.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 z-10 mt-8 flex-grow">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <div 
              key={tool.title}
              className="bg-white border border-slate-100 hover:border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              onClick={() => navigate(tool.route)}
            >
              <div className="space-y-4">
                {/* Badge and Icon */}
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${tool.colorClass}`}>
                    <Icon size={22} className="stroke-[2.5]" />
                  </div>
                  <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100/50">
                    {tool.badge}
                  </span>
                </div>

                {/* Title & Description */}
                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-bold text-lexgo-dark group-hover:text-blue-600 transition-colors duration-200">
                    {tool.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-auto">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(tool.route);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-50 group-hover:bg-lexgo-dark text-slate-600 group-hover:text-white font-bold text-xs transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>{tool.buttonText}</span>
                  <ArrowRight size={14} className="transform group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
    </div>
  );
};

export default CompanionPage;
