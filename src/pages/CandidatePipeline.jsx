import React, { useState } from 'react';

export default function CandidatePipeline() {
  const lifecycleStages = [
    { id: 0, name: "All Stages", desc: "Overview of all active candidates across the streamlined pipeline" },
    { id: 1, name: "1. Applications", desc: "Incoming resumes & AI parsing via careers portal" },
    { id: 2, name: "2. Screening", desc: "Recruiter review & skill alignment" },
    { id: 3, name: "3. Interviews", desc: "Technical & management rounds scheduled" },
    { id: 4, name: "4. Offer & Selection", desc: "Offer generation, approval & tracking" },
    { id: 5, name: "5. Onboarded / Hired", desc: "Employee record created & closure" },
  ];

  const [activeStage, setActiveStage] = useState(0);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isDispositionModalOpen, setIsDispositionModalOpen] = useState(false);
  const [dispositionOutcome, setDispositionOutcome] = useState("Shortlisted");
  const [dispositionReason, setDispositionReason] = useState("");

  const [candidates, setCandidates] = useState([
    { id: 101, name: "Priya Sharma", role: "Senior Full Stack Engineer", stage: 3, outcome: "Feedback Pending", match: "94%", history: [] },
    { id: 102, name: "Rahul Deshmukh", role: "UI/UX Product Designer", stage: 4, outcome: "Offer Sent", match: "89%", history: [] },
    { id: 103, name: "Ananya Kulkarni", role: "Spring Boot Backend Lead", stage: 2, outcome: "Shortlisted", match: "91%", history: [] },
    { id: 104, name: "Vikram Malhotra", role: "AI/ML Research Scientist", stage: 1, outcome: "New Application", match: "85%", history: [] },
    { id: 105, name: "Sneha Patil", role: "Senior Full Stack Engineer", stage: 5, outcome: "Hired & Active", match: "96%", history: [] },
  ]);

  const filteredCandidates = activeStage === 0 
    ? candidates 
    : candidates.filter(c => c.stage === activeStage);

  const currentStageInfo = lifecycleStages.find(s => s.id === activeStage);

  const handleOpenManage = (candidate) => {
    setSelectedCandidate(candidate);
    setDispositionOutcome(candidate.outcome);
    setDispositionReason("");
    setIsDispositionModalOpen(true);
  };

  const handleSaveDisposition = (e) => {
    e.preventDefault();
    if (!selectedCandidate) return;

    const updatedHistoryEntry = {
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      outcome: dispositionOutcome,
      reason: dispositionReason || "Standard progression update"
    };

    setCandidates(candidates.map(c => 
      c.id === selectedCandidate.id 
        ? { ...c, outcome: dispositionOutcome, history: [updatedHistoryEntry, ...c.history] }
        : c
    ));

    setIsDispositionModalOpen(false);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col bg-gradient-to-r from-[#faf6f0] to-[#f2ece1] border border-[#e5dcd0] p-5 md:p-6 rounded-2xl shadow-sm">
        <h1 className="text-xl md:text-2xl font-black tracking-wider uppercase text-[#2c1f1d]">
          Candidate Pipeline
        </h1>
        <p className="text-[#7c6660] mt-1 text-xs md:text-sm font-medium leading-relaxed">
          Track candidate progression through our streamlined 5-stage enterprise hiring workflow with compliance audit history.
        </p>
      </div>

      {/* Streamlined Filter Box */}
      <div className="bg-[#faf6f0] border border-[#e5dcd0] rounded-2xl p-4 md:p-6 shadow-sm space-y-4">
        <div className="flex flex-col gap-3">
          <label className="block text-xs font-black uppercase tracking-wider text-[#8c746d]">
            Filter By Pipeline Stage
          </label>
          <select
            value={activeStage}
            onChange={(e) => setActiveStage(Number(e.target.value))}
            className="w-full md:w-80 bg-white border border-[#dcd1c0] rounded-xl px-4 py-3 text-sm font-semibold text-[#2c1f1d] focus:outline-none focus:border-[#b43b2d] shadow-inner"
          >
            {lifecycleStages.map((stage) => {
              const count = stage.id === 0 ? candidates.length : candidates.filter(c => c.stage === stage.id).length;
              return (
                <option key={stage.id} value={stage.id}>
                  {stage.name} ({count})
                </option>
              );
            })}
          </select>
        </div>

        {/* Active Stage Description Banner */}
        <div className="pt-4 border-t border-[#e8dfd3] flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-[#b43b2d]">
              {activeStage === 0 ? "Global Overview" : `Stage ${currentStageInfo.id} of 5`}
            </span>
            <p className="text-xs md:text-sm font-bold text-[#2c1f1d] mt-1">{currentStageInfo.desc}</p>
          </div>
          <span className="self-start md:self-auto text-xs font-bold px-3 py-1.5 bg-[#e8dfd3] text-[#5c4a45] rounded-full">
            {filteredCandidates.length} candidate(s)
          </span>
        </div>
      </div>

      {/* Candidates List for Selected Filter */}
      <div className="bg-[#faf6f0] border border-[#e5dcd0] rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-[#e5dcd0] flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#f4eee6]">
          <h3 className="font-bold text-[#2c1f1d] text-xs uppercase tracking-wider">
            {activeStage === 0 ? "All Pipeline Candidates" : `Candidates in ${currentStageInfo.name}`}
          </h3>
          <span className="text-[11px] font-medium text-[#7c6660]">{filteredCandidates.length} active record(s)</span>
        </div>

        {filteredCandidates.length === 0 ? (
          <div className="p-8 md:p-12 text-center text-[#8c746d] text-sm font-medium">
            No candidates currently in this stage. Select another stage from the filter dropdown.
          </div>
        ) : (
          <div className="divide-y divide-[#e8dfd3]">
            {filteredCandidates.map((c) => {
              const stageDetails = lifecycleStages.find(s => s.id === c.stage);
              return (
                <div key={c.id} className="p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-[#f4eee6]/50 transition">
                  {/* Candidate Identity Profile */}
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#b43b2d]/10 border border-[#b43b2d]/20 flex items-center justify-center font-bold text-[#b43b2d] text-sm shadow-inner shrink-0">
                      {c.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#2c1f1d] text-sm md:text-base leading-tight">{c.name}</h4>
                      <p className="text-[11px] md:text-xs text-[#7c6660] font-medium mt-0.5 md:mt-1">
                        {c.role} {activeStage === 0 && stageDetails && <span className="text-[#b43b2d] font-bold block md:inline md:ml-1 mt-1 md:mt-0">• [{stageDetails.name}]</span>}
                      </p>
                    </div>
                  </div>
                  
                  {/* Action & Metrics Card (Stacks cleanly on Mobile) */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between lg:justify-end gap-3 md:gap-6 bg-white lg:bg-transparent p-3 lg:p-0 rounded-xl border border-[#e8dfd3] lg:border-none">
                    <div className="flex items-center justify-between sm:justify-start gap-6">
                      <div className="text-left lg:text-right">
                        <span className="text-[9px] md:text-[10px] text-[#9c847d] font-bold uppercase block">AI Match</span>
                        <span className="text-sm md:text-base font-black text-emerald-700">{c.match}</span>
                      </div>
                      <div className="text-left lg:text-right">
                        <span className="text-[9px] md:text-[10px] text-[#9c847d] font-bold uppercase block">Outcome</span>
                        <span className="px-2 md:px-2.5 py-1 text-[10px] md:text-xs font-bold rounded-lg bg-[#e8dfd3] text-[#2c1f1d] border border-[#dcd1c0] inline-block mt-0.5">
                          {c.outcome}
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleOpenManage(c)}
                      className="w-full sm:w-auto px-4 py-2.5 bg-[#e8dfd3] hover:bg-[#dcd1c0] text-xs font-bold text-[#2c1f1d] rounded-xl transition border border-[#dcd1c0] shadow-sm"
                    >
                      Manage Candidate
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Disposition & Compliance Audit Modal (Mobile Safe Layout) */}
      {isDispositionModalOpen && selectedCandidate && (
        <div className="fixed inset-0 bg-[#2c1f1d]/60 backdrop-blur-sm flex items-center justify-center p-3 z-[60]">
          <div className="bg-[#faf6f0] border border-[#e5dcd0] rounded-2xl w-full max-w-lg p-5 md:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-[#e8dfd3] pb-3 gap-2">
              <div>
                <h2 className="text-base md:text-lg font-black text-[#2c1f1d] leading-tight">Manage Candidate</h2>
                <p className="text-[11px] md:text-xs text-[#7c6660] mt-1">{selectedCandidate.name} • {selectedCandidate.role}</p>
              </div>
              <button 
                onClick={() => setIsDispositionModalOpen(false)}
                className="text-2xl leading-none text-[#7c6660] hover:text-[#b43b2d] p-1"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSaveDisposition} className="space-y-4">
              <div>
                <label className="block text-[10px] md:text-xs font-black uppercase tracking-wider text-[#8c746d] mb-1.5">
                  Update Outcome
                </label>
                <select
                  value={dispositionOutcome}
                  onChange={(e) => setDispositionOutcome(e.target.value)}
                  className="w-full bg-white border border-[#dcd1c0] rounded-xl px-3 py-3 text-xs md:text-sm font-semibold text-[#2c1f1d] focus:outline-none focus:border-[#b43b2d]"
                >
                  <option value="Shortlisted">Shortlisted / Active</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                  <option value="Offer Sent">Offer Sent</option>
                  <option value="Hired & Active">Hired & Active</option>
                  <option value="Rejected - Technical Gap">Rejected (Technical Gap)</option>
                  <option value="Candidate Withdrew">Candidate Withdrew</option>
                  <option value="Offer Declined">Offer Declined</option>
                  <option value="On Hold">On Hold (Compliance Review)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] md:text-xs font-black uppercase tracking-wider text-[#8c746d] mb-1.5">
                  Audit Notes (Required)
                </label>
                <textarea
                  value={dispositionReason}
                  onChange={(e) => setDispositionReason(e.target.value)}
                  placeholder="Enter specific feedback or reason..."
                  rows="3"
                  className="w-full bg-white border border-[#dcd1c0] rounded-xl px-3 py-3 text-xs md:text-sm text-[#2c1f1d] focus:outline-none focus:border-[#b43b2d]"
                ></textarea>
              </div>

              {selectedCandidate.history.length > 0 && (
                <div className="space-y-2 pt-3 border-t border-[#e8dfd3]">
                  <p className="text-[10px] font-black uppercase tracking-wider text-[#8c746d]">Previous Audit Logs:</p>
                  <div className="max-h-24 overflow-y-auto space-y-2 pr-1">
                    {selectedCandidate.history.map((h, i) => (
                      <div key={i} className="text-[11px] bg-[#f4eee6] p-2.5 rounded-lg border border-[#e5dcd0] flex flex-col gap-1">
                        <span className="font-bold text-[#b43b2d]">{h.outcome}</span>
                        <span className="text-[#7c6660] leading-relaxed">{h.reason} <span className="font-bold text-[#9c847d]">({h.timestamp})</span></span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-4 border-t border-[#e8dfd3]">
                <button 
                  type="button"
                  onClick={() => setIsDispositionModalOpen(false)}
                  className="w-full sm:w-auto px-4 py-3 sm:py-2 bg-[#e8dfd3] hover:bg-[#dcd1c0] text-[#5c4a45] text-xs font-bold rounded-xl transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="w-full sm:w-auto px-4 py-3 sm:py-2 bg-[#b43b2d] hover:bg-[#9e3124] text-white text-xs font-bold rounded-xl shadow-md transition"
                >
                  Save Compliance Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}