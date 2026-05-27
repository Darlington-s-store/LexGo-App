import React, { useState } from 'react';
import { Search, ChevronDown, MoreVertical } from 'lucide-react';
import MemberCoursesModal from '../../components/MemberCoursesModal';
import AssignCourseModal from '../../components/AssignCourseModal';

const FacultyMembers = () => {
  const [members, setMembers] = useState([
    {
      id: "#36274637",
      name: "Dr. Yaw Atta",
      role: "Lecturer",
      email: "yawatta@gmail.com",
      status: "Active",
      assignedCourses: [
        {
          code: 'Law001',
          title: 'Introduction to Legal Studies',
          level: 'Level 100',
          category: 'LMM',
          semester: '1st SEM',
          students: 130
        },
        {
          code: 'Law002',
          title: 'Evidence Law',
          level: 'Level 300',
          category: 'LMM',
          semester: '1st SEM',
          students: 130
        },
        {
          code: 'Law003',
          title: 'Family Law',
          level: 'Level 200',
          category: 'LLB',
          semester: '1st SEM',
          students: 220
        }
      ]
    },
    {
      id: "#36274637",
      name: "Dr.Mike Quaye",
      role: "Lecturer",
      email: "mikequaye@gmail.com",
      status: "Active",
      assignedCourses: [
        {
          code: 'Law001',
          title: 'Introduction to Legal Studies',
          level: 'Level 100',
          category: 'LMM',
          semester: '1st SEM',
          students: 130
        },
        {
          code: 'Law002',
          title: 'Evidence Law',
          level: 'Level 300',
          category: 'LMM',
          semester: '1st SEM',
          students: 130
        },
        {
          code: 'Law003',
          title: 'Family Law',
          level: 'Level 200',
          category: 'LLB',
          semester: '1st SEM',
          students: 220
        }
      ]
    },
    {
      id: "#36274637",
      name: "Mr. Adam Adjei",
      role: "Exam Officer",
      email: "adamadjei@gmail.com",
      status: "Active",
      assignedCourses: [
        {
          code: 'Law001',
          title: 'Introduction to Legal Studies',
          level: 'Level 100',
          category: 'LMM',
          semester: '1st SEM',
          students: 130
        },
        {
          code: 'Law002',
          title: 'Evidence Law',
          level: 'Level 300',
          category: 'LMM',
          semester: '1st SEM',
          students: 130
        },
        {
          code: 'Law003',
          title: 'Family Law',
          level: 'Level 200',
          category: 'LLB',
          semester: '1st SEM',
          students: 220
        }
      ]
    },
    {
      id: "#36274637",
      name: "Dr. Yaw Atta",
      role: "Dean",
      email: "adamadjei@gmail.com",
      status: "Active",
      assignedCourses: []
    },
    {
      id: "#36274638",
      name: "Prof. Kofi Brown",
      role: "Dean",
      email: "kofibrown@gmail.com",
      status: "Active",
      assignedCourses: []
    },
    {
      id: "#36274638",
      name: "Prof. Adjei Caleb",
      role: "Admin",
      email: "adjeicaleb@gmail.com",
      status: "Inactive",
      assignedCourses: []
    }
  ]);

  // Search & Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All roles');
  const [selectedStatus, setSelectedStatus] = useState('All statuses');

  // Modals state
  const [activeCoursesMember, setActiveCoursesMember] = useState(null);
  const [activeAssignMember, setActiveAssignMember] = useState(null);
  const [openActionId, setOpenActionId] = useState(null);

  const getInitials = (name) => {
    if (!name) return '??';
    const cleanName = name.replace(/^(Dr\.|Mr\.|Mrs\.|Miss\.|Prof\.)\s*/i, '');
    const parts = cleanName.split(' ').filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    }
    return cleanName.slice(0, 2).toUpperCase();
  };

  const handleRemoveCourse = (memberId, courseCode) => {
    // Find member by ID and search current array
    setMembers(prevMembers => 
      prevMembers.map(m => {
        if (m.id === memberId) {
          const updatedCourses = m.assignedCourses.filter(c => c.code !== courseCode);
          const updatedMember = { ...m, assignedCourses: updatedCourses };
          
          // Update details modal ref if open
          if (activeCoursesMember && activeCoursesMember.id === memberId) {
            setActiveCoursesMember(updatedMember);
          }
          return updatedMember;
        }
        return m;
      })
    );
  };

  const handleAssignCourse = (memberId, courseObj) => {
    setMembers(prevMembers => 
      prevMembers.map(m => {
        if (m.id === memberId) {
          // Avoid duplicates
          if (m.assignedCourses.some(c => c.code === courseObj.code)) return m;
          
          const updatedMember = {
            ...m,
            assignedCourses: [...m.assignedCourses, courseObj]
          };

          // Update details modal ref if open
          if (activeCoursesMember && activeCoursesMember.id === memberId) {
            setActiveCoursesMember(updatedMember);
          }
          return updatedMember;
        }
        return m;
      })
    );
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          member.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'All roles' || member.role === selectedRole;
    const matchesStatus = selectedStatus === 'All statuses' || member.status === selectedStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-lexgo-dark">Faculty Members</h1>
        <p className="text-gray-500 text-sm font-medium">Faculty of Law, Management</p>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-[450px]">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#FAF6F6] text-lexgo-dark border-0 rounded-2xl text-xs font-semibold focus:outline-none placeholder-gray-400"
          />
          <Search size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
        </div>

        {/* Filters */}
        <div className="flex gap-3 w-full md:w-auto">
          {/* Roles Filter */}
          <div className="relative flex-grow md:flex-grow-0">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full md:w-40 pl-4 pr-10 py-3 bg-[#FAF6F6] text-lexgo-dark border-0 rounded-2xl text-xs font-bold focus:outline-none appearance-none cursor-pointer"
            >
              <option value="All roles">All roles</option>
              <option value="Lecturer">Lecturer</option>
              <option value="Exam Officer">Exam Officer</option>
              <option value="Dean">Dean</option>
              <option value="Admin">Admin</option>
            </select>
            <ChevronDown size={16} className="absolute right-3.5 top-3.5 text-gray-500 pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="relative flex-grow md:flex-grow-0">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full md:w-40 pl-4 pr-10 py-3 bg-[#FAF6F6] text-lexgo-dark border-0 rounded-2xl text-xs font-bold focus:outline-none appearance-none cursor-pointer"
            >
              <option value="All statuses">All statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <ChevronDown size={16} className="absolute right-3.5 top-3.5 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-xs overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[750px]">
          <thead>
            <tr className="border-b border-gray-50 text-[11px] font-bold uppercase text-gray-500 tracking-wider">
              <th className="pb-4 pl-4">Name</th>
              <th className="pb-4">Role</th>
              <th className="pb-4">Email</th>
              <th className="pb-4">Courses</th>
              <th className="pb-4">Status</th>
              <th className="pb-4 pr-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-xs">
            {filteredMembers.map((member, idx) => {
              const memberKey = `${member.name}-${member.role}-${idx}`;
              return (
                <tr key={memberKey} className="hover:bg-slate-50/40 transition">
                  {/* Name column */}
                  <td className="py-4 pl-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#0A1128] text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0">
                      {getInitials(member.name)}
                    </div>
                    <div>
                      <div className="font-black text-lexgo-dark text-xs">{member.name}</div>
                      <div className="text-[10px] text-gray-400 font-bold mt-0.5">{member.id}</div>
                    </div>
                  </td>

                  {/* Role column */}
                  <td className="py-4 font-bold text-gray-500">{member.role}</td>

                  {/* Email column */}
                  <td className="py-4 font-bold text-lexgo-dark">{member.email}</td>

                  {/* Courses Count */}
                  <td className="py-4 font-bold text-lexgo-dark">
                    {member.assignedCourses.length > 0 ? member.assignedCourses.length : '-'}
                  </td>

                  {/* Status column */}
                  <td className="py-4">
                    <span 
                      className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-md ${
                        member.status === 'Active' 
                          ? 'bg-[#E2F5ED] text-[#0D9488]' 
                          : 'bg-[#FEF3C7] text-[#D97706]'
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>

                  {/* Action Column */}
                  <td className="py-4 pr-4 text-right">
                    <div className="inline-block relative text-left">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenActionId(openActionId === memberKey ? null : memberKey);
                        }}
                        className="w-8 h-8 rounded-full border border-transparent flex items-center justify-center text-gray-400 hover:text-lexgo-dark hover:bg-gray-100 transition cursor-pointer ml-auto"
                      >
                        <MoreVertical size={16} />
                      </button>

                      {openActionId === memberKey && (
                        <>
                          <div 
                            className="fixed inset-0 z-30" 
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenActionId(null);
                            }}
                          />
                          <div 
                            className="absolute right-0 top-9 bg-white border border-gray-150 rounded-2xl shadow-xl p-2 min-w-[150px] z-40 space-y-1 text-left animate-fade-in"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              onClick={() => {
                                setActiveCoursesMember(member);
                                setOpenActionId(null);
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 rounded-xl transition text-left border-0 bg-transparent cursor-pointer"
                            >
                              <span>Manage Courses</span>
                            </button>
                            <button
                              onClick={() => {
                                setMembers(prevMembers => 
                                  prevMembers.map((m, mIdx) => 
                                    mIdx === idx 
                                      ? { ...m, status: m.status === 'Active' ? 'Inactive' : 'Active' }
                                      : m
                                  )
                                );
                                setOpenActionId(null);
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 rounded-xl transition text-left border-0 bg-transparent cursor-pointer"
                            >
                              <span>Toggle Status</span>
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Member Courses Manager Modal */}
      <MemberCoursesModal
        isOpen={activeCoursesMember !== null}
        onClose={() => setActiveCoursesMember(null)}
        member={activeCoursesMember}
        onRemoveCourse={handleRemoveCourse}
        onOpenAssignModal={(member) => setActiveAssignMember(member)}
      />

      {/* Assign Course Form Modal */}
      <AssignCourseModal
        isOpen={activeAssignMember !== null}
        onClose={() => setActiveAssignMember(null)}
        member={activeAssignMember}
        onAssignCourse={handleAssignCourse}
      />
    </div>
  );
};

export default FacultyMembers;
