import React, { useState } from 'react';

export default function CandidateDashboard() {
  const [expandedAppId, setExpandedAppId] = useState(null);

  const applications = [
    { 
      id: 1, role: "Senior Full Stack Engineer", dept: "Engineering", appliedOn: "Nov 12, 2026", status: "Interview Scheduled", currentStep: 2, nextStep: "Technical on Nov 18",
      history: [
        { stage: "Hired", date: "--", status: "Upcoming" },
        { stage: "Offer", date: "--", status: "Upcoming" },
        { stage: "Interview", date: "Nov 16 • 10:00 AM", status: "Ongoing" },
        { stage: "Screening", date: "Nov 14 • 02:30 PM", status: "Completed" },
        { stage: "Applied", date: "Nov 12 • 09:15 AM", status: "Completed" }
      ]
    },
  ];

  const actionItems = [
    { id: 1, title: "Offer Generated", desc: "Review and sign UI/UX offer.", type: "urgent", icon: "📝" },
    { id: 2, title: "Interview Link", desc: "Check email for meeting link.", type: "pending", icon: "📧" }
  ];

  const pipelineStages = ["Applied", "Screening", "Interview", "Offer", "Hired"];
  const toggleDetails = (id) => setExpandedAppId(expandedAppId === id ? null : id);

  return (
    <div className="max-w-6xl mx-auto space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#faf6f0] to-[#f2ece1] border border-[#e5dcd0] p-5 md:p-8 rounded-2xl shadow-sm">
        <div>
          <h1 className="text-xl md:text-2xl font-black tracking-wider uppercase text-[#2c1f1d]">Welcome Back</h1>
          <p className="text-[#7c6660] mt-1 text-[11px] md:text-sm font-medium">Track your resume status and tasks.</p>
        </div>
        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#b43b2d]/10 border border-[#b43b2d]/30 flex items-center justify-center font-black text-[#b43b2d] shadow-inner text-sm md:text-base">
            CP
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-[11px] md:text-xs font-black uppercase tracking-widest text-[#8c746d] ml-1">My Applications</h2>
          
          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app.id} className="bg-[#faf6f0] border border-[#e5dcd0] rounded-2xl p-4 md:p-6 shadow-sm transition">
                <div className="flex flex-col sm:flex-row justify-between gap-3 mb-5">
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-[#2c1f1d] leading-tight">{app.role}</h3>
                    <p className="text-[11px] md:text-xs text-[#7c6660] font-medium mt-1">{app.dept} • {app.appliedOn}</p>
                  </div>
                  <span className={`self-start sm:self-center px-2.5 py-1 text-[10px] md:text-xs font-bold rounded-lg border ${
                    app.status === 'Offer Sent' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-[#f59e0b]/10 text-[#d97706] border-[#f59e0b]/30'
                  }`}>{app.status}</span>
                </div>

                {/* Mobile Stepped Pipeline */}
                <div className="space-y-2 md:space-y-3 mb-5">
                  <div className="flex items-center gap-1 md:gap-1.5">
                    {pipelineStages.map((stage, index) => {
                      const isActive = index <= app.currentStep;
                      return (
                        <div key={index} className="flex-1 space-y-1.5 md:space-y-2">
                          <div className={`h-1.5 md:h-2 rounded-full w-full ${isActive ? 'bg-[#b43b2d]' : 'bg-[#e8dfd3]'}`}></div>
                          <p className={`text-[7px] sm:text-[8px] md:text-[9px] font-black uppercase text-center tracking-wider md:tracking-widest ${isActive ? 'text-[#b43b2d]' : 'text-[#9c847d]'}`}>{stage}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-3 md:pt-4 border-t border-[#e8dfd3] flex flex-col sm:flex-row justify-between gap-3">
                  <p className="text-[11px] md:text-xs text-[#7c6660]"><span className="font-bold text-[#2c1f1d]">Next Step:</span> {app.nextStep}</p>
                  <button onClick={() => toggleDetails(app.id)} className="text-[11px] md:text-xs font-bold text-[#b43b2d] hover:underline self-start sm:self-auto">
                    {expandedAppId === app.id ? "Hide Details ↑" : "View Details ↓"}
                  </button>
                </div>

                {/* History Block - Stacked for mobile */}
                {expandedAppId === app.id && (
                  <div className="mt-4 md:mt-6 pt-4 border-t border-[#e8dfd3]">
                    <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#8c746d] mb-3">Journey</h4>
                    <div className="bg-white border border-[#e5dcd0] rounded-xl overflow-hidden shadow-inner">
                      {app.history.map((event, i) => (
                        <div key={i} className="flex flex-col sm:grid sm:grid-cols-3 gap-1 sm:gap-4 p-3 md:p-4 border-b border-[#e8dfd3] last:border-0 hover:bg-[#faf6f0]">
                          <div className="text-[11px] md:text-xs font-bold text-[#2c1f1d]">{event.stage}</div>
                          <div className="text-[10px] md:text-[11px] font-medium text-[#7c6660] sm:text-center">{event.date}</div>
                          <div className="sm:text-right mt-1 sm:mt-0">
                            <span className={`inline-block px-2 py-0.5 md:px-2.5 md:py-1 text-[9px] md:text-[10px] font-bold uppercase rounded-md border ${
                              event.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : event.status === 'Ongoing' ? 'bg-[#f59e0b]/10 text-[#d97706]' : 'bg-[#f4eee6] text-[#8c746d]'
                            }`}>{event.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 md:space-y-6">
          <div className="bg-[#faf6f0] border border-[#e5dcd0] rounded-2xl p-4 md:p-5 shadow-sm space-y-3">
            {actionItems.map((item) => (
              <div key={item.id} className="flex gap-3 p-2 border border-transparent">
                <div className="text-xl pt-0.5">{item.icon}</div>
                <div>
                  <h4 className="text-[11px] md:text-sm font-bold text-[#2c1f1d]">{item.title}</h4>
                  <p className="text-[10px] md:text-xs text-[#7c6660] mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}