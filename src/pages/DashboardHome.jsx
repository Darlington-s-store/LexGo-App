import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Scale, 
  MessageSquare, 
  HelpCircle, 
  Notebook, 
  BookOpen, 
  Book, 
  ChevronRight,
  Quote,
  Calendar,
  X
} from 'lucide-react';

const CaseIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
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

const TermIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" fill="currentColor" className={className}>
    <path d="M 46,25 C 30,22 18,28 12,32 L 12,77 C 18,73 30,68 46,71 Z" />
    <path d="M 54,25 C 70,22 82,28 88,32 L 88,77 C 82,73 70,68 54,71 Z" />
    <path d="M 48,26 L 52,26 L 52,73 L 48,73 Z" />
    <path d="M 12,77 C 18,81 30,76 46,79 C 62,76 74,81 88,77 C 88,79 82,83 70,83 C 54,80 46,84 30,83 C 18,83 12,79 12,77 Z" opacity="0.8" />
  </svg>
);

const DictumIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" fill="currentColor" className={className}>
    <path d="M 50,15 C 26,15 10,28 10,48 C 10,60 18,72 32,77 C 30,85 22,90 16,92 C 26,92 38,87 45,81 C 47,81 48,81 50,81 C 74,81 90,68 90,48 C 90,28 74,15 50,15 Z" />
    <path d="M 38,38 L 44,38 L 41,48 L 45,48 L 42,58 L 36,58 L 39,48 L 35,48 Z M 58,38 L 64,38 L 61,48 L 65,48 L 62,58 L 56,58 L 59,48 L 55,48 Z" fill="#0A1128" />
  </svg>
);

const HistoryIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" fill="currentColor" className={className}>
    <rect x="15" y="24" width="70" height="60" rx="10" />
    <path d="M 15,24 L 85,24 L 85,42 L 15,42 Z" fill="#F59E0B" />
    <rect x="28" y="14" width="8" height="16" rx="4" fill="#E2E8F0" />
    <rect x="64" y="14" width="8" height="16" rx="4" fill="#E2E8F0" />
    <circle cx="32" cy="54" r="4.5" fill="#0A1128" />
    <circle cx="50" cy="54" r="4.5" fill="#0A1128" />
    <circle cx="68" cy="54" r="4.5" fill="#0A1128" />
    <circle cx="32" cy="70" r="4.5" fill="#0A1128" />
    <circle cx="50" cy="70" r="4.5" fill="#0A1128" />
    <circle cx="68" cy="70" r="4.5" fill="#0A1128" />
  </svg>
);

