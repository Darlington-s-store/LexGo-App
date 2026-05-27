import React from 'react';
import { X, Clock } from 'lucide-react';

const ViewFeedbackModal = ({ thread, onClose, onAddQA }) => {
  const isAnswered = thread && thread.answeredFeedback;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-fade-in font-sans">
      {/* Backdrop */}
      <div className="absolute inset-0 cursor-default" onClick={onClose} />
      
      {/* Modal Container */}
      <div className="bg-white rounded-[24px] max-w-md w-full p-8 relative shadow-2xl border border-slate-100 flex flex-col z-10 animate-scale-up">
        {/* Header */}
        <div className="flex justify-between items-center w-full mb-6">
          <h3 className="text-xl font-black text-slate-950 tracking-tight">View Feedback</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-slate-600 transition bg-transparent border-0 cursor-pointer p-1 rounded-lg hover:bg-slate-50 flex items-center justify-center"
            aria-label="Close modal"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {isAnswered ? (
          /* State 2: Answered Feedback State */
          <div className="space-y-5">
            {/* Question Box */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">
                Your Question
              </label>
              <div className="bg-slate-50/50 border border-slate-100/50 rounded-2xl p-4.5 text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed text-left">
                {thread.answeredFeedback.question}
              </div>
            </div>

            {/* Answer Box */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">
                Answer
              </label>
              <div className="bg-slate-50/50 border border-slate-100/50 rounded-2xl p-4.5 text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed text-left">
                {thread.answeredFeedback.answer}
              </div>
            </div>

            {/* Add Q&A Button */}
            <button
              onClick={() => onAddQA(thread.id, thread.answeredFeedback)}
              className="w-full bg-[#0A1128] hover:bg-slate-800 text-white font-black py-3.5 rounded-xl text-xs uppercase tracking-wider transition duration-150 cursor-pointer border-0 mt-2 shadow-sm"
            >
              Add Q&A
            </button>
          </div>
        ) : (
          /* State 1: Pending Clock State */
          <div className="text-center items-center flex flex-col w-full">
            {/* Center Clock Icon */}
            <div className="my-6">
              <div className="w-20 h-20 rounded-full border-[5px] border-slate-950 flex items-center justify-center text-slate-950 mx-auto">
                <Clock size={40} strokeWidth={3} />
              </div>
            </div>

            {/* Status Message */}
            <h4 className="text-xl font-black text-slate-950 tracking-tight mb-2 select-none">
              Lecturer is yet to answer
            </h4>
            <p className="text-[13px] text-slate-500 font-semibold leading-relaxed max-w-[280px] mx-auto mb-2 select-none">
              Your question is pending. You'll be notified once it's answered.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewFeedbackModal;

