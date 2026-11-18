import React, { useState } from 'react';

export default function JobPostings() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJobId, setEditingJobId] = useState(null);

  const [jobs, setJobs] = useState([
    { id: 1, title: "Senior Full Stack Engineer", department: "Engineering", location: "Pune / Remote", type: "Full-Time", applicants: 42, status: "Active" },
    { id: 2, title: "UI/UX Product Designer", department: "Design", location: "Mumbai / Hybrid", type: "Full-Time", applicants: 28, status: "Active" },
    { id: 3, title: "Spring Boot Backend Lead", department: "Engineering", location: "Bangalore", type: "Full-Time", applicants: 19, status: "On Hold" },
    { id: 4, title: "AI/ML Research Scientist", department: "Data Science", location: "Pune", type: "Full-Time", applicants: 35, status: "Active" },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newDept, setNewDept] = useState('Engineering');
  const [newLocation, setNewLocation] = useState('Pune');
  const [newStatus, setNewStatus] = useState('Active');

  const handleOpenCreateModal = () => {
    setEditingJobId(null);
    setNewTitle('');
    setNewDept('Engineering');
    setNewLocation('Pune');
    setNewStatus('Active');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (job) => {
    setEditingJobId(job.id);
    setNewTitle(job.title);
    setNewDept(job.department);
    setNewLocation(job.location);
    setNewStatus(job.status);
    setIsModalOpen(true);
  };

  const handleSaveJob = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    if (editingJobId) {
      setJobs(jobs.map(job => 
        job.id === editingJobId 
          ? { ...job, title: newTitle, department: newDept, location: newLocation, status: newStatus } 
          : job
      ));
    } else {
      const newJobObj = {
        id: jobs.length + 1,
        title: newTitle,
        department: newDept,
        location: newLocation,
        type: "Full-Time",
        applicants: 0,
        status: newStatus
      };
      setJobs([newJobObj, ...jobs]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-wider uppercase text-[#2c1f1d]">Job Postings</h1>
          <p className="text-[#7c6660] mt-1 text-xs md:text-sm font-medium">Manage active openings and publish new roles.</p>
        </div>
        <button 
          onClick={handleOpenCreateModal}
          className="w-full sm:w-auto px-4 py-3 sm:py-2.5 bg-[#b43b2d] hover:bg-[#9e3124] text-white text-sm font-bold rounded-xl shadow-md transition text-center"
        >
          + Post New Job
        </button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-[#faf6f0] border border-[#e5dcd0] rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#e5dcd0] text-[10px] font-black tracking-wider text-[#8c746d] uppercase bg-[#f4eee6]">
              <th className="p-4">Job Title</th>
              <th className="p-4">Department</th>
              <th className="p-4">Location</th>
              <th className="p-4">Applicants</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e8dfd3] text-sm">
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-[#f4eee6]/50 transition">
                <td className="p-4 font-black text-[#2c1f1d]">{job.title}</td>
                <td className="p-4 font-bold text-[#7c6660]">{job.department}</td>
                <td className="p-4 font-medium text-[#7c6660]">{job.location}</td>
                <td className="p-4">
                  <span className="font-black text-emerald-700">{job.applicants}</span> <span className="text-xs text-[#8c746d]">candidates</span>
                </td>
                <td className="p-4">
                  <span className={`inline-block px-2.5 py-1 text-xs font-bold rounded-lg border ${job.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-[#e8dfd3] text-[#5c4a45] border-[#dcd1c0]'}`}>
                    {job.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => handleOpenEditModal(job)} className="text-[#5c4a45] hover:text-[#2c1f1d] text-xs font-bold px-3.5 py-2 bg-[#e8dfd3] hover:bg-[#dcd1c0] rounded-xl transition border border-[#dcd1c0]">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="bg-[#faf6f0] border border-[#e5dcd0] rounded-2xl p-4 shadow-sm flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-black text-[#2c1f1d] text-sm">{job.title}</h3>
                <p className="text-[11px] font-bold text-[#7c6660] mt-0.5">{job.department} • {job.location}</p>
              </div>
              <span className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded-lg border ${job.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-[#e8dfd3] text-[#5c4a45] border-[#dcd1c0]'}`}>
                {job.status}
              </span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-[#e8dfd3]">
              <div className="text-[11px]">
                <span className="font-black text-emerald-700 text-sm">{job.applicants}</span> <span className="text-[#8c746d]">candidates</span>
              </div>
              <button onClick={() => handleOpenEditModal(job)} className="text-[#5c4a45] text-[11px] font-bold px-3 py-1.5 bg-[#e8dfd3] rounded-lg transition border border-[#dcd1c0]">
                Edit Requisition
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Responsive Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#2c1f1d]/60 backdrop-blur-sm flex items-center justify-center p-3 z-50">
          <div className="bg-[#faf6f0] border border-[#e5dcd0] rounded-2xl w-full max-w-lg p-5 md:p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg md:text-xl font-black text-[#2c1f1d] mb-4">
              {editingJobId ? "Edit Job Requisition" : "Create New Opening"}
            </h2>
            <form onSubmit={handleSaveJob} className="space-y-4">
              <div>
                <label className="block text-[10px] md:text-xs font-black text-[#8c746d] uppercase tracking-wider mb-1">Job Title</label>
                <input 
                  type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} required
                  className="w-full bg-white border border-[#dcd1c0] rounded-xl px-3 py-2.5 text-[#2c1f1d] text-sm focus:outline-none focus:border-[#b43b2d]"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] md:text-xs font-black text-[#8c746d] uppercase tracking-wider mb-1">Department</label>
                  <select value={newDept} onChange={(e) => setNewDept(e.target.value)} className="w-full bg-white border border-[#dcd1c0] rounded-xl px-3 py-2.5 text-[#2c1f1d] text-sm font-semibold focus:outline-none focus:border-[#b43b2d]">
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Product">Product</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] md:text-xs font-black text-[#8c746d] uppercase tracking-wider mb-1">Location</label>
                  <input type="text" value={newLocation} onChange={(e) => setNewLocation(e.target.value)} className="w-full bg-white border border-[#dcd1c0] rounded-xl px-3 py-2.5 text-[#2c1f1d] text-sm focus:outline-none focus:border-[#b43b2d]" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] md:text-xs font-black text-[#8c746d] uppercase tracking-wider mb-1">Status</label>
                <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} className="w-full bg-white border border-[#dcd1c0] rounded-xl px-3 py-2.5 text-[#2c1f1d] text-sm font-semibold focus:outline-none focus:border-[#b43b2d]">
                  <option value="Active">Active</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-4 border-t border-[#e8dfd3]">
                <button type="button" onClick={() => setIsModalOpen(false)} className="w-full sm:w-auto px-4 py-3 sm:py-2 bg-[#e8dfd3] hover:bg-[#dcd1c0] text-[#5c4a45] text-xs font-bold rounded-xl transition">
                  Cancel
                </button>
                <button type="submit" className="w-full sm:w-auto px-4 py-3 sm:py-2 bg-[#b43b2d] hover:bg-[#9e3124] text-white text-xs font-bold rounded-xl shadow-md transition">
                  {editingJobId ? "Save Changes" : "Publish Opening"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}