import React, { useState } from 'react';
import { BookOpen, Check, Plus, GraduationCap } from 'lucide-react';

const MOUNTED_COURSES = [
  { id: 1, title: 'Introduction to Legal Studies', desc: 'Understanding core judicial systems, sources of law, and structures of government.', duration: '8 Modules' },
  { id: 2, title: 'Constitutional Law I', desc: 'In-depth analysis of institutional powers, judicial reviews, human rights guarantees.', duration: '12 Modules' },
  { id: 3, title: 'Criminal Jurisprudence', desc: 'Examine definitions of crime, mens rea/actus reus foundations, and sentencing rules.', duration: '10 Modules' },
  { id: 4, title: 'Contractual Law & Remedies', desc: 'Elements of agreement: offers, considerations, acceptances, and damages for breach.', duration: '6 Modules' },
];

const CoursesPage = () => {
  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    try {
      const saved = localStorage.getItem('lexgo_enrolled_courses');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleEnroll = (course) => {
    const isAlreadyEnrolled = enrolledCourses.some((c) => c.id === course.id);
    if (isAlreadyEnrolled) return;

    const updated = [...enrolledCourses, { ...course, progress: 0 }];
    setEnrolledCourses(updated);
    localStorage.setItem('lexgo_enrolled_courses', JSON.stringify(updated));
  };

  const handleStudy = (courseId) => {
    const updated = enrolledCourses.map((c) => {
      if (c.id === courseId) {
        const nextProgress = Math.min(c.progress + 10, 100);
        return { ...c, progress: nextProgress };
      }
      return c;
    });
    setEnrolledCourses(updated);
    localStorage.setItem('lexgo_enrolled_courses', JSON.stringify(updated));
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-lexgo-dark">Academic Courses</h2>
        <p className="text-sm text-gray-500">Track and advance your study modules</p>
      </div>

      {/* Enrolled Courses Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-base font-bold text-lexgo-dark">My Enrolled Courses</h3>
          <p className="text-xs text-gray-400">Courses you are currently pursuing this semester</p>
        </div>

        {enrolledCourses.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 sm:p-12 bg-slate-50/50 border border-dashed border-slate-200 rounded-3xl text-center max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4 shadow-inner">
              <BookOpen size={28} />
            </div>
            <h4 className="text-sm font-bold text-lexgo-dark mb-1.5">No Registered Courses</h4>
            <p className="text-xs text-gray-500 max-w-xs leading-relaxed mb-6">
              Your study desk is currently empty. Browse the mounted courses below and enroll to start tracking your modules.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between border-l-4 border-l-lexgo-dark">
                <div className="space-y-3">
                  <h4 className="text-base font-bold text-lexgo-dark tracking-tight">{course.title}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">{course.desc}</p>
                  <div className="text-[11px] text-gray-500 font-semibold bg-slate-50 inline-block px-2.5 py-1 rounded-lg">
                    Duration: {course.duration}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-50 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 font-medium">Enrolled Progress</span>
                    <span className="text-lexgo-dark font-bold">{course.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-lexgo-dark rounded-full transition-all duration-500" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <button 
                    onClick={() => handleStudy(course.id)}
                    className="w-full text-center py-2.5 mt-2 rounded-xl text-xs font-semibold border border-lexgo-dark/80 text-lexgo-dark hover:bg-lexgo-dark hover:text-white transition duration-150 cursor-pointer"
                  >
                    {course.progress === 100 ? 'Course Completed' : course.progress > 0 ? 'Resume Module (+10%)' : 'Start Course'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mounted Portal Portal */}
      <div className="space-y-4 pt-4 border-t border-gray-100">
        <div>
          <h3 className="text-base font-bold text-lexgo-dark">Mounted Course Portal</h3>
          <p className="text-xs text-gray-400">Official curriculum courses available for enrollment this semester</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {MOUNTED_COURSES.map((course) => {
            const isEnrolled = enrolledCourses.some((c) => c.id === course.id);
            return (
              <div key={course.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between relative overflow-hidden group">
                {isEnrolled && (
                  <div className="absolute top-0 right-0 bg-emerald-500/10 text-emerald-600 text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                    Enrolled
                  </div>
                )}
                
                <div className="space-y-3">
                  <h4 className="text-base font-bold text-lexgo-dark tracking-tight pr-14">{course.title}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">{course.desc}</p>
                  <div className="text-[11px] text-gray-500 font-semibold bg-slate-50 inline-block px-2.5 py-1 rounded-lg">
                    Duration: {course.duration}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-50">
                  <button
                    onClick={() => handleEnroll(course)}
                    disabled={isEnrolled}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold border transition duration-150 cursor-pointer
                      ${isEnrolled
                        ? 'bg-emerald-50 border-emerald-100 text-emerald-600 cursor-default'
                        : 'border-lexgo-dark/80 text-lexgo-dark hover:bg-lexgo-dark hover:text-white'
                      }`}
                  >
                    {isEnrolled ? (
                      <>
                        <Check size={14} />
                        <span>Ready to Study</span>
                      </>
                    ) : (
                      <>
                        <Plus size={14} />
                        <span>Enroll in Course</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
