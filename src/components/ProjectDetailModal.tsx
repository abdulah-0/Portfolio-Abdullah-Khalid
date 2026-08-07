import React from "react";
import { Project } from "../lib/supabase";
import { MdArrowOutward, MdClose } from "react-icons/md";
import { FaGithub } from "react-icons/fa6";
import "./styles/ProjectDetailModal.css";

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
}) => {
  if (!project) return null;

  const toolsList = project.tools
    ? project.tools.split(",").map((t) => t.trim())
    : [];

  return (
    <div className="project-modal-backdrop" onClick={onClose}>
      <div
        className="project-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="project-modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <MdClose />
        </button>

        {project.image && (
          <div className="project-modal-image-wrapper">
            <img src={project.image} alt={project.title} />
          </div>
        )}

        <div className="project-modal-content">
          <span className="project-modal-category">{project.category}</span>
          <h2 className="project-modal-title">{project.title}</h2>

          {toolsList.length > 0 && (
            <div className="project-modal-tools">
              {toolsList.map((tool, i) => (
                <span key={i} className="project-tool-tag">
                  {tool}
                </span>
              ))}
            </div>
          )}

          <p className="project-modal-description">{project.description}</p>

          <div className="project-modal-actions">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="project-modal-btn project-modal-btn-primary"
              >
                Live Preview <MdArrowOutward />
              </a>
            )}
            {project.github_link && (
              <a
                href={project.github_link}
                target="_blank"
                rel="noreferrer"
                className="project-modal-btn project-modal-btn-secondary"
              >
                View Repository <FaGithub />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;
