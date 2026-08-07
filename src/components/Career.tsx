import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My journey <span>in</span>
          <br /> technology
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>01 — Computer Engineering</h4>
                <h5>COMSATS University Islamabad — Wah Campus</h5>
              </div>
              <h3>2023 — Present</h3>
            </div>
            <p>
              Pursuing Computer Engineering while developing a strong foundation in software development, programming, databases, digital systems, and computer engineering.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>02 — Full-Stack Development</h4>
                <h5>Personal & Freelance Projects</h5>
              </div>
              <h3>2024 — Present</h3>
            </div>
            <p>
              Building full-stack applications using React, Node.js, Express, PostgreSQL and Supabase, with experience developing dashboards, e-commerce platforms, management systems and custom business solutions.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>03 — AI & Intelligent Applications</h4>
                <h5>AI / Automation Projects</h5>
              </div>
              <h3>2025 — Present</h3>
            </div>
            <p>
              Exploring artificial intelligence and automation by integrating AI models and APIs into practical applications, with a focus on creating useful and intelligent software experiences.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>04 — Engineering & Software Projects</h4>
                <h5>Academic & Personal Projects</h5>
              </div>
              <h3>Projects</h3>
            </div>
            <p>
              Developed projects across software and computer engineering, including speaker recognition, database systems, Arduino-based systems, FPGA/Verilog projects and other practical applications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
