import React from 'react';

const CoursesPage = () => {
  const courses = [
    { id: 1, title: 'Introduction to Legal Studies', desc: 'Understanding core judicial systems, sources of law, and structures of government.', duration: '8 Modules', progress: 75 },
    { id: 2, title: 'Constitutional Law I', desc: 'In-depth analysis of institutional powers, judicial reviews, human rights guarantees.', duration: '12 Modules', progress: 40 },
    { id: 3, title: 'Criminal Jurisprudence', desc: 'Examine definitions of crime, mens rea/actus reus foundations, and sentencing rules.', duration: '10 Modules', progress: 10 },
    { id: 4, title: 'Contractual Law & Remedies', desc: 'Elements of agreement: offers, considerations, acceptances, and damages for breach.', duration: '6 Modules', progress: 0 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-lexgo-dark">Academic Courses</h2>
        <p className="text-sm text-gray-500">Track and advance your study modules</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="text-base font-bold text-lexgo-dark tracking-tight">{course.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{course.desc}</p>
              <div className="text-[11px] text-gray-500 font-semibold">
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
              <button className="w-full text-center py-2.5 mt-2 rounded-xl text-xs font-semibold border border-lexgo-dark/80 text-lexgo-dark hover:bg-lexgo-dark hover:text-white transition duration-150 cursor-pointer">
                {course.progress > 0 ? 'Resume Module' : 'Start Course'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
