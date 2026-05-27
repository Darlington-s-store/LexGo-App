import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Plus, 
  Calendar, 
  Clock, 
  Star 
} from 'lucide-react';

const AssignmentDetailsModal = ({ assignment, onClose, onSubmit }) => {
  if (!assignment) return null;

  const isSubmitted = assignment.status === 'Submitted';

  // Initialize mock attachments state to match the user's mockup exactly
  const [attachments, setAttachments] = useState([
    { 
      id: 1, 
      title: 'Introduction to Criminal Law', 
      size: '5MB', 
      timeInfo: 'Sept 17,2025 • 10:00AM' 
    },
    { 
      id: 2, 
      title: 'Introduction to Consitutional Law 8', 
      size: '5MB', 
      timeInfo: 'Sept 17,2025 • 10:00AM' 
    }
  ]);

  // Handle removing a submitted attachment
  const handleDeleteAttachment = (id) => {
    setAttachments(attachments.filter(att => att.id !== id));
  };

  // Handle simulated file upload ("another one")
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Convert file size to human-readable format
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
    const sizeString = sizeInMB > 0 ? `${sizeInMB}MB` : '0.1MB';

    // Format current date and time as mockup format "Sept 17,2025 • 10:00AM"
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    const formattedDate = `${months[now.getMonth()]} ${now.getDate()},${now.getFullYear()}`;
    
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const formattedTime = `${hours}:${minutes}${ampm}`;

    const newAttachment = {
      id: Date.now(),
      title: file.name.substring(0, file.name.lastIndexOf('.')) || file.name,
      size: sizeString,
      timeInfo: `${formattedDate} • ${formattedTime}`
    };

    setAttachments([...attachments, newAttachment]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 animate-fade-in font-sans">
      {/* Backdrop click to close */}
      <div className="absolute inset-0 cursor-default" onClick={onClose} />
      
      <div className="bg-white rounded-[24px] max-w-4xl w-full p-8 relative shadow-2xl border border-gray-100 flex flex-col z-10 animate-scale-up max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black text-black tracking-tight">
            {isSubmitted ? 'Assignment Details' : 'Submit Assignment'}
          </h3>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-xl text-gray-500 hover:text-black bg-slate-50 hover:bg-slate-100 transition cursor-pointer flex items-center justify-center border border-slate-100/80"
          >
            <X size={18} />
          </button>
        </div>
        
        {/* Key-Value Details List */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center text-sm py-1 border-b border-gray-50">
            <span className="font-black text-black">Title :</span>
            <span className="font-semibold text-gray-650">{assignment.title}</span>
          </div>
          <div className="flex justify-between items-center text-sm py-1 border-b border-gray-50">
            <span className="font-black text-black">Due Date :</span>
            <span className="font-semibold text-gray-650">Jul 30,2025 , 09:59PM</span>
          </div>
          <div className="flex justify-between items-center text-sm py-1 border-b border-gray-50">
            <span className="font-black text-black">No. of submissions :</span>
            <span className="font-semibold text-gray-650">Unlimited</span>
          </div>
          <div className="flex justify-between items-center text-sm py-1 border-b border-gray-50">
            <span className="font-black text-black">Grade Scale :</span>
            <span className="font-semibold text-gray-650">100 marks</span>
          </div>
          <div className="flex justify-between items-center text-sm py-1 border-b border-gray-50">
            <span className="font-black text-black">Submission Type :</span>
            <span className="font-semibold text-gray-650">file Upload</span>
          </div>
          <div className="flex justify-between items-center text-sm py-1 border-b border-gray-50">
            <span className="font-black text-black">Plagiarism Report:</span>
            <span className="font-semibold text-gray-650 flex items-center gap-1.5">
              {isSubmitted ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-[#10B981] inline-block" />
                  <span className="text-[#10B981] underline font-black">10%</span>
                </>
              ) : (
                <>
                  <Clock size={13} className="text-slate-900" />
                  <span className="text-slate-900 underline font-black">Pending</span>
                </>
              )}
            </span>
          </div>
        </div>
        
        {/* Detailed Instructions */}
        <div className="space-y-2 mb-6">
          <h4 className="text-sm font-black text-black">Detailed Instructions :</h4>
          <div className="p-4 bg-[#FFFBFB] border border-red-50/50 rounded-2xl">
            <p className="text-xs text-gray-650 font-bold">Make sure to answer all questions</p>
          </div>
        </div>
        
        {/* Additional resources for assignment */}
        <div className="space-y-3 mb-6">
          <h4 className="text-sm font-black text-black">Additional resources for assignment</h4>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <FileText size={16} />
            </div>
            <div>
              <p className="text-xs font-black text-black">Assignment Questions</p>
              <p className="text-[10px] text-gray-400 font-semibold">5MB • Sept 17,2025 • 10:00AM</p>
            </div>
          </div>
        </div>
        
        {/* Submitted Attachments */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-black text-black">Submitted Attachments</h4>
            {/* File Upload Trigger */}
            <label className="cursor-pointer text-[10px] font-black text-slate-800 hover:text-black bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition flex items-center gap-1">
              <Plus size={12} strokeWidth={3} />
              <span>Upload Attachment</span>
              <input type="file" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
          
          <div className="space-y-3">
            {attachments.length === 0 ? (
              <p className="text-xs text-gray-400 font-semibold italic py-2">No attachments submitted yet.</p>
            ) : (
              attachments.map((att) => (
                <div 
                  key={att.id} 
                  className="bg-[#EAEAEA]/35 border border-slate-150/40 p-3 px-4 rounded-[14px] flex items-center justify-between group/item"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                      <FileText size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-black">{att.title}</p>
                      <p className="text-[10px] text-gray-400 font-semibold">{att.size} • {att.timeInfo}</p>
                    </div>
                  </div>
                  
                  {/* Delete Button */}
                  <button 
                    onClick={() => handleDeleteAttachment(att.id)}
                    className="w-7 h-7 rounded-full text-rose-500 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 transition flex items-center justify-center border border-rose-100/50 cursor-pointer"
                    title="Delete Attachment"
                  >
                    <X size={13} strokeWidth={2.5} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Submit Action Footer for non-submitted assignments */}
        {!isSubmitted && (
          <div className="mt-8 pt-4 border-t border-gray-150/50 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-gray-500 hover:text-black bg-slate-50 hover:bg-slate-100 transition cursor-pointer border border-slate-200/50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (onSubmit) {
                  onSubmit(assignment.id);
                }
              }}
              className="px-6 py-2.5 rounded-xl text-xs font-black text-white bg-[#0A1128] hover:bg-slate-800 transition cursor-pointer border-0 shadow-sm"
            >
              Submit Assignment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignmentDetailsModal;
