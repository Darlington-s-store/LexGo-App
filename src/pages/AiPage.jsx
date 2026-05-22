import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Scale, 
  BookOpen, 
  Globe, 
  Lightbulb, 
  List, 
  Send, 
  Sparkles, 
  Trash2, 
  ArrowLeft, 
  MessageSquare,
  Shield,
  FileText
} from 'lucide-react';

const AiPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Suggested prompt cards mapping
  const prompts = [
    {
      id: 'constitutional',
      title: 'Constitutional Law',
      icon: Scale,
      color: 'text-red-500 bg-red-50',
      query: 'What is the doctrine of judicial review in Constitutional Law?',
      response: 'Judicial review is the power of courts (such as the Supreme Court of Ghana under Article 130 of the 1992 Constitution) to examine the actions of the legislative, executive, and administrative arms of government and determine whether such actions are consistent with the Constitution. Any law or executive action found to be inconsistent is declared null and void to the extent of the inconsistency.'
    },
    {
      id: 'contract',
      title: 'Contract Law',
      icon: BookOpen,
      color: 'text-blue-500 bg-blue-50',
      query: 'Can you explain the elements of a contract under common law?',
      response: 'Under common law, a valid contract requires five essential elements:\n\n1. Offer: a clear expression of willingness to contract on specified terms.\n2. Acceptance: unqualified assent to the terms of the offer.\n3. Consideration: something of value exchanged between parties (e.g. payment or a promise).\n4. Intention to Create Legal Relations: the parties must intend for the agreement to be legally binding.\n5. Capacity: the legal ability of the parties to enter into a contract (e.g. age, sanity).'
    },
    {
      id: 'criminal',
      title: 'Criminal Law',
      icon: Globe,
      color: 'text-purple-500 bg-purple-50',
      query: 'What is the difference between actus reus and mens rea in criminal law?',
      response: 'In criminal law, liability generally requires the concurrence of two elements:\n\n1. Actus Reus (Guilty Act): the physical act, conduct, or omission that constitutes the crime (e.g. the physical taking of property in theft).\n2. Mens Rea (Guilty Mind): the mental state of intent, knowledge, recklessness, or negligence accompanying the physical act.\n\nStrict liability offenses are an exception where mens rea is not required for a conviction.'
    },
    {
      id: 'tort',
      title: 'Tort Law',
      icon: Lightbulb,
      color: 'text-amber-500 bg-amber-50',
      query: 'What are the four pillars of negligence in Tort Law?',
      response: 'To succeed in an action for negligence in Tort Law, a plaintiff must establish four key elements:\n\n1. Duty of Care: a legal obligation to avoid acts or omissions that could foreseeably harm others.\n2. Breach of Duty: failure to meet the standard of care expected of a reasonable person under the circumstances.\n3. Causation: a direct link showing that the breach caused the damage (both factual causation and proximate cause/remoteness).\n4. Damages: actual, legally recognizable loss or injury suffered by the plaintiff.'
    },
    {
      id: 'whatis',
      title: 'What is Law',
      icon: List,
      color: 'text-emerald-500 bg-emerald-50',
      query: 'What is law and why is it important?',
      response: 'Law is a systematic set of rules, regulations, and principles established by a sovereign authority (such as a state, parliament, or community) to regulate human conduct, maintain social order, resolve disputes, and promote justice.\n\nIt is backed by enforcement mechanisms and sanctions to ensure compliance and peaceful coexistence.'
    }
  ];

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const triggerMockResponse = (userQueryText, promptObj = null) => {
    setIsTyping(true);
    
    setTimeout(() => {
      let aiText = "That's an interesting inquiry. In legal practice, we analyze that concept by looking at governing precedents, judicial reviews, and statutory language.";
      
      if (promptObj) {
        aiText = promptObj.response;
      } else {
        const query = userQueryText.toLowerCase();
        if (query.includes('search') || query.includes('seizure') || query.includes('mensah') || query.includes('republic v. mensah')) {
          aiText = "In Republic V. Mensah, the court evaluated the constitutional limits of search and seizure, declaring that searches conducted without judicial warrants are prima facie unlawful unless they fall within strict exceptions.";
        } else if (query.includes('mens rea') || query.includes('actus reus')) {
          aiText = "Mens rea refers to the criminal intent or guilty mind, while actus reus refers to the physical act. Most criminal statutes require proving both elements beyond a reasonable doubt for a conviction.";
        } else if (query.includes('tort') || query.includes('negligence') || query.includes('duty of care')) {
          aiText = "Negligence in tort law requires proving: (1) a duty of care was owed, (2) that duty was breached, (3) the breach caused injury/loss (causation), and (4) quantifiable damages resulted.";
        } else if (query.includes('constitutional') || query.includes('judicial review')) {
          aiText = "Constitutional law establishes the framework of governance. The supreme court has the authority of judicial review to strike down any laws that conflict with the written constitution.";
        } else if (query.includes('contract') || query.includes('offer') || query.includes('acceptance')) {
          aiText = "Contracts require an offer, acceptance, consideration, intention to create legal relations, and capacity. Without these, the agreement is generally unenforceable in common law.";
        }
      }

      setMessages((prev) => [...prev, { id: prev.length + 1, text: aiText, isAi: true }]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userMsgText = inputVal;
    setMessages((prev) => [...prev, { id: prev.length + 1, text: userMsgText, isAi: false }]);
    setInputVal('');

    triggerMockResponse(userMsgText);
  };

  const handleSelectPrompt = (promptItem) => {
    // Add user message
    setMessages((prev) => [...prev, { id: prev.length + 1, text: promptItem.query, isAi: false }]);
    
    // Trigger typing response matching the selected card
    triggerMockResponse(promptItem.query, promptItem);
  };

  const handleClearChat = () => {
    setMessages([]);
    setIsTyping(false);
  };

  const showLanding = messages.length === 0;

  // Create grid of icons for watermark background grid
  const gridCells = Array.from({ length: 24 });
  const watermarkSymbols = [Scale, BookOpen, Shield, Lightbulb, List, MessageSquare, FileText];

  return (
    <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden flex flex-col h-[620px] shadow-sm relative">
      
      {/* Watermark Background Grid Overlay (only visible on landing screen) */}
      {showLanding && (
        <div className="absolute inset-0 grid grid-cols-4 sm:grid-cols-6 grid-rows-4 gap-x-12 gap-y-16 p-8 opacity-[0.03] select-none pointer-events-none z-0">
          {gridCells.map((_, idx) => {
            const IconComponent = watermarkSymbols[idx % watermarkSymbols.length];
            return (
              <div key={idx} className="flex items-center justify-center">
                <IconComponent className="w-10 h-10 stroke-[1.5]" />
              </div>
            );
          })}
        </div>
      )}

      {/* Header Bar */}
      <div className="bg-[#0A1128] text-white p-4 flex items-center justify-between z-10 shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-white/10 rounded-xl transition cursor-pointer text-slate-300 hover:text-white"
            title="Go to Dashboard"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
              <Sparkles size={15} className="text-[#F59E0B]" />
            </div>
            <div>
              <h3 className="text-sm font-bold leading-none">AI Legal Assistant</h3>
              <span className="text-[10px] text-slate-400 font-semibold">Online</span>
            </div>
          </div>
        </div>
        {!showLanding && (
          <button 
            onClick={handleClearChat}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold rounded-xl transition cursor-pointer"
          >
            <Trash2 size={13} />
            <span>Clear Chat</span>
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-grow overflow-y-auto p-6 z-10 flex flex-col min-h-0 bg-slate-50/10">
        {showLanding ? (
          /* Landing Screen */
          <div className="flex-grow flex flex-col justify-center items-center max-w-xl mx-auto w-full space-y-8 py-4">
            
            {/* Center Logo */}
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-[#0A1128] rounded-full flex items-center justify-center shadow-lg shadow-blue-50/50 mx-auto relative group transition duration-300">
                <div className="absolute inset-0 bg-[#0A1128] rounded-full animate-ping opacity-10"></div>
                <MessageSquare size={36} className="text-white fill-white/10 stroke-[2]" />
                <div className="absolute flex gap-1 bottom-6.5">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.1s]"></span>
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.3s]"></span>
                </div>
              </div>
              
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-lexgo-dark tracking-tight">AI Legal Assistant</h2>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">
                  Get instant help with legal concepts and knowledge
                </p>
              </div>
            </div>

            {/* Suggestions Prompts Stack */}
            <div className="w-full space-y-3">
              <span className="text-[10px] sm:text-xs text-gray-400 font-extrabold uppercase tracking-widest block text-center">
                Suggested Topics
              </span>
              <div className="grid grid-cols-1 gap-2.5 sm:gap-3">
                {prompts.map((p) => {
                  const Icon = p.icon;
                  return (
                    <button
                      key={p.id}
                      onClick={() => handleSelectPrompt(p)}
                      className="w-full text-left bg-white border border-gray-100 hover:border-gray-300/80 rounded-2xl p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm flex items-center gap-4 cursor-pointer group"
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${p.color} flex-shrink-0 transition`}>
                        <Icon size={18} className="stroke-[2.5]" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-sm font-bold text-lexgo-dark">{p.title}</h4>
                        <p className="text-xs text-gray-400 font-medium line-clamp-1 group-hover:text-gray-500 transition">
                          {p.query}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        ) : (
          /* Active Chat Screen */
          <div className="flex-grow flex flex-col space-y-4">
            {messages.map((m) => (
              <div 
                key={m.id} 
                className={`flex ${m.isAi ? 'justify-start' : 'justify-end'}`}
              >
                <div className="flex gap-2 max-w-[85%] items-end">
                  {m.isAi && (
                    <div className="w-7 h-7 rounded-full bg-[#0A1128] text-white flex items-center justify-center flex-shrink-0 mb-1 shadow-sm">
                      <Sparkles size={11} className="text-[#F59E0B]" />
                    </div>
                  )}
                  <div className={`rounded-2xl p-4 text-xs sm:text-sm shadow-sm leading-relaxed whitespace-pre-line ${
                    m.isAi 
                      ? 'bg-white border border-gray-100 text-lexgo-dark' 
                      : 'bg-[#0A1128] text-white font-medium'
                  }`}>
                    {m.text}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-2 items-end">
                  <div className="w-7 h-7 rounded-full bg-[#0A1128] text-white flex items-center justify-center flex-shrink-0 mb-1">
                    <Sparkles size={11} className="text-[#F59E0B]" />
                  </div>
                  <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3 flex gap-1 items-center shadow-sm">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Bar & Disclaimer at Bottom */}
      <div className="p-4 border-t border-gray-100 bg-white z-10 shrink-0 space-y-3">
        <form onSubmit={handleSend} className="flex gap-2.5 max-w-xl mx-auto w-full">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Ask about law concepts, terms or cases..."
            className="flex-grow border border-gray-200 rounded-2xl px-5 py-3.5 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#0A1128] bg-white placeholder-gray-400 font-medium"
          />
          <button 
            type="submit" 
            className="w-12 h-12 sm:w-14 sm:h-14 bg-[#0A1128] text-white rounded-2xl hover:bg-opacity-95 transition flex items-center justify-center flex-shrink-0 cursor-pointer shadow-sm hover:shadow-md"
          >
            <Send size={18} />
          </button>
        </form>
        <p className="text-[10px] text-center text-gray-400 font-bold max-w-sm mx-auto leading-normal">
          AI-generated answers are for educational purposes and should not be taken as legal advice.
        </p>
      </div>

    </div>
  );
};

export default AiPage;
