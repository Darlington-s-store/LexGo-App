import React from 'react';
import { Mail, BookOpen, GraduationCap } from 'lucide-react';

const FacultyLecturers = () => {
  const lecturers = [
    { name: "Prof. Kofi Mensah", title: "Senior Lecturer", course: "Constitutional Law I", email: "k.mensah@lexgo.edu", office: "Law Block A, Rm 12" },
    { name: "Dr. Elizabeth Johnson", title: "Associate Professor", course: "Law of Contract", email: "e.johnson@lexgo.edu", office: "Law Block B, Rm 4" },
    { name: "Prof. Justice Azmah", title: "Professor of Criminal Law", course: "Criminal Law I", email: "j.azmah@lexgo.edu", office: "Law Block A, Rm 1" }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-extrabold text-lexgo-dark">Lecturer Directory</h1>
        <p className="text-gray-500 text-sm font-medium">Manage and assign lecturing staff to specific legal subject modules</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lecturers.map((lecturer, idx) => (
          <div key={idx} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition duration-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                <GraduationCap size={20} />
              </div>
              <div>
                <h3 className="font-extrabold text-lexgo-dark text-base">{lecturer.name}</h3>
                <span className="text-xs font-semibold text-gray-400 block">{lecturer.title}</span>
              </div>
            </div>

            <div className="space-y-2 py-3 border-y border-gray-50 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-400 uppercase tracking-wider">Assigned Course</span>
                <span className="font-extrabold text-lexgo-dark">{lecturer.course}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-400 uppercase tracking-wider">Office Location</span>
                <span className="font-semibold text-gray-600">{lecturer.office}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium pt-1">
              <Mail size={14} />
              <span>{lecturer.email}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacultyLecturers;
