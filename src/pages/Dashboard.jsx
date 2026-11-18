import React from 'react';

export default function Dashboard() {
  const stats = [
    { title: "ACTIVE OPENINGS", value: "12", change: "+2 this week", iconType: "folder" },
    { title: "TOTAL CANDIDATES", value: "284", change: "+18% vs last month", iconType: "people" },
    { title: "INTERVIEWS TODAY", value: "6", change: "2 completed", iconType: "clipboard" },
    { title: "AVG. TIME TO HIRE", value: "18 Days", change: "Optimized pipeline", iconType: "clock" },
  ];

  const departmentMetrics = [
    { dept: "Engineering & Tech", openRoles: "4 Open Roles", count: "142 Active", width: "85%", status: "High Priority" },
    { dept: "Product & Design", openRoles: "3 Open Roles", count: "68 Active", width: "60%", status: "On Track" },
    { dept: "Data Science & AI", openRoles: "3 Open Roles", count: "44 Active", width: "40%", status: "Screening" },
    { dept: "Operations & HR", openRoles: "2 Open Roles", count: "30 Active", width: "25%", status: "Closing" },
  ];

  const recentCandidates = [
    { name: "Priya Sharma", role: "Senior Full Stack Engineer • Technical", status: "Scheduled", time: "Today, 2:30 PM" },
    { name: "Rahul Deshmukh", role: "UI/UX Product Designer • HR", status: "Completed", time: "Yesterday" },
    { name: "Ananya Kulkarni", role: "Spring Boot Backend Lead • Culture", status: "Pending", time: "Nov 15" },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 bg-gradient-to-r from-[#faf6f0] to-[#f2ece1] border border-[#e5dcd0] p-5 md:p-6 rounded-2xl shadow-sm">
        <div>
          <div className="flex items-center gap-2 md:gap-3">
            <span className="text-xl md:text-2xl">🤖</span>
            <h1 className="text-xl md:text-2xl font-black tracking-wider uppercase text-[#2c1f1d]">
              Recruiter Dashboard
            </h1>
          </div>
          <p className="text-[#7c6660] mt-1 text-[11px] md:text-xs font-medium leading-relaxed">Real-time overview of recruitment pipeline, active pools, and schedules.</p>
        </div>
        <div className="self-start md:self-auto">
          <span className="px-3 py-1.5 bg-[#f59e0b]/10 text-[#d97706] border border-[#f59e0b]/30 rounded-full text-[10px] md:text-xs font-bold tracking-wide">
            ● Live ATS Active
          </span>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white/60 border border-[#e5dcd0] rounded-2xl p-4 md:p-5 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[9px] md:text-[10px] font-black uppercase tracking-wider text-[#8c746d]">{stat.title}</p>
              <h3 className="text-2xl md:text-3xl font-black mt-1 text-[#b43b2d]">{stat.value}</h3>
              <p className="text-[10px] md:text-[11px] text-[#9c847d] font-semibold mt-1">{stat.change}</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#b43b2d]/10 border border-[#b43b2d]/20 flex items-center justify-center text-lg md:text-xl shadow-inner">
              {stat.iconType === 'folder' && '📂'}
              {stat.iconType === 'people' && '👥'}
              {stat.iconType === 'clipboard' && '📋'}
              {stat.iconType === 'clock' && '⏱️'}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        
        {/* Department Block */}
        <div className="bg-white/60 border border-[#e5dcd0] rounded-2xl p-4 md:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-5 gap-2">
              <h2 className="text-[11px] md:text-xs font-black uppercase tracking-widest text-[#2c1f1d]">Department Load</h2>
              <span className="self-start text-[10px] font-bold px-2 py-0.5 bg-[#b43b2d]/10 text-[#b43b2d] rounded">Active Allocation</span>
            </div>
            <div className="space-y-3 md:space-y-4">
              {departmentMetrics.map((item, idx) => (
                <div key={idx} className="bg-[#faf6f0] border border-[#eadecd] p-3 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-[11px] md:text-xs font-bold">
                    <span className="text-[#2c1f1d] truncate mr-2">{item.dept}</span>
                    <span className="text-[9px] md:text-[10px] font-semibold text-[#8c746d] bg-[#e8dfd3] px-2 py-0.5 rounded-full whitespace-nowrap">{item.status}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] md:text-[11px] text-[#7c6660]">
                    <span>{item.openRoles}</span>
                    <span className="font-bold text-[#b43b2d]">{item.count}</span>
                  </div>
                  <div className="w-full bg-[#e8dfd3] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#b43b2d] h-full rounded-full transition-all duration-500" style={{ width: item.width }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-4 md:pt-5 mt-4 md:mt-5 border-t border-[#e8dfd3] flex flex-col sm:flex-row justify-between items-start sm:items-center text-[11px] md:text-xs font-bold gap-1">
            <span className="text-[#7c6660]">Total Pipeline</span>
            <span className="text-[#b43b2d]">284 Candidates Across 12 Openings</span>
          </div>
        </div>

        {/* Interviews & AI */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white/60 border border-[#e5dcd0] rounded-2xl p-4 md:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[11px] md:text-xs font-black uppercase tracking-widest text-[#2c1f1d]">Upcoming Interviews</h2>
            </div>
            <div className="divide-y divide-[#e8dfd3]">
              {recentCandidates.map((c, i) => (
                <div key={i} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#b43b2d]/10 border border-[#b43b2d]/20 flex items-center justify-center font-bold text-xs text-[#b43b2d] shrink-0">
                      {c.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-bold text-[#2c1f1d] text-xs md:text-sm">{c.name}</p>
                      <p className="text-[10px] md:text-[11px] text-[#7c6660] font-medium truncate max-w-[200px] md:max-w-none">{c.role}</p>
                    </div>
                  </div>
                  <div className="flex sm:block justify-between items-center sm:text-right pl-11 sm:pl-0">
                    <span className={`inline-block px-2 md:px-2.5 py-0.5 md:py-1 text-[9px] md:text-[11px] font-bold rounded-full ${
                      c.status === 'Scheduled' ? 'bg-[#f59e0b]/10 text-[#d97706] border border-[#f59e0b]/30' :
                      c.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/20' :
                      'bg-[#e8dfd3] text-[#7c6660]'
                    }`}>
                      {c.status}
                    </span>
                    <p className="text-[9px] md:text-[10px] text-[#9c847d] font-medium sm:mt-1">{c.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#f4eee6] to-[#faf6f0] border border-[#e5dcd0] rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-xl md:text-2xl">🤖</span>
              <div>
                <h4 className="text-[11px] md:text-xs font-black uppercase tracking-wide text-[#2c1f1d]">AI Screening Active</h4>
                <p className="text-[10px] md:text-[11px] text-[#7c6660] leading-tight mt-0.5">42 applications parsed today with 88% avg match.</p>
              </div>
            </div>
            <button className="w-full sm:w-auto px-4 py-2.5 bg-[#b43b2d] hover:bg-[#9e3124] text-white text-xs font-bold rounded-xl shadow-md transition">
              Review AI
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}