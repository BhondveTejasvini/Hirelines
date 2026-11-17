import React, { useState } from 'react';

export default function CandidateDashboard() {
  const [expandedAppId, setExpandedAppId] = useState(null);

  // Mock data updated with full journey history and status tags (Completed, Ongoing, Upcoming)
  const applications = [
    { 
      id: 1, 
      role: "Senior Full Stack Engineer", 
      dept: "Engineering", 
      appliedOn: "Nov 12, 2026", 
      status: "Interview Scheduled", 
      currentStep: 2, 
      nextStep: "Technical Round on Nov 18 via Google Meet",
      history: [
        { stage: "Hired & Onboarded", date: "--", status: "Upcoming" },
        { stage: "Offer Letter", date: "--", status: "Upcoming" },
        { stage: "Interview Scheduled", date: "Nov 16, 2026 • 10:00 AM", status: "Ongoing" },
        { stage: "Screening Cleared", date: "Nov 14, 2026 • 02:30 PM", status: "Completed" },
        { stage: "Application Submitted", date: "Nov 12, 2026 • 09:15 AM", status: "Completed" }
      ]
    },
    { 
      id: 2, 
      role: "UI/UX Product Designer", 
      dept: "Design", 
      appliedOn: "Oct 28, 2026", 
      status: "Offer Sent", 
      currentStep: 3, 
      nextStep: "Review and accept offer letter",
      history: [
        { stage: "Hired & Onboarded", date: "--", status: "Upcoming" },
        { stage: "Offer Sent", date: "Nov 17, 2026 • 09:30 AM", status: "Ongoing" },
        { stage: "Final Interview", date: "Nov 10, 2026 • 02:00 PM", status: "Completed" },
        { stage: "Design Assignment", date: "Nov 05, 2026 • 11:15 AM", status: "Completed" },
        { stage: "Application Submitted", date: "Oct 28, 2026 • 10:00 AM", status: "Completed" }
      ]
    },
    { 
      id: 3, 
      role: "Spring Boot Backend Lead", 
      dept: "Engineering", 
      appliedOn: "Nov 15, 2026", 
      status: "Under Review", 
      currentStep: 1, 
      nextStep: "Awaiting recruiter screening",
      history: [
        { stage: "Hired & Onboarded", date: "--", status: "Upcoming" },
        { stage: "Offer Letter", date: "--", status: "Upcoming" },
        { stage: "Interviews", date: "--", status: "Upcoming" },
        { stage: "Under Review", date: "Nov 16, 2026 • 04:45 PM", status: "Ongoing" },
        { stage: "Application Submitted", date: "Nov 15, 2026 • 11:30 AM", status: "Completed" }
      ]
    }
  ];

  const actionItems = [
    { id: 1, title: "Offer Letter Generated", desc: "Please review and sign your offer for the UI/UX role.", type: "urgent", icon: "📝" },
    { id: 2, title: "Interview Link Sent", desc: "Check your email for the Technical Round meeting link.", type: "pending", icon: "📧" }
  ];

  const pipelineStages = ["Applied", "Screening", "Interview", "Offer", "Hired"];

  const toggleDetails = (id) => {
    setExpandedAppId(expandedAppId === id ? null : id);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Candidate Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#faf6f0] to-[#f2ece1] border border-[#e5dcd0] p-8 rounded-2xl shadow-sm">
        <div>
          <h1 className="text-2xl font-black tracking-wider uppercase text-[#2c1f1d]">
            Welcome Back, Candidate
          </h1>
          <p className="text-[#7c6660] mt-1 text-sm font-medium">Track your resume status, upcoming interviews, and onboarding tasks.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-[#2c1f1d]">Candidate Profile</p>
            <p className="text-[11px] text-[#7c6660]">Software Engineering</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#b43b2d]/10 border border-[#b43b2d]/30 flex items-center justify-center font-black text-[#b43b2d] shadow-inner">
            CP
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column: Active Applications */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xs font-black uppercase tracking-widest text-[#8c746d] ml-1">My Active Applications</h2>
          
          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app.id} className="bg-[#faf6f0] border border-[#e5dcd0] rounded-2xl p-6 shadow-sm hover:border-[#b43b2d]/30 transition duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-[#2c1f1d]">{app.role}</h3>
                    <p className="text-xs text-[#7c6660] font-medium mt-0.5">{app.dept} • Applied on {app.appliedOn}</p>
                  </div>
                  <span className={`inline-block px-3 py-1.5 text-xs font-bold rounded-lg border ${
                    app.status === 'Offer Sent' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    app.status === 'Interview Scheduled' ? 'bg-[#f59e0b]/10 text-[#d97706] border-[#f59e0b]/30' :
                    'bg-[#e8dfd3] text-[#5c4a45] border-[#dcd1c0]'
                  }`}>
                    {app.status}
                  </span>
                </div>

                {/* Visual Stepped Status Pipeline */}
                <div className="space-y-3 mb-6">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#8c746d]">Resume Status</p>
                  <div className="flex items-center gap-1.5">
                    {pipelineStages.map((stage, index) => {
                      const isActive = index <= app.currentStep;
                      return (
                        <div key={index} className="flex-1 space-y-2">
                          <div className={`h-2 rounded-full w-full transition-colors duration-500 ${
                            isActive ? 'bg-[#b43b2d]' : 'bg-[#e8dfd3]'
                          }`}></div>
                          <p className={`text-[9px] font-black uppercase text-center tracking-wider ${
                            isActive ? 'text-[#b43b2d]' : 'text-[#9c847d]'
                          }`}>
                            {stage}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#e8dfd3] flex items-center justify-between">
                  <p className="text-xs text-[#7c6660]">
                    <span className="font-bold text-[#2c1f1d]">Next Step: </span> 
                    {app.nextStep}
                  </p>
                  <button 
                    onClick={() => toggleDetails(app.id)}
                    className="text-xs font-bold text-[#b43b2d] hover:underline flex items-center gap-1"
                  >
                    {expandedAppId === app.id ? "Hide Details ↑" : "View Details ↓"}
                  </button>
                </div>

                {/* Expanded Grid-Based History Log */}
                {expandedAppId === app.id && (
                  <div className="mt-6 pt-5 border-t border-[#e8dfd3] animate-fadeIn">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#8c746d] mb-4">Application Journey</h4>
                    
                    <div className="bg-white border border-[#e5dcd0] rounded-xl overflow-hidden shadow-inner">
                      {app.history.map((event, i) => (
                        <div key={i} className="grid grid-cols-3 items-center p-4 border-b border-[#e8dfd3] last:border-0 hover:bg-[#faf6f0] transition">
                          <div className="text-xs font-bold text-[#2c1f1d]">{event.stage}</div>
                          
                          <div className="text-[11px] font-medium text-[#7c6660] text-center">
                            {event.date}
                          </div>
                          
                          <div className="text-right">
                            <span className={`inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border ${
                              event.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                              event.status === 'Ongoing' ? 'bg-[#f59e0b]/10 text-[#d97706] border-[#f59e0b]/30' :
                              'bg-[#f4eee6] text-[#8c746d] border-[#e5dcd0]'
                            }`}>
                              {event.status}
                            </span>
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

        {/* Sidebar Column: Action Items & Inbox */}
        <div className="space-y-6">
          <h2 className="text-xs font-black uppercase tracking-widest text-[#8c746d] ml-1">Pending Actions & Inbox</h2>
          
          <div className="bg-[#faf6f0] border border-[#e5dcd0] rounded-2xl p-5 shadow-sm space-y-4">
            {actionItems.map((item) => (
              <div key={item.id} className="flex gap-4 p-3 rounded-xl hover:bg-[#f4eee6] transition cursor-pointer border border-transparent hover:border-[#e5dcd0]">
                <div className="text-2xl pt-1">{item.icon}</div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-[#2c1f1d]">{item.title}</h4>
                    {item.type === 'urgent' && (
                      <span className="w-2 h-2 rounded-full bg-[#b43b2d] animate-pulse"></span>
                    )}
                  </div>
                  <p className="text-xs text-[#7c6660] font-medium mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
            
            <button className="w-full mt-2 py-2.5 bg-[#e8dfd3] hover:bg-[#dcd1c0] text-[#5c4a45] text-xs font-bold rounded-xl transition border border-[#dcd1c0]">
              View All Messages
            </button>
          </div>

          {/* Quick Help Card */}
          <div className="bg-gradient-to-br from-[#f4eee6] to-[#faf6f0] border border-[#e5dcd0] rounded-2xl p-5 shadow-sm text-center">
            <div className="w-10 h-10 mx-auto bg-white border border-[#e5dcd0] rounded-full flex items-center justify-center text-lg mb-3 shadow-sm">
              💬
            </div>
            <h4 className="text-sm font-bold text-[#2c1f1d]">Need Assistance?</h4>
            <p className="text-xs text-[#7c6660] mt-1 mb-4 leading-relaxed">Our talent team is here to help with your interview scheduling or offer details.</p>
            <button className="px-4 py-2 bg-[#b43b2d] hover:bg-[#9e3124] text-white text-xs font-bold rounded-xl shadow-md transition w-full">
              Contact Recruiter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}