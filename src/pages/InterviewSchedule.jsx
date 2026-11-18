import React, { useState } from 'react';

export default function InterviewSchedule() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Mock data for scheduled interviews
  const [interviews, setInterviews] = useState([
    { id: 1, date: '2026-11-18', time: '10:00 AM', candidate: 'Priya Sharma', role: 'Senior Full Stack Engineer', type: 'Technical Round' },
    { id: 2, date: '2026-11-18', time: '02:30 PM', candidate: 'Amit Patel', role: 'UI/UX Designer', type: 'Portfolio Review' },
    { id: 3, date: '2026-11-20', time: '11:00 AM', candidate: 'Rahul Deshmukh', role: 'UI/UX Product Designer', type: 'HR Round' },
    { id: 4, date: '2026-11-25', time: '04:00 PM', candidate: 'Ananya Kulkarni', role: 'Spring Boot Backend Lead', type: 'Culture Fit' },
  ]);

  // Form State for new interview
  const [newCandidate, setNewCandidate] = useState('');
  const [newTime, setNewTime] = useState('09:00 AM');
  const [newRole, setNewRole] = useState('');
  const [newType, setNewType] = useState('Technical Round');

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const years = [2025, 2026, 2027, 2028];

  // Helper formatting functions
  const getFormattedDateString = (dateObj) => {
    return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
  };

  const selectedDateString = getFormattedDateString(selectedDate);
  const selectedDateInterviews = interviews.filter(inv => inv.date === selectedDateString);

  // Calendar generation logic
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleAddInterview = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Math.random(),
      date: selectedDateString,
      time: newTime,
      candidate: newCandidate,
      role: newRole,
      type: newType
    };
    setInterviews([...interviews, newEntry]);
    setIsAddModalOpen(false);
    setNewCandidate('');
    setNewRole('');
  };

  // Render Calendar Cells
  const calendarCells = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarCells.push(<div key={`empty-${i}`} className="p-2 sm:p-4 border border-transparent"></div>);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const currentCellDate = new Date(currentYear, currentMonth, d);
    const dateStr = getFormattedDateString(currentCellDate);
    const isSelected = dateStr === selectedDateString;
    const isToday = dateStr === getFormattedDateString(today);
    const dayInterviews = interviews.filter(inv => inv.date === dateStr);

    calendarCells.push(
      <button
        key={d}
        onClick={() => setSelectedDate(currentCellDate)}
        className={`relative flex flex-col items-center justify-center p-2 sm:p-4 rounded-xl transition border h-16 sm:h-24 ${
          isSelected
            ? 'bg-[#b43b2d] text-white border-[#b43b2d] shadow-md'
            : isToday
            ? 'bg-[#e8dfd3] text-[#2c1f1d] border-[#dcd1c0] hover:bg-[#dcd1c0]'
            : 'bg-white text-[#5c4a45] border-[#e5dcd0] hover:border-[#b43b2d]/50 hover:bg-[#faf6f0]'
        }`}
      >
        <span className={`text-sm sm:text-lg font-bold ${isSelected ? 'text-white' : 'text-[#2c1f1d]'}`}>{d}</span>
        
        {/* Interview Dots Indicator */}
        {dayInterviews.length > 0 && (
          <div className="flex gap-1 mt-1">
            {dayInterviews.slice(0, 3).map((_, idx) => (
              <span key={idx} className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-[#b43b2d]'}`}></span>
            ))}
            {dayInterviews.length > 3 && <span className={`text-[8px] font-black ${isSelected ? 'text-white' : 'text-[#b43b2d]'}`}>+</span>}
          </div>
        )}
      </button>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#faf6f0] to-[#f2ece1] border border-[#e5dcd0] p-5 md:p-6 rounded-2xl shadow-sm">
        <div>
          <h1 className="text-xl md:text-2xl font-black tracking-wider uppercase text-[#2c1f1d]">
            Interview Schedule
          </h1>
          <p className="text-[#7c6660] mt-1 text-[11px] md:text-sm font-medium">Manage candidate meetings, technical rounds, and calendar syncing.</p>
        </div>
      </div>

      {/* Main Layout: 30% Left Panel, 70% Right Calendar */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* LEFT PANEL (30%) - Selected Date & Interviews */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <div className="bg-[#faf6f0] border border-[#e5dcd0] rounded-2xl p-5 md:p-6 shadow-sm flex flex-col h-full">
            <div className="pb-4 border-b border-[#e8dfd3]">
              <h2 className="text-sm font-black uppercase tracking-widest text-[#8c746d]">Selected Date</h2>
              <p className="text-2xl font-black text-[#2c1f1d] mt-1">
                {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' })}
              </p>
            </div>

            {/* List of Interviews for Selected Date */}
            <div className="flex-1 py-4 space-y-3 overflow-y-auto">
              {selectedDateInterviews.length === 0 ? (
                <div className="text-center py-8 text-[#9c847d] text-sm font-medium">
                  No interviews scheduled for this date.
                </div>
              ) : (
                selectedDateInterviews.map(inv => (
                  <div key={inv.id} className="bg-white border border-[#e5dcd0] p-3 md:p-4 rounded-xl shadow-sm hover:border-[#b43b2d]/30 transition">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] md:text-[11px] font-black uppercase tracking-wider text-[#b43b2d] bg-[#b43b2d]/10 px-2 py-0.5 rounded-md">
                        {inv.time}
                      </span>
                      <span className="text-[10px] font-bold text-[#7c6660] border border-[#dcd1c0] px-2 py-0.5 rounded-md">
                        {inv.type}
                      </span>
                    </div>
                    <h4 className="text-sm md:text-base font-bold text-[#2c1f1d]">{inv.candidate}</h4>
                    <p className="text-[11px] md:text-xs font-medium text-[#7c6660] mt-0.5">{inv.role}</p>
                  </div>
                ))
              )}
            </div>

            {/* Add Interview Button */}
            <div className="pt-4 border-t border-[#e8dfd3]">
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="w-full py-3 bg-[#b43b2d] hover:bg-[#9e3124] text-white text-xs md:text-sm font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2"
              >
                <span>+ Schedule Interview</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL (70%) - Big Interactive Calendar */}
        <div className="w-full lg:w-2/3 bg-white/60 border border-[#e5dcd0] rounded-2xl p-4 md:p-6 shadow-sm">
          
          {/* Calendar Controls / Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button onClick={handlePrevMonth} className="p-2 bg-[#e8dfd3] hover:bg-[#dcd1c0] rounded-lg text-[#5c4a45] transition">
                ←
              </button>
              <button onClick={handleNextMonth} className="p-2 bg-[#e8dfd3] hover:bg-[#dcd1c0] rounded-lg text-[#5c4a45] transition">
                →
              </button>
            </div>

            {/* Sorting / Filters */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select 
                value={currentMonth} 
                onChange={(e) => setCurrentMonth(Number(e.target.value))}
                className="w-full sm:w-auto bg-white border border-[#dcd1c0] rounded-lg px-3 py-2 text-sm font-bold text-[#2c1f1d] focus:outline-none focus:border-[#b43b2d]"
              >
                {months.map((m, idx) => <option key={m} value={idx}>{m}</option>)}
              </select>
              <select 
                value={currentYear} 
                onChange={(e) => setCurrentYear(Number(e.target.value))}
                className="w-full sm:w-auto bg-white border border-[#dcd1c0] rounded-lg px-3 py-2 text-sm font-bold text-[#2c1f1d] focus:outline-none focus:border-[#b43b2d]"
              >
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#8c746d] py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {calendarCells}
          </div>
        </div>
      </div>

      {/* Add Interview Modal (Mobile Safe) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-[#2c1f1d]/60 backdrop-blur-sm flex items-center justify-center p-3 z-[60]">
          <div className="bg-[#faf6f0] border border-[#e5dcd0] rounded-2xl w-full max-w-md p-5 md:p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg md:text-xl font-black text-[#2c1f1d] mb-1">Schedule Interview</h2>
            <p className="text-[11px] md:text-xs font-bold text-[#7c6660] mb-5">
              For {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <form onSubmit={handleAddInterview} className="space-y-4">
              <div>
                <label className="block text-[10px] md:text-xs font-black text-[#8c746d] uppercase tracking-wider mb-1">Candidate Name</label>
                <input type="text" value={newCandidate} onChange={(e) => setNewCandidate(e.target.value)} required placeholder="e.g. Swastik Bharti" className="w-full bg-white border border-[#dcd1c0] rounded-xl px-3 py-2.5 text-[#2c1f1d] text-sm focus:outline-none focus:border-[#b43b2d]" />
              </div>
              <div>
                <label className="block text-[10px] md:text-xs font-black text-[#8c746d] uppercase tracking-wider mb-1">Target Role</label>
                <input type="text" value={newRole} onChange={(e) => setNewRole(e.target.value)} required placeholder="e.g. React Developer" className="w-full bg-white border border-[#dcd1c0] rounded-xl px-3 py-2.5 text-[#2c1f1d] text-sm focus:outline-none focus:border-[#b43b2d]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] md:text-xs font-black text-[#8c746d] uppercase tracking-wider mb-1">Time</label>
                  <input type="time" value={newTime} onChange={(e) => setNewTime(e.target.value)} required className="w-full bg-white border border-[#dcd1c0] rounded-xl px-3 py-2.5 text-[#2c1f1d] text-sm focus:outline-none focus:border-[#b43b2d]" />
                </div>
                <div>
                  <label className="block text-[10px] md:text-xs font-black text-[#8c746d] uppercase tracking-wider mb-1">Round Type</label>
                  <select value={newType} onChange={(e) => setNewType(e.target.value)} className="w-full bg-white border border-[#dcd1c0] rounded-xl px-3 py-2.5 text-[#2c1f1d] text-sm focus:outline-none focus:border-[#b43b2d]">
                    <option value="HR Screening">HR Screening</option>
                    <option value="Technical Round">Technical Round</option>
                    <option value="Culture Fit">Culture Fit</option>
                    <option value="Management">Management</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-5 border-t border-[#e8dfd3]">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="w-full sm:w-auto px-4 py-3 sm:py-2 bg-[#e8dfd3] hover:bg-[#dcd1c0] text-[#5c4a45] text-xs font-bold rounded-xl transition">
                  Cancel
                </button>
                <button type="submit" className="w-full sm:w-auto px-4 py-3 sm:py-2 bg-[#b43b2d] hover:bg-[#9e3124] text-white text-xs font-bold rounded-xl shadow-md transition">
                  Save Interview
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}