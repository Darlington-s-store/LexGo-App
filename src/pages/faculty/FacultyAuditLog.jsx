import React from 'react';
import { Clock, ShieldCheck, FileKey, ShieldAlert } from 'lucide-react';

const FacultyAuditLog = () => {
  const logs = [
    { id: 1, action: "Student Record Modified", user: "Adjei Caleb (Head of Faculty)", ip: "192.168.1.102", time: "27 mins ago", severity: "Medium", color: "text-amber-600 bg-amber-50" },
    { id: 2, action: "Exam Scores Uploaded", user: "Dr. Elizabeth Johnson", ip: "192.168.1.15", time: "1 hour ago", severity: "High", color: "text-rose-600 bg-rose-50" },
    { id: 3, action: "Lecturer Assigned to LAW-002", user: "Adjei Caleb (Head of Faculty)", ip: "192.168.1.102", time: "2 hours ago", severity: "Low", color: "text-emerald-600 bg-emerald-50" },
    { id: 4, action: "Portal Configuration Saved", user: "System Admin", ip: "127.0.0.1", time: "1 day ago", severity: "Low", color: "text-emerald-600 bg-emerald-50" }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-extrabold text-lexgo-dark">Security Audit Log</h1>
        <p className="text-gray-500 text-sm font-medium">Track administrative actions, portal state modifications, and user authentications</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-100 text-xs font-bold uppercase text-gray-400 tracking-wider">
              <th className="pb-4">Action</th>
              <th className="pb-4">User</th>
              <th className="pb-4">IP Address</th>
              <th className="pb-4">Timestamp</th>
              <th className="pb-4">Severity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-sm">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50/50 transition">
                <td className="py-4 font-bold text-lexgo-dark">{log.action}</td>
                <td className="py-4 font-semibold text-gray-600">{log.user}</td>
                <td className="py-4 font-semibold text-gray-400 font-mono">{log.ip}</td>
                <td className="py-4 text-gray-400 font-medium">{log.time}</td>
                <td className="py-4">
                  <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-md ${log.color}`}>
                    {log.severity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FacultyAuditLog;
