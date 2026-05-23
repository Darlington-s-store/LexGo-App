import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Check, 
  Plus, 
  GraduationCap, 
  Trash2, 
  Settings, 
  ChevronDown, 
  ChevronUp,
  Info
} from 'lucide-react';

const PREDEFINED_COURSES = [
  { id: 1, title: 'Introduction to Legal Studies', desc: 'Understanding core judicial systems, sources of law, and structures of government.', duration: '8 Modules' },
  { id: 2, title: 'Constitutional Law I', desc: 'In-depth analysis of institutional powers, judicial reviews, human rights guarantees.', duration: '12 Modules' },
  { id: 3, title: 'Criminal Jurisprudence', desc: 'Examine definitions of crime, mens rea/actus reus foundations, and sentencing rules.', duration: '10 Modules' },
  { id: 4, title: 'Contractual Law & Remedies', desc: 'Elements of agreement: offers, considerations, acceptances, and damages for breach.', duration: '6 Modules' },
  { id: 5, title: 'Law of Torts', desc: 'Civil wrongs, negligence, liability standards, nuisance, and defamation.', duration: '9 Modules' },
];

const CoursesPage = () => {
  const [mountedCourses, setMountedCourses] = useState(() => {
    try {
      const saved = localStorage.getItem('lexgo_mounted_courses');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    try {
      const saved = localStorage.getItem('lexgo_enrolled_courses');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (!localStorage.getItem('lexgo_v2_reset_done')) {
      localStorage.removeItem('lexgo_enrolled_courses');
      localStorage.removeItem('lexgo_mounted_courses');
      localStorage.setItem('lexgo_v2_reset_done', 'true');
      setMountedCourses([]);
      setEnrolledCourses([]);
    }
  }, []);

  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customDesc, setCustomDesc] = useState('');
  const [customDuration, setCustomDuration] = useState('8 Modules');

  // Mount predefined course
  const handleMountPredefined = (course) => {
    const isAlreadyMounted = mountedCourses.some((c) => c.title.toLowerCase() === course.title.toLowerCase());
    if (isAlreadyMounted) return;

    const updated = [...mountedCourses, course];
    setMountedCourses(updated);
    localStorage.setItem('lexgo_mounted_courses', JSON.stringify(updated));
  };

  // Mount custom course
  const handleMountCustom = (e) => {
    e.preventDefault();
    if (!customTitle.trim() || !customDesc.trim()) {
      alert('Please fill out all fields.');
      return;
    }

    const isAlreadyMounted = mountedCourses.some((c) => c.title.toLowerCase() === customTitle.trim().toLowerCase());
    if (isAlreadyMounted) {
      alert('A course with this title is already mounted.');
      return;
    }

    const newCourse = {
      id: Date.now(),
      title: customTitle.trim(),
      desc: customDesc.trim(),
      duration: customDuration
    };

    const updated = [...mountedCourses, newCourse];
    setMountedCourses(updated);
    localStorage.setItem('lexgo_mounted_courses', JSON.stringify(updated));

    setCustomTitle('');
    setCustomDesc('');
    setCustomDuration('8 Modules');
  };

  // Unmount course
  const handleUnmountCourse = (courseId) => {
    const updatedMounted = mountedCourses.filter((c) => c.id !== courseId);
    setMountedCourses(updatedMounted);
    localStorage.setItem('lexgo_mounted_courses', JSON.stringify(updatedMounted));

    // Also remove from enrolled list if it was enrolled
    const updatedEnrolled = enrolledCourses.filter((c) => c.id !== courseId);
    setEnrolledCourses(updatedEnrolled);
    localStorage.setItem('lexgo_enrolled_courses', JSON.stringify(updatedEnrolled));
  };

  // Enroll in course
  const handleEnroll = (course) => {
    const isAlreadyEnrolled = enrolledCourses.some((c) => c.id === course.id);
    if (isAlreadyEnrolled) return;

    const updated = [...enrolledCourses, { ...course, progress: 0 }];
    setEnrolledCourses(updated);
    localStorage.setItem('lexgo_enrolled_courses', JSON.stringify(updated));
  };

  // Study / Progress increment
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

  // Reset simulator
  const handleResetSimulator = () => {
    if (window.confirm('Are you sure you want to clear all mounted and enrolled courses?')) {
      setMountedCourses([]);
      setEnrolledCourses([]);
      localStorage.removeItem('lexgo_mounted_courses');
      localStorage.removeItem('lexgo_enrolled_courses');
    }
  };

  return (
    <div className="space-y-10 pb-16">
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
              Your study desk is currently empty. Scroll down to browse and enroll in courses currently mounted on the portal.
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

      {/* Mounted Portal Section */}
      <div className="space-y-4 pt-4 border-t border-gray-100">
        <div>
          <h3 className="text-base font-bold text-lexgo-dark">Mounted Course Portal</h3>
          <p className="text-xs text-gray-400">Official curriculum courses currently mounted by the faculty/department for enrollment</p>
        </div>

        {mountedCourses.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 sm:p-12 bg-slate-50/50 border border-dashed border-slate-200 rounded-3xl text-center max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-amber-50/50 flex items-center justify-center text-amber-500 mb-4 shadow-inner">
              <Info size={28} />
            </div>
            <h4 className="text-sm font-bold text-lexgo-dark mb-1.5">No Courses Mounted</h4>
            <p className="text-xs text-gray-500 max-w-xs leading-relaxed mb-6">
              The faculty/department has not mounted any courses on the portal for this semester yet.
            </p>
            <button
              onClick={() => setIsSimulatorOpen(true)}
              className="text-xs font-bold text-[#E27D2C] hover:underline flex items-center gap-1.5 cursor-pointer"
            >
              <Settings size={14} />
              <span>Use Faculty Simulator to mount courses</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {mountedCourses.map((course) => {
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
        )}
      </div>

      {/* Simulated Faculty Panel */}
      <div className="pt-6 border-t border-gray-200">
        <div className="bg-[#FAF6F6] rounded-3xl border border-gray-100 overflow-hidden">
          {/* Accordion Toggle Header */}
          <button
            onClick={() => setIsSimulatorOpen(!isSimulatorOpen)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-red-50/20 transition cursor-pointer text-left bg-transparent border-0"
          >
            <div className="flex items-center gap-2.5">
              <Settings className="text-[#E27D2C] w-5 h-5" />
              <div>
                <h4 className="text-sm font-bold text-lexgo-dark">Faculty / Department Simulation Portal</h4>
                <p className="text-[11px] text-gray-400 font-medium">Add or remove courses available for student enrollment</p>
              </div>
            </div>
            {isSimulatorOpen ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
          </button>

          {/* Accordion Content */}
          {isSimulatorOpen && (
            <div className="px-6 pb-6 pt-2 border-t border-gray-100/50 space-y-6">
              {/* Predefined Course List */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mount Predefined Courses</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PREDEFINED_COURSES.map((course) => {
                    const isMounted = mountedCourses.some((c) => c.title.toLowerCase() === course.title.toLowerCase());
                    return (
                      <div key={course.id} className="bg-white border border-gray-100 rounded-xl p-3 flex justify-between items-center text-xs">
                        <div>
                          <div className="font-bold text-lexgo-dark">{course.title}</div>
                          <div className="text-[10px] text-gray-400">{course.duration}</div>
                        </div>
                        <button
                          onClick={() => handleMountPredefined(course)}
                          disabled={isMounted}
                          className={`px-3 py-1.5 rounded-lg font-bold border transition text-[11px] cursor-pointer
                            ${isMounted 
                              ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-default'
                              : 'border-[#E27D2C] text-[#E27D2C] hover:bg-[#E27D2C] hover:text-white'
                            }`}
                        >
                          {isMounted ? 'Mounted' : 'Mount'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Custom Course Form */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mount Custom Course</h5>
                <form onSubmit={handleMountCustom} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Course Title (e.g. Environmental Law)"
                      value={customTitle}
                      onChange={(e) => setCustomTitle(e.target.value)}
                      className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-lexgo-dark font-medium"
                      required
                    />
                    <select
                      value={customDuration}
                      onChange={(e) => setCustomDuration(e.target.value)}
                      className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-lexgo-dark font-medium"
                    >
                      <option value="6 Modules">6 Modules</option>
                      <option value="8 Modules">8 Modules</option>
                      <option value="10 Modules">10 Modules</option>
                      <option value="12 Modules">12 Modules</option>
                    </select>
                  </div>
                  <textarea
                    placeholder="Short course description explaining what students will learn..."
                    value={customDesc}
                    onChange={(e) => setCustomDesc(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-lexgo-dark font-medium h-20 resize-none"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-lexgo-dark text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-opacity-95 transition cursor-pointer"
                  >
                    Mount Custom Course
                  </button>
                </form>
              </div>

              {/* Currently Mounted Table/List for Unmounting */}
              {mountedCourses.length > 0 && (
                <>
                  <hr className="border-gray-100" />
                  <div className="space-y-3">
                    <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Currently Mounted Courses ({mountedCourses.length})</h5>
                    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
                      <table className="w-full text-xs text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 border-b border-gray-100">
                            <th className="px-4 py-2.5 font-bold text-gray-500">Course Title</th>
                            <th className="px-4 py-2.5 font-bold text-gray-500 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mountedCourses.map((c) => (
                            <tr key={c.id} className="border-b border-gray-100 last:border-b-0">
                              <td className="px-4 py-3 font-medium text-lexgo-dark">{c.title}</td>
                              <td className="px-4 py-3 text-right">
                                <button
                                  onClick={() => handleUnmountCourse(c.id)}
                                  className="text-red-500 hover:text-red-700 font-bold flex items-center gap-1 ml-auto cursor-pointer"
                                >
                                  <Trash2 size={13} />
                                  <span>Unmount</span>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}

              <hr className="border-gray-100" />
              
              {/* Reset Everything */}
              <div className="flex justify-end">
                <button
                  onClick={handleResetSimulator}
                  className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 size={14} />
                  <span>Reset All Simulator Data</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
