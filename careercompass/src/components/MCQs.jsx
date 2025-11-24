import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from '../firebaseConfig';
import { useLocation } from "react-router-dom";
import { Trophy, RotateCcw, Home, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from "recharts";
import './MCQs.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const collectionMap = {
  "Front-End Development (JS + React)": "mcqs",
  "Machine Learning": "ml_mcqs",
  "Data Science Fundamentals": "ds_mcqs",
  "UI/UX Design": "ui_mcqs",
  "Computer Networking": "cn_mcqs"
};

const MCQsPage = ({ userId }) => {
  const query = useQuery();
  const topic = query.get("topic");

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [finished, setFinished] = useState(false);
  const [scoreData, setScoreData] = useState(null);
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    const fetchMCQs = async () => {
      if (!topic) return;

      const colName = collectionMap[topic];
      if (!colName) return;

      try {
        const colRef = collection(db, colName);
        const snapshot = await getDocs(colRef);
        const fetched = snapshot.docs.map(doc => doc.data());

        setQuestions(fetched);
      } catch (error) {
        console.error("Error fetching MCQs:", error);
      }
    };

    fetchMCQs();
  }, [topic]);

  const handleOptionSelect = (qid, option) => {
    setSelectedOptions(prev => ({ ...prev, [qid]: option }));
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    const total = questions.length;
    let correct = 0;

    // 1. Calculate Score & Prepare Review Data
    const detailedResults = questions.map(q => {
      const isCorrect = selectedOptions[q.id] === q.correct;
      if (isCorrect) correct++;
      return { ...q, userAnswer: selectedOptions[q.id], isCorrect };
    });

    const percentage = Math.round((correct / total) * 100);

    const dataForChart = [
      { name: "Correct", value: correct },
      { name: "Incorrect", value: total - correct }
    ];

    setScoreData({
      correct,
      total,
      percentage,
      dataForChart,
      detailedResults // <--- This is new, needed for the Review section
    });

    setFinished(true);

    // 2. Trigger Confetti if score is good (> 60%)
    if (percentage >= 60) {
      triggerConfetti();
    }

    // 3. Save to Firestore (Your existing logic)
    if (userId) {
      try {
        await addDoc(collection(db, "mcq_history"), {
          topic,
          date: new Date().toLocaleDateString(),
          score: `${percentage}%`,
          correct,
          total,
          userId,
          timestamp: new Date()
        });
      } catch (err) {
        console.error("Failed to save history:", err);
      }
    }
  };

  // Helper function for confetti
  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const random = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };
  if (!questions.length) return <p>Loading MCQs...</p>;

  // ---------------- RESULT PAGE ----------------
  if (finished && scoreData) {
    return (
      <div className="result-wrapper">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="result-card"
        >
          {/* Header */}
          <div className="result-header">
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
              className="trophy-container"
            >
              <Trophy size={50} className="trophy-icon" />
            </motion.div>
            <h2 className="result-title">
              {scoreData.percentage >= 80 ? "Outstanding!" : scoreData.percentage >= 60 ? "Good Job!" : "Keep Practicing!"}
            </h2>
            <p className="result-topic">{topic}</p>
          </div>

          {/* Chart Section */}
          <div className="chart-section">
            <div className="chart-container-custom">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={scoreData.dataForChart}
                    dataKey="value"
                    outerRadius={85}
                    innerRadius={60}
                    paddingAngle={5}
                    stroke="none"
                  >
                    <Cell fill="#10b981" /> {/* Green */}
                    <Cell fill="#ef4444" /> {/* Red */}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="chart-inner-text">
                <span className="score-big">{scoreData.percentage}%</span>
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-item correct">
                <CheckCircle size={18} />
                <span>{scoreData.correct} Correct</span>
              </div>
              <div className="stat-item incorrect">
                <XCircle size={18} />
                <span>{scoreData.total - scoreData.correct} Incorrect</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="result-actions">
            <button className="btn-action primary" onClick={() => setShowReview(!showReview)}>
              {showReview ? "Hide Review" : "Review Answers"}
            </button>
            <div className="btn-group">
              <button className="btn-action secondary" onClick={() => window.location.reload()}>
                <RotateCcw size={18} /> Retry
              </button>
              <button className="btn-action secondary" onClick={() => navigate("/interview-prep")}>
                <Home size={18} /> Home
              </button>
            </div>
          </div>

          {/* Review Section (Collapsible) */}
          <AnimatePresence>
            {showReview && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="review-section"
              >
                <h3>Answer Review</h3>
                <div className="review-list">
                  {scoreData.detailedResults.map((res, idx) => (
                    <div key={idx} className={`review-item ${res.isCorrect ? 'correct' : 'wrong'}`}>
                      <div className="review-q-header">
                        <span className="q-num">Q{idx + 1}</span>
                        <span className="q-text">{res.q}</span>
                        {res.isCorrect ? <CheckCircle className="icon-c" size={16} /> : <XCircle className="icon-w" size={16} />}
                      </div>
                      {!res.isCorrect && (
                        <div className="review-details">
                          <p className="user-ans">Your Answer: <span>{res.userAnswer || "Skipped"}</span></p>
                          <p className="correct-ans">Correct Answer: <span>{res.correct}</span></p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    );
  }
  const q = questions[currentIndex];

  return (
    <div className="mcqs-container">
      <h2>{topic} MCQs</h2>

      <div className="question-card">
        <p className="question">{q.q}</p>

        <div className="options">
          {Object.entries(q.options).map(([key, val]) => (
            <button
              key={key}
              className={selectedOptions[q.id] === key ? "selected" : ""}
              onClick={() => handleOptionSelect(q.id, key)}
            >
              {key}: {val}
            </button>
          ))}
        </div>

        <button className="btn-next" onClick={handleNext}>
          {currentIndex + 1 === questions.length ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default MCQsPage;
