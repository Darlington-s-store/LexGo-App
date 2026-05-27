import React, { useState } from 'react';
import { X } from 'lucide-react';
import StudentMatrixView from './StudentMatrixView';
import StudentListView from './StudentListView';
import AllResultsView from './AllResultsView';
import DataIntegrationView from './DataIntegrationView';
import GeneralAnalyticsView from './GeneralAnalyticsView';

const CourseDetailsModal = ({ isOpen, onClose, course }) => {
  const [activeTab, setActiveTab] = useState('Overview');

  if (!isOpen || !course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 animate-fade-in">
      <div className="bg-white rounded-[32px] max-w-4xl w-full p-8 relative shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button 
          onClick={onClose}
          type="button"
          className="absolute right-6 top-6 w-9 h-9 rounded-xl text-lexgo-dark hover:bg-gray-100 bg-[#FAF6F6] transition cursor-pointer flex items-center justify-center border-0"
        >
          <X size={18} />
        </button>

        <div className="mb-6">
          <h3 className="text-xl font-black text-lexgo-dark">Course Details</h3>
        </div>

        {/* Tab Row */}
        <div className="flex gap-2 pb-4 mb-6 overflow-x-auto">
          {['Overview', 'Student Matrix', `Students(${course.students})`, 'All Results', 'Data Integration', 'General Analytics'].map((tab) => {
            const isTabActive = activeTab === tab || (tab.startsWith('Students') && activeTab.startsWith('Students'));
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.startsWith('Students') ? 'Students' : tab)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 border-0 ${
                  isTabActive 
                    ? 'bg-[#0A1128] text-white shadow-2xs' 
                    : 'bg-[#FAF6F6] text-lexgo-dark hover:bg-gray-100'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        <div className="space-y-6">
          {activeTab === 'Overview' && (
            <div className="space-y-6 animate-fade-in">
              {/* Info Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 pb-6 border-b border-gray-150">
                <div className="space-y-0.5">
                  <span className="text-xs text-gray-400 font-semibold block">Coruse Code</span>
                  <span className="text-sm font-extrabold text-lexgo-dark">{course.code}</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs text-gray-400 font-semibold block">Course Title</span>
                  <span className="text-sm font-extrabold text-lexgo-dark">{course.title}</span>
                </div>

                <div className="space-y-0.5">
                  <span className="text-xs text-gray-400 font-semibold block">Level</span>
                  <span className="text-sm font-extrabold text-lexgo-dark">{course.level}</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs text-gray-400 font-semibold block">Credit hours</span>
                  <span className="text-sm font-extrabold text-lexgo-dark">{course.creditHours}</span>
                </div>

                <div className="space-y-0.5">
                  <span className="text-xs text-gray-400 font-semibold block">Semester</span>
                  <span className="text-sm font-extrabold text-lexgo-dark">{course.semester}</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs text-gray-400 font-semibold block">Status</span>
                  <span className="inline-block bg-[#EAFDF5] text-[#10B981] text-xs font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                    {course.status}
                  </span>
                </div>

                <div className="space-y-0.5">
                  <span className="text-xs text-gray-400 font-semibold block">Credit hours</span>
                  <span className="text-sm font-extrabold text-lexgo-dark">{course.creditHours}</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs text-gray-400 font-semibold block">Enrolled Students</span>
                  <span className="text-sm font-extrabold text-lexgo-dark">{course.students}</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-base font-black text-lexgo-dark">Description</h4>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">
                  {course.fullDescription || course.description}
                </p>
              </div>

              {/* Lecturer Info */}
              <div className="border-t border-gray-150 pt-6 mt-6 space-y-4">
                <h4 className="text-base font-black text-lexgo-dark">Lecturer Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-gray-400 font-semibold block mb-1">Name</span>
                    <span className="text-sm font-extrabold text-lexgo-dark">{course.lecturer}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 font-semibold block mb-1">Email</span>
                    <span className="text-sm font-extrabold text-lexgo-dark">{course.lecturerEmail || 'johnsmith@st.edu.gh'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Student Matrix' && (
            <StudentMatrixView />
          )}

          {activeTab === 'Students' && (
            <StudentListView />
          )}

          {activeTab === 'All Results' && (
            <AllResultsView />
          )}

          {activeTab === 'Data Integration' && (
            <DataIntegrationView />
          )}

          {activeTab === 'General Analytics' && (
            <GeneralAnalyticsView />
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsModal;
