import React, { useState } from 'react';
import { X } from 'lucide-react';

const AddQAModal = ({ onClose, onAdd }) => {
  const [subject, setSubject] = useState('');
  const [question, setQuestion] = useState(''); // This field represents the answer based on mockup placeholder

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim()) return;

    onAdd({
      subject: subject.trim(),
      answer: question.trim()
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-fade-in font-sans">
      {/* Backdrop */}
      <div className="absolute inset-0 cursor-default" onClick={onClose} />
      
      {/* Modal Card */}
      <div className="bg-white rounded-[24px] max-w-md w-full p-8 relative shadow-2xl border border-slate-100 flex flex-col z-10 animate-scale-up">
        {/* Header */}
        <div className="flex justify-between items-center w-full mb-6">
          <h3 className="text-2xl font-black text-slate-950 tracking-tight">Add Q&A</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-slate-600 transition bg-transparent border-0 cursor-pointer p-1 rounded-lg hover:bg-slate-50 flex items-center justify-center"
            aria-label="Close modal"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Subject Field */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-1 select-none">
              Subject
            </label>
            <input 
              type="text"
              placeholder="Write your question"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-[#FAF6F6]/50 border border-slate-100 focus:border-slate-300 rounded-xl px-4 py-3.5 text-xs sm:text-sm focus:outline-none font-semibold text-slate-800 placeholder-slate-400/80"
              required
            />
          </div>

          {/* Question (Answer) Field */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-1 select-none">
              Question
            </label>
            <textarea 
              placeholder="Brief answer for the quesiton" // Typo 'quesiton' preserved from mockup
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full bg-[#FAF6F6]/50 border border-slate-100 focus:border-slate-300 rounded-xl px-4 py-3.5 text-xs sm:text-sm focus:outline-none font-semibold text-slate-800 h-28 resize-none placeholder-slate-400/80 leading-relaxed"
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full bg-[#0A1128] hover:bg-slate-800 text-white font-black py-3.5 rounded-xl text-xs uppercase tracking-wider transition duration-150 cursor-pointer border-0 mt-2 shadow-sm"
          >
            Add Q&A
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQAModal;
