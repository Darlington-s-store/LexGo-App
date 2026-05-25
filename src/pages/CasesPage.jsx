import React, { useState } from 'react';
import { 
  Search, 
  ChevronLeft, 
  Info,
  SlidersHorizontal,
  X,
  Scale
} from 'lucide-react';

const OfficialScaleIcon = ({ className }) => (
  <svg 
    viewBox="0 0 100 100" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
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
);

const CasesPage = () => {
  const [selectedCase, setSelectedCase] = useState(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const casesData = [];

  const filteredCases = casesData.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.court.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.citation.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {!selectedCase ? (
        // LIST VIEW
        <div className="space-y-6 animate-fade-in">
          {/* Search Bar & Filter button */}
          <div className="flex items-center gap-3 w-full">
            <div className="relative flex-grow">
              <input 
                type="text" 
                placeholder="Search Cases.." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-5 pr-12 py-3 bg-[#FAF6F6] text-lexgo-dark border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-lexgo-dark placeholder-gray-400 font-medium"
              />
              <Search className="absolute right-4 top-3.5 text-gray-500 w-5 h-5 pointer-events-none" />
            </div>
            <button className="w-12 h-12 bg-lexgo-dark text-white rounded-2xl flex items-center justify-center cursor-pointer hover:bg-opacity-95 transition flex-shrink-0">
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Cards Stack */}
          <div className="grid grid-cols-1 gap-6">
            {filteredCases.length > 0 ? (
              filteredCases.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 relative shadow-sm hover:shadow-md transition duration-200 overflow-hidden flex flex-col justify-between"
                >
                  <div className="relative z-10 space-y-2 max-w-[70%]">
                    <h3 className="text-lg sm:text-xl font-bold text-lexgo-dark">{item.title}</h3>
                    <div className="text-sm text-gray-400 font-medium leading-normal">
                      <p>{item.court}</p>
                      <p>{item.citation}</p>
                    </div>
                    <div className="flex items-center gap-2 pt-2 text-[#EA4335] font-bold text-xs sm:text-sm">
                      {/* Red scale category icon */}
                      <OfficialScaleIcon className="w-4 h-4 text-[#EA4335]" />
                      <span>{item.category}</span>
                    </div>
                  </div>

                  {/* Read Button */}
                  <div className="relative z-10 mt-6">
                    <button 
                      onClick={() => setSelectedCase(item)}
                      className="px-6 py-2 rounded-xl border border-gray-200 text-lexgo-dark font-bold text-xs sm:text-sm bg-white hover:bg-gray-50 transition cursor-pointer"
                    >
                      Read
                    </button>
                  </div>

                  {/* Faint Scale Watermark */}
                  <div className="absolute right-4 bottom-4 opacity-[0.08] text-lexgo-dark pointer-events-none">
                    <OfficialScaleIcon className="w-24 h-24 sm:w-32 sm:h-32" />
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white border border-gray-100 rounded-3xl p-12 text-center shadow-sm space-y-4">
                <div className="w-16 h-16 bg-[#FAF6F6] text-gray-400 rounded-2xl flex items-center justify-center mx-auto">
                  <Scale className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-lexgo-dark text-base">No cases found</h4>
                  <p className="text-sm text-gray-400 font-medium">There are no legal cases loaded in the system right now.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        // DETAIL VIEW
        <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden animate-fade-in">
          {/* Repeating watermark pattern in the background of the card */}
          <div className="absolute inset-0 pattern-bg opacity-[0.02] pointer-events-none rounded-3xl"></div>
          
          {/* Faint Scale Watermark in Detail Page Background */}
          <div className="absolute right-4 bottom-4 opacity-[0.04] text-lexgo-dark pointer-events-none z-0">
            <OfficialScaleIcon className="w-48 h-48 sm:w-64 sm:h-64" />
          </div>
          
          <div className="relative z-10 space-y-6">
            {/* Header row */}
            <div className="flex justify-between items-center">
              <button 
                onClick={() => setSelectedCase(null)}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition cursor-pointer text-gray-600"
              >
                <ChevronLeft size={20} />
              </button>
              
              <button 
                onClick={() => setIsInfoModalOpen(true)}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition cursor-pointer text-gray-600"
              >
                <Info size={18} />
              </button>
            </div>

            {/* Centered case header info */}
            <div className="text-center space-y-3 pb-4">
              {/* Main scale logo */}
              <OfficialScaleIcon className="w-16 h-16 mx-auto text-lexgo-dark" />
              
              <h2 className="text-xl sm:text-2xl font-extrabold text-lexgo-dark max-w-lg mx-auto leading-tight">
                {selectedCase.title}
              </h2>
              <div className="text-sm text-gray-400 font-medium space-y-0.5">
                <p>{selectedCase.court}</p>
                <p>{selectedCase.citation}</p>
              </div>
            </div>

            {/* Coram list */}
            <div className="text-sm text-lexgo-dark border-b border-gray-50 pb-4">
              <span className="font-extrabold">Coram:</span> {selectedCase.coram}
            </div>

            {/* Structured Sections */}
            <div className="space-y-6">
              <h3 className="text-lg font-extrabold text-lexgo-dark border-b border-gray-50 pb-2">
                Structured Sections
              </h3>

              {/* Facts section */}
              <div className="space-y-3">
                <h4 className="text-sm font-extrabold text-lexgo-dark uppercase tracking-wider">Facts</h4>
                <div className="pl-4 border-l-2 border-slate-100 space-y-2">
                  {selectedCase.facts.map((fact, idx) => (
                    <div key={idx} className="flex gap-2 text-sm text-gray-600 font-medium leading-relaxed">
                      <span>-</span>
                      <p>{fact}</p>
                    </div>
                  ))}
                  <p className="text-sm text-gray-600 font-medium leading-relaxed pt-2">
                    {selectedCase.factsBody}
                  </p>
                </div>
              </div>

              {/* Issues section */}
              <div className="space-y-3">
                <h4 className="text-sm font-extrabold text-lexgo-dark uppercase tracking-wider">Issues</h4>
                <div className="pl-4 border-l-2 border-slate-100 space-y-2">
                  {selectedCase.issues.map((issue, idx) => (
                    <div key={idx} className="flex gap-2 text-sm text-gray-600 font-medium leading-relaxed">
                      <span>-</span>
                      <p>{issue}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decision/Holding section */}
              <div className="space-y-3">
                <h4 className="text-sm font-extrabold text-lexgo-dark uppercase tracking-wider">Decision/Holding</h4>
                <div className="pl-4 border-l-2 border-slate-100 flex gap-2 text-sm text-gray-600 font-medium leading-relaxed">
                  <span>-</span>
                  <p>{selectedCase.decision}</p>
                </div>
              </div>

              {/* Reasoning section */}
              <div className="space-y-3">
                <h4 className="text-sm font-extrabold text-lexgo-dark uppercase tracking-wider">Reasoning</h4>
                <div className="pl-4 border-l-2 border-slate-100 flex gap-2 text-sm text-gray-600 font-medium leading-relaxed">
                  <span>-</span>
                  <p>{selectedCase.reasoning}</p>
                </div>
              </div>

              {/* Significance section */}
              <div className="space-y-3">
                <h4 className="text-sm font-extrabold text-lexgo-dark uppercase tracking-wider">Significance</h4>
                <div className="pl-4 border-l-2 border-slate-100 flex gap-2 text-sm text-gray-600 font-medium leading-relaxed">
                  <span>-</span>
                  <p>{selectedCase.significance}</p>
                </div>
              </div>

              {/* Related Cases section */}
              <div className="space-y-3">
                <h4 className="text-sm font-extrabold text-lexgo-dark uppercase tracking-wider">Related Cases</h4>
                <div className="pl-4 border-l-2 border-slate-100 space-y-2">
                  {selectedCase.relatedCases.map((related, idx) => (
                    <div key={idx} className="flex gap-2 text-sm text-gray-600 font-medium leading-relaxed">
                      <span>--</span>
                      <p>{related}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QUESTION REVIEW INFO MODAL OVERLAY */}
      {isInfoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl border border-gray-100 flex flex-col max-h-[85vh] overflow-y-auto animate-scale-up">
            {/* Close button */}
            <button 
              onClick={() => setIsInfoModalOpen(false)}
              className="absolute right-5 top-5 w-8 h-8 rounded-lg text-gray-400 hover:text-lexgo-dark bg-gray-50 hover:bg-gray-100 transition cursor-pointer flex items-center justify-center"
            >
              <X size={18} />
            </button>

            {/* Modal Heading */}
            <div className="mb-6">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Question Review</span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-lexgo-dark">Understanding Case Summaries</h3>
            </div>

            {/* Modal Content */}
            <div className="space-y-6 text-sm text-gray-500 font-medium leading-relaxed">
              <p>
                Reading and analyzing legal cases can feel overwhelming, especially if you are new to law studies. Each case is broken down into specific sections to help you understand the background, the questions before the court, the decision, and why it matters.
              </p>
              <p>
                This guide explains what each section of a case summary means so that you can follow along more easily and get the most out of your reading. Use it whenever you need clarity on how cases are structured in the app.
              </p>

              <div className="space-y-4 pt-4 border-t border-gray-50">
                <h4 className="font-extrabold text-lexgo-dark text-base">Case Sessions Explained</h4>
                
                <div className="space-y-3">
                  <div>
                    <span className="font-extrabold text-lexgo-dark block">Case Title</span>
                    <p className="text-xs text-gray-500 font-medium">The official name of the case, usually written as Person A v. Person B (civil cases) or The Republic v. Person (criminal cases). Example: Republic v. Mensah</p>
                  </div>
                  <div>
                    <span className="font-extrabold text-lexgo-dark block">Court & Citation</span>
                    <p className="text-xs text-gray-500 font-medium">Specifies which court delivered the judgment (e.g. Supreme Court) and the unique system citation lookup index.</p>
                  </div>
                  <div>
                    <span className="font-extrabold text-lexgo-dark block">Date of Judgment</span>
                    <p className="text-xs text-gray-500 font-medium">The exact day the decision was given. Helps place the case in time.</p>
                  </div>
                  <div>
                    <span className="font-extrabold text-lexgo-dark block">Coram (Judges)</span>
                    <p className="text-xs text-gray-500 font-medium">The judges who heard the case. This is important because senior judges' opinions often guide future rulings.</p>
                  </div>
                  <div>
                    <span className="font-extrabold text-lexgo-dark block">Parties</span>
                    <p className="text-xs text-gray-500 font-medium">The people or entities involved. In criminal cases: The Republic (state) v. the accused. In civil cases: Person v. Person.</p>
                  </div>
                  <div>
                    <span className="font-extrabold text-lexgo-dark block">Facts</span>
                    <p className="text-xs text-gray-500 font-medium">A short background story of what happened before the case came to court. Helps you understand the context.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CasesPage;
