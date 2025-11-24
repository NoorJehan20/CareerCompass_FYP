// components/ResumeBuilder/Templates/Minimalist_Temp.jsx
import React from "react";

const mockData = {
  header: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@gmail.com",
    phone: "111-222-3333",
    position: "Front-End Developer",
    about:
      "I am a front-end developer with more than 3 years of experience writing HTML, CSS, and JS. I'm motivated, result-focused, and seeking a successful team-oriented company with opportunity to grow.",
  },
  experience: [
    {
      company: "KlowdBox",
      location: "San Fr, CA",
      duration: "Jan 2011 - Feb 2015",
      role: "Fr developer",
      description: "Did this and that",
    },
  ],
  education: [
    {
      school: "Sample Institute of Technology",
      location: "San Fr, CA",
      duration: "Jan 2011 - Feb 2015",
      degree: "Fr developer",
      description: "Did this and that",
    },
  ],
  projects: [],
  skills: [
    { name: "Javascript", level: 2 },
    { name: "CSS", level: 2 },
  ],
  interests: ["Programming", "Football"],
};

// Reusable Section wrapper
const Section = ({ title, children }) => (
  <div style={{ marginBottom: "40px" }}>
    <div
      style={{
        letterSpacing: "2px",
        color: "#54AFE4",
        fontWeight: "bold",
        marginBottom: "10px",
        textTransform: "uppercase",
      }}
    >
      {title}
    </div>
    {children}
  </div>
);

export default function Minimalist_Temp({ data }) {
  // Merge form data with mock data
  const displayData = {
    header: {
      firstName: data.name || mockData.header.firstName,
      lastName: "",
      email: data.email || mockData.header.email,
      phone: data.phone || mockData.header.phone,
      position: data.title || mockData.header.position,
      about: data.summary || mockData.header.about,
    },
    experience:
      data.experiences.length > 0
        ? data.experiences.map((exp) => ({
            company: exp.company || "Company",
            location: data.location || "Location",
            duration: exp.period || "Period",
            role: exp.role || "Role",
            description: exp.description || "Description",
          }))
        : mockData.experience,
    education:
      data.education !== ""
        ? [
            {
              school: data.education,
              location: "Institute Location",
              duration: "Year",
              degree: "Degree",
              description: "",
            },
          ]
        : mockData.education,
    projects: [],
    skills:
      data.skills !== ""
        ? data.skills.split(",").map((s) => ({ name: s.trim(), level: 2 }))
        : mockData.skills,
    interests: [],
  };

  return (
    <div
      style={{
        fontFamily: "'Lato', sans-serif",
        fontSize: "14px",
        lineHeight: "26px",
        color: "#222",
        background: "#eee",
        paddingBottom: "50px",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          background: "#fff",
          margin: "50px auto",
          boxShadow: "1px 1px 2px #DAD7D7",
          borderRadius: "3px",
          padding: "40px",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "30px" }}>
          <div
            style={{
              fontSize: "40px",
              textTransform: "uppercase",
              marginBottom: "5px",
              fontWeight: 700,
            }}
          >
            {displayData.header.firstName}{" "}
            <span style={{ fontWeight: 300 }}>{displayData.header.lastName}</span>
          </div>
          <div style={{ marginBottom: "20px", color: "#999", fontWeight: 300 }}>
            Email: {displayData.header.email} <span style={{ margin: "0 10px" }}>|</span>
            Phone: {displayData.header.phone}
          </div>
          <div>
            <span
              style={{
                fontWeight: "bold",
                textDecoration: "underline",
                marginRight: "10px",
              }}
            >
              {displayData.header.position}
            </span>
            <span>{displayData.header.about}</span>
          </div>
        </div>

        {/* Experience */}
        <Section title="Experience">
          {displayData.experience.map((exp, idx) => (
            <div
              key={idx}
              style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}
            >
              <div style={{ width: "60%" }}>
                <div style={{ fontWeight: "bold" }}>{exp.company}</div>
                <div>{exp.location}</div>
                <div>{exp.duration}</div>
              </div>
              <div style={{ width: "39%", textAlign: "right" }}>
                <div style={{ fontWeight: "bold" }}>{exp.role}</div>
                <div>{exp.description}</div>
              </div>
            </div>
          ))}
        </Section>

        {/* Education */}
        <Section title="Education">
          {displayData.education.map((edu, idx) => (
            <div
              key={idx}
              style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}
            >
              <div style={{ width: "60%" }}>
                <div style={{ fontWeight: "bold" }}>{edu.school}</div>
                <div>{edu.location}</div>
                <div>{edu.duration}</div>
              </div>
              <div style={{ width: "39%", textAlign: "right" }}>
                <div style={{ fontWeight: "bold" }}>{edu.degree}</div>
                <div>{edu.description}</div>
              </div>
            </div>
          ))}
        </Section>

        {/* Skills */}
        <Section title="Skills">
          {displayData.skills.map((skill, idx) => (
            <div key={idx} style={{ display: "flex", marginBottom: "10px" }}>
              <div style={{ width: "60%", fontWeight: "bold" }}>{skill.name}</div>
              <div style={{ width: "39%", display: "flex", gap: "3px" }}>
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      background: i < skill.level ? "#79A9CE" : "#C3DEF3",
                      display: "inline-block",
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </Section>
      </div>
    </div>
  );
}