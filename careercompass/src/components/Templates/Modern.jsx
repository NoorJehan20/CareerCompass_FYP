// components/ResumeBuilder/Templates/TemplateModernCreative.jsx
import React from "react";

// --- Mock Data ---
const mockData = {
  header: {
    firstName: "ALEX",
    lastName: "REED",
    title: "UX/UI Designer & Web Developer",
    email: "alex.reed@creative.com",
    phone: "(987) 654-3210",
    summary:
      "Creative and highly motivated designer with 5+ years of experience blending development skills with modern design principles. Passionate about creating intuitive, accessible, and visually stunning digital experiences.",
  },
  experience: [
    {
      id: 1,
      role: "Lead UX Designer",
      company: "Digital Flow Agency",
      duration: "2021 – Present",
      location: "San Francisco, CA",
      description: [
        "Led end-to-end design for major client product redesigns, resulting in a 30% increase in user engagement.",
        "Created and maintained the company's design system using Figma, improving development handover efficiency by 40%.",
        "Conducted usability testing and iteration based on quantitative data metrics.",
      ],
    },
    {
      id: 2,
      role: "Front-End Developer",
      company: "Startup Labs",
      duration: "2018 – 2021",
      location: "Austin, TX",
      description: [
        "Developed responsive user interfaces using React and modern CSS-in-JS solutions.",
        "Collaborated with backend team to implement scalable API integrations.",
      ],
    },
  ],
  education: [
    {
      id: 1,
      school: "California College of the Arts",
      degree: "BFA, Graphic Design & Digital Media",
      duration: "2014 – 2018",
    },
  ],
  skills: [
    "Figma", "Sketch", "Prototyping", "User Research", "React.js", "Tailwind CSS", "A/B Testing"
  ],
};

// --- Reusable Section Components ---

const ACCENT_COLOR = "#00A388"; 
const PRIMARY_TEXT_COLOR = "#2C3E50"; 

// Section wrapper with bold, clear title
const Section = ({ title, children }) => (
  <div style={{ marginBottom: "35px" }}>
    <h2
      style={{
        textTransform: "uppercase",
        letterSpacing: "3px",
        fontSize: "1.5rem",
        fontWeight: "700",
        color: PRIMARY_TEXT_COLOR,
        borderBottom: `2px solid ${ACCENT_COLOR}`,
        paddingBottom: "8px",
        marginBottom: "20px",
      }}
    >
      {title}
    </h2>
    {children}
  </div>
);

// --- Main Component ---

export default function TemplateModernCreative({ data }) {
  // Simple data mapping logic (using mock data for structure)
  const displayData = {
    header: {
      firstName: data.firstName || mockData.header.firstName,
      lastName: data.lastName || mockData.header.lastName,
      title: data.title || mockData.header.title,
      email: data.email || mockData.header.email,
      phone: data.phone || mockData.header.phone,
      summary: data.summary || mockData.header.summary,
    },
    experience: data.experiences && data.experiences.length > 0 ? data.experiences : mockData.experience,
    education: data.education && data.education.length > 0 ? data.education : mockData.education,
    skills: data.skills && data.skills.length > 0 ? data.skills.split(",").map(s => s.trim()) : mockData.skills,
  };

  return (
    <div
      style={{
        fontFamily: "'Roboto', sans-serif", // Clean, modern font
        fontSize: "14px",
        lineHeight: "1.5",
        color: PRIMARY_TEXT_COLOR,
        background: "#F9F9F9",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          background: "white",
          margin: "30px auto",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          overflow: "hidden", // Contains header color
        }}
      >
        
        {/* INVERTED HEADER BLOCK */}
        <div
          style={{
            background: PRIMARY_TEXT_COLOR, // Dark Background
            color: "white",
            padding: "40px 50px 30px 50px",
            marginBottom: "30px",
          }}
        >
          <h1
            style={{
              fontSize: "3.5rem",
              textTransform: "uppercase",
              fontWeight: "900",
              lineHeight: "1em",
              marginBottom: "5px",
            }}
          >
            {displayData.header.firstName}{" "}
            <span style={{ fontWeight: "300", color: ACCENT_COLOR }}>
              {displayData.header.lastName}
            </span>
          </h1>
          <p
            style={{
              fontSize: "1.3rem",
              fontWeight: "500",
              color: ACCENT_COLOR,
              marginBottom: "15px",
            }}
          >
            {displayData.header.title}
          </p>
          <div style={{ display: "flex", gap: "25px", fontSize: "0.9rem", color: "#DDD" }}>
            <span>{displayData.header.email}</span>
            <span>|</span>
            <span>{displayData.header.phone}</span>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div style={{ padding: "0 50px 40px 50px" }}>
          
          {/* Summary */}
          <Section title="Profile Summary">
            <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.6" }}>
              {displayData.header.summary}
            </p>
          </Section>

          {/* Experience (Uses a subtle timeline effect) */}
          <Section title="Professional Experience">
            {displayData.experience.map((exp, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  marginBottom: "30px",
                  borderLeft: `3px solid ${ACCENT_COLOR}`,
                  paddingLeft: "20px",
                  position: "relative",
                }}
              >
                {/* Timeline Dot */}
                <span
                  style={{
                    position: "absolute",
                    left: "-8px",
                    top: "5px",
                    height: "12px",
                    width: "12px",
                    background: ACCENT_COLOR,
                    borderRadius: "50%",
                  }}
                />
                
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                    <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "700", color: PRIMARY_TEXT_COLOR }}>
                      {exp.role}
                    </h3>
                    <span style={{ color: ACCENT_COLOR, fontWeight: "600", fontSize: "0.95rem" }}>
                      {exp.duration}
                    </span>
                  </div>
                  <div style={{ fontStyle: "italic", marginBottom: "8px", color: "#666" }}>
                    {exp.company} - {exp.location}
                  </div>
                  <ul style={{ paddingLeft: "20px", margin: 0 }}>
                    {Array.isArray(exp.description) ? (
                      exp.description.map((line, i) => <li key={i}>{line}</li>)
                    ) : (
                      <li>{exp.description}</li>
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </Section>

          {/* Education */}
          <Section title="Education">
            {displayData.education.map((edu, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  marginBottom: "20px",
                  borderLeft: `3px solid ${ACCENT_COLOR}`,
                  paddingLeft: "20px",
                  position: "relative",
                }}
              >
                {/* Timeline Dot */}
                <span
                  style={{
                    position: "absolute",
                    left: "-8px",
                    top: "5px",
                    height: "12px",
                    width: "12px",
                    background: ACCENT_COLOR,
                    borderRadius: "50%",
                  }}
                />
                
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                    <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "700", color: PRIMARY_TEXT_COLOR }}>
                      {edu.degree}
                    </h3>
                    <span style={{ color: ACCENT_COLOR, fontWeight: "600", fontSize: "0.95rem" }}>
                      {edu.duration}
                    </span>
                  </div>
                  <div style={{ color: "#666" }}>{edu.school}</div>
                </div>
              </div>
            ))}
          </Section>
          
          {/* Skills */}
          <Section title="Skills & Competencies">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              {displayData.skills.map((skill, idx) => (
                <span
                  key={idx}
                  style={{
                    padding: "6px 15px",
                    background: "#E8F5E9", // Very light green/gray background
                    color: PRIMARY_TEXT_COLOR,
                    borderRadius: "4px",
                    fontSize: "13px",
                    fontWeight: "500",
                    border: `1px solid ${ACCENT_COLOR}`,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}