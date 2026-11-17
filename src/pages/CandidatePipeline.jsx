import React, { useState, useContext } from 'react';
import { CandidateContext } from '../context/CandidateContext';

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
  const [dispositionOutcome, setDispositionOutcome] = useState("1. Applications");
  const [dispositionReason, setDispositionReason] = useState("");

  const { candidates, setCandidates } = useContext(CandidateContext);

  const filteredCandidates = activeStage === 0 
    ? candidates 
    : candidates.filter(c => c.stage === activeStage);

  const currentStageInfo = lifecycleStages.find(s => s.id === activeStage);

  const handleOpenManage = (candidate) => {
    setSelectedCandidate(candidate);
    
    // Ensure the default dropdown value matches an existing 5-stage option if they currently have an old outcome
    const validOutcomes = ["1. Applications", "2. Screening", "3. Interviews", "4. Offer & Selection", "5. Onboarded / Hired"];
    setDispositionOutcome(validOutcomes.includes(candidate.outcome) ? candidate.outcome : `Stage ${candidate.stage} Update`);
    
    setDispositionReason("");
    setIsDispositionModalOpen(true);
  };

  const handleSaveDisposition = (e) => {
    e.preventDefault();
    if (!selectedCandidate) return;

    // Map exact dropdown string values directly to their pipeline stage ID numbers
    const outcomeToStageMap = {
      "1. Applications": 1,
      "2. Screening": 2,
      "3. Interviews": 3,
      "4. Offer & Selection": 4,
      "5. Onboarded / Hired": 5
    };

    const newStage = outcomeToStageMap[dispositionOutcome] || selectedCandidate.stage;

    const updatedHistoryEntry = {
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      outcome: dispositionOutcome,
      reason: dispositionReason || "Standard progression update"
    };

    setCandidates(candidates.map(c => 
      c.id === selectedCandidate.id 
        ? { 
            ...c, 
            outcome: dispositionOutcome, 
            stage: newStage, 
            history: [updatedHistoryEntry, ...c.history] 
          }
        : c
    ));

    alert(`Status update email successfully sent to ${selectedCandidate.name} regarding new status: "${dispositionOutcome}"`);

    setIsDispositionModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#faf6f0] to-[#f2ece1] border border-[#e5dcd0] p-6 rounded-2xl shadow-sm">
        <div>
          <h1 className="text-2xl font-black tracking-wider uppercase text-[#2c1f1d]">
            Candidate Recruitment Pipeline
          </h1>
          <p className="text-[#7c6660] mt-1 text-xs font-medium">Track candidate progression through our streamlined 5-stage enterprise hiring workflow with compliance audit history.</p>
        </div>
      </div>

      {/* Streamlined Filter Box */}
      <div className="bg-[#faf6f0] border border-[#e5dcd0] rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-[#8c746d] mb-1.5">
              Filter By Pipeline Stage
            </label>
            <select
              value={activeStage}
              onChange={(e) => setActiveStage(Number(e.target.value))}
              className="w-full sm:w-80 bg-white border border-[#dcd1c0] rounded-xl px-4 py-3 text-sm font-semibold text-[#2c1f1d] focus:outline-none focus:border-[#b43b2d] shadow-inner"
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

          <div className="text-xs text-[#7c6660] bg-[#f4eee6] px-4 py-3 rounded-xl border border-[#e5dcd0] max-w-md">
            <span className="text-[#b43b2d] font-bold">Compliance Rule:</span> Rejections, withdrawals, and offer declines preserve audit trails and reason logs.
          </div>
        </div>

        {/* Active Stage Description Banner */}
        <div className="pt-3 border-t border-[#e8dfd3] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#b43b2d]">
              {activeStage === 0 ? "Global Overview" : `Stage ${currentStageInfo.id} of 5`}
            </span>
            <p className="text-xs font-bold text-[#2c1f1d] mt-0.5">{currentStageInfo.desc}</p>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-[#e8dfd3] text-[#5c4a45] rounded-full">
            {filteredCandidates.length} candidate(s) found
          </span>
        </div>
      </div>

      {/* Candidates List for Selected Filter */}
      <div className="bg-[#faf6f0] border border-[#e5dcd0] rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-[#e5dcd0] flex items-center justify-between bg-[#f4eee6]">
          <h3 className="font-bold text-[#2c1f1d] text-xs uppercase tracking-wider">
            {activeStage === 0 ? "All Pipeline Candidates" : `Candidates in ${currentStageInfo.name}`}
          </h3>
          <span className="text-xs text-[#7c6660]">{filteredCandidates.length} active record(s)</span>
        </div>

        {filteredCandidates.length === 0 ? (
          <div className="p-12 text-center text-[#8c746d] text-sm font-medium">
            No candidates currently in this specific stage. Select another stage from the filter dropdown above.
          </div>
        ) : (
          <div className="divide-y divide-[#e8dfd3]">
            {filteredCandidates.map((c) => {
              const stageDetails = lifecycleStages.find(s => s.id === c.stage);
              return (
                <div key={c.id} className="p-4 flex items-center justify-between hover:bg-[#f4eee6]/50 transition">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#b43b2d]/10 border border-[#b43b2d]/20 flex items-center justify-center font-bold text-[#b43b2d] text-sm shadow-inner">
                      {c.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#2c1f1d] text-sm">{c.name}</h4>
                      <p className="text-xs text-[#7c6660] font-medium">
                        {c.role} {activeStage === 0 && stageDetails && <span className="text-[#b43b2d] font-bold">• [{stageDetails.name}]</span>}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <span className="text-[10px] text-[#9c847d] font-bold uppercase">AI Match</span>
                      <span className="text-sm font-black text-emerald-700 block">{c.match}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-[#9c847d] font-bold uppercase">Outcome</span>
                      <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-[#e8dfd3] text-[#2c1f1d] border border-[#dcd1c0] inline-block mt-0.5">
                        {c.outcome}
                      </span>
                    </div>
                    <button 
                      onClick={() => handleOpenManage(c)}
                      className="px-3.5 py-2 bg-[#e8dfd3] hover:bg-[#dcd1c0] text-xs font-bold text-[#2c1f1d] rounded-xl transition border border-[#dcd1c0]"
                    >
                      Manage
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Disposition & Compliance Audit Modal */}
      {isDispositionModalOpen && selectedCandidate && (
        <div className="fixed inset-0 bg-[#2c1f1d]/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#faf6f0] border border-[#e5dcd0] rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-[#e8dfd3] pb-3">
              <div>
                <h2 className="text-lg font-black text-[#2c1f1d]">Manage Candidate Outcome</h2>
                <p className="text-xs text-[#7c6660]">{selectedCandidate.name} • {selectedCandidate.role}</p>
              </div>
              <button 
                onClick={() => setIsDispositionModalOpen(false)}
                className="text-xs font-bold text-[#7c6660] hover:text-[#b43b2d]"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleSaveDisposition} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#8c746d] mb-1">
                  Update Outcome / Disposition Rule
                </label>
                <select
                  value={dispositionOutcome}
                  onChange={(e) => setDispositionOutcome(e.target.value)}
                  className="w-full bg-white border border-[#dcd1c0] rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[#2c1f1d] focus:outline-none focus:border-[#b43b2d]"
                >
                  <option value="1. Applications">1. Applications</option>
                  <option value="2. Screening">2. Screening</option>
                  <option value="3. Interviews">3. Interviews</option>
                  <option value="4. Offer & Selection">4. Offer & Selection</option>
                  <option value="5. Onboarded / Hired">5. Onboarded / Hired</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#8c746d] mb-1">
                  Audit Reason / Notes (Required for Rejections/Withdrawals)
                </label>
                <textarea
                  value={dispositionReason}
                  onChange={(e) => setDispositionReason(e.target.value)}
                  placeholder="Enter specific feedback or reason for compliance record..."
                  rows="3"
                  className="w-full bg-white border border-[#dcd1c0] rounded-xl px-3.5 py-2.5 text-sm text-[#2c1f1d] focus:outline-none focus:border-[#b43b2d]"
                ></textarea>
              </div>

              {/* Historical Audit Trail */}
              {selectedCandidate.history.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-[#e8dfd3]">
                  <p className="text-[10px] font-black uppercase tracking-wider text-[#8c746d]">Previous Compliance Audit Logs:</p>
                  <div className="max-h-28 overflow-y-auto space-y-1.5">
                    {selectedCandidate.history.map((h, i) => (
                      <div key={i} className="text-xs bg-[#f4eee6] p-2 rounded-lg border border-[#e5dcd0] flex justify-between">
                        <span className="font-bold text-[#b43b2d]">{h.outcome}</span>
                        <span className="text-[#7c6660]">{h.reason} ({h.timestamp})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-[#e8dfd3]">
                <button 
                  type="button"
                  onClick={() => setIsDispositionModalOpen(false)}
                  className="px-4 py-2 bg-[#e8dfd3] hover:bg-[#dcd1c0] text-[#5c4a45] text-xs font-bold rounded-xl transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-[#b43b2d] hover:bg-[#9e3124] text-white text-xs font-bold rounded-xl shadow-md transition"
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