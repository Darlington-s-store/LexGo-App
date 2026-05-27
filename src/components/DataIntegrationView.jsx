import React, { useState } from 'react';
import { Upload, CheckCircle, Image } from 'lucide-react';

const DataIntegrationView = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploading(true);
      setSuccess(false);

      // Simulate a premium upload progress
      setTimeout(() => {
        setUploading(false);
        setSuccess(true);
      }, 2000);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h4 className="text-base font-black text-lexgo-dark">Upload Document</h4>
      </div>

      {/* Upload container */}
      <div className="border-2 border-dashed border-gray-200 rounded-[24px] p-12 text-center bg-white flex flex-col items-center justify-center relative overflow-hidden min-h-[260px]">
        {uploading ? (
          <div className="space-y-3 flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
            <span className="text-xs font-bold text-lexgo-dark">Uploading and integrating scores...</span>
          </div>
        ) : success ? (
          <div className="space-y-3 flex flex-col items-center">
            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-2">
              <CheckCircle size={28} />
            </div>
            <span className="text-sm font-extrabold text-lexgo-dark">Scores Integrated Successfully!</span>
            <p className="text-xs text-gray-400 font-semibold">{file?.name} • {(file?.size / 1024).toFixed(1)} KB</p>
            <button 
              onClick={() => { setFile(null); setSuccess(false); }}
              type="button"
              className="text-xs font-bold text-rose-500 hover:underline mt-2 bg-transparent border-0 cursor-pointer"
            >
              Upload another file
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Image size={36} className="text-gray-400 mb-4" />
            <p className="text-xs sm:text-sm font-semibold text-gray-500 max-w-md leading-relaxed mb-6">
              Upload your examination scores for integration with test , quizes, and assignments
            </p>
            
            <label className="bg-[#0A1128] text-white text-xs font-bold py-3 px-6 rounded-xl flex items-center gap-2 hover:bg-opacity-95 transition cursor-pointer shadow-2xs">
              <Upload size={14} />
              <span>Choose File</span>
              <input 
                type="file" 
                accept=".csv,.xlsx,.xls,.txt" 
                className="hidden" 
                onChange={handleFileChange}
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataIntegrationView;
