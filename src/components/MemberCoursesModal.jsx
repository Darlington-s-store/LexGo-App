import React from 'react';
import { X, Users } from 'lucide-react';

const MemberCoursesModal = ({ isOpen, onClose, member, onRemoveCourse, onOpenAssignModal }) => {
  if (!isOpen || !member) return null;

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return '??';
    // Clean name of titles like Dr., Mr., Prof.
    const cleanName = name.replace(/^(Dr\.|Mr\.|Mrs\.|Miss\.|Prof\.)\s*/i, '');
    const parts = cleanName.split(' ').filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    }
    return cleanName.slice(0, 2).toUpperCase();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 animate-fade-in">
      <div className="bg-white rounded-[32px] max-w-2xl w-full p-8 relative shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header Profile */}
        <div className="flex items-center gap-3 mb-6 pr-10">
          <div className="w-12 h-12 bg-[#0A1128] text-white rounded-full flex items-center justify-center font-bold text-base shrink-0">
            {getInitials(member.name)}
          </div>
          <div>
            <h3 className="font-extrabold text-lexgo-dark text-base">{member.name}</h3>
            <span className="text-xs text-gray-400 font-bold block">{member.id}</span>
          </div>
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          type="button"
          className="absolute right-6 top-6 w-9 h-9 rounded-xl text-lexgo-dark hover:bg-gray-100 bg-[#FAF6F6] transition cursor-pointer flex items-center justify-center border-0"
        >
          <X size={18} />
        </button>

        {/* Scrollable Course List */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-4 mb-6 min-h-[200px]">
          {member.assignedCourses && member.assignedCourses.length > 0 ? (
            member.assignedCourses.map((course) => (
              <div 
                key={course.code}
                className="bg-white border border-gray-100 rounded-3xl p-6 space-y-4 shadow-2xs hover:shadow-xs transition"
              >
                <div>
                  <h4 className="font-extrabold text-lexgo-dark text-sm">
                    {course.code}: {course.title}
                  </h4>
                </div>
                
                {/* Badges Row */}
                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] font-bold bg-[#FAF6F6] text-lexgo-dark px-3 py-1 rounded-md">
                    {course.level}
                  </span>
                  <span className="text-[10px] font-bold bg-[#FAF6F6] text-lexgo-dark px-3 py-1 rounded-md uppercase">
                    {course.category}
                  </span>
                  <span className="text-[10px] font-bold bg-[#FAF6F6] text-lexgo-dark px-3 py-1 rounded-md uppercase">
                    {course.semester}
                  </span>
                  <span className="text-[10px] font-bold bg-[#FAF6F6] text-lexgo-dark px-3 py-1 rounded-md flex items-center gap-1">
                    <Users size={10} className="text-gray-400" />
                    <span>{course.students} Students</span>
                  </span>
                </div>

                {/* Remove Course Action */}
                <div>
                  <button
                    onClick={() => onRemoveCourse(member.id, course.code)}
                    type="button"
                    className="border border-gray-200 rounded-xl px-4 py-2.5 flex items-center gap-1.5 text-xs font-bold text-lexgo-dark hover:bg-gray-50 transition cursor-pointer bg-white"
                  >
                    <X size={14} className="text-gray-500" />
                    <span>Remove Course</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-[#FAF6F6] rounded-[24px] border-2 border-dashed border-gray-200">
              <span className="text-sm font-semibold text-gray-400">No courses assigned to this faculty member.</span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-xl border border-gray-300 text-lexgo-dark font-bold text-sm bg-white hover:bg-gray-50 transition cursor-pointer text-center"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onOpenAssignModal(member)}
            className="px-6 py-3 rounded-xl bg-[#0A1128] text-white font-bold text-sm hover:bg-opacity-95 transition cursor-pointer flex items-center gap-1.5 shadow-xs border-0"
          >
            <span>+ Assign New Course</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberCoursesModal;
