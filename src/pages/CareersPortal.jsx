import React, { useState, useContext } from 'react';
import { CandidateContext } from '../context/CandidateContext';

export default function CareersPortal() {
  const [selectedDept, setSelectedDept] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedJob, setAppliedJob] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  const [candidateName, setCandidateName] = useState('');

  const { addCandidate } = useContext(CandidateContext);

  const liveJobs = [
    { id: 1, title: "Senior Full Stack Engineer", department: "Engineering", location: "Pune / Remote", type: "Full-Time", salary: "₹18L - ₹24L", desc: "Build robust Spring Boot backends and React frontends." },
    { id: 2, title: "UI/UX Product Designer", department: "Design", location: "Mumbai / Hybrid", type: "Full-Time", salary: "₹12L - ₹16L", desc: "Design high-end dark mode glassmorphism interfaces." },
    { id: 3, title: "AI/ML Research Scientist", department: "Data Science", location: "Pune", type: "Full-Time", salary: "₹22L - ₹30L", desc: "Develop multi-agent orchestration frameworks." },
  ];

  const filteredJobs = liveJobs.filter(job => {
    const matchesDept = selectedDept === 'All' || job.department === selectedDept;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || job.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const handleApplySubmit = (e) => {
    e.preventDefault();
    const newCandidate = {
      id: Math.floor(Math.random() * 10000) + 200,
      name: candidateName,
      role: appliedJob.title,
      stage: 1,
      outcome: "1. Applications",
      match: "Pending AI Match", 
      history: [{ timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), outcome: "New Application", reason: "Applied directly via public careers portal" }]
    };
    addCandidate(newCandidate);
    setIsApplying(false);
    setCandidateName('');
    alert(`Application submitted! ${newCandidate.name} added to pipeline.`);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 md:space-y-8 py-2 md:py-4">
      {/* Header Banner */}
      <div className="text-center space-y-3 bg-gradient-to-r from-[#faf6f0] to-[#f2ece1] border border-[#e5dcd0] rounded-2xl p-5 md:p-8 shadow-sm">
        <span className="px-3 py-1 bg-[#b43b2d]/10 text-[#b43b2d] border border-[#b43b2d]/20 text-[10px] md:text-xs font-bold rounded-full uppercase tracking-widest">
          Public Careers
        </span>
        <h1 className="text-2xl md:text-4xl font-black tracking-tight text-[#2c1f1d]">Join Our Team</h1>
        <p className="text-[#7c6660] max-w-xl mx-auto text-xs md:text-sm font-medium px-2">
          Explore open roles and submit your resume directly into our recruitment pipeline.
        </p>
        <div className="pt-3 max-w-md mx-auto">
          <input 
            type="text" placeholder="Search job titles..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#dcd1c0] rounded-xl px-4 py-3 text-[#2c1f1d] text-sm focus:outline-none focus:border-[#b43b2d] shadow-inner"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-2 px-1 scrollbar-hide">
        {['All', 'Engineering', 'Design', 'Data Science'].map((dept) => (
          <button
            key={dept} onClick={() => setSelectedDept(dept)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap border ${
              selectedDept === dept ? 'bg-[#b43b2d] text-white border-[#b43b2d] shadow-md' : 'bg-[#e8dfd3] text-[#5c4a45] border-[#dcd1c0] hover:bg-[#dcd1c0]'
            }`}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {filteredJobs.map((job) => (
          <div key={job.id} className="bg-[#faf6f0] border border-[#e5dcd0] rounded-2xl p-5 md:p-6 flex flex-col justify-between hover:border-[#dcd1c0] shadow-sm transition">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 text-[9px] md:text-[10px] font-black uppercase tracking-wider bg-[#f4eee6] text-[#7c6660] border border-[#e5dcd0] rounded-lg">
                  {job.department}
                </span>
                <span className="text-[10px] md:text-xs font-bold text-[#8c746d]">{job.type}</span>
              </div>
              <h3 className="text-base md:text-lg font-black text-[#2c1f1d] leading-tight">{job.title}</h3>
              <p className="text-xs md:text-sm font-medium text-[#7c6660] leading-relaxed">{job.desc}</p>
            </div>
            <div className="pt-4 mt-4 md:pt-6 md:mt-6 border-t border-[#e8dfd3] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-[10px] md:text-xs font-bold text-[#8c746d] uppercase tracking-wider">{job.location}</p>
                <p className="text-sm md:text-base font-black text-[#2c1f1d] mt-0.5">{job.salary}</p>
              </div>
              <button 
                onClick={() => { setAppliedJob(job); setIsApplying(true); }}
                className="w-full sm:w-auto px-4 py-2.5 bg-[#b43b2d] hover:bg-[#9e3124] text-white text-xs font-bold rounded-xl shadow-sm transition text-center"
              >
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Application Modal (Scrollable for mobile keyboards) */}
      {isApplying && appliedJob && (
        <div className="fixed inset-0 bg-[#2c1f1d]/60 backdrop-blur-sm flex items-center justify-center p-3 z-50">
          <div className="bg-[#faf6f0] border border-[#e5dcd0] rounded-2xl w-full max-w-lg p-5 md:p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg md:text-xl font-black text-[#2c1f1d] leading-tight">Apply for {appliedJob.title}</h2>
            <p className="text-[11px] md:text-xs font-bold text-[#7c6660] mt-1">{appliedJob.department} • {appliedJob.location}</p>

            <form onSubmit={handleApplySubmit} className="space-y-4 mt-5">
              <div>
                <label className="block text-[10px] md:text-xs font-black text-[#8c746d] uppercase tracking-wider mb-1">Full Name</label>
                <input type="text" value={candidateName} onChange={(e) => setCandidateName(e.target.value)} required className="w-full bg-white border border-[#dcd1c0] rounded-xl px-3 py-2.5 text-[#2c1f1d] text-sm focus:outline-none focus:border-[#b43b2d]" />
              </div>
              <div>
                <label className="block text-[10px] md:text-xs font-black text-[#8c746d] uppercase tracking-wider mb-1">Email Address</label>
                <input type="email" required className="w-full bg-white border border-[#dcd1c0] rounded-xl px-3 py-2.5 text-[#2c1f1d] text-sm focus:outline-none focus:border-[#b43b2d]" />
              </div>
              <div>
                <label className="block text-[10px] md:text-xs font-black text-[#8c746d] uppercase tracking-wider mb-1">Resume (PDF)</label>
                <div className="border-2 border-dashed border-[#dcd1c0] rounded-xl p-4 text-center cursor-pointer bg-white">
                  <p className="text-[11px] md:text-xs text-[#7c6660] font-medium">Tap to <span className="text-[#b43b2d] font-bold">Browse</span></p>
                </div>
              </div>
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-4 border-t border-[#e8dfd3]">
                <button type="button" onClick={() => setIsApplying(false)} className="w-full sm:w-auto px-4 py-3 sm:py-2 bg-[#e8dfd3] hover:bg-[#dcd1c0] text-[#5c4a45] text-xs font-bold rounded-xl transition">
                  Cancel
                </button>
                <button type="submit" className="w-full sm:w-auto px-4 py-3 sm:py-2 bg-[#b43b2d] text-white text-xs font-bold rounded-xl shadow-md transition">
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}