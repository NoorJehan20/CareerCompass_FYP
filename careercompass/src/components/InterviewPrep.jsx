import React, { useState } from 'react';
import { Zap, RefreshCw, Mic, MessageSquare, Loader2 } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import './InterviewPrep.css';

const InterviewPrep = ({ isAuthReady, userId }) => {
  const navigate = useNavigate();

  const [history, setHistory] = useState([
    { id: 1, topic: 'Front-End React Developer', date: 'Oct 25, 2025', score: '88%', status: 'Completed' },
    { id: 2, topic: 'Computer Networking', date: 'Nov 1, 2025', score: '72%', status: 'Completed' },
  ]);

  const [selectedTopic, setSelectedTopic] = useState("");

  const handleStart = () => {
    if (!selectedTopic) return alert("Please select a topic first!");

    navigate(`/mcqs?topic=${encodeURIComponent(selectedTopic)}`);
  };

  return (
    <div className="interview-container">
      <div className='interview-header'>
        <div className='head-text'><h1>Interview Prep Simulator</h1>
          <p>Practice real-world questions and receive instant AI-feedback to sharpen your confidence.</p>
        </div>
      </div>

      <div className="interview-grid">

        <div className="interview-left">
          <div className="card accent-border">
            <h2 className="card-title">
              <Zap className="icon accent" /> Start New Mock Interview
            </h2>

            <select
              className="select-topic"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
            >
              <option value="">Select Interview Topic...</option>
              <option>Front-End Development (JS + React)</option>
              <option>Data Science Fundamentals</option>
              <option>Machine Learning</option>
              <option>UI/UX Design</option>
              <option>Computer Networking</option>
            </select>

            <div className="info-item">
              <Mic className="icon mic" />
              <p>Real-time speech analysis for tone and clarity.</p>
            </div>
            <div className="info-item">
              <MessageSquare className="icon msg" />
              <p>Feedback on content, structure, and STAR method usage.</p>
            </div>

            <button className="btn-primary" onClick={handleStart}>
              Practice Interviews Now
            </button>
          </div>
        </div>

        <div className="interview-right">
          <div className="card history-card">
            <h2 className="card-title">
              <RefreshCw className="icon primary" /> Session History
              {isAuthReady ? (
                <span className="status-connected">(Connected to Firestore)</span>
              ) : (
                <span className="status-connecting">
                  <Loader2 className="loader" /> Connecting...
                </span>
              )}
            </h2>

            <div className="table-wrapper">
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Topic</th>
                    <th>Date</th>
                    <th>AI Score</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map(session => (
                    <tr key={session.id}>
                      <td>{session.topic}</td>
                      <td>{session.date}</td>
                      <td className="score">{session.score}</td>
                      <td>
                        <button className="view-report">View Report</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="user-id">Your User ID: {userId || 'Authenticating...'}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InterviewPrep;
