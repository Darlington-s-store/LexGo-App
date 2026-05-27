import React, { useState } from 'react';
import { Save, Bell, Shield, Keyboard, Database } from 'lucide-react';

const FacultySettings = () => {
  const [allowPublicRegistrations, setAllowPublicRegistrations] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [selectedSemester, setSelectedSemester] = useState('1st Sem');

  const handleSave = (e) => {
    e.preventDefault();
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-extrabold text-lexgo-dark">Faculty Portal Settings</h1>
        <p className="text-gray-500 text-sm font-medium">Configure global law school portals, active semesters, and notification preferences</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm max-w-2xl">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-base font-extrabold text-lexgo-dark border-b border-gray-50 pb-2">Academic Settings</h3>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-lexgo-dark block">Active Academic Year</label>
              <input 
                type="text" 
                value="2026/2027" 
                disabled 
                className="w-full pl-4 pr-4 py-2.5 bg-gray-50 text-gray-500 border border-gray-100 rounded-xl text-sm font-semibold cursor-not-allowed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-lexgo-dark block">Active Semester</label>
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="w-full pl-4 pr-4 py-2.5 bg-[#FAF6F6] text-lexgo-dark border border-gray-100 rounded-xl text-sm font-semibold focus:outline-none"
              >
                <option value="1st Sem">1st Sem</option>
                <option value="2nd Sem">2nd Sem</option>
                <option value="Summer Sem">Summer Sem</option>
              </select>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="text-base font-extrabold text-lexgo-dark border-b border-gray-50 pb-2">Portal Rules</h3>
            
            <div className="flex items-center justify-between py-2">
              <div className="space-y-0.5">
                <span className="text-sm font-bold text-lexgo-dark block">Allow Public Registrations</span>
                <p className="text-xs text-gray-400 font-semibold">Enable or disable new student signups</p>
              </div>
              <input 
                type="checkbox" 
                checked={allowPublicRegistrations}
                onChange={(e) => setAllowPublicRegistrations(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-lexgo-dark focus:ring-lexgo-dark cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="space-y-0.5">
                <span className="text-sm font-bold text-lexgo-dark block">Email Notifications</span>
                <p className="text-xs text-gray-400 font-semibold">Receive emails on exam approvals and onboarding logs</p>
              </div>
              <input 
                type="checkbox" 
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-lexgo-dark focus:ring-lexgo-dark cursor-pointer"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="bg-lexgo-dark text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-opacity-95 transition shadow-sm cursor-pointer"
            >
              <Save size={16} />
              <span>Save Configurations</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FacultySettings;
