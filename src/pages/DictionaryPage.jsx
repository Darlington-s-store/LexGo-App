import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Scale, 
  Book, 
  Gavel, 
  MessageSquare, 
  Search, 
  Volume2, 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight,
  Shield,
  Lightbulb,
  FileText,
  X
} from 'lucide-react';

// Law Dictionary Dataset covering a variety of letters
const DICTIONARY_DATA = [
  {
    id: 'abandonment',
    letter: 'A',
    name: 'Abandonment',
    definitions: [
      '1.) The voluntary relinquishment of a legal right, claim, or property, without transferring it to another person.',
      '2.) In family law, the act of deserting a spouse or child without intention to return.'
    ],
    detailedDefinition: 'The voluntary relinquishment of a legal right or claim, such as abandoning property or a lawsuit.',
    example1: "The tenant's abandonment of the apartment released the landlord from obligations.",
    example2: "The tenant's abandonment of the apartment released the landlord from obligations.",
    relatedTerms: ['Abatement', 'Waiver', 'Surrender']
  },
  {
    id: 'abatement',
    letter: 'A',
    name: 'Abatement',
    definitions: [
      '1.) The reduction, suspension, or elimination of something, such as a nuisance, a debt, or legal proceedings.',
      '2.) In taxation, a decrease in the amount of tax imposed.'
    ],
    detailedDefinition: 'The reduction, suspension, or elimination of a legal claim, a nuisance, a debt, or taxation.',
    example1: 'The city ordered the abatement of the noise nuisance from the construction site.',
    example2: 'The taxpayer applied for a tax abatement due to property damage.',
    relatedTerms: ['Abandonment', 'Waiver']
  },
  {
    id: 'accessory',
    letter: 'A',
    name: 'Accessory',
    definitions: [
      '1.) A person who aids, assists, or encourages another in committing a crime, either before or after the fact.',
      '2.) Distinguished between accessory before the fact (helping plan) and accessory after the fact (helping escape).'
    ],
    detailedDefinition: 'A person who assists in the commission of a crime but does not act as the primary actor.',
    example1: 'The driver was charged as an accessory after the fact for helping the robber escape.',
    example2: 'He became an accessory by hiding the stolen money in his basement.',
    relatedTerms: ['Accomplice', 'Conspiracy']
  },
  {
    id: 'accomplice',
    letter: 'A',
    name: 'Accomplice',
    definitions: [
      'A person who knowingly, voluntarily, or intentionally assists another in the commission of a crime.'
    ],
    detailedDefinition: 'A person who knowingly, voluntarily, or intentionally assists another in the commission of a crime.',
    example1: 'Kofi was found to be an accomplice of the said murduer of the Police man',
    example2: 'Kofi was found to be an accomplice of the said murduer of the Police man',
    relatedTerms: ['Abatement', 'Waiver', 'Surrender']
  },
  {
    id: 'accord-and-satisfaction',
    letter: 'A',
    name: 'Accord and Satisfaction',
    definitions: [
      'An agreement to accept something different (usually less) than what was originally contractually owed, which extinguishes the obligation.'
    ],
    detailedDefinition: 'A contract law doctrine where parties agree to discharge a claim by exchanging different performance than originally agreed.',
    example1: "Accepting a lower settlement check marked 'payment in full' can constitute accord and satisfaction.",
    example2: 'The supplier agreed to accept 50% payment in exchange for terminating the contract early.',
    relatedTerms: ['Contract', 'Waiver']
  },
  {
    id: 'bail',
    letter: 'B',
    name: 'Bail',
    definitions: [
      'The temporary release of an accused person awaiting trial, sometimes on condition that a sum of money be lodged to guarantee their appearance.'
    ],
    detailedDefinition: 'Security, such as cash or a bond, required by a court to release a person from custody while ensuring they return for trial.',
    example1: 'The judge set bail at $50,000 for the defendant.',
    example2: 'He was released on bail pending his appeal.',
    relatedTerms: ['Defendant', 'Waiver']
  },
  {
    id: 'brief',
    letter: 'B',
    name: 'Brief',
    definitions: [
      'A written legal argument presented to a court to convince the judge to rule in favor of the client.'
    ],
    detailedDefinition: 'A formal written document submitted to a court outlining the facts of the case and the legal arguments.',
    example1: 'The lawyer spent all night drafting the appellate brief.',
    example2: 'The judge asked both parties to submit brief legal arguments on the admissibility of the evidence.',
    relatedTerms: ['Brief', 'Defendant']
  },
  {
    id: 'caveat-emptor',
    letter: 'C',
    name: 'Caveat Emptor',
    definitions: [
      'The principle that the buyer alone is responsible for checking the quality and suitability of goods before a purchase is made.'
    ],
    detailedDefinition: "A Latin maxim meaning 'let the buyer beware,' which shifts the burden of quality inspection onto the purchaser.",
    example1: 'Real estate purchases under common law often apply the doctrine of caveat emptor.',
    example2: "Since the vehicle was sold 'as is', the transaction fell under caveat emptor.",
    relatedTerms: ['Contract', 'Waiver']
  },
  {
    id: 'contract',
    letter: 'C',
    name: 'Contract',
    definitions: [
      'A voluntary, legally binding agreement between two or more parties that creates enforceable obligations.'
    ],
    detailedDefinition: 'An agreement with specific terms between two or more persons or entities in which there is a promise to do something in return for a valuable benefit.',
    example1: 'She signed an employment contract for two years.',
    example2: 'A verbal contract is legal but much harder to prove in court.',
    relatedTerms: ['Accord and Satisfaction', 'Caveat Emptor', 'Waiver']
  },
  {
    id: 'defendant',
    letter: 'D',
    name: 'Defendant',
    definitions: [
      'An individual, company, or institution sued or accused in a court of law.'
    ],
    detailedDefinition: 'The party responding to a lawsuit in a civil case or the accused party in a criminal prosecution.',
    example1: 'The defendant pleaded not guilty to all charges.',
    example2: 'The civil defendant filed a motion to dismiss the lawsuit.',
    relatedTerms: ['Bail', 'Brief']
  },
  {
    id: 'deposition',
    letter: 'D',
    name: 'Deposition',
    definitions: [
      'The out-of-court oral testimony of a witness that is reduced to writing for later use in court or for discovery purposes.'
    ],
    detailedDefinition: 'A pre-trial discovery tool where a witness answers questions under oath before a court reporter.',
    example1: 'The witness gave her deposition at the attorney office.',
    example2: 'Deposition transcripts can be used to impeach a witness at trial if their story changes.',
    relatedTerms: ['Brief', 'Defendant']
  },
  {
    id: 'easement',
    letter: 'E',
    name: 'Easement',
    definitions: [
      "A right to cross or otherwise use someone else's land for a specified purpose."
    ],
    detailedDefinition: "A non-possessory interest in the land of another that gives its holder the right to use the land for a specific, limited purpose.",
    example1: 'The utility company held an easement to lay power lines across the property.',
    example2: 'The neighbor has an easement for access to the public road.',
    relatedTerms: ['Abandonment']
  },
  {
    id: 'felony',
    letter: 'F',
    name: 'Felony',
    definitions: [
      'A crime, typically one involving violence, regarded as more serious than a misdemeanor, and usually punishable by imprisonment for more than one year or by death.'
    ],
    detailedDefinition: 'A high-level crime classification carrying severe penalties, contrasted with minor infractions and misdemeanors.',
    example1: 'Armed robbery is classified as a felony in this jurisdiction.',
    example2: 'A felony conviction can result in the loss of certain civil rights.',
    relatedTerms: ['Accomplice', 'Accessory']
  },
  {
    id: 'hearsay',
    letter: 'H',
    name: 'Hearsay',
    definitions: [
      'An out-of-court statement offered in court to prove the truth of the matter asserted, generally inadmissible with exceptions.'
    ],
    detailedDefinition: 'Evidence based on what has been heard from others rather than personal observation, generally excluded under evidence rules.',
    example1: 'The defense lawyer objected to the witness testimony as hearsay.',
    example2: 'Under the business records exception, certain documents are admitted despite being hearsay.',
    relatedTerms: ['Deposition', 'Brief']
  },
  {
    id: 'injunction',
    letter: 'I',
    name: 'Injunction',
    definitions: [
      'An authoritative warning or order, usually by a court, requiring a party to do or refrain from doing a specific act.'
    ],
    detailedDefinition: 'A judicial remedy issued in order to prohibit a party from doing or continuing to do a certain activity.',
    example1: 'The court issued a preliminary injunction halting the factory from dumping chemical waste.',
    example2: 'The developer sought an injunction to stop the union strike.',
    relatedTerms: ['Abatement']
  },
  {
    id: 'jurisdiction',
    letter: 'J',
    name: 'Jurisdiction',
    definitions: [
      'The official power to make legal decisions and judgments.'
    ],
    detailedDefinition: 'The geographic area or subject matter over which a court or government body has legal authority.',
    example1: 'The case was dismissed because the court lacked personal jurisdiction over the defendant.',
    example2: 'Federal courts have jurisdiction over cases involving constitutional issues.',
    relatedTerms: ['Defendant', 'Injunction']
  },
  {
    id: 'larceny',
    letter: 'L',
    name: 'Larceny',
    definitions: [
      'The wrongful taking and carrying away of personal property of another with the intent to permanently deprive the owner of it.'
    ],
    detailedDefinition: 'A common-law theft offense involving the unlawful acquisition of physical property belonging to someone else.',
    example1: 'He was arrested and charged with grand larceny for stealing the diamond ring.',
    example2: 'Shoplifting is a common form of petty larceny.',
    relatedTerms: ['Felony', 'Accomplice']
  },
  {
    id: 'manslaughter',
    letter: 'M',
    name: 'Manslaughter',
    definitions: [
      'The unlawful killing of a human being without malice aforethought.'
    ],
    detailedDefinition: 'The criminal charge for homicide that lacks premeditation or intentional malice, often divided into voluntary and involuntary manslaughter.',
    example1: 'The reckless driver was convicted of involuntary manslaughter.',
    example2: 'The charge was reduced from murder to manslaughter due to provocation.',
    relatedTerms: ['Felony', 'Accomplice', 'Accessory']
  },
  {
    id: 'negligence',
    letter: 'N',
    name: 'Negligence',
    definitions: [
      'Failure to use reasonable care, resulting in damage or injury to another.'
    ],
    detailedDefinition: 'A tort doctrine requiring proof of a duty of care, breach of that duty, causation, and resulting damage.',
    example1: 'The surgeon was sued for medical negligence after leaving a clamp inside the patient.',
    example2: 'Strict liability differs from negligence because intent and care level are irrelevant.',
    relatedTerms: ['Caveat Emptor', 'Injunction']
  },
  {
    id: 'plaintiff',
    letter: 'P',
    name: 'Plaintiff',
    definitions: [
      'A person who brings a case against another in a court of law.'
    ],
    detailedDefinition: 'The initiating party in a civil lawsuit seeking legal remedies or compensation from the defendant.',
    example1: 'The plaintiff presented evidence of the breach of contract.',
    example2: 'The class action lawsuit was filed on behalf of thousands of plaintiffs.',
    relatedTerms: ['Defendant', 'Brief']
  },
  {
    id: 'subpoena',
    letter: 'S',
    name: 'Subpoena',
    definitions: [
      'A writ ordering a person to attend a court or produce documents.'
    ],
    detailedDefinition: 'A legally binding command issued by a court or attorney requiring a witness to testify or submit physical evidence.',
    example1: 'The prosecution served a subpoena on the bank manager for the transaction logs.',
    example2: 'He ignored the subpoena and was held in contempt of court.',
    relatedTerms: ['Deposition', 'Defendant']
  },
  {
    id: 'tort',
    letter: 'T',
    name: 'Tort',
    definitions: [
      'A civil wrong (other than breach of contract) that causes harm or loss for which the courts provide a remedy in the form of damages.'
    ],
    detailedDefinition: 'A branch of civil law focused on addressing injuries caused by negligent, reckless, or intentional conduct of individuals or entities.',
    example1: 'Negligence, defamation, and trespass are common forms of tort.',
    example2: 'The tort of product liability allows consumers to sue manufacturers for defective products.',
    relatedTerms: ['Negligence', 'Injunction']
  },
  {
    id: 'waiver',
    letter: 'W',
    name: 'Waiver',
    definitions: [
      'The voluntary relinquishment or abandonment of a known right or privilege.'
    ],
    detailedDefinition: 'A legal agreement or act of surrender where a person gives up their rights or claims, such as signing a liability release.',
    example1: 'By signing the waiver, she agreed not to sue the skydiving company in case of injury.',
    example2: "The landlord's failure to enforce late fees was deemed a waiver of that contract clause.",
    relatedTerms: ['Abandonment', 'Accord and Satisfaction', 'Surrender']
  },
  {
    id: 'surrender',
    letter: 'S',
    name: 'Surrender',
    definitions: [
      'The giving up of a right, possession, or office, especially under pressure or demand.'
    ],
    detailedDefinition: 'The act of yielding or resigning something to another person, such as yielding a leasehold interest to a landlord.',
    example1: 'The fugitive decided to surrender to local authorities.',
    example2: 'The tenant agreed to the surrender of their lease term early.',
    relatedTerms: ['Abandonment', 'Waiver']
  }
];

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const DictionaryPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('A');
  const [selectedTermId, setSelectedTermId] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem('lexgo_search_history');
    return saved ? JSON.parse(saved) : ['Case', 'Abate', 'Accomplice', 'Defendant', 'Bail'];
  });

  const addToHistory = (query) => {
    if (!query || !query.trim()) return;
    const cleanQuery = query.trim();
    setSearchHistory(prev => {
      const filtered = prev.filter(item => item.toLowerCase() !== cleanQuery.toLowerCase());
      const updated = [cleanQuery, ...filtered].slice(0, 8); // Keep last 8 searches
      localStorage.setItem('lexgo_search_history', JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromHistory = (itemToRemove) => {
    setSearchHistory(prev => {
      const updated = prev.filter(item => item.toLowerCase() !== itemToRemove.toLowerCase());
      localStorage.setItem('lexgo_search_history', JSON.stringify(updated));
      return updated;
    });
  };

  // Background Watermark Cells & Symbols
  const gridCells = useMemo(() => Array.from({ length: 24 }), []);
  const watermarkSymbols = useMemo(() => [Scale, Book, Gavel, MessageSquare, Shield, Lightbulb, FileText], []);

  // Filter dictionary terms based on active filter state
  const filteredTerms = useMemo(() => {
    let list = DICTIONARY_DATA;
    
    // Sort alphabetically
    list = [...list].sort((a, b) => a.name.localeCompare(b.name));

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return list.filter(item => 
        item.name.toLowerCase().includes(q) || 
        item.definitions.some(def => def.toLowerCase().includes(q)) ||
        (item.detailedDefinition && item.detailedDefinition.toLowerCase().includes(q))
      );
    }

    return list.filter(item => item.letter === selectedLetter);
  }, [searchQuery, selectedLetter]);

  // Retrieve current active detail term
  const activeTerm = useMemo(() => {
    if (!selectedTermId) return null;
    return DICTIONARY_DATA.find(t => t.id === selectedTermId) || null;
  }, [selectedTermId]);

  // Retrieve alphabetical index list for previous/next actions
  const allTermsSorted = useMemo(() => {
    return [...DICTIONARY_DATA].sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const handlePrevTerm = () => {
    if (!activeTerm) return;
    const currentIndex = allTermsSorted.findIndex(t => t.id === activeTerm.id);
    if (currentIndex > 0) {
      setSelectedTermId(allTermsSorted[currentIndex - 1].id);
    } else {
      // Wrap around
      setSelectedTermId(allTermsSorted[allTermsSorted.length - 1].id);
    }
  };

  const handleNextTerm = () => {
    if (!activeTerm) return;
    const currentIndex = allTermsSorted.findIndex(t => t.id === activeTerm.id);
    if (currentIndex < allTermsSorted.length - 1) {
      setSelectedTermId(allTermsSorted[currentIndex + 1].id);
    } else {
      // Wrap around
      setSelectedTermId(allTermsSorted[0].id);
    }
  };

  const handleRelatedTermClick = (termName) => {
    const found = DICTIONARY_DATA.find(t => t.name.toLowerCase() === termName.toLowerCase());
    if (found) {
      setSelectedTermId(found.id);
    }
  };

  const handleBackAction = () => {
    if (selectedTermId) {
      setSelectedTermId(null);
    } else {
      navigate('/dashboard');
    }
  };

  const handleSpeak = (term) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToSpeak = `${term.name}. ${term.definitions.join(' ')}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 min-h-[600px] shadow-sm relative overflow-hidden flex flex-col">
      
      {/* Rotating faint background watermark grid (only visible on main landing view) */}
      {!selectedTermId && (
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
      )}

      {/* Top Header Row with Back Button and Search */}
      <div className="flex items-center justify-between z-10 shrink-0 pb-6 border-b border-gray-50 mb-6">
        <div className="flex items-center gap-3">
          <button 
            onClick={handleBackAction}
            className="w-10 h-10 rounded-full border border-gray-200 hover:border-gray-300 bg-white text-gray-600 hover:text-lexgo-dark transition flex items-center justify-center cursor-pointer shadow-sm"
          >
            <ArrowLeft size={16} />
          </button>
          
          {selectedTermId && activeTerm && (
            <h2 className="text-xl sm:text-2xl font-bold text-lexgo-dark tracking-tight animate-fade-in">
              {activeTerm.name}
            </h2>
          )}
        </div>

        {/* Search Input Box */}
        <div className="relative w-48 sm:w-64">
          <input
            type="text"
            value={searchQuery}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => {
              // Delay hiding to allow click events on history items to register
              setTimeout(() => setIsSearchFocused(false), 200);
            }}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              // Clear detail term view when searching to show matching lists
              if (selectedTermId) setSelectedTermId(null);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchQuery.trim() !== '') {
                addToHistory(searchQuery.trim());
              }
            }}
            placeholder="Search legal terms..."
            className="w-full bg-white border border-gray-200 focus:border-lexgo-dark rounded-full pl-4 pr-10 py-2.5 text-xs sm:text-sm focus:outline-none transition placeholder-gray-400 font-semibold"
          />
          <Search size={16} className="absolute right-3.5 top-3.5 text-gray-400 pointer-events-none" />

          {/* Search History Dropdown */}
          {isSearchFocused && searchHistory.length > 0 && (
            <div className="absolute right-0 mt-2 w-64 sm:w-72 bg-white border border-gray-100 rounded-3xl p-6 shadow-xl z-50 animate-fade-in">
              <h3 className="text-sm font-bold text-lexgo-dark mb-4">Search History</h3>
              <div className="space-y-3">
                {searchHistory.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center group/item">
                    <button
                      onMouseDown={(e) => {
                        e.preventDefault(); // Prevents input blur before click registers
                        setSearchQuery(item);
                        if (selectedTermId) setSelectedTermId(null);
                        // If there's an exact match in our dictionary, let's open its details!
                        const matched = DICTIONARY_DATA.find(t => t.name.toLowerCase() === item.toLowerCase());
                        if (matched) {
                          setSelectedTermId(matched.id);
                        } else {
                          // Bump/search it anyway
                          addToHistory(item);
                        }
                        setIsSearchFocused(false);
                      }}
                      className="text-gray-500 hover:text-lexgo-dark text-xs sm:text-sm font-medium transition text-left truncate flex-grow pr-2 cursor-pointer bg-transparent border-0 p-0"
                    >
                      {item}
                    </button>
                    <button
                      onMouseDown={(e) => {
                        e.preventDefault(); // Prevents input blur
                        removeFromHistory(item);
                      }}
                      className="text-gray-300 hover:text-red-500 p-0.5 transition cursor-pointer flex-shrink-0 bg-transparent border-0"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-grow z-10 flex min-h-0 relative">
        
        {/* Detail View Mode */}
        {selectedTermId && activeTerm ? (
          <div className="flex-grow flex flex-col items-center max-w-2xl mx-auto w-full space-y-6 py-4 animate-fade-in">
            {/* Centered Term Name & Audio trigger */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-3">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-lexgo-dark tracking-tight">
                  {activeTerm.name}
                </h1>
                <button 
                  onClick={() => handleSpeak(activeTerm)}
                  className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-lexgo-dark rounded-full transition cursor-pointer"
                  title="Pronounce"
                >
                  <Volume2 size={20} />
                </button>
              </div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                Definition
              </span>
            </div>

            {/* Main Detailed Definition block */}
            <p className="text-gray-600 text-sm sm:text-base text-center leading-relaxed max-w-xl">
              {activeTerm.detailedDefinition || activeTerm.definitions[0]}
            </p>

            {/* White Detailed Examples & Related Card Info */}
            <div className="w-full bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm border-t-2 border-t-lexgo-dark">
              {/* Example 1 */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-lexgo-dark">Example 1</h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                  {activeTerm.example1 || "No example scenario recorded."}
                </p>
              </div>

              {/* Example 2 */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-lexgo-dark">Example 2</h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                  {activeTerm.example2 || "No alternative example scenario recorded."}
                </p>
              </div>

              {/* Related Terms list */}
              {activeTerm.relatedTerms && activeTerm.relatedTerms.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-gray-50">
                  <h3 className="text-sm font-bold text-lexgo-dark">Related Terms:</h3>
                  <div className="flex flex-col gap-1 items-start">
                    {activeTerm.relatedTerms.map((term, i) => (
                      <button 
                        key={i}
                        onClick={() => handleRelatedTermClick(term)}
                        className="text-xs sm:text-sm text-gray-400 hover:text-lexgo-dark font-medium transition cursor-pointer hover:underline"
                      >
                        -{term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Card Footer Toggles */}
              <div className="flex justify-between gap-4 pt-4 border-t border-gray-50">
                <button
                  onClick={handlePrevTerm}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-lexgo-dark font-bold text-xs sm:text-sm rounded-xl transition cursor-pointer bg-white"
                >
                  <ChevronLeft size={16} />
                  <span>Previous</span>
                </button>
                <button
                  onClick={handleNextTerm}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 bg-[#0A1128] hover:bg-opacity-95 text-white font-bold text-xs sm:text-sm rounded-xl transition cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* List Mode */
          <div className="flex-grow flex min-h-0">
            {/* Scrollable Terms Content */}
            <div className="flex-1 pr-6 overflow-y-auto space-y-8 min-w-0">
              
              {/* Header Title Block (Only shown when not searching) */}
              {!searchQuery && (
                <div className="text-center space-y-3 pb-4">
                  <div className="w-16 h-16 bg-[#0A1128] rounded-2xl flex items-center justify-center shadow-md mx-auto text-white">
                    <Book size={28} className="stroke-[2]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-lexgo-dark tracking-tight">Law Dictionary</h2>
                    <p className="text-xs text-gray-400 font-semibold tracking-wide">
                      Explore legal terms in simple language.
                    </p>
                  </div>
                </div>
              )}

              {/* Centered Large Section Letter */}
              <div className="text-center pt-2">
                <span className="text-4xl sm:text-5xl font-black text-lexgo-dark tracking-tight">
                  {searchQuery ? 'Search Results' : selectedLetter}
                </span>
              </div>

              {/* Terms List Stack */}
              <div className="space-y-6 max-w-2xl mx-auto w-full">
                {filteredTerms.length > 0 ? (
                  filteredTerms.map((term) => (
                    <div 
                      key={term.id}
                      className="border-b border-gray-50 pb-6 group"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <button
                          onClick={() => setSelectedTermId(term.id)}
                          className="text-lg font-bold text-lexgo-dark hover:underline text-left cursor-pointer group-hover:text-slate-800 transition"
                        >
                          {term.name}
                        </button>
                        <button
                          onClick={() => handleSpeak(term)}
                          className="p-1.5 text-gray-400 hover:text-lexgo-dark rounded-full transition cursor-pointer"
                          title="Pronounce"
                        >
                          <Volume2 size={15} />
                        </button>
                      </div>

                      {/* Definitions list */}
                      <div className="space-y-1 text-xs sm:text-sm text-gray-500 leading-relaxed pl-1">
                        {term.definitions.map((def, i) => (
                          <p key={i}>{def}</p>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 space-y-2">
                    <p className="text-gray-400 font-semibold text-sm">No terms found</p>
                    <p className="text-xs text-gray-400">
                      {searchQuery 
                        ? "Try searching for another legal keyword" 
                        : `No definitions registered under letter "${selectedLetter}" yet.`}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Alphabet Index Sidebar Right */}
            {!searchQuery && (
              <div className="w-8 flex-shrink-0 flex flex-col justify-between items-center text-[10px] font-bold text-gray-400 select-none border-l border-gray-50 pl-2">
                {ALPHABET.map((char) => {
                  const hasTerms = DICTIONARY_DATA.some(t => t.letter === char);
                  const isCurrent = selectedLetter === char;
                  return (
                    <button
                      key={char}
                      onClick={() => {
                        if (hasTerms) {
                          setSelectedLetter(char);
                        }
                      }}
                      disabled={!hasTerms}
                      className={`w-5 h-5 rounded-full flex items-center justify-center transition ${
                        isCurrent 
                          ? 'bg-[#0A1128] text-white font-extrabold text-[11px] scale-110 shadow-sm' 
                          : hasTerms 
                            ? 'text-gray-700 hover:text-lexgo-dark hover:bg-gray-100 cursor-pointer font-bold'
                            : 'text-gray-300 cursor-not-allowed opacity-50'
                      }`}
                    >
                      {char}
                    </button>
                  );
                })}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};

export default DictionaryPage;
