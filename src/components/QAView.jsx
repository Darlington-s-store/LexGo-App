import React, { useState, useEffect } from 'react';
import { User, Send, Plus, X, MessageSquare, ChevronRight, CornerDownRight } from 'lucide-react';
import ViewFeedbackModal from './ViewFeedbackModal';
import AddQAModal from './AddQAModal';

const QAView = ({ course }) => {
  const localStorageKey = `lexgo_qa_${course?.id || 'default'}`;

  // Initial threads matching the mockup snippet
  // Thread 1 has replies (opens full discussion details)
  // Thread 2 has 0 replies and is pending (opens "View Feedback" clock modal)
  // Thread 3 has 0 replies but has answeredFeedback (opens "View Feedback" answered Q&A modal with Add Q&A button)
  const defaultThreads = [
    {
      id: 1,
      author: 'Dr.Johnson',
      snippet: "Please I don't Understand the meaning of the ...",
      fullQuestion: "Please I don't Understand the meaning of the Separation of Powers doctrine under the 1992 Constitution. How does the executive branch check the judiciary in Ghana?",
      replies: [
        {
          id: 101,
          author: 'Prof. Azmah',
          role: 'Instructor',
          content: 'The primary check is the appointment process. Under Article 144, the President appoints the Chief Justice and other Justices of the Superior Courts, though this is heavily regulated and requires Parliamentary approval for the Chief Justice and Supreme Court justices.',
          time: '2 hours ago'
        },
        {
          id: 102,
          author: 'Law Student (You)',
          role: 'Student',
          content: 'Ah, that makes sense. Is there also a check regarding financial autonomy?',
          time: '1 hour ago'
        }
      ]
    },
    {
      id: 2,
      author: 'Dr.Johnson',
      snippet: "Please I don't Understand the meaning of the ...",
      fullQuestion: "Please I don't Understand the meaning of the 48-hour rule in Article 14. What happens if a suspect is arrested on a Friday evening?",
      replies: []
    },
    {
      id: 3,
      author: 'Dr.Johnson',
      snippet: "Please I don't Understand the meaning of the ...",
      fullQuestion: "What is the principle of Separation of Powers?",
      replies: [],
      answeredFeedback: {
        question: "What is the principle of Separation of Powers?",
        answer: "It divides government powers among the executive, legislature, and judiciary to prevent abuse."
      }
    }
  ];

  const [threads, setThreads] = useState(() => {
    try {
      const saved = localStorage.getItem(localStorageKey);
      return saved ? JSON.parse(saved) : defaultThreads;
    } catch {
      return defaultThreads;
    }
  });

  const [selectedThread, setSelectedThread] = useState(null);
  const [isNewQuestionOpen, setIsNewQuestionOpen] = useState(false);
  
  // Form states
  const [replyText, setReplyText] = useState('');

  // Persist to local storage when state changes
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(threads));
  }, [threads, localStorageKey]);

  const handleAddQA = ({ subject, answer }) => {
    const newThread = {
      id: Date.now(),
      author: 'Dr.Johnson', // Keep mockup author name uniform
      snippet: subject.substring(0, 45) + '...',
      fullQuestion: subject,
      replies: answer ? [
        {
          id: Date.now() + 1,
          author: 'Prof. Azmah',
          role: 'Instructor',
          content: answer,
          time: 'Just now'
        }
      ] : []
    };

    setThreads((prev) => [newThread, ...prev]);
    setIsNewQuestionOpen(false);
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedThread) return;

    const newReply = {
      id: Date.now(),
      author: 'Law Student (You)',
      role: 'Student',
      content: replyText.trim(),
      time: 'Just now'
    };

    const updatedThreads = threads.map((t) => {
      if (t.id === selectedThread.id) {
        const updatedReplies = [...t.replies, newReply];
        // Sync selected thread view
        setSelectedThread({ ...t, replies: updatedReplies });
        return { ...t, replies: updatedReplies };
      }
      return t;
    });

    setThreads(updatedThreads);
    setReplyText('');
  };

  const handleResolveFeedback = (threadId, feedback) => {
    const updatedThreads = threads.map((t) => {
      if (t.id === threadId) {
        const newReply = {
          id: Date.now(),
          author: 'Dr.Johnson',
          role: 'Instructor',
          content: feedback.answer,
          time: 'Just now'
        };
        // Create a copy without the answeredFeedback key so it becomes a standard discussion
        const { answeredFeedback, ...rest } = t;
        return {
          ...rest,
          replies: [newReply],
          snippet: feedback.answer.substring(0, 45) + '...'
        };
      }
      return t;
    });
    setThreads(updatedThreads);
    setSelectedThread(null);
  };

  return (
    <div className="space-y-4 font-sans max-w-4xl mx-auto relative pb-24">
      {/* Threads List */}
      <div className="space-y-4">
        {threads.map((thread) => (
          <div 
            key={thread.id}
            onClick={() => setSelectedThread(thread)}
            className="bg-white border border-slate-100 rounded-[20px] p-5 shadow-sm hover:border-slate-350 hover:shadow-md transition-all duration-200 flex items-center justify-between cursor-pointer group select-none"
          >
            <div className="flex items-center gap-4.5">
              {/* Orange Avatar Silhouette */}
              <div className="w-10 h-10 rounded-full bg-[#E27D2C] flex items-center justify-center flex-shrink-0 text-white shadow-sm">
                <User size={20} strokeWidth={2.5} />
              </div>
              
              <div>
                <h4 className="text-[14px] sm:text-[15px] font-black text-slate-900 leading-tight tracking-tight">
                  {thread.author}
                </h4>
                <p className="text-[11px] text-slate-400 font-semibold mt-1">
                  {thread.snippet}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-400 group-hover:text-slate-700 transition">
              {thread.replies.length > 0 && (
                <span className="text-[10px] font-bold bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <MessageSquare size={10} />
                  {thread.replies.length}
                </span>
              )}
              <ChevronRight size={16} strokeWidth={2.5} />
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Button (FAB) at bottom right */}
      <button 
        onClick={() => setIsNewQuestionOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-[#0A1128] text-white flex items-center justify-center hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg border-0 z-40"
        title="Ask a Question"
      >
        <Plus size={24} strokeWidth={2.5} />
      </button>

      {/* Selected Thread Modal / ViewFeedbackModal Overlay */}
      {selectedThread && (
        selectedThread.replies.length === 0 ? (
          <ViewFeedbackModal 
            thread={selectedThread}
            onClose={() => setSelectedThread(null)} 
            onAddQA={handleResolveFeedback}
          />
        ) : (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-fade-in">
            <div className="absolute inset-0 cursor-default" onClick={() => setSelectedThread(null)} />
            
            <div className="bg-[#F8FAFC] rounded-[24px] max-w-2xl w-full p-7 relative shadow-2xl border border-gray-100 flex flex-col z-10 animate-scale-up max-h-[85vh] overflow-y-auto no-scrollbar">
              {/* Header */}
              <div className="flex justify-between items-center mb-5 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 text-[#E27D2C]">
                  <MessageSquare size={18} />
                  <h3 className="text-base font-black text-slate-900 tracking-tight">Question Discussion</h3>
                </div>
                <button 
                  onClick={() => setSelectedThread(null)}
                  className="text-gray-400 hover:text-slate-600 transition bg-transparent border-0 cursor-pointer p-1 rounded-lg hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Core Question Card */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#E27D2C] flex items-center justify-center text-white shadow-sm flex-shrink-0">
                    <User size={18} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900">{selectedThread.author}</h4>
                    <p className="text-[10px] text-slate-400 font-bold">Author</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                  {selectedThread.fullQuestion}
                </p>
              </div>

              {/* Replies Section */}
              <div className="mt-6 space-y-4">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-1">
                  Replies ({selectedThread.replies.length})
                </h4>
                
                {selectedThread.replies.length > 0 ? (
                  <div className="space-y-3.5">
                    {selectedThread.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-2">
                        <CornerDownRight size={16} className="text-slate-300 mt-2 flex-shrink-0" />
                        <div className="flex-1 bg-white border border-slate-100 rounded-2xl p-4.5 shadow-sm space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black text-slate-900">{reply.author}</span>
                              <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full border
                                ${reply.role === 'Instructor' 
                                  ? 'bg-red-50 text-red-600 border-red-100/50' 
                                  : reply.role === 'Teaching Assistant'
                                  ? 'bg-amber-50 text-amber-600 border-amber-100/50'
                                  : 'bg-slate-50 text-slate-500 border-slate-200'
                                }`}
                              >
                                {reply.role}
                              </span>
                            </div>
                            <span className="text-[9px] text-slate-400 font-bold">{reply.time}</span>
                          </div>
                          <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                            {reply.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-6 text-center text-xs text-slate-400 font-bold bg-white border border-slate-100 rounded-2xl">
                    No replies yet. Be the first to answer!
                  </div>
                )}
              </div>

              {/* Reply Form */}
              <form onSubmit={handleSendReply} className="mt-6 border-t border-slate-100 pt-5 flex gap-3">
                <input 
                  type="text"
                  placeholder="Type your reply here..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-slate-900 font-semibold text-black"
                  required
                />
                <button 
                  type="submit"
                  className="bg-[#0A1128] hover:bg-slate-800 text-white w-9 h-9 rounded-xl flex items-center justify-center transition cursor-pointer border-0 flex-shrink-0"
                >
                  <Send size={15} />
                </button>
              </form>
            </div>
          </div>
        )
      )}

      {/* Ask Question Form Modal Overlay */}
      {isNewQuestionOpen && (
        <AddQAModal 
          onClose={() => setIsNewQuestionOpen(false)}
          onAdd={handleAddQA}
        />
      )}
    </div>
  );
};

export default QAView;

