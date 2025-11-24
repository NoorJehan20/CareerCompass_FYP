import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import interview from "../assets/interview1.png";
import templateModern from "../assets/modern.png";
import templateClassic from "../assets/minimalist.png";
import templateTech from "../assets/professional.png";
import {
  Info,
  Link,
  Target,
  CheckCircle,
  FileText,
  Users,
} from "lucide-react";
import "./home.css";

const CardIcon = ({ Icon, color }) => {
  const colors = {
    indigo: "#6366F1",
    cyan: "#06B6D4",
    amber: "#F59E0B",
  };

  return (
    <div
      className="icon-container"
      style={{ backgroundColor: colors[color] + "22" }}
    >
      <Icon style={{ color: colors[color], width: "1.5rem", height: "1.5rem" }} />
    </div>
  );
};

function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const navigate = useNavigate();

  // Quick prompt buttons
  const handleQuickPrompt = (prompt) => {
    setSearchInput(prompt);
  };

  // Ask CC button
  const handleAskCC = () => {
    const promptToUse = searchInput || "General Query";
    navigate("/chatbot", { state: { initialPrompt: promptToUse } });
  };

  // File upload preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      if (file.type === "application/pdf") {
        setPreviewURL(URL.createObjectURL(file));
      } else {
        setPreviewURL(null);
      }
    }
  };

  // Analyze resume
  const handleAnalyzeResume = () => {
    if (!selectedFile) return alert("Please upload a resume first.");

    const formData = new FormData();
    formData.append("resume", selectedFile);

    fetch("http://127.0.0.1:5000/upload-resume", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        navigate("/resume-analyzer", { state: { parsedData: data } });
      })
      .catch((err) => console.error(err));
  };

  const featureData = [
    {
      title: "AI Career Advisory",
      description:
        "Get instant, personalized advice and answers to your complex career questions using our AI model.",
      icon: Info,
      color: "indigo",
    },
    {
      title: "Roadmap & Skills",
      description:
        "Discover required skill sets, educational paths, and market trends for in-demand professions.",
      icon: Link,
      color: "cyan",
    },
    {
      title: "Goal Tracking",
      description:
        "Set measurable goals and track your progress through skills and milestones.",
      icon: Target,
      color: "amber",
    },
  ];

  return (
    <main className="home-container">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-inner">
          <h1>
            Career Compass: <span className="accent">Map Your Future</span>
          </h1>
          <p>
            Your AI-powered guide for career development, exploration, and goal
            setting.
          </p>
          <div className="search-box">
            <input
              type="text"
              placeholder="Ask CC: Where should I start my career change?"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAskCC();
                }
              }}
            />
            {/* Main button uses onClick now. */}
            <button onClick={handleAskCC}>
              Ask CC
            </button>
          </div>

          <div className="quick-prompts">
            {[
              "What is my ideal role?",
              "Skills for data science",
              "Interview tips",
              "Resume suggestions",
              "AI career paths",
              "Set career goals",
              "Explore tech jobs",
              "Improve my resume",
              "Prepare for interviews",
            ].map((p) => (
              <button key={p} type="button" onClick={() => handleQuickPrompt(p)}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Upload Resume Section */}
      <section className="resume-section">
        <div className="resume-content">
          <div className="resume-text">
            <h2>Upload Resume</h2>
            <p>
              Get instant feedback on your resume’s formatting, skills, and keywords to make it
              recruiter-ready. Our AI analyzes your resume and gives personalized improvement tips.
            </p>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
            <button type="button" onClick={handleAnalyzeResume}>
              Analyze Resume
            </button>
          </div>
          <div className="resume-preview">
            {previewURL ? (
              <iframe
                src={previewURL}
                title="Resume Preview"
                width="100%"
                height="200px"
              />
            ) : (
              <div className="placeholder">
                <FileText size={48} />
                <p>Upload your resume to preview insights</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section className="features">
        <div className="features-header">
          <h2>Our Core Pillars of Guidance</h2>
        </div>

        <div className="feature-grid">
          {featureData.map((f, i) => (
            <div key={i} className={`feature-card ${f.color}`}>
              <CardIcon Icon={f.icon} color={f.color} />
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RESUME BUILDER */}
      {/* <section className="resume-section">
        <div className="resume-content">
          <div className="resume-text">
            <h2>Resume Builder</h2>
            <p>
              Craft a polished, ATS-friendly resume in minutes. Use AI-driven
              content suggestions to land your next interview.
            </p>
            <ul>
              <li>
                <CheckCircle className="icon" /> ATS optimization built in.
              </li>
              <li>
                <CheckCircle className="icon" /> Dynamic, job-specific phrasing.
              </li>
              <li>
                <CheckCircle className="icon" /> Export to PDF & DOCX formats.
              </li>
            </ul>
            <button type="button" onClick={() => handleQuickPrompt("Redirect to Resume Builder")}>
              Start Building Your Resume
            </button>
          </div>
          <div className="resume-preview">
            <FileText className="preview-icon" />
            <p>*Preview of Professional Template*</p>
          </div>
        </div>
      </section> */}

      {/* RESUME BUILDER: FIX 1 - Implement Template Gallery */}
      <section className="resume-section">
        <div className="resume-content">
          <div className="resume-text">
            <h2>Resume Builder</h2>
            <p>
              Craft a polished, ATS-friendly resume in minutes. Use AI-driven
              content suggestions to land your next interview.
            </p>
            <ul>
              <li>
                <CheckCircle className="icon" /> ATS optimization built in.
              </li>
              <li>
                <CheckCircle className="icon" /> Dynamic, job-specific phrasing.
              </li>
              <li>
                <CheckCircle className="icon" /> Export to PDF & DOCX formats.
              </li>
            </ul>
            <button type="button" onClick={() => handleQuickPrompt("Redirect to Resume Builder")}>
              Start Building Your Resume
            </button>
          </div>

          {/* Template Gallery Implementation */}
          <div className="resume-preview-gallery">
            <div className="template-row">
              <img src={templateClassic} alt="Classic Template Preview" className="small-template-img" />
              <img src={templateTech} alt="Technical Template Preview" className="small-template-img" />
              <img src={templateModern} alt="Professional Template Preview" className="small-template-img" />
            </div>
            <p className="gallery-caption">Choose from multiple ATS-friendly designs.</p>
          </div>
        </div>
      </section>

      {/* INTERVIEW PREP */}
      {/* <section className="interview-section">
        <div className="interview-content">
          <div className="interview-preview">
            <img
              src={interview}
              alt="AI Interview Coaching Dashboard in action"
              className="preview-image-fit"
            />
          </div>
          <div className="../../assets/interview.png">
            <h2>Interview Prep Simulator</h2>
            <p>
              Practice real-world questions and receive instant AI-driven feedback
              to sharpen your confidence.
            </p>
            <ul>
              <li>
                <CheckCircle className="icon" /> Real-time feedback on tone and
                clarity.
              </li>
              <li>
                <CheckCircle className="icon" /> Industry-specific question bank.
              </li>
              <li>
                <CheckCircle className="icon" /> Improve your STAR method answers.
              </li>
            </ul>
            <button type="button" onClick={() => handleQuickPrompt("Redirect to Interview Prep")}>
              Practice Interviews Now
            </button>
          </div>
        </div>
      </section> */}

      {/* INTERVIEW PREP: FIX 2 - Corrected structure (removed extra div) */}
      <section className="interview-section">
        <div className="interview-content">
          <div className="interview-preview">
            <img
              src={interview}
              alt="AI Interview Coaching Dashboard in action"
              className="preview-image-fit"
            />
          </div>
          <div className="interview-text">
            <h2>Interview Prep Simulator</h2>
            <p>
              Practice real-world questions and receive instant AI-driven feedback
              to sharpen your confidence.
            </p>
            <ul>
              <li>
                <CheckCircle className="icon" /> Real-time feedback on tone and
                clarity.
              </li>
              <li>
                <CheckCircle className="icon" /> Industry-specific question bank.
              </li>
              <li>
                <CheckCircle className="icon" /> Improve your STAR method answers.
              </li>
            </ul>
            <button type="button" onClick={() => handleQuickPrompt("Redirect to Interview Prep")}>
              Practice Interviews Now
            </button>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta">
        <h2>Ready to Navigate Your Career?</h2>
        <p>
          Career Compass is your one-stop tool to transform uncertainty into a
          clear plan for success.
        </p>
        <button type="button" onClick={() => handleQuickPrompt("Join the Compass Community!")}>
          Join the Compass Community
        </button>
      </section>
    </main >
  );
}

export default Home;