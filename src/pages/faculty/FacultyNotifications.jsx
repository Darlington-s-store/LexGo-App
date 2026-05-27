import React, { useState } from 'react';
import { Search, ChevronDown, Clock, User, Check, X } from 'lucide-react';

const FacultyNotifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      priority: "High Priority",
      category: "Reports",
      title: "12 Students Below GPA Threshold",
      description: "12 students in Level 300 have fallen below the 2.0 GPA threshold and require immediate intervention",
      timestamp: "2026-02-16 09:30 AM",
      triggeredBy: "Triggered by : Automated System",
      read: false
    },
    {
      id: 2,
      priority: "Meduim Priority", // Retaining mockup typo
      category: "Exams",
      title: "LAW300 Exam Pending Approval",
      description: "Criminal Law examination results uploaded and pending Dean approval before publication",
      timestamp: "2026-02-16 09:30 AM",
      triggeredBy: "Triggered by : Dr. Sarah Johnson (Exam Officer)",
      read: false
    },
    {
      id: 3,
      priority: "High Priority",
      category: "Exams",
      title: "New Student Batch Created",
      description: "BATCH 2023/2024 YEAR GROUP has been created by Admin",
      timestamp: "2026-02-16 09:30 AM",
      triggeredBy: "Triggered by : Dr. Sarah Johnson (Admin)",
      read: false
    },
    {
      id: 4,
      priority: "Medium Priority",
      category: "Courses",
      title: "Syllabus Uploaded for LAW200",
      description: "Constitutional Law course syllabus has been successfully uploaded and processed.",
      timestamp: "2026-02-15 02:00 PM",
      triggeredBy: "Triggered by : Dr. John Smith",
      read: true
    },
    {
      id: 5,
      priority: "High Priority",
      category: "Reports",
      title: "Student Performance Exported",
      description: "Gradebook analysis report exported for the LLB Level 400 batch.",
      timestamp: "2026-02-15 11:30 AM",
      triggeredBy: "Triggered by : Dr. John Smith",
      read: true
    },
    {
      id: 6,
      priority: "Medium Priority",
      category: "Students",
      title: "Student status changed to Active",
      description: "Adjei Caleb student enrollment status reactivated.",
      timestamp: "2026-02-14 04:15 PM",
      triggeredBy: "Triggered by : Mr. mark Coffie",
      read: true
    },
    {
      id: 7,
      priority: "High Priority",
      category: "Exams",
      title: "Approved Exam Results",
      description: "Final grading approved for Law001 Introduction to Legal Studies.",
      timestamp: "2026-02-14 09:00 AM",
      triggeredBy: "Triggered by : Dr. Adam Adjei",
      read: true
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedPriority, setSelectedPriority] = useState('All Priorities');
  const [selectedNotif, setSelectedNotif] = useState(null);

  // Mark all as read
  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: !n.read } : n));
  };

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  // Metrics counts
  const totalAlerts = notifications.length;
  const highPriorityCount = notifications.filter(n => n.priority.toLowerCase().includes('high')).length;
  const mediumPriorityCount = notifications.filter(n => n.priority.toLowerCase().includes('meduim') || n.priority.toLowerCase().includes('medium')).length;
  const lowPriorityCount = notifications.filter(n => n.priority.toLowerCase().includes('low')).length;

  const filteredNotifications = notifications.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          n.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All Types' || n.category === selectedType;
    
    let matchesPriority = true;
    if (selectedPriority !== 'All Priorities') {
      if (selectedPriority === 'High Priority') {
        matchesPriority = n.priority.toLowerCase().includes('high');
      } else if (selectedPriority === 'Medium Priority') {
        matchesPriority = n.priority.toLowerCase().includes('meduim') || n.priority.toLowerCase().includes('medium');
      } else if (selectedPriority === 'Low Priority') {
        matchesPriority = n.priority.toLowerCase().includes('low');
      }
    }
    
    return matchesSearch && matchesType && matchesPriority;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Row */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-lexgo-dark">Notifications</h1>
          <p className="text-gray-500 text-sm font-medium">Faculty of Law, Management</p>
        </div>
        
        {notifications.some(n => !n.read) && (
          <button 
            onClick={handleMarkAllRead}
            className="bg-[#0A1128] hover:bg-opacity-95 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl transition shadow-2xs border-0 cursor-pointer"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Summary Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Alerts */}
        <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-2xs flex items-center relative overflow-hidden">
          <div className="w-1.5 h-12 bg-blue-600 rounded-full absolute left-0 top-1/2 -translate-y-1/2" />
          <div className="pl-3 space-y-1">
            <span className="text-xs font-bold text-gray-400 block">Total Alerts</span>
            <span className="text-2xl font-extrabold text-lexgo-dark block">{totalAlerts}</span>
          </div>
        </div>

        {/* Hight priority */}
        <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-2xs flex items-center relative overflow-hidden">
          <div className="w-1.5 h-12 bg-red-500 rounded-full absolute left-0 top-1/2 -translate-y-1/2" />
          <div className="pl-3 space-y-1">
            <span className="text-xs font-bold text-gray-400 block">Hight priority</span> {/* Typo to match mockup */}
            <span className="text-2xl font-extrabold text-lexgo-dark block">{highPriorityCount}</span>
          </div>
        </div>

        {/* Medium Priority */}
        <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-2xs flex items-center relative overflow-hidden">
          <div className="w-1.5 h-12 bg-amber-400 rounded-full absolute left-0 top-1/2 -translate-y-1/2" />
          <div className="pl-3 space-y-1">
            <span className="text-xs font-bold text-gray-400 block">Medium Priority</span>
            <span className="text-2xl font-extrabold text-lexgo-dark block">{mediumPriorityCount}</span>
          </div>
        </div>

        {/* Low Priority */}
        <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-2xs flex items-center relative overflow-hidden">
          <div className="w-1.5 h-12 bg-emerald-500 rounded-full absolute left-0 top-1/2 -translate-y-1/2" />
          <div className="pl-3 space-y-1">
            <span className="text-xs font-bold text-gray-400 block">Low Priority</span>
            <span className="text-2xl font-extrabold text-lexgo-dark block">{lowPriorityCount}</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-[450px]">
          <input
            type="text"
            placeholder="Search by title & description"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#FAF6F6] text-lexgo-dark border-0 rounded-2xl text-xs font-semibold focus:outline-none placeholder-gray-400"
          />
          <Search size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
        </div>

        {/* Filters */}
        <div className="flex gap-3 w-full md:w-auto">
          {/* Type Filter */}
          <div className="relative flex-grow md:flex-grow-0">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full md:w-40 pl-4 pr-10 py-3 bg-[#FAF6F6] text-lexgo-dark border-0 rounded-2xl text-xs font-bold focus:outline-none appearance-none cursor-pointer"
            >
              <option value="All Types">All Types</option>
              <option value="Reports">Reports</option>
              <option value="Exams">Exams</option>
              <option value="Courses">Courses</option>
              <option value="Students">Students</option>
            </select>
            <ChevronDown size={16} className="absolute right-3.5 top-3.5 text-gray-500 pointer-events-none" />
          </div>

          {/* Priority Filter */}
          <div className="relative flex-grow md:flex-grow-0">
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full md:w-40 pl-4 pr-10 py-3 bg-[#FAF6F6] text-lexgo-dark border-0 rounded-2xl text-xs font-bold focus:outline-none appearance-none cursor-pointer"
            >
              <option value="All Priorities">All Priorities</option>
              <option value="High Priority">High Priority</option>
              <option value="Medium Priority">Medium Priority</option>
              <option value="Low Priority">Low Priority</option>
            </select>
            <ChevronDown size={16} className="absolute right-3.5 top-3.5 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notif) => {
            const isHigh = notif.priority.toLowerCase().includes('high');
            const isMedium = notif.priority.toLowerCase().includes('meduim') || notif.priority.toLowerCase().includes('medium');
            
            return (
              <div 
                key={notif.id}
                className={`bg-white border border-gray-100 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition shadow-2xs hover:shadow-xs relative overflow-hidden ${
                  notif.read ? 'opacity-65' : ''
                }`}
              >
                {/* Accent Color Band */}
                <div className={`absolute top-0 bottom-0 left-0 w-1.5 ${
                  isHigh ? 'bg-red-500' : isMedium ? 'bg-amber-400' : 'bg-emerald-500'
                }`} />

                {/* Left Content Area */}
                <div className="space-y-3 flex-1 pl-3">
                  {/* Badges */}
                  <div className="flex gap-2">
                    <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-md ${
                      isHigh 
                        ? 'bg-red-50 text-red-500' 
                        : isMedium 
                          ? 'bg-amber-50 text-amber-600' 
                          : 'bg-emerald-50 text-emerald-600'
                    }`}>
                      {notif.priority}
                    </span>
                    <span className="text-[9px] font-black uppercase bg-[#FAF6F6] text-lexgo-dark px-2.5 py-1 rounded-md">
                      {notif.category}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-lexgo-dark text-sm sm:text-base leading-snug">
                      {notif.title}
                    </h3>
                    <p className="text-gray-400 text-xs font-semibold leading-relaxed max-w-2xl">
                      {notif.description}
                    </p>
                  </div>

                  {/* Footer Timeline */}
                  <div className="flex flex-wrap gap-4 text-[10px] font-bold text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{notif.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={12} />
                      <span>{notif.triggeredBy}</span>
                    </div>
                  </div>
                </div>

                {/* Right Action buttons */}
                <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                  <button 
                    onClick={() => handleMarkAsRead(notif.id)}
                    type="button"
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition border-0 cursor-pointer ${
                      notif.read 
                        ? 'bg-gray-100 text-gray-400 hover:bg-gray-200' 
                        : 'bg-[#0A1128] text-white hover:bg-opacity-90 shadow-2xs'
                    }`}
                  >
                    <Check size={16} strokeWidth={3} />
                  </button>
                  <button 
                    onClick={() => setSelectedNotif(notif)}
                    type="button"
                    className="px-4 py-2.5 border border-gray-200 rounded-xl text-xs font-bold text-lexgo-dark bg-white hover:bg-gray-50 transition cursor-pointer"
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-gray-100 font-bold text-gray-400">
            No notifications found matching filter criteria.
          </div>
        )}
      </div>

      {/* Details Modal overlay */}
      {selectedNotif && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 animate-fade-in">
          <div className="bg-white rounded-[32px] max-w-lg w-full p-8 relative shadow-2xl">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedNotif(null)}
              className="absolute right-6 top-6 w-9 h-9 rounded-xl text-lexgo-dark hover:bg-gray-100 bg-[#FAF6F6] transition cursor-pointer flex items-center justify-center border-0"
            >
              <X size={18} />
            </button>

            {/* Header info */}
            <div className="mb-6 space-y-2.5">
              <div className="flex gap-2">
                <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-md ${
                  selectedNotif.priority.toLowerCase().includes('high') 
                    ? 'bg-red-50 text-red-500' 
                    : 'bg-amber-50 text-amber-600'
                }`}>
                  {selectedNotif.priority}
                </span>
                <span className="text-[9px] font-black uppercase bg-[#FAF6F6] text-lexgo-dark px-2.5 py-1 rounded-md">
                  {selectedNotif.category}
                </span>
              </div>
              <h3 className="text-lg font-black text-lexgo-dark leading-tight pr-8">
                {selectedNotif.title}
              </h3>
            </div>

            {/* Content body */}
            <div className="space-y-5 py-4 border-t border-b border-gray-50 mb-6 text-xs sm:text-sm text-lexgo-dark font-medium leading-relaxed">
              <p>{selectedNotif.description}</p>
              
              <div className="flex flex-col gap-2 pt-2 text-xs font-bold text-gray-400">
                <div className="flex items-center gap-1.5">
                  <Clock size={14} />
                  <span>{selectedNotif.timestamp}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User size={14} />
                  <span>{selectedNotif.triggeredBy}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end">
              <button 
                onClick={() => setSelectedNotif(null)}
                className="px-6 py-2.5 rounded-xl bg-[#0A1128] text-white font-bold text-sm hover:bg-opacity-95 transition cursor-pointer border-0 shadow-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyNotifications;