const dailyCards = [
  {
    id: 'case',
    type: 'Case of the Day',
    tag: 'DAILY CASE',
    title: 'Republic v. Mensah',
    citation: '[2024] SCGLR 104',
    icon: CaseIcon,
    bgClass: 'bg-indigo-50/40 hover:bg-indigo-50/80 border-indigo-100/50 text-indigo-700',
    iconBg: 'bg-indigo-100 text-indigo-600',
    summary: 'Evaluating the constitutional limits of search and seizure without judicial warrants.',
    details: {
      title: 'Republic v. Mensah [2024] SCGLR 104',
      subtitle: 'Landmark ruling on warrantless searches and personal privacy',
      content: 'The Supreme Court of Ghana evaluated the constitutional boundaries of search and seizure under Article 18(2) of the 1992 Constitution. The court ruled that searches conducted by law enforcement officers without a judicially authorized warrant are prima facie unlawful, unless they fall strictly within recognized emergency or exigent circumstances.',
      significance: 'This case solidified the protection of privacy rights in Ghana, establishing clear boundaries for law enforcement and reinforcing that constitutional protections override general police administrative convenience.'
    }
  },
  {
    id: 'term',
    type: 'Legal Term of the Day',
    tag: 'DAILY TERM',
    title: 'Actus Reus',
    citation: 'Latin: "Guilty Act"',
    icon: TermIcon,
    bgClass: 'bg-emerald-50/40 hover:bg-emerald-50/80 border-emerald-100/50 text-emerald-700',
    iconBg: 'bg-emerald-100 text-emerald-600',
    summary: 'The physical act, conduct, or omission that constitutes the binding element of a crime.',
    details: {
      title: 'Actus Reus (Latin for "Guilty Act")',
      subtitle: 'The objective element of criminal liability',
      content: 'In criminal law, actus reus refers to the physical act, conduct, or omission that constitutes a crime. For a person to be held criminally liable, the prosecution must prove that they committed this physical act, and that it concurred with a guilty state of mind (mens rea).\n\nThere are three main types of actus reus:\n1. Conduct (e.g., physical taking of goods in theft)\n2. Result (e.g., death of a person in homicide)\n3. Omission (e.g., failure of a parent to feed a child when legally obligated).',
      significance: 'No person can be punished for thoughts alone; there must be a physical manifestation of a crime, protecting individual liberty from arbitrary state action.'
    }
  },
  {
    id: 'dictum',
    type: 'Dictum of the Day',
    tag: 'DAILY DICTUM',
    title: 'Fiat Justitia Ruat Caelum',
    citation: 'Lord Mansfield (1770)',
    icon: DictumIcon,
    bgClass: 'bg-violet-50/40 hover:bg-violet-50/80 border-violet-100/50 text-violet-700',
    iconBg: 'bg-violet-100 text-violet-600',
    summary: '"Let justice be done though the heavens fall" - representing absolute judicial duty.',
    details: {
      title: 'Fiat Justitia Ruat Caelum',
      subtitle: '"Let justice be done though the heavens fall"',
      content: 'A famous Latin legal maxim expressing the principle that justice must be realized and the law applied regardless of the severity of the consequences.\n\nIt was famously declared by Lord Mansfield in the case of R v. Wilkes (1770) to emphasize that judges must decide cases strictly according to the law and legal principles, without yielding to public outcry or political pressure.',
      significance: 'This maxim remains the ultimate symbol of judicial independence, neutrality, and moral courage, reminding jurists that the rule of law must stand above all social and political turbulence.'
    }
  },
  {
    id: 'history',
    type: 'Today in Legal History',
    tag: 'LEGAL HISTORY',
    title: 'Brown v. Board of Education',
    citation: 'May 17, 1954',
    icon: HistoryIcon,
    bgClass: 'bg-amber-50/40 hover:bg-amber-50/80 border-amber-100/50 text-amber-700',
    iconBg: 'bg-amber-100 text-amber-600',
    summary: 'US Supreme Court ruled that racial segregation in public schools is unconstitutional.',
    details: {
      title: 'Brown v. Board of Education of Topeka, 347 U.S. 483 (1954)',
      subtitle: 'The end of the "Separate but Equal" doctrine',
      content: 'The Supreme Court of the United States unanimously ruled that establishing state laws for separate public schools for black and white students is unconstitutional. Chief Justice Earl Warren declared that "separate educational facilities are inherently unequal," violating the Equal Protection Clause of the Fourteenth Amendment.',
      significance: 'This landmark decision overturned Plessy v. Ferguson (1896), legally dismantled state-sponsored school segregation, and served as a major catalyst for the Civil Rights Movement.'
    }
  }
];

