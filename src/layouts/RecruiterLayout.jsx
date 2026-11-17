import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const RecruiterLayout = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) => 
    `flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition ${
      isActive(path) 
        ? "bg-[#b43b2d] text-white shadow-md shadow-[#b43b2d]/30 font-bold" 
        : "text-[#5c4a45] hover:bg-[#e8dfd3] hover:text-[#2c1f1d]"
    }`;

  return (
    <div className="min-h-screen bg-[#f7f4ed] text-[#2c1f1d] flex p-3 gap-3">
      {/* Floating Curved Sidebar Navigation */}
      <aside className="w-64 bg-[#f0eae1] border border-[#e5dcd0] rounded-3xl hidden md:flex flex-col justify-between shrink-0 shadow-sm overflow-hidden">
        <div>
          <div className="p-6 border-b border-[#e5dcd0]">
            <h1 className="text-xl font-black tracking-widest text-[#b43b2d] uppercase">
              HIRELINES
            </h1>
            <p className="text-xs text-[#7c6660] mt-0.5 font-medium">Recruitment Portal</p>
          </div>
          <nav className="p-4 space-y-1.5">
            <Link to="/dashboard" className={navLinkClass("/dashboard")}>Dashboard</Link>
            <Link to="/jobs" className={navLinkClass("/jobs")}>Job Postings</Link>
            <Link to="/pipeline" className={navLinkClass("/pipeline")}>Candidate Pipeline</Link>
            <Link to="/interviews" className={navLinkClass("/interviews")}>Interviews</Link>
            <Link to="/analytics" className={navLinkClass("/analytics")}>Analytics & Reports</Link>
            
            {/* Candidate View Section */}
            <div className="pt-4 pb-1">
              <p className="px-4 text-[10px] font-bold uppercase tracking-wider text-[#9c847d]">Candidate View</p>
            </div>
            <Link to="/careers" className={navLinkClass("/careers")}>Careers Portal</Link>
            <Link to="/candidate-dashboard" className={navLinkClass("/candidate-dashboard")}>Candidate Dashboard</Link>
          </nav>
        </div>
        <div className="p-4 border-t border-[#e5dcd0]">
          <div className="px-4 py-2 text-xs text-[#8c746d] font-medium">Client Presentation v1.0</div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 overflow-y-auto bg-[#faf6f0] border border-[#e5dcd0] rounded-3xl shadow-sm">
        <Outlet />
      </main>
    </div>
  );
};

export default RecruiterLayout;