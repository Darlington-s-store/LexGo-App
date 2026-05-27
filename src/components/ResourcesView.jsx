import React, { useState } from 'react';
import { FileText, Download, CheckCircle, Loader2 } from 'lucide-react';

const ResourcesView = ({ course }) => {
  const [downloadingId, setDownloadingId] = useState(null);
  const [downloadedIds, setDownloadedIds] = useState([]);

  if (!course) return null;

  // Extract base course title for clean naming:
  // e.g. "Constitutional Law I" -> "Constitutional Law"
  const getBaseCourseName = (title) => {
    const lower = title.toLowerCase();
    if (lower.includes('constitutional')) return 'Constitutional Law';
    if (lower.includes('contract')) return 'Contract Law';
    if (lower.includes('criminal')) return 'Criminal Law';
    if (lower.includes('legal studies') || lower.includes('legal')) return 'Legal Studies';
    if (lower.includes('torts')) return 'Torts Law';
    return title;
  };

  const baseName = getBaseCourseName(course.title);

  // Generate the 7 resources matching the mockup
  const resources = Array.from({ length: 7 }, (_, i) => ({
    id: i + 1,
    title: `Introduction to ${baseName} ${i + 1}`,
    size: '5MB',
    date: 'Sept 17,2025',
    time: '10:10AM'
  }));

  const handleDownload = (id, title) => {
    if (downloadedIds.includes(id) || downloadingId !== null) return;

    setDownloadingId(id);

    // Simulate download progress
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadedIds((prev) => [...prev, id]);

      // Create a dummy text file download to make the app feel fully functional
      const element = document.createElement("a");
      const file = new Blob([`Dummy download content for LexGo Study Resource: ${title}`], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `${title.replace(/\s+/g, '_')}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1500);
  };

  return (
    <div className="space-y-4 font-sans max-w-4xl mx-auto">
      {resources.map((res) => {
        const isDownloading = downloadingId === res.id;
        const isDownloaded = downloadedIds.includes(res.id);

        return (
          <div 
            key={res.id}
            onClick={() => handleDownload(res.id, res.title)}
            className="bg-white border border-slate-100 rounded-[20px] p-5 shadow-sm hover:border-slate-350 hover:shadow-md transition-all duration-200 flex items-center justify-between cursor-pointer group select-none"
          >
            {/* Left Side: Icon & Details */}
            <div className="flex items-center gap-4.5">
              {/* Document Icon - Green Outlined */}
              <FileText className="text-emerald-600 w-6 h-6 flex-shrink-0" strokeWidth={1.8} />
              
              <div>
                <h4 className="text-[14px] sm:text-[15px] font-black text-slate-900 leading-tight tracking-tight group-hover:text-sky-600 transition-colors">
                  {res.title}
                </h4>
                <p className="text-[11px] text-slate-400 font-semibold mt-1 flex items-center gap-1.5 select-none">
                  <span>{res.size}</span>
                  <span className="text-slate-300">•</span>
                  <span>{res.date}</span>
                  <span className="text-slate-300">•</span>
                  <span>{res.time}</span>
                </p>
              </div>
            </div>

            {/* Right Side: Interactive Action Feedback */}
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-800 transition flex-shrink-0">
              {isDownloading ? (
                <Loader2 size={15} className="animate-spin text-slate-800" />
              ) : isDownloaded ? (
                <CheckCircle size={16} className="text-emerald-600" />
              ) : (
                <Download size={15} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ResourcesView;
