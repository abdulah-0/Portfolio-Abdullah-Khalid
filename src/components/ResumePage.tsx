import React, { useEffect, useState } from "react";
import {
  ResumeData,
  fetchResumeData,
  DEFAULT_RESUME,
} from "../lib/supabase";
import {
  MdArrowBack,
  MdDownload,
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdSchool,
  MdWork,
  MdCode,
  MdVerified,
  MdArrowOutward,
} from "react-icons/md";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import "./styles/ResumePage.css";

interface ResumePageProps {
  onClose: () => void;
}

const ResumePage: React.FC<ResumePageProps> = ({ onClose }) => {
  const [resume, setResume] = useState<ResumeData>(DEFAULT_RESUME);
  const [loading, setLoading] = useState<boolean>(true);
  const [downloading, setDownloading] = useState<boolean>(false);

  useEffect(() => {
    async function loadData() {
      const data = await fetchResumeData();
      setResume(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleDownload = async () => {
    if (resume.pdfUrl) {
      setDownloading(true);
      try {
        const response = await fetch(resume.pdfUrl);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = "Abdullah_Khalid_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      } catch (e) {
        console.warn("Direct blob download failed, falling back to download link", e);
        const link = document.createElement("a");
        link.href = resume.pdfUrl;
        link.download = "Abdullah_Khalid_Resume.pdf";
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } finally {
        setDownloading(false);
      }
    } else {
      window.print();
    }
  };

  if (loading) {
    return (
      <div className="resume-page-overlay" style={{ padding: 40, textAlign: "center" }}>
        <h2>Loading Resume...</h2>
      </div>
    );
  }

  return (
    <div className="resume-page-overlay">
      <div className="resume-header-bar">
        <div className="resume-header-title">
          <button className="resume-btn resume-btn-secondary" onClick={onClose}>
            <MdArrowBack /> Back to Portfolio
          </button>
        </div>
        <div className="resume-header-actions">
          <button
            className="resume-btn resume-btn-primary"
            onClick={handleDownload}
            disabled={downloading}
          >
            <MdDownload /> {downloading ? "Downloading..." : "Download Resume PDF"}
          </button>
        </div>
      </div>

      <div className="resume-container">
        {/* Hero Card */}
        <div className="resume-hero-card">
          <h1 className="resume-name">{resume.name}</h1>
          <div className="resume-subtitle">{resume.title}</div>

          <div className="resume-contact-grid">
            {resume.phone && (
              <div className="resume-contact-item">
                <MdPhone color="#e31b6d" />
                <a href={`tel:${resume.phone.replace(/\s+/g, "")}`}>{resume.phone}</a>
              </div>
            )}
            {resume.email && (
              <div className="resume-contact-item">
                <MdEmail color="#e31b6d" />
                <a href={`mailto:${resume.email}`}>{resume.email}</a>
              </div>
            )}
            {resume.location && (
              <div className="resume-contact-item">
                <MdLocationOn color="#e31b6d" />
                <span>{resume.location}</span>
              </div>
            )}
            {resume.linkedin && (
              <div className="resume-contact-item">
                <FaLinkedin color="#e31b6d" />
                <a href={resume.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn Profile
                </a>
              </div>
            )}
            {resume.github && (
              <div className="resume-contact-item">
                <FaGithub color="#e31b6d" />
                <a href={resume.github} target="_blank" rel="noreferrer">
                  GitHub Profile
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Summary Section */}
        {resume.summary && (
          <>
            <h2 className="resume-section-title">About Me</h2>
            <div className="resume-summary-card">
              <p>{resume.summary}</p>
            </div>
          </>
        )}

        {/* 2-Column Grid for Education & Skills */}
        <div className="resume-grid-2col" style={{ marginTop: 20 }}>
          {/* Education */}
          <div>
            <h2 className="resume-section-title">
              <MdSchool /> Education & Training
            </h2>
            {resume.education &&
              resume.education.map((edu, i) => (
                <div key={i} className="resume-card">
                  <div className="resume-card-title">{edu.credential}</div>
                  <div className="resume-card-company">{edu.institution}</div>
                  <div className="resume-card-period" style={{ marginTop: 6, display: "inline-block" }}>
                    {edu.result}
                  </div>
                </div>
              ))}
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="resume-section-title">
              <MdCode /> Skills & Technologies
            </h2>
            <div className="resume-card">
              {resume.skills?.languages && (
                <div className="resume-skills-group">
                  <div className="resume-skills-label">Languages</div>
                  <div className="resume-skills-tags">
                    {resume.skills.languages.split(",").map((s, idx) => (
                      <span key={idx} className="resume-skill-tag">
                        {s.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {resume.skills?.frontend && (
                <div className="resume-skills-group">
                  <div className="resume-skills-label">Frontend</div>
                  <div className="resume-skills-tags">
                    {resume.skills.frontend.split(",").map((s, idx) => (
                      <span key={idx} className="resume-skill-tag">
                        {s.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {resume.skills?.backend && (
                <div className="resume-skills-group">
                  <div className="resume-skills-label">Backend & Databases</div>
                  <div className="resume-skills-tags">
                    {`${resume.skills.backend}, ${resume.skills.databases}`
                      .split(",")
                      .map((s, idx) => (
                        <span key={idx} className="resume-skill-tag">
                          {s.trim()}
                        </span>
                      ))}
                  </div>
                </div>
              )}
              {resume.skills?.tools && (
                <div className="resume-skills-group">
                  <div className="resume-skills-label">Tools & Platforms</div>
                  <div className="resume-skills-tags">
                    {resume.skills.tools.split(",").map((s, idx) => (
                      <span key={idx} className="resume-skill-tag">
                        {s.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Experience & Featured Projects */}
        <h2 className="resume-section-title">
          <MdWork /> Work Experience & Featured Projects
        </h2>
        {resume.experience &&
          resume.experience.map((exp, i) => (
            <div key={i} className="resume-card">
              <div className="career-card-header">
                <div>
                  <div className="resume-card-title">{exp.title}</div>
                  <div className="resume-card-company">{exp.company}</div>
                </div>
                {exp.period && <span className="resume-card-period">{exp.period}</span>}
              </div>
              <p className="resume-card-desc">{exp.description}</p>
              {exp.tech && (
                <div className="resume-card-tech">
                  <strong>Tech Stack:</strong> {exp.tech}
                </div>
              )}
              {exp.link && (
                <div style={{ marginTop: 12 }}>
                  <a
                    href={exp.link}
                    target="_blank"
                    rel="noreferrer"
                    className="resume-btn resume-btn-secondary"
                    style={{ fontSize: 13, padding: "6px 14px" }}
                  >
                    View Code Repository <MdArrowOutward />
                  </a>
                </div>
              )}
            </div>
          ))}

        {/* Certifications */}
        {resume.certifications && resume.certifications.length > 0 && (
          <>
            <h2 className="resume-section-title">
              <MdVerified /> Certifications
            </h2>
            <div className="resume-card">
              {resume.certifications.map((cert, i) => (
                <p key={i} style={{ margin: "4px 0", color: "#d1cdd5" }}>
                  • {cert}
                </p>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ResumePage;
