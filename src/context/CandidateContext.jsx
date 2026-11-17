import React, { createContext, useState } from 'react';

export const CandidateContext = createContext();

export const CandidateProvider = ({ children }) => {
  const [candidates, setCandidates] = useState([
    { id: 101, name: "Priya Sharma", role: "Senior Full Stack Engineer", stage: 3, outcome: "Feedback Pending", match: "94%", history: [] },
    { id: 102, name: "Rahul Deshmukh", role: "UI/UX Product Designer", stage: 4, outcome: "Offer Sent", match: "89%", history: [] },
    { id: 103, name: "Ananya Kulkarni", role: "Spring Boot Backend Lead", stage: 2, outcome: "Shortlisted", match: "91%", history: [] },
    { id: 104, name: "Vikram Malhotra", role: "AI/ML Research Scientist", stage: 1, outcome: "New Application", match: "85%", history: [] },
    { id: 105, name: "Sneha Patil", role: "Senior Full Stack Engineer", stage: 5, outcome: "Hired & Active", match: "96%", history: [] },
  ]);

  const addCandidate = (newCandidate) => {
    setCandidates([newCandidate, ...candidates]);
  };

  return (
    <CandidateContext.Provider value={{ candidates, setCandidates, addCandidate }}>
      {children}
    </CandidateContext.Provider>
  );
};