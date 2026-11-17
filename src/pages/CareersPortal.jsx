import React, { useState, useContext } from 'react';
import { CandidateContext } from '../context/CandidateContext';

export default function CareersPortal() {
  const [selectedDept, setSelectedDept] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedJob, setAppliedJob] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  const [candidateName, setCandidateName] = useState('');

  // Pull addCandidate from Context
  const { addCandidate } = useContext(CandidateContext);

  const liveJobs = [
    { id: 1, title: "Senior Full Stack Engineer", department: "Engineering", location: "Pune / Remote", type: "Full-Time", salary: "₹18L - ₹24L", desc: "Build robust Spring Boot backends and React frontends for enterprise client platforms." },
    { id: 2, title: "UI/UX Product Designer", department: "Design", location: "Mumbai / Hybrid", type: "Full-Time", salary: "₹12L - ₹16L", desc: "Design high-end dark mode glassmorphism interfaces and user journey workflows." },
    { id: 3, title: "AI/ML Research Scientist", department: "Data Science", location: "Pune", type: "Full-Time", salary: "₹22L - ₹30L", desc: "Develop multi-agent orchestration frameworks and automated LLM pipelines." },
    { id: 4, title: "Spring Boot Backend Lead", department: "Engineering", location: "Bangalore", type: "Full-Time", salary: "₹25L - ₹35L", desc: "Architect high-performance microservices and manage AWS cloud infrastructure." },
  ];

  const filteredJobs = liveJobs.filter(job => {
    const matchesDept = selectedDept === 'All' || job.department === selectedDept;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || job.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const handleApplySubmit = (e) => {
    e.preventDefault();
    
    // Create candidate object matching the CandidatePipeline schema
    const newCandidate = {
      id: Math.floor(Math.random() * 10000) + 200, // Generate random ID
      name: candidateName,
      role: appliedJob.title,
      stage: 1, // Drops them directly into "1. Applications" stage
      outcome: "New Application",
      match: "Pending AI Match", 
      history: [{
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        outcome: "New Application",
        reason: "Applied directly via public careers portal"
      }]
    };

    // Add candidate via Context instead of prop
    addCandidate(newCandidate);

    setIsApplying(false);
    setCandidateName('');
    alert(`Application submitted! ${newCandidate.name} has been added to the Candidate Pipeline.`);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Header Banner */}
      <div className="text-center space-y-3 bg-gradient-to-r from-[#faf6f0] to-[#f2ece1] border border-[#e5dcd0] rounded-2xl p-8 shadow-sm">
        <span className="px-3 py-1 bg-[#b43b2d]/10 text-[#b43b2d] border border-[#b43b2d]/20 text-xs font-bold rounded-full uppercase tracking-widest">
          Hirelines Public Careers Portal
        </span>
        <h1 className="text-4xl font-black tracking-tight text-[#2c1f1d]">Join Our Growing Team</h1>
        <p className="text-[#7c6660] max-w-xl mx-auto text-sm font-medium">
          Explore open roles, review requirements, and submit your resume directly into our automated recruitment pipeline.
        </p>

        <div className="pt-4 max-w-md mx-auto">
          <input 
            type="text" 
            placeholder="Search job titles, keywords..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#dcd1c0] rounded-xl px-4 py-3 text-[#2c1f1d] text-sm focus:outline-none focus:border-[#b43b2d] shadow-inner"
          />
        </div>
      </div>

      {/* Department Filters */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {['All', 'Engineering', 'Design', 'Data Science'].map((dept) => (
          <button
            key={dept}
            onClick={() => setSelectedDept(dept)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition border ${
              selectedDept === dept 
                ? 'bg-[#b43b2d] text-white border-[#b43b2d] shadow-md' 
                : 'bg-[#e8dfd3] text-[#5c4a45] border-[#dcd1c0] hover:bg-[#dcd1c0] hover:text-[#2c1f1d]'
            }`}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.map((job) => (
          <div key={job.id} className="bg-[#faf6f0] border border-[#e5dcd0] rounded-2xl p-6 flex flex-col justify-between hover:border-[#dcd1c0] hover:shadow-md transition">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider bg-[#f4eee6] text-[#7c6660] border border-[#e5dcd0] rounded-lg">
                  {job.department}
                </span>
                <span className="text-xs font-bold text-[#8c746d]">{job.type}</span>
              </div>
              <h3 className="text-lg font-black text-[#2c1f1d]">{job.title}</h3>
              <p className="text-sm font-medium text-[#7c6660] leading-relaxed">{job.desc}</p>
            </div>

            <div className="pt-6 mt-6 border-t border-[#e8dfd3] flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#8c746d] uppercase tracking-wider">{job.location}</p>
                <p className="text-sm font-black text-[#2c1f1d] mt-0.5">{job.salary}</p>
              </div>
              <button 
                onClick={() => { setAppliedJob(job); setIsApplying(true); }}
                className="px-4 py-2 bg-[#b43b2d] hover:bg-[#9e3124] text-white text-xs font-bold rounded-xl shadow-sm transition"
              >
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Application Modal */}
      {isApplying && appliedJob && (
        <div className="fixed inset-0 bg-[#2c1f1d]/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#faf6f0] border border-[#e5dcd0] rounded-2xl w-full max-w-lg p-6 shadow-2xl">
            <h2 className="text-xl font-black text-[#2c1f1d]">Apply for {appliedJob.title}</h2>
            <p className="text-xs font-bold text-[#7c6660] mt-1">{appliedJob.department} • {appliedJob.location}</p>

            <form onSubmit={handleApplySubmit} className="space-y-4 mt-6">
              <div>
                <label className="block text-xs font-black text-[#8c746d] uppercase tracking-wider mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  placeholder="e.g. Tejasvini Bhondve" 
                  required
                  className="w-full bg-white border border-[#dcd1c0] rounded-xl px-3.5 py-2.5 text-[#2c1f1d] text-sm focus:outline-none focus:border-[#b43b2d]"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-[#8c746d] uppercase tracking-wider mb-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  className="w-full bg-white border border-[#dcd1c0] rounded-xl px-3.5 py-2.5 text-[#2c1f1d] text-sm focus:outline-none focus:border-[#b43b2d]"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-[#8c746d] uppercase tracking-wider mb-1">Upload Resume (PDF / Docx)</label>
                <div className="border-2 border-dashed border-[#dcd1c0] rounded-xl p-4 text-center cursor-pointer hover:border-[#b43b2d] bg-white">
                  <p className="text-xs text-[#7c6660] font-medium">Drag & drop your resume here, or <span className="text-[#b43b2d] font-bold">Browse</span></p>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-[#e8dfd3]">
                <button 
                  type="button" 
                  onClick={() => setIsApplying(false)}
                  className="px-4 py-2 bg-[#e8dfd3] hover:bg-[#dcd1c0] text-[#5c4a45] text-xs font-bold rounded-xl transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-[#b43b2d] hover:bg-[#9e3124] text-white text-xs font-bold rounded-xl shadow-md transition"
                >
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