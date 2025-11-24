import React from "react";
import { Routes, Route } from "react-router-dom";
import { firebaseConfig } from "./firebaseConfig";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Chatbot from "./components/Chatbot.jsx";
import ResumeBuilder from "./components/ResumeBuilder.jsx";
import ResumeAnalyzer from "./pages/ResumeAnalyzer.jsx";
import InterviewPrep from "./components/InterviewPrep.jsx";
import MCQsPage from "./components/MCQs.jsx";
import Contact from "./pages/Contact.jsx";
import AuthPage from "./pages/Auth.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/auth" element={<AuthPage firebaseConfig={firebaseConfig} appId={firebaseConfig.appId} />} />
        <Route path="/" element={<Home />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />
        <Route path="/interview-prep" element={<InterviewPrep />} />
        <Route path="/mcqs" element={<MCQsPage />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;