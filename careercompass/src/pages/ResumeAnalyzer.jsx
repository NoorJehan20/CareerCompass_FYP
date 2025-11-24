import React, { useState, useEffect } from "react";
import "./ResumeAnalyzer.css";
import { User, Briefcase, BookOpen, Award, CheckCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import { TrendingUp } from 'lucide-react';

// Dummy Data
const dummyData = {
  personalInfo: {
    name: "Jane Doe",
    currentRole: "Junior Web Developer",
    experience: "3 years",
    education: "B.Tech Computer Science (2022)",
    email: "jane.doe@example.com",
    phone: "+123456789",
    address: "123 Main St, City",
  },
  skills: [
    { name: "HTML/CSS", level: "Intermediate", progress: 80 },
    { name: "JavaScript", level: "Intermediate", progress: 70 },
    { name: "React Basic", level: "Intermediate", progress: 60 },
    { name: "SQL Basic", level: "Basic", progress: 50 },
    { name: "UI/UX", level: "Basic", progress: 40 },
  ],
  experience: [
    {
      title: "Junior Web Developer",
      company: "Tech Solutions Ltd.",
      duration: "2021 - Present",
      description: "Worked on frontend development with React and CSS",
    },
  ],
  certifications: [
    { name: "AWS Certified Developer", year: "2023" },
    { name: "React Professional Course", year: "2022" },
  ],
};

const SkillCard = ({ skill }) => {
  return (
    <div className="skill-card">
      <div className="skill-header">
        <span className="skill-name">{skill.name}</span>
        <span className="skill-progress-text">{skill.progress}%</span>
      </div>
      <div className="skill-bar">
        <div
          className="skill-fill"
          style={{ width: `${Math.min(skill.progress, 100)}%` }}
        ></div>
      </div>
      <p className="skill-level">Level: {skill.level}</p>
    </div>
  );
};

function ResumeAnalyzer() {
  const location = useLocation();
  const [data, setData] = useState(dummyData);

  useEffect(() => {
    if (location.state?.parsedData) {
      setData(location.state.parsedData);
    }
  }, [location.state]);

  return (
    <div className="resume-analyzer">
      {/* Header */}
      <div className="header-section">
        <TrendingUp className="icon-large" />
        <div className="header-text">
          <h1>Career Insights</h1>
          <p>Detailed insights based on your uploaded resume</p>
        </div>
      </div>

      <div className="main-grid">
        {/* Column 1: Personal Info */}
        <div className="personal-info">
          <div className="info-card">
            <div className="info-header">
              <User className="icon" />
              <h2>Profile Snapshot</h2>
            </div>
            <div className="info-details">
              <p><span className="label">Name:</span> {data.personalInfo.name}</p>
              <p><span className="label">Current Role:</span> {data.personalInfo.currentRole}</p>
              <p><span className="label">Experience:</span> {data.personalInfo.experience}</p>
              <p><span className="label">Education:</span> {data.personalInfo.education}</p>
              <p><span className="label">Email:</span> {data.personalInfo.email}</p>
              <p><span className="label">Phone:</span> {data.personalInfo.phone}</p>
              <p><span className="label">Address:</span> {data.personalInfo.address}</p>
            </div>
          </div>
        </div>

        {/* Column 2 & 3: Skills & Experience */}
        <div className="right-section">
          {/* Skills */}
          <div className="info-card">
            <div className="info-header">
              <BookOpen className="icon" />
              <h2>Skills Analysis</h2>
            </div>
            <div className="skills-grid">
              {data.skills.map((skill, i) => (
                <SkillCard key={i} skill={skill} />
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="info-card">
            <div className="info-header">
              <Briefcase className="icon" />
              <h2>Work Experience</h2>
            </div>
            <div className="experience-list">
              {data.experience.map((exp, i) => (
                <div key={i} className="experience-card">
                  <h3>{exp.title} @ {exp.company}</h3>
                  <p className="duration">{exp.duration}</p>
                  <p>{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="info-card">
            <div className="info-header">
              <Award className="icon" />
              <h2>Certifications</h2>
            </div>
            <ul className="certifications-list">
              {data.certifications.map((cert, i) => (
                <li key={i}>
                  <CheckCircle className="icon-small" />
                  {cert.name} ({cert.year})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeAnalyzer;