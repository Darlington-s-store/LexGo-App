import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronDown, 
  Play, 
  Lock, 
  HelpCircle, 
  Clock, 
  Check 
} from 'lucide-react';

const QuizPage = () => {
  const navigate = useNavigate();

  const questionsDb = {
    'Criminal Law': [
      {
        q: "Which type of crime typically does NOT require a mens rea?",
        options: [
          "Robbery",
          "Murder",
          "Strick liability offenses",
          "Assault"
        ],
        answer: 2,
        expl: "Strict liability offenses do not require proof of a mens rea (guilty mind); the performance of the actus reus alone is sufficient for conviction."
      },
      {
        q: "Who is widely considered the proponent of the doctrine of the separation of powers",
        options: [
          "Lord Listowel",
          "Sir Baldwin",
          "Montesquieu",
          "Sir Ako Korsah"
        ],
        answer: 2,
        expl: "Montesquieu formulated the political theory of separation of powers in his book 'The Spirit of the Laws'."
      },
      {
        q: "Which of the following make up the legislative branch of government?",
        options: [
          "The President and the Supreme Court",
          "The Cabinet and the Vice President",
          "The Parliament or Congress",
          "The federal and state courts"
        ],
        answer: 2,
        expl: "The legislative branch is responsible for making laws, which is the primary role of Parliament or Congress."
      },
      {
        q: "The 1992 Constitution of Ghana came into force in which year?",
        options: [
          "1991",
          "1992",
          "1993",
          "1994"
        ],
        answer: 2,
        expl: "Although adopted in 1992, the Constitution of the Fourth Republic of Ghana officially came into force on January 7, 1993."
      },
      {
        q: "What is the supreme law of the land in Ghana?",
        options: [
          "The Criminal Code",
          "The 1992 Constitution",
          "Acts of Parliament",
          "Customary law"
        ],
        answer: 1,
        expl: "Article 1(2) of the 1992 Constitution of Ghana states that the Constitution is the supreme law of Ghana, and any other law found to be inconsistent with it shall, to the extent of the inconsistency, be void."
      }
    ],
    'Constitutional Law': [
      {
        q: "Who is widely considered the proponent of the doctrine of the separation of powers?",
        options: [
          "Lord Listowel",
          "Sir Baldwin",
          "Montesquieu",
          "Sir Ako Korsah"
        ],
        answer: 2,
        expl: "Montesquieu formulated the political theory of separation of powers in his book 'The Spirit of the Laws'."
      },
      {
        q: "What is the primary source of Constitutional Law in Ghana?",
        options: [
          "The 1992 Constitution",
          "Common Law and Equity",
          "Acts of Parliament",
          "Customary Law"
        ],
        answer: 0,
        expl: "The 1992 Constitution is the supreme law of Ghana, and any other law found to be inconsistent with it shall, to the extent of the inconsistency, be void."
      },
      {
        q: "The power of a court to review the constitutionality of legislative acts is known as:",
        options: [
          "Judicial activism",
          "Judicial review",
          "Appellate jurisdiction",
          "Original jurisdiction"
        ],
        answer: 1,
        expl: "Judicial review is the power of courts to declare laws or executive actions null and void if they violate the Constitution."
      },
      {
        q: "Which body is responsible for resolving conflicts regarding the interpretation of the Constitution of Ghana?",
        options: [
          "The Parliament of Ghana",
          "The Court of Appeal",
          "The Supreme Court",
          "The National House of Chiefs"
        ],
        answer: 2,
        expl: "Under Article 130 of the 1992 Constitution, the Supreme Court has exclusive original jurisdiction in all matters relating to the enforcement or interpretation of the Constitution."
      },
      {
        q: "Which constitutional concept ensures that no single branch of government becomes too powerful?",
        options: [
          "Federalism",
          "Checks and Balances",
          "Rule of Law",
          "Parliamentary Sovereignty"
        ],
        answer: 1,
        expl: "Checks and balances allow each branch of government to limit the powers of the other branches, preventing dictatorship."
      }
    ],
    'Contract Law': [
      {
        q: "In the law of contracts, what is defined as 'an expression of willingness to contract on specified terms'?",
        options: [
          "Consideration",
          "Acceptance",
          "An Offer",
          "Invitation to Treat"
        ],
        answer: 2,
        expl: "An offer is a statement of terms upon which the offeror is prepared to be bound. It must be distinguished from an invitation to treat."
      },
      {
        q: "Which of the following is NOT a required element of a valid contract?",
        options: [
          "Offer and Acceptance",
          "Intention to create legal relations",
          "Written documentation",
          "Consideration"
        ],
        answer: 2,
        expl: "Most contracts do not need to be in writing to be legally binding; oral agreements are valid unless specifically required by statute (like land transfers)."
      },
      {
        q: "What is the legal term for something of value exchanged between parties to a contract?",
        options: [
          "Estoppel",
          "Consideration",
          "Indemnity",
          "Covenant"
        ],
        answer: 1,
        expl: "Consideration is the price paid for the promise, which must be of some value in the eyes of the law."
      },
      {
        q: "An advertisement in a newspaper is generally classified as:",
        options: [
          "A binding offer",
          "An invitation to treat",
          "A counter-offer",
          "A unilateral contract"
        ],
        answer: 1,
        expl: "In common law, newspaper advertisements are generally invitations to treat, inviting customers to make offers."
      },
      {
        q: "Which remedy is an equitable remedy ordering a party to perform their specific contractual obligations?",
        options: [
          "Damages",
          "Specific Performance",
          "Rescission",
          "Injunction"
        ],
        answer: 1,
        expl: "Specific performance is an equitable remedy where the court orders the breaching party to perform their part of the contract."
      }
    ]
  };

  // State Management
  const [quizStep, setQuizStep] = useState('setup');
  const [selectedArea, setSelectedArea] = useState('Criminal Law');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Easy');
  const [selectedCount, setSelectedCount] = useState(5);
  const [isAreaDropdownOpen, setIsAreaDropdownOpen] = useState(false);

  // Active quiz variables
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timer, setTimer] = useState(60);
  const [showReview, setShowReview] = useState(false);

  // Timer Effect
  useEffect(() => {
    let interval = null;
    if (quizStep === 'quiz') {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            // Auto advance on timeout
            handleNextQuestion();
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [quizStep, currentQuestionIndex, activeQuestions]);

  // Loading transition
  useEffect(() => {
    if (quizStep === 'loading') {
      const timerId = setTimeout(() => {
        const pool = questionsDb[selectedArea] || [];
        const selected = pool.slice(0, selectedCount);
        setActiveQuestions(selected);
        setCurrentQuestionIndex(0);
        setAnswers({});
        setTimer(60);
        setShowReview(false);
        setQuizStep('quiz');
      }, 1500);
      return () => clearTimeout(timerId);
    }
  }, [quizStep]);

  const handleStartQuiz = () => {
    setQuizStep('loading');
  };

  const handleSelectOption = (optIdx) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optIdx
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < activeQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimer(60);
    } else {
      setQuizStep('results');
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setTimer(60);
    }
  };

  const resetQuiz = () => {
    setQuizStep('setup');
    setSelectedArea('Criminal Law');
    setSelectedDifficulty('Easy');
    setSelectedCount(5);
    setIsAreaDropdownOpen(false);
    setShowReview(false);
  };

  // Render setup step
  if (quizStep === 'setup') {
    return (
      <div className="max-w-xl mx-auto space-y-6 animate-fade-in">
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm space-y-6">
          
          {/* Custom Dropdown select */}
          <div className="relative">
            <button
              onClick={() => setIsAreaDropdownOpen(!isAreaDropdownOpen)}
              className="w-full flex items-center justify-between bg-white border border-gray-200 hover:border-gray-300 rounded-2xl px-5 py-4 text-sm font-semibold text-slate-700 transition cursor-pointer"
            >
              <span>{selectedArea ? selectedArea : 'Choose a legal area to practice'}</span>
              <ChevronDown size={18} className={`text-slate-400 transition-transform duration-200 ${isAreaDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isAreaDropdownOpen && (
              <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-20 overflow-hidden divide-y divide-gray-50">
                {Object.keys(questionsDb).map((area) => (
                  <button
                    key={area}
                    onClick={() => {
                      setSelectedArea(area);
                      setIsAreaDropdownOpen(false);
                    }}
                    className="w-full text-left px-5 py-3.5 text-sm font-medium hover:bg-slate-50 text-slate-700 transition cursor-pointer"
                  >
                    {area}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Difficulty Level Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-800 tracking-wide uppercase">Difficulty Level</h3>
            
            <div className="space-y-3">
              {[
                { name: 'Easy', desc: 'Basic concepts and definitions' },
                { name: 'Medium', desc: 'Application and analysis' },
                { name: 'Hard', desc: 'Complex scenarios and synthesis' }
              ].map((diff) => {
                const isSelected = selectedDifficulty === diff.name;
                return (
                  <div
                    key={diff.name}
                    onClick={() => setSelectedDifficulty(diff.name)}
                    className={`rounded-2xl p-5 border cursor-pointer transition flex flex-col items-center text-center relative ${
                      isSelected
                        ? 'bg-[#0A1128] text-white border-transparent shadow-md'
                        : 'bg-white text-slate-700 border-gray-200 hover:bg-slate-50'
                    }`}
                  >
                    <span className="font-extrabold text-base sm:text-lg">{diff.name}</span>
                    <span className={`text-xs mt-1 ${isSelected ? 'text-slate-300' : 'text-gray-400'}`}>
                      {diff.desc}
                    </span>
                    {isSelected && (
                      <span className="mt-2.5 bg-[#FAF6F6] text-[#D97706] font-bold text-[10px] uppercase px-3 py-1 rounded-full border border-[#D97706]/20 tracking-wide">
                        Selected
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Number of Questions Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-800 tracking-wide uppercase">Number of Questions</h3>
            <div className="grid grid-cols-4 gap-3">
              {[5, 10, 15, 20].map((num) => {
                const isSelected = selectedCount === num;
                return (
                  <button
                    key={num}
                    onClick={() => setSelectedCount(num)}
                    className={`py-3.5 text-center font-bold text-sm sm:text-base rounded-xl border transition cursor-pointer ${
                      isSelected
                        ? 'bg-[#0A1128] text-white border-transparent'
                        : 'bg-white text-slate-700 border-gray-200 hover:bg-slate-50'
                    }`}
                  >
                    {num}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={handleStartQuiz}
            className="w-full bg-[#0A1128] text-white hover:bg-opacity-95 rounded-2xl py-4 flex items-center justify-center gap-2.5 font-bold transition shadow-sm cursor-pointer mt-4"
          >
            <Play size={18} fill="currentColor" />
            <span>Start Quiz</span>
          </button>
        </div>
      </div>
    );
  }

  // Render loading transition
  if (quizStep === 'loading') {
    return (
      <div className="max-w-xl mx-auto animate-fade-in">
        <div className="bg-white border border-gray-100 rounded-3xl p-16 shadow-sm flex flex-col items-center justify-center min-h-[300px]">
          <div className="relative flex items-center justify-center mb-6">
            <span className="w-4 h-4 bg-slate-400 rounded-full animate-ping"></span>
            <span className="absolute w-3 h-3 bg-slate-500 rounded-full"></span>
          </div>
          <p className="text-slate-500 font-semibold text-sm tracking-wide">Please wait... setting things up</p>
        </div>
      </div>
    );
  }

  // Render active quiz simulation
  if (quizStep === 'quiz') {
    const q = activeQuestions[currentQuestionIndex];
    if (!q) return null;
    const progressPercent = ((currentQuestionIndex + 1) / activeQuestions.length) * 100;
    const selectedAns = answers[currentQuestionIndex];

    return (
      <div className="max-w-xl mx-auto animate-fade-in">
        <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
          
          {/* Header navy box */}
          <div className="bg-[#0A1128] text-white p-8 relative rounded-t-3xl overflow-hidden flex flex-col">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 border border-gray-100 shadow-sm">
                <Lock size={18} className="text-[#0A1128] stroke-[2.5]" />
              </div>
              <p className="text-base font-bold leading-snug pt-1">
                Answer these questions to review core concepts in {selectedArea.toLowerCase()}.
              </p>
            </div>
            
            {/* Progress bar */}
            <div className="w-full h-2 bg-white rounded-full mt-8 overflow-hidden">
              <div
                className="h-full bg-[#5C5252] rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6 sm:p-8 space-y-6 rounded-b-3xl bg-white">
            
            {/* Badges Row */}
            <div className="flex justify-between items-center w-full">
              <div className="bg-[#EFF6FF] text-[#2563EB] px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                <HelpCircle size={14} className="stroke-[2.5]" />
                <span>Question {currentQuestionIndex + 1} of {activeQuestions.length}</span>
              </div>
              
              <div className="bg-[#F3F4F6] text-[#4B5563] px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                <Clock size={14} className="stroke-[2.5]" />
                <span>{timer}s</span>
              </div>
            </div>

            {/* Question Text */}
            <h2 className="text-base sm:text-lg font-bold text-slate-800 leading-snug">
              {q.q}
            </h2>

            {/* Options List */}
            <div className="space-y-4">
              {q.options.map((opt, idx) => {
                const isSelected = selectedAns === idx;
                const letter = String.fromCharCode(65 + idx); // A, B, C, D
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition duration-150 flex items-center gap-3.5 text-sm sm:text-base font-semibold cursor-pointer ${
                      isSelected
                        ? 'border-2 border-[#0A1128] bg-slate-50/50 text-[#0A1128] font-bold'
                        : 'border-gray-200 text-slate-700 bg-white hover:bg-slate-50 hover:border-gray-300'
                    }`}
                  >
                    <span className="font-extrabold">{letter})</span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between items-center w-full mt-8 gap-4">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className={`flex-1 sm:flex-initial text-center px-8 py-3.5 rounded-xl font-bold border transition text-sm cursor-pointer ${
                  currentQuestionIndex === 0
                    ? 'border-gray-100 text-gray-300 bg-white cursor-not-allowed'
                    : 'border-[#0A1128] text-[#0A1128] bg-white hover:bg-slate-50'
                }`}
              >
                Previous
              </button>

              <button
                onClick={handleNextQuestion}
                className="flex-1 sm:flex-initial text-center px-8 py-3.5 rounded-xl font-bold bg-[#0A1128] hover:bg-opacity-95 text-white transition text-sm cursor-pointer"
              >
                Next Question
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Results step
  if (quizStep === 'results') {
    const totalQuestionsCount = activeQuestions.length;
    const totalCorrect = activeQuestions.reduce((acc, q, idx) => {
      return acc + (answers[idx] === q.answer ? 1 : 0);
    }, 0);
    const percentage = totalQuestionsCount > 0 
      ? Math.round((totalCorrect / totalQuestionsCount) * 100) 
      : 0;
    const wrongCount = totalQuestionsCount - totalCorrect;

    return (
      <div className="max-w-xl mx-auto animate-fade-in space-y-6">
        <div className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-10 shadow-sm text-center flex flex-col items-center">
          
          {/* Double-circle green checkmark icon */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-[#E8F5E9] rounded-full flex items-center justify-center border-4 border-[#C8E6C9]/40">
              <div className="w-16 h-16 bg-[#00E676] rounded-full flex items-center justify-center shadow-md shadow-green-100">
                <Check className="text-white w-9 h-9 stroke-[3]" />
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-extrabold text-[#0A1128] tracking-tight">Congratulations</h3>
          <p className="text-sm font-semibold text-[#64748B] mt-1">Excellent Work Done</p>

          <div className="mt-8 mb-2">
            <span className="text-xs text-slate-400 font-extrabold uppercase tracking-wider block">You Scored</span>
            <span className="text-6xl sm:text-7xl font-black text-[#0A1128] block mt-1 tracking-tighter">
              {percentage}%
            </span>
          </div>

          {/* Three horizontal metrics cards */}
          <div className="grid grid-cols-3 gap-3 w-full mt-8">
            <div className="bg-[#FAF6F6] rounded-2xl p-4 text-center border border-red-50/10">
              <span className="text-[10px] sm:text-xs text-slate-400 font-bold block uppercase tracking-wide">Total Questions</span>
              <span className="text-xl sm:text-2xl font-black text-[#0A1128] block mt-1.5">{totalQuestionsCount}</span>
            </div>
            <div className="bg-[#FAF6F6] rounded-2xl p-4 text-center border border-red-50/10">
              <span className="text-[10px] sm:text-xs text-slate-400 font-bold block uppercase tracking-wide">Correct</span>
              <span className="text-xl sm:text-2xl font-black text-[#0A1128] block mt-1.5">{totalCorrect}</span>
            </div>
            <div className="bg-[#FAF6F6] rounded-2xl p-4 text-center border border-red-50/10">
              <span className="text-[10px] sm:text-xs text-slate-400 font-bold block uppercase tracking-wide">wrong</span>
              <span className="text-xl sm:text-2xl font-black text-[#0A1128] block mt-1.5">{wrongCount}</span>
            </div>
          </div>

          {/* Side-by-side buttons */}
          <div className="flex gap-4 w-full mt-8">
            <button
              onClick={() => setShowReview(!showReview)}
              className={`flex-1 text-center py-3.5 rounded-2xl font-bold border transition text-sm cursor-pointer ${
                showReview
                  ? 'bg-slate-100 border-gray-300 text-[#0A1128]'
                  : 'border-gray-200 text-[#0A1128] bg-white hover:bg-slate-50'
              }`}
            >
              Review Quiz
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex-1 text-center py-3.5 rounded-2xl font-bold bg-[#0A1128] hover:bg-opacity-95 text-white transition text-sm cursor-pointer"
            >
              Return to home
            </button>
          </div>

        </div>

        {/* Detailed Review Section */}
        {showReview && (
          <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-fade-in">
            <div className="border-b border-gray-100 pb-3 flex justify-between items-center">
              <h4 className="font-bold text-[#0A1128] text-base">Questions Review</h4>
              <span className="text-xs font-bold text-slate-400">{totalCorrect} / {totalQuestionsCount} Correct</span>
            </div>
            
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
              {activeQuestions.map((q, idx) => {
                const isCorrect = answers[idx] === q.answer;
                return (
                  <div key={idx} className="bg-slate-50/50 rounded-2xl p-4 border border-gray-100 space-y-3">
                    <div className="flex gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <p className="text-sm font-semibold text-slate-800 leading-snug">{q.q}</p>
                    </div>
                    <div className="text-xs space-y-1.5 text-slate-500 pl-4">
                      <div>
                        <span className="font-semibold text-slate-700">Your Answer:</span>{' '}
                        <span className={isCorrect ? 'text-green-600 font-bold' : 'text-red-500 font-bold'}>
                          {answers[idx] !== undefined ? `${String.fromCharCode(65 + answers[idx])}) ${q.options[answers[idx]]}` : 'No answer'}
                        </span>
                      </div>
                      {!isCorrect && (
                        <div>
                          <span className="font-semibold text-slate-700">Correct Answer:</span>{' '}
                          <span className="text-green-600 font-bold">
                            {String.fromCharCode(65 + q.answer)}) {q.options[q.answer]}
                          </span>
                        </div>
                      )}
                      <div className="mt-2 text-[11px] leading-relaxed italic bg-white p-3 rounded-xl border border-gray-100 text-slate-600">
                        <span className="font-bold text-slate-700 block mb-0.5 uppercase tracking-wider text-[9px]">Explanation:</span>
                        {q.expl}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default QuizPage;
