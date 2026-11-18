import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const RecruiterLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const closeMenu = () => setIsMobileMenuOpen(false);

  const navLinkClass = (path) => 
    `flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition ${
      isActive(path) 
        ? "bg-[#b43b2d] text-white shadow-md shadow-[#b43b2d]/30 font-bold" 
        : "text-[#5c4a45] hover:bg-[#e8dfd3] hover:text-[#2c1f1d]"
    }`;

  return (
    <div className="min-h-screen bg-[#f7f4ed] text-[#2c1f1d] flex flex-col md:flex-row p-3 gap-3 relative">
      
      {/* Mobile Top Navigation Bar */}
      <div className="md:hidden flex items-center justify-between bg-[#faf6f0] border border-[#e5dcd0] rounded-3xl p-4 shadow-sm shrink-0">
        <div>
          <h1 className="text-xl font-black tracking-widest text-[#b43b2d] uppercase leading-none">
            HIRELINES
          </h1>
          <p className="text-[10px] text-[#7c6660] font-medium mt-1">Recruitment Portal</p>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 bg-[#e8dfd3] rounded-xl text-[#2c1f1d] hover:bg-[#dcd1c0] transition focus:outline-none"
        >
          {/* Hamburger Icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      {/* Mobile Backdrop Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-[#2c1f1d]/40 backdrop-blur-sm z-40 md:hidden rounded-3xl transition-opacity"
          onClick={closeMenu}
        ></div>
      )}

      {/* Floating Curved Sidebar Navigation (Responsive Drawer) */}
      <aside className={`
        fixed inset-y-3 left-3 z-50 w-64 bg-[#f0eae1] border border-[#e5dcd0] rounded-3xl flex flex-col justify-between shadow-2xl overflow-hidden
        transform transition-transform duration-300 ease-in-out
        md:relative md:inset-0 md:translate-x-0 md:flex md:shadow-sm md:shrink-0
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-[120%]"}
      `}>
        <div>
          <div className="p-6 border-b border-[#e5dcd0] flex justify-between items-center">
            <div>
              <h1 className="text-xl font-black tracking-widest text-[#b43b2d] uppercase">
                HIRELINES
              </h1>
              <p className="text-xs text-[#7c6660] mt-0.5 font-medium">Recruitment Portal</p>
            </div>
            {/* Mobile Close Icon */}
            <button onClick={closeMenu} className="md:hidden p-1.5 bg-[#e8dfd3] rounded-lg text-[#5c4a45] hover:text-[#b43b2d]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <nav className="p-4 space-y-1.5 overflow-y-auto">
            <Link to="/dashboard" onClick={closeMenu} className={navLinkClass("/dashboard")}>Dashboard</Link>
            <Link to="/jobs" onClick={closeMenu} className={navLinkClass("/jobs")}>Job Postings</Link>
            <Link to="/pipeline" onClick={closeMenu} className={navLinkClass("/pipeline")}>Candidate Pipeline</Link>
            <Link to="/interviews" onClick={closeMenu} className={navLinkClass("/interviews")}>Interviews</Link>
            <Link to="/analytics" onClick={closeMenu} className={navLinkClass("/analytics")}>Analytics & Reports</Link>
            
            {/* Candidate View Section */}
            <div className="pt-4 pb-1">
              <p className="px-4 text-[10px] font-bold uppercase tracking-wider text-[#9c847d]">Candidate View</p>
            </div>
            <Link to="/careers" onClick={closeMenu} className={navLinkClass("/careers")}>Careers Portal</Link>
            <Link to="/candidate-dashboard" onClick={closeMenu} className={navLinkClass("/candidate-dashboard")}>Candidate Dashboard</Link>
          </nav>
        </div>
        <div className="p-4 border-t border-[#e5dcd0]">
          <div className="px-4 py-2 text-xs text-[#8c746d] font-medium">Client Presentation v1.0</div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-[#faf6f0] border border-[#e5dcd0] rounded-3xl shadow-sm">
        <Outlet />
      </main>
    </div>
  );
};

export default RecruiterLayout;