import React from "react";

const mockData = {
  header: {
    firstName: "JANE",
    lastName: "DOE",
    title: "Project Management Professional (PMP)",
    email: "jane.doe@email.com",
    phone: "(555) 123-4567",
    address: "123 Professional Dr, New York, NY",
    summary:
      "A highly organized and results-driven Project Manager with 8+ years of experience leading cross-functional teams to successfully deliver large-scale software solutions on time and under budget. Expertise in Agile methodologies, risk management, and stakeholder communication.",
  },
  experience: [
    {
      id: 1,
      role: "Senior Project Manager",
      company: "Innovatech Solutions",
      duration: "Jan 2020 – Present",
      location: "New York, NY",
      description: [
        "Directed a portfolio of 15+ projects totaling $10M, consistently achieving a 98% on-time delivery rate.",
        "Implemented a new risk mitigation strategy that reduced project delays by 25% across the organization.",
        "Mentored a team of 5 junior project managers, improving overall team efficiency and skill adoption.",
      ],
    },
    {
      id: 2,
      role: "Project Coordinator",
      company: "TechBridge Consulting",
      duration: "Aug 2016 – Dec 2019",
      location: "Boston, MA",
      description: [
        "Managed project timelines, budgets, and scope for key client initiatives.",
        "Facilitated daily stand-ups, sprint planning, and retrospective meetings.",
      ],
    },
  ],
  education: [
    {
      id: 1,
      school: "New York University (NYU)",
      degree: "M.S. Project Management",
      duration: "2015",
    },
    {
      id: 2,
      school: "State University of New York (SUNY)",
      degree: "B.A. Business Administration",
      duration: "2011",
    },
  ],
  skills: [
    "Agile/Scrum", "PMP Certified", "JIRA", "Risk Management", "Budgeting", "Stakeholder Communication"
  ],
};

const DarkSectionTitle = ({ children }) => (
  <h2
    style={{
      textTransform: "uppercase",
      letterSpacing: "2px",
      fontSize: "1rem",
      color: "white",
      borderBottom: "2px solid rgba(255, 255, 255, 0.5)",
      paddingBottom: "5px",
      marginBottom: "15px",
    }}
  >
    {children}
  </h2>
);

const LightSectionTitle = ({ children }) => (
  <h2
    style={{
      textTransform: "uppercase",
      letterSpacing: "2px",
      fontSize: "1.75rem",
      fontWeight: "700",
      color: "#333",
      borderBottom: "4px solid #0056B3", 
      paddingBottom: "10px",
      marginBottom: "25px",
    }}
  >
    {children}
  </h2>
);

export default function TemplateProfessional({ data }) {
  const displayData = {
    header: {
      firstName: data.name || mockData.header.firstName,
      lastName: data.lastName || mockData.header.lastName,
      title: data.title || mockData.header.title,
      email: data.email || mockData.header.email,
      phone: data.phone || mockData.header.phone,
      address: data.location || mockData.header.address,
      summary: data.summary || mockData.header.summary,
    },
    experience: data.experiences && data.experiences.length > 0 ? data.experiences : mockData.experience,
    education: data.education && data.education.length > 0 ? data.education : mockData.education,
    skills: data.skills && data.skills.length > 0 ? data.skills.split(",").map(s => s.trim()) : mockData.skills,
  };

  return (
    <div
      style={{
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        fontSize: "14px",
        lineHeight: "1.6",
        color: "#444",
        background: "#F0F0F0", 
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          width: "100%",
          display: "flex",
          background: "white",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        
        {/* LEFT SIDEBAR (Dark Color Segment) */}
        <div
          style={{
            width: "35%",
            padding: "40px 25px",
            background: "#0056B3", 
            color: "white",
            minHeight: "inherit",
          }}
        >
          {/* Contact Info */}
          <div style={{ marginBottom: "30px" }}>
            <DarkSectionTitle>Contact</DarkSectionTitle>
            <p style={{ margin: "0 0 5px 0" }}>{displayData.header.phone}</p>
            <p style={{ margin: "0 0 5px 0" }}>{displayData.header.email}</p>
            <p style={{ margin: "0" }}>{displayData.header.address}</p>
            {/* Optional LinkedIn, GitHub, etc. here */}
          </div>

          {/* Skills */}
          <div style={{ marginBottom: "30px" }}>
            <DarkSectionTitle>Skills & Tools</DarkSectionTitle>
            <ul style={{ listStyleType: "none", paddingLeft: "0", margin: "0" }}>
              {displayData.skills.map((skill, idx) => (
                <li key={idx} style={{ marginBottom: "5px" }}>
                  <span style={{ marginRight: "8px", color: "#FFC107" }}>•</span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT MAIN CONTENT (Light Color Segment) */}
        <div style={{ width: "65%", padding: "40px 40px" }}>
          
          {/* Header */}
          <div style={{ marginBottom: "30px", borderBottom: "2px solid #E0E0E0", paddingBottom: "20px" }}>
            <h1
              style={{
                fontSize: "2.8rem",
                textTransform: "uppercase",
                marginBottom: "0",
                fontWeight: "700",
                color: "#333",
              }}
            >
              {displayData.header.firstName}{" "}
              <span style={{ fontWeight: "300", color: "#0056B3" }}>
                {displayData.header.lastName}
              </span>
            </h1>
            <p
              style={{
                fontSize: "1.2rem",
                fontWeight: "600",
                color: "#555",
                marginTop: "5px",
                marginBottom: "15px",
              }}
            >
              {displayData.header.title}
            </p>
            <p style={{ margin: 0, fontSize: "14px" }}>
              {displayData.header.summary}
            </p>
          </div>

          {/* Experience */}
          <section style={{ marginBottom: "40px" }}>
            <LightSectionTitle>Experience</LightSectionTitle>
            {displayData.experience.map((exp, idx) => (
              <div key={idx} style={{ marginBottom: "25px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: "5px",
                  }}
                >
                  <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "700", color: "#333" }}>
                    {exp.role}
                  </h3>
                  <span style={{ color: "#0056B3", fontWeight: "600", fontSize: "0.95rem" }}>
                    {exp.duration}
                  </span>
                </div>
                <div
                  style={{
                    fontStyle: "italic",
                    marginBottom: "10px",
                    color: "#666",
                  }}
                >
                  {exp.company} | {exp.location}
                </div>
                <ul style={{ paddingLeft: "20px", margin: 0 }}>
                  {Array.isArray(exp.description) ? (
                    exp.description.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))
                  ) : (
                    <li>{exp.description}</li>
                  )}
                </ul>
              </div>
            ))}
          </section>

          {/* Education */}
          <section>
            <LightSectionTitle>Education</LightSectionTitle>
            {displayData.education.map((edu, idx) => (
              <div key={idx} style={{ marginBottom: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: "5px",
                  }}
                >
                  <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "700", color: "#333" }}>
                    {edu.degree}
                  </h3>
                  <span style={{ color: "#0056B3", fontWeight: "600", fontSize: "0.95rem" }}>
                    {edu.duration}
                  </span>
                </div>
                <div style={{ color: "#666" }}>
                  {edu.school}
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}