const DashboardHome = () => {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % dailyCards.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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

  const activeCard = dailyCards[currentSlide];
  const ActiveIcon = activeCard.icon;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Daily Highlights Section */}
      <section>
        <div className="flex justify-between items-center mb-5">
          <div>
            <h3 className="text-xl font-bold text-lexgo-dark tracking-tight">Daily Highlights</h3>
            <p className="text-xs text-gray-500 font-medium mt-0.5">Your curated legal learning content for today</p>
          </div>
          <span className="text-xs font-semibold text-slate-400 bg-slate-100/60 px-3 py-1 rounded-full border border-slate-200/50">
            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
        
        {/* Carousel Card Slider */}
        <div className="relative w-full">
          {/* Card Element */}
          <div
            key={currentSlide}
            onClick={() => setSelectedCard(activeCard)}
            className="relative overflow-hidden bg-[#0A1128] text-white rounded-[32px] p-8 min-h-[240px] flex flex-col justify-between shadow-lg border border-slate-900 cursor-pointer group transition-all duration-500 hover:shadow-xl hover:scale-[1.005] animate-fade-in"
          >
            {/* Top Row: Large Icon */}
            <div className="z-10">
              <ActiveIcon className="w-16 h-16 text-white transition-transform duration-300 group-hover:scale-105" />
            </div>

            {/* Bottom Row: Text content */}
            <div className="z-10 space-y-2 mt-8">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold tracking-widest text-sky-400 uppercase bg-sky-950/40 px-2.5 py-0.5 rounded-full border border-sky-900/30">
                  {activeCard.type}
                </span>
                <span className="text-[10px] font-bold text-slate-400">
                  {activeCard.citation}
                </span>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white leading-tight transition-colors duration-200 group-hover:text-sky-300">
                {activeCard.title}
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-medium max-w-2xl line-clamp-2">
                {activeCard.summary}
              </p>
            </div>

            {/* Mpatapo Watermark on the Right */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-end p-6 pointer-events-none z-0">
              <svg
                viewBox="0 0 100 100"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-full h-full max-w-[220px] md:max-w-[280px]"
              >
                {/* Rotate the entire knot by 45 degrees to match the mockup */}
                <g transform="rotate(45 50 50)">
                  {/* Thick base stroke in semi-transparent white */}
                  <path 
                    d="M 50,50 C 35,30 20,30 20,50 C 20,70 35,70 50,50 C 65,30 80,30 80,50 C 80,70 65,70 50,50 Z M 50,50 C 30,35 30,20 50,20 C 70,20 70,35 50,50 C 30,65 30,80 50,80 C 70,80 70,65 50,50 Z" 
                    stroke="rgba(255, 255, 255, 0.08)" 
                    strokeWidth="14" 
                  />
                  <circle cx="50" cy="50" r="7" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="14" />
                  
                  {/* Thin overlay stroke matching the card background to cut a hollow channel */}
                  <path 
                    d="M 50,50 C 35,30 20,30 20,50 C 20,70 35,70 50,50 C 65,30 80,30 80,50 C 80,70 65,70 50,50 Z M 50,50 C 30,35 30,20 50,20 C 70,20 70,35 50,50 C 30,65 30,80 50,80 C 70,80 70,65 50,50 Z" 
                    stroke="#0A1128" 
                    strokeWidth="6" 
                  />
                  <circle cx="50" cy="50" r="7" stroke="#0A1128" strokeWidth="6" />
                </g>
              </svg>
            </div>
          </div>

          {/* Dots Pagination */}
          <div className="flex justify-center items-center gap-2 mt-4">
            {dailyCards.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 cursor-pointer h-2 ${
                  currentSlide === index 
                    ? 'w-6 bg-[#0A1128] rounded-full' 
                    : 'w-2 bg-slate-200 hover:bg-slate-300 rounded-full'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
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

      {/* Daily Highlight Detail Modal */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px] p-4 animate-fade-in">
          {/* Backdrop Click */}
          <div className="absolute inset-0 cursor-default" onClick={() => setSelectedCard(null)} />
          
          {/* Modal Container */}
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-slate-100 flex flex-col z-10 animate-scale-up">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedCard(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-xl text-gray-500 hover:text-lexgo-dark bg-slate-50 hover:bg-slate-100 transition cursor-pointer flex items-center justify-center border border-slate-100/80"
            >
              <X size={18} />
            </button>
            
            {/* Header Badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100/50">
                {selectedCard.type}
              </span>
              <span className="text-[10px] font-bold text-gray-400">
                {selectedCard.citation}
              </span>
            </div>
            
            {/* Main Title */}
            <div className="space-y-1 mb-6">
              <h3 className="text-xl sm:text-2xl font-black text-lexgo-dark tracking-tight leading-tight">
                {selectedCard.details.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 font-semibold leading-normal">
                {selectedCard.details.subtitle}
              </p>
            </div>
            
            {/* Content Body */}
            <div className="space-y-6 flex-grow overflow-y-auto max-h-[300px] pr-2">
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Overview & Context</h4>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-medium whitespace-pre-wrap">
                  {selectedCard.details.content}
                </p>
              </div>
              
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Why It Matters</h4>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-medium">
                  {selectedCard.details.significance}
                </p>
              </div>
            </div>
            
            {/* Footer Buttons */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedCard(null)}
                className="py-2.5 px-6 rounded-xl bg-lexgo-dark text-white font-bold text-xs hover:bg-opacity-95 transition cursor-pointer text-center"
              >
                Got it, thanks!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
