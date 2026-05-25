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
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Pages Outline */}
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    {/* Page Lines */}
    <line x1="5" y1="8" x2="8" y2="8" strokeWidth="1.5" />
    <line x1="5" y1="12" x2="8" y2="12" strokeWidth="1.5" />
    <line x1="5" y1="16" x2="8" y2="16" strokeWidth="1.5" />
    <line x1="16" y1="8" x2="19" y2="8" strokeWidth="1.5" />
    <line x1="16" y1="12" x2="19" y2="12" strokeWidth="1.5" />
    <line x1="16" y1="16" x2="19" y2="16" strokeWidth="1.5" />
  </svg>
);

const BrainIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-3.88 2.5 2.5 0 0 1 0-3.12 2.5 2.5 0 0 1 2.46-2.94zm4.96.06A2.5 2.5 0 0 1 17 4.5a2.5 2.5 0 0 1 2.46 2.94 2.5 2.5 0 0 1 0 3.12 3 3 0 0 1 0 3.88 2.5 2.5 0 0 1 0 3.12A2.5 2.5 0 0 1 14.5 20" />
    <path d="M12 5v14" />
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
    title: 'Estoppe/',
    citation: 'Principle of Law',
    icon: TermIcon,
    bgClass: 'bg-emerald-50/40 hover:bg-emerald-50/80 border-emerald-100/50 text-emerald-700',
    iconBg: 'bg-emerald-100 text-emerald-600',
    summary: 'A legal principle that prevents someone from arguing something contrary to a fact, or claim they previously accepted, especially if others have relied on it.',
    details: {
      title: 'Estoppel',
      subtitle: 'The rule of consistency in legal claims',
      content: 'Estoppel is a judicial doctrine under common law and equity that precludes a person from asserting a fact, right, or claim that is inconsistent with a position they previously took, especially when another party has relied on their initial representation and acted upon it to their detriment.',
      significance: 'Promotes fairness and predictability in legal transactions and representations, ensuring that individuals cannot gain an unfair advantage by shifting their stories.'
    }
  },
  {
    id: 'dictum',
    type: 'Dictum of the Day',
    tag: 'DAILY DICTUM',
    title: 'justice must not only be done, but must be seen to be done.',
    citation: '-Lord Hewart',
    icon: BrainIcon,
    bgClass: 'bg-violet-50/40 hover:bg-violet-50/80 border-violet-100/50 text-violet-700',
    iconBg: 'bg-violet-100 text-violet-600',
    summary: '"justice must not only be done, but must be seen to be done." - Lord Hewart in Rex v. Sussex Justices [1924].',
    details: {
      title: 'justice must not only be done, but must be seen to be done.',
      subtitle: 'Lord Hewart (Rex v. Sussex Justices [1924])',
      content: 'This celebrated legal maxim emphasizes that the appearance of justice is as important as the substance of it. Even if a court renders a completely fair decision, the trial must be conducted under circumstances free from any reasonable suspicion of bias, conflict of interest, or procedural unfairness.',
      significance: 'Ensures absolute public confidence in the administration of justice and establishes that the mere possibility of bias is enough to overturn a judicial decision.'
    }
  },
  {
    id: 'history',
    type: 'Today is Legal in History',
    tag: 'LEGAL HISTORY',
    title: 'Ghana\'s first Supreme Court',
    citation: 'Aug 18, 1960',
    icon: BrainIcon,
    bgClass: 'bg-amber-50/40 hover:bg-amber-50/80 border-amber-100/50 text-amber-700',
    iconBg: 'bg-amber-100 text-amber-600',
    summary: 'Following the adoption of the Republican Constitution, the Supreme Court of Ghana was established as the nation\'s highest judicial body.',
    details: {
      title: 'Ghana\'s First Supreme Court Established',
      subtitle: 'August 18, 1960',
      content: 'With the enactment of the Republican Constitution of 1960, the Supreme Court of Ghana was formally constituted as the highest court of record and final court of appeal, replacing the jurisdiction of the Judicial Committee of the Privy Council in London and marking full legal sovereignty.',
      significance: 'This historic establishment solidified Ghana\'s constitutional independence, making its judiciary fully sovereign and independent of colonial legal authorities.'
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
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Daily Highlights Section */}
      <section>
        
        {/* Carousel Card Slider */}
        <div className="relative w-full">
          {/* Card Element */}
          <div
            key={currentSlide}
            onClick={() => setSelectedCard(activeCard)}
            className="relative overflow-hidden bg-[#0A1128] text-white rounded-[32px] p-8 min-h-[260px] flex flex-col justify-between shadow-lg border border-slate-900 cursor-pointer group transition-all duration-500 hover:shadow-xl hover:scale-[1.005] animate-fade-in"
          >
            {activeCard.id === 'case' && (
              <>
                {/* Top Row: Large Icon */}
                <div className="z-10">
                  <CaseIcon className="w-14 h-14 text-white transition-transform duration-300 group-hover:scale-105" />
                </div>

                {/* Bottom Row: Text content */}
                <div className="z-10 space-y-2 mt-6">
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
              </>
            )}

            {activeCard.id === 'term' && (
              <div className="z-10 flex flex-col justify-between h-full w-full py-1">
                {/* Header Row */}
                <div className="flex items-center gap-3">
                  <TermIcon className="w-8 h-8 text-white flex-shrink-0" />
                  <span className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    Legal Term of the Day
                  </span>
                </div>

                {/* Term & Summary */}
                <div className="space-y-2 my-auto py-3">
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-none">
                    {activeCard.title}
                  </h2>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-medium max-w-2xl">
                    {activeCard.summary}
                  </p>
                </div>

                {/* Button */}
                <div className="flex justify-start">
                  <span
                    className="inline-block px-5 py-2 rounded-xl bg-[#101E35] hover:bg-[#1C2C47] text-white text-xs sm:text-sm font-bold border border-slate-800/80 transition duration-200 cursor-pointer shadow-sm"
                  >
                    See Examples
                  </span>
                </div>
              </div>
            )}

            {activeCard.id === 'dictum' && (
              <div className="z-10 flex flex-col justify-between h-full w-full py-1">
                {/* Header Row */}
                <div className="flex items-center gap-3">
                  <BrainIcon className="w-8 h-8 text-white flex-shrink-0" />
                  <span className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    Dictum of the Day
                  </span>
                </div>

                {/* Dictum Text & Author */}
                <div className="space-y-4 my-auto py-3">
                  <p className="text-base sm:text-lg font-bold text-white leading-relaxed max-w-2xl">
                    “{activeCard.title}”
                  </p>
                  <span className="block text-slate-300 text-xs sm:text-sm font-medium">
                    {activeCard.citation}
                  </span>
                </div>
              </div>
            )}

            {activeCard.id === 'history' && (
              <div className="z-10 flex flex-col items-center justify-center text-center h-full w-full py-4">
                {/* Center Icon */}
                <BrainIcon className="w-8 h-8 text-white mb-2" />
                {/* Header Title */}
                <span className="text-xs sm:text-sm font-semibold tracking-wide text-slate-300">
                  Today is Legal in History
                </span>
                {/* Large Date */}
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white my-2">
                  {activeCard.citation}
                </h2>
                {/* Event Description */}
                <p className="text-slate-300 text-xs sm:text-sm font-medium max-w-md">
                  {activeCard.title}
                </p>
              </div>
            )}
          </div>

          {/* Dots Pagination */}
          <div className="flex justify-center items-center gap-2 mt-4">
            {dailyCards.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSlide(index);
                }}
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

      {/* Quick Actions Container Card */}
      <section className="bg-white border border-gray-100/80 rounded-[32px] p-6 sm:p-8 shadow-sm">
        <h3 className="text-lg sm:text-xl font-bold text-lexgo-dark mb-6 tracking-tight">
          Quick Actions
        </h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <div
                key={action.title}
                onClick={() => handleActionClick(action.title)}
                className="flex flex-col items-center justify-center text-center transition duration-200 cursor-pointer group hover:scale-[1.02]"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition duration-200 group-hover:scale-105 ${action.bg} ${action.color}`}>
                  <Icon size={20} strokeWidth={2.5} />
                </div>
                
                <h4 className="font-bold text-lexgo-dark text-sm sm:text-base tracking-tight">
                  {action.title}
                </h4>
                
                <p className="text-gray-400 text-[10px] sm:text-xs mt-1 leading-normal font-medium max-w-[140px] mx-auto">
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
