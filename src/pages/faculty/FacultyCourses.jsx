import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  ChevronDown, 
  MoreVertical, 
  BookOpen, 
  Users, 
  BarChart2,
  Archive,
  Trash2
} from 'lucide-react';
import constitutionalLawImg from '../../assets/constitutional_law.png';
import contractLawImg from '../../assets/contract_law.png';
import criminalLawImg from '../../assets/criminal_law.png';
import AddCourseModal from '../../components/AddCourseModal';
import CourseDetailsModal from '../../components/CourseDetailsModal';

const FacultyCourses = () => {
  const [courses, setCourses] = useState([
    {
      id: "LAW-001",
      code: "Law001",
      title: "Introduction to Legal Studies",
      description: "Foundational course covering basic legal principles, court systems, and...",
      fullDescription: "This foundational course provides students with a comprehensive overview of basic legal principles and the structure of court systems. It covers essential topics such as the hierarchy of laws, the role of judicial processes, and key legal terminology. Students will explore various types of laws, including civil and criminal law, and gain an understanding of how court systems operate at both state and federal levels. Through case studies and discussions, learners will develop critical thinking skills necessary for analyzing legal issues and understanding the impact of legal decisions on society.",
      level: "Level 100",
      category: "LMM",
      semester: "1st SEM",
      lecturer: "Dr. John Smith",
      lecturerEmail: "johnsmith@st.edu.gh",
      students: 100,
      creditHours: 3,
      status: "Active",
      imageIdx: 0 // contract image
    },
    {
      id: "LAW-002",
      code: "Law001",
      title: "Introduction to Legal Studies",
      description: "Foundational course covering basic legal principles, court systems, and...",
      fullDescription: "This foundational course provides students with a comprehensive overview of basic legal principles and the structure of court systems. It covers essential topics such as the hierarchy of laws, the role of judicial processes, and key legal terminology. Students will explore various types of laws, including civil and criminal law, and gain an understanding of how court systems operate at both state and federal levels. Through case studies and discussions, learners will develop critical thinking skills necessary for analyzing legal issues and understanding the impact of legal decisions on society.",
      level: "Level 100",
      category: "LMM",
      semester: "1st SEM",
      lecturer: "Dr. Mike Adjei",
      lecturerEmail: "mikeadjei@st.edu.gh",
      students: 450,
      creditHours: 4,
      status: "Active",
      imageIdx: 1 // scales image
    },
    {
      id: "LAW-003",
      code: "Law001",
      title: "Introduction to Legal Studies",
      description: "Foundational course covering basic legal principles, court systems, and...",
      fullDescription: "This foundational course provides students with a comprehensive overview of basic legal principles and the structure of court systems. It covers essential topics such as the hierarchy of laws, the role of judicial processes, and key legal terminology. Students will explore various types of laws, including civil and criminal law, and gain an understanding of how court systems operate at both state and federal levels. Through case studies and discussions, learners will develop critical thinking skills necessary for analyzing legal issues and understanding the impact of legal decisions on society.",
      level: "Level 100",
      category: "LMM",
      semester: "1st SEM",
      lecturer: "Dr. Fred Quaye",
      lecturerEmail: "fredquaye@st.edu.gh",
      students: 250,
      creditHours: 3,
      status: "Active",
      imageIdx: 2 // books image
    },
    {
      id: "LAW-004",
      code: "Law002",
      title: "Evidence Law",
      description: "Comprehensive study of rules governing admissibility of evidence in courts...",
      fullDescription: "This course covers the rules of evidence in civil and criminal proceedings. Topics include relevancy, hearsay, character evidence, witness competency and credibility, privileges, and constitutional limitations on evidence admission. Students will analyze real-world case precedents to understand evidence admissibility.",
      level: "Level 300",
      category: "LLB",
      semester: "2nd SEM",
      lecturer: "Prof. Kofi Mensah",
      lecturerEmail: "kofimensah@st.edu.gh",
      students: 180,
      creditHours: 3,
      status: "Active",
      imageIdx: 1
    },
    {
      id: "LAW-005",
      code: "Law003",
      title: "Prosperity Law",
      description: "Analysis of commercial legal systems, wealth creation frameworks and regulations...",
      fullDescription: "An exploration of law in relation to economic development, contract enforcement, and commercial activities. This course examines how legal systems shape economic outcomes, property rights, and prosperity in democratic societies.",
      level: "Level 400",
      category: "LLB",
      semester: "2nd SEM",
      lecturer: "Dr. Elizabeth Johnson",
      lecturerEmail: "ejohnson@st.edu.gh",
      students: 120,
      creditHours: 3,
      status: "Active",
      imageIdx: 2
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // Search & Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [selectedSemester, setSelectedSemester] = useState('All Semesters');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const handleArchiveCourse = (courseId) => {
    setCourses(courses.map(c => 
      c.id === courseId 
        ? { ...c, status: c.status === 'Active' ? 'Archived' : 'Active' } 
        : c
    ));
  };

  const handleDeleteCourse = (courseId) => {
    setCourses(courses.filter(c => c.id !== courseId));
  };

  const handleCreateCourseSubmit = (newCourseData) => {
    const newCourse = {
      id: `LAW-${Math.floor(Math.random() * 900) + 100}`,
      code: newCourseData.code,
      title: newCourseData.title,
      description: newCourseData.description.slice(0, 70) + "...",
      fullDescription: newCourseData.description,
      level: newCourseData.level,
      category: "LMM", // fallback category
      semester: newCourseData.semester === '1st sem' ? '1st SEM' : '2nd SEM',
      lecturer: newCourseData.lecturerName,
      lecturerEmail: newCourseData.lecturerEmail,
      students: 0,
      creditHours: newCourseData.creditHours,
      status: "Active",
      imageIdx: Math.floor(Math.random() * 3)
    };

    setCourses([newCourse, ...courses]);
    setShowCreateModal(false);
  };

  const handleViewDetails = (course) => {
    setSelectedCourse(course);
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.lecturer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === 'All Levels' || course.level === selectedLevel;
    const matchesSemester = selectedSemester === 'All Semesters' || course.semester.toLowerCase() === selectedSemester.toLowerCase();
    const matchesCategory = selectedCategory === 'All Categories' || course.category === selectedCategory;

    return matchesSearch && matchesLevel && matchesSemester && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-lexgo-dark">Course Management</h1>
          <p className="text-gray-500 text-sm font-medium">Faculty of Law, Management</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-lexgo-dark hover:bg-opacity-95 text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-2xl flex items-center gap-2 transition shadow-sm cursor-pointer shrink-0 border-0"
        >
          <Plus size={16} />
          <span>Add New Course</span>
        </button>
      </div>

      {/* Stats Summary row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Total Courses</span>
            <span className="text-3xl font-extrabold text-lexgo-dark block">100</span>
          </div>
          <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
            <BookOpen size={24} />
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Total Enrollments</span>
            <span className="text-3xl font-extrabold text-lexgo-dark block">2050</span>
          </div>
          <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
            <Users size={24} />
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Avg. Pass Rate</span>
            <span className="text-3xl font-extrabold text-lexgo-dark block">78%</span>
          </div>
          <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
            <BarChart2 size={24} />
          </div>
        </div>
      </div>

      {/* Search & Filters Row */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search Course Code , Title , lectuer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white text-lexgo-dark border border-gray-100 rounded-2xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-lexgo-dark placeholder-gray-400 shadow-2xs"
          />
          <Search size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          {/* Levels Filter */}
          <div className="relative flex-grow md:flex-grow-0">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full md:w-40 pl-4 pr-10 py-3 bg-white text-lexgo-dark border border-gray-100 rounded-2xl text-xs font-bold focus:outline-none shadow-2xs appearance-none cursor-pointer"
            >
              <option value="All Levels">All Levels</option>
              <option value="Level 100">Level 100</option>
              <option value="Level 200">Level 200</option>
              <option value="Level 300">Level 300</option>
              <option value="Level 400">Level 400</option>
            </select>
            <ChevronDown size={16} className="absolute right-3.5 top-3.5 text-gray-500 pointer-events-none" />
          </div>

          {/* Semesters Filter */}
          <div className="relative flex-grow md:flex-grow-0">
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="w-full md:w-40 pl-4 pr-10 py-3 bg-white text-lexgo-dark border border-gray-100 rounded-2xl text-xs font-bold focus:outline-none shadow-2xs appearance-none cursor-pointer"
            >
              <option value="All Semesters">All Semesters</option>
              <option value="1st SEM">1st SEM</option>
              <option value="2nd SEM">2nd SEM</option>
            </select>
            <ChevronDown size={16} className="absolute right-3.5 top-3.5 text-gray-500 pointer-events-none" />
          </div>

          {/* Categories Filter */}
          <div className="relative flex-grow md:flex-grow-0">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full md:w-40 pl-4 pr-10 py-3 bg-white text-lexgo-dark border border-gray-100 rounded-2xl text-xs font-bold focus:outline-none shadow-2xs appearance-none cursor-pointer"
            >
              <option value="All Categories">All Categories</option>
              <option value="LMM">LMM</option>
              <option value="LLB">LLB</option>
            </select>
            <ChevronDown size={16} className="absolute right-3.5 top-3.5 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Grid of Courses */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const imageSrc = course.imageIdx === 0 
            ? contractLawImg 
            : course.imageIdx === 1 
              ? constitutionalLawImg 
              : criminalLawImg;
          
          return (
            <div 
              key={course.id}
              className="bg-white border border-gray-100 rounded-[24px] shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between relative"
            >
              {/* Card Image */}
              <div className="h-48 overflow-hidden relative rounded-t-[24px]">
                <img 
                  src={imageSrc} 
                  alt={course.title}
                  className="w-full h-full object-cover" 
                />
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-2 relative">
                    <h3 className="font-extrabold text-lexgo-dark text-base leading-snug cursor-pointer hover:text-[#0A1128] transition" onClick={() => handleViewDetails(course)}>
                      {course.code}: {course.title}
                    </h3>
                    <div className="relative">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdownId(openDropdownId === course.id ? null : course.id);
                        }}
                        className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-lexgo-dark transition cursor-pointer shrink-0"
                      >
                        <MoreVertical size={16} />
                      </button>
                      
                      {openDropdownId === course.id && (
                        <>
                          <div 
                            className="fixed inset-0 z-30" 
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdownId(null);
                            }}
                          />
                          <div 
                            className="absolute right-0 top-9 bg-white border border-gray-150 rounded-2xl shadow-xl p-2 min-w-[140px] z-40 space-y-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              onClick={() => {
                                handleArchiveCourse(course.id);
                                setOpenDropdownId(null);
                              }}
                              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 rounded-xl transition text-left border-0 bg-transparent cursor-pointer"
                            >
                              <Archive size={14} className="text-gray-500" />
                              <span>{course.status === 'Archived' ? 'Activate' : 'Archieve'}</span>
                            </button>
                            <button
                              onClick={() => {
                                handleDeleteCourse(course.id);
                                setOpenDropdownId(null);
                              }}
                              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl transition text-left border-0 bg-transparent cursor-pointer"
                            >
                              <Trash2 size={14} className="text-red-500" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed font-semibold">
                    {course.description}
                  </p>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] font-bold bg-[#FAF6F6] text-lexgo-dark px-3 py-1 rounded-md">
                    {course.level}
                  </span>
                  <span className="text-[10px] font-bold bg-[#FAF6F6] text-lexgo-dark px-3 py-1 rounded-md">
                    {course.category}
                  </span>
                  <span className="text-[10px] font-bold bg-[#FAF6F6] text-lexgo-dark px-3 py-1 rounded-md uppercase">
                    {course.semester}
                  </span>
                  {course.status === 'Archived' && (
                    <span className="text-[10px] font-bold bg-amber-50 text-amber-700 px-3 py-1 rounded-md uppercase">
                      Archived
                    </span>
                  )}
                </div>

                {/* Footer details */}
                <div className="flex justify-between items-center pt-3 border-t border-gray-50 text-xs font-semibold text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 bg-[#FAF6F6] rounded-full flex items-center justify-center text-lexgo-dark text-[9px] font-bold">
                      {course.lecturer.split(' ').pop().charAt(0)}
                    </div>
                    <span>{course.lecturer}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={14} className="text-gray-400" />
                    <span>{course.students} Students</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add New Course Modal */}
      <AddCourseModal 
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateCourseSubmit}
      />

      {/* Course Details Modal */}
      <CourseDetailsModal 
        isOpen={selectedCourse !== null}
        onClose={() => setSelectedCourse(null)}
        course={selectedCourse}
      />
    </div>
  );
};

export default FacultyCourses;
