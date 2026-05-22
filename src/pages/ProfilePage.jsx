import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  School, 
  Award, 
  ArrowLeft, 
  Save, 
  Check, 
  Scale, 
  Book, 
  Gavel, 
  MessageSquare,
  Shield,
  Lightbulb,
  FileText
} from 'lucide-react';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Profile data state
  const [profile, setProfile] = useState({
    fullName: 'Elkanah Wiseman',
    email: 'elkanah.wiseman@lexgo.edu',
    phone: '+233 24 123 4567',
    institution: 'University of Ghana School of Law',
    studyLevel: 'L100 (First Year)'
  });

  // Background Watermark Cells & Symbols
  const gridCells = useMemo(() => Array.from({ length: 24 }), []);
  const watermarkSymbols = useMemo(() => [Scale, Book, Gavel, MessageSquare, Shield, Lightbulb, FileText], []);

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 min-h-[600px] shadow-sm relative overflow-hidden flex flex-col">
      
      {/* Rotating faint background watermark grid */}
      <div className="absolute inset-0 grid grid-cols-4 sm:grid-cols-6 grid-rows-4 gap-x-12 gap-y-16 p-8 opacity-[0.03] select-none pointer-events-none z-0">
        {gridCells.map((_, idx) => {
          const IconComponent = watermarkSymbols[idx % watermarkSymbols.length];
          return (
            <div key={idx} className="flex items-center justify-center transform rotate-12">
              <IconComponent className="w-12 h-12 stroke-[1.5]" />
            </div>
          );
        })}
      </div>

      {/* Top Header Row with Back Button */}
      <div className="flex items-center justify-between z-10 shrink-0 pb-6 border-b border-gray-50 mb-6">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-10 h-10 rounded-full border border-gray-200 hover:border-gray-300 bg-white text-gray-600 hover:text-lexgo-dark transition flex items-center justify-center cursor-pointer shadow-sm"
          >
            <ArrowLeft size={16} />
          </button>
          <h2 className="text-xl sm:text-2xl font-bold text-lexgo-dark tracking-tight">
            My Profile
          </h2>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-grow z-10 flex flex-col md:flex-row gap-8 items-start relative max-w-4xl mx-auto w-full py-4 min-h-0">
        
        {/* Left Side Profile Card */}
        <div className="w-full md:w-80 flex-shrink-0 bg-slate-50/50 border border-slate-100 rounded-3xl p-6 flex flex-col items-center text-center shadow-sm space-y-4">
          <div className="relative group">
            <div className="w-24 h-24 bg-amber-500 rounded-full flex items-center justify-center text-white text-4xl font-extrabold shadow-md">
              U
            </div>
            <div className="absolute inset-0 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer text-xs font-bold">
              Change
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-lexgo-dark">{profile.fullName}</h3>
            <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block">
              {profile.studyLevel}
            </span>
          </div>

          <div className="w-full pt-4 border-t border-gray-100 space-y-3.5 text-left">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 font-medium">Study Streak</span>
              <span className="text-[#E27D2C] font-bold">5 days</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 font-medium">Cases Studied</span>
              <span className="text-[#3B82F6] font-bold">23</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 font-medium">AI Chats</span>
              <span className="text-[#64748B] font-bold">47</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 font-medium">Level progress</span>
              <span className="text-[#10B981] font-bold">85%</span>
            </div>
          </div>
        </div>

        {/* Right Side Form Panel */}
        <div className="flex-1 w-full bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex justify-between items-center pb-2 border-b border-gray-50">
            <h4 className="text-sm font-bold text-lexgo-dark uppercase tracking-wider">
              Personal Information
            </h4>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-xs font-bold text-[#0A1128] hover:underline cursor-pointer"
            >
              {isEditing ? 'Cancel' : 'Edit Details'}
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wide flex items-center gap-1.5">
                <User size={13} />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="w-full bg-white border border-gray-200 focus:border-lexgo-dark disabled:bg-slate-50/50 disabled:text-gray-500 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none transition font-medium"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wide flex items-center gap-1.5">
                <Mail size={13} />
                <span>Email Address</span>
              </label>
              <input
                type="email"
                disabled={!isEditing}
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full bg-white border border-gray-200 focus:border-lexgo-dark disabled:bg-slate-50/50 disabled:text-gray-500 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none transition font-medium"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wide flex items-center gap-1.5">
                <Phone size={13} />
                <span>Phone Number</span>
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full bg-white border border-gray-200 focus:border-lexgo-dark disabled:bg-slate-50/50 disabled:text-gray-500 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none transition font-medium"
              />
            </div>

            {/* Institution */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wide flex items-center gap-1.5">
                <School size={13} />
                <span>Law School / Institution</span>
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={profile.institution}
                onChange={(e) => setProfile({ ...profile, institution: e.target.value })}
                className="w-full bg-white border border-gray-200 focus:border-lexgo-dark disabled:bg-slate-50/50 disabled:text-gray-500 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none transition font-medium"
              />
            </div>

            {/* Level */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wide flex items-center gap-1.5">
                <Award size={13} />
                <span>Level of Study</span>
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={profile.studyLevel}
                onChange={(e) => setProfile({ ...profile, studyLevel: e.target.value })}
                className="w-full bg-white border border-gray-200 focus:border-lexgo-dark disabled:bg-slate-50/50 disabled:text-gray-500 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none transition font-medium"
              />
            </div>

            {/* Save Buttons & Toast */}
            {isEditing && (
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#0A1128] hover:bg-opacity-95 text-white font-bold text-xs sm:text-sm rounded-xl transition cursor-pointer shadow-sm"
                >
                  <Save size={16} />
                  <span>Save Profile Details</span>
                </button>
              </div>
            )}

            {isSaved && (
              <div className="p-3 bg-emerald-50 text-emerald-700 text-xs sm:text-sm font-bold rounded-xl flex items-center gap-2 border border-emerald-100 animate-fade-in">
                <Check size={16} />
                <span>Profile updated successfully!</span>
              </div>
            )}
          </form>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
