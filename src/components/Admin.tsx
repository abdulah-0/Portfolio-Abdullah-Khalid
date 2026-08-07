import React, { useState, useEffect } from "react";
import {
  Project,
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
  uploadProjectImage,
} from "../lib/supabase";
import { MdAdd, MdClose, MdDelete, MdEdit, MdLock, MdLogout, MdUpload } from "react-icons/md";
import "./styles/Admin.css";

interface AdminProps {
  onClose: () => void;
  onProjectsUpdated: () => void;
}

const Admin: React.FC<AdminProps> = ({ onClose, onProjectsUpdated }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);

  // Modal / Form state for Add/Edit
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    tools: "",
    image: "",
    link: "",
    github_link: "",
  });

  useEffect(() => {
    // Check if session stored
    const savedAuth = sessionStorage.getItem("abdullah_admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
      loadProjects();
    }
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    const data = await fetchProjects();
    setProjects(data);
    setLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "admin123" || passcode === "abdullah2026") {
      setIsAuthenticated(true);
      sessionStorage.setItem("abdullah_admin_auth", "true");
      setAuthError("");
      loadProjects();
    } else {
      setAuthError("Invalid admin passcode. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("abdullah_admin_auth");
  };

  const openAddForm = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      category: "",
      description: "",
      tools: "",
      image: "/images/placeholder.webp",
      link: "",
      github_link: "",
    });
    setIsFormOpen(true);
  };

  const openEditForm = (p: Project) => {
    setEditingProject(p);
    setFormData({
      title: p.title || "",
      category: p.category || "",
      description: p.description || "",
      tools: p.tools || "",
      image: p.image || "",
      link: p.link || "",
      github_link: p.github_link || "",
    });
    setIsFormOpen(true);
  };

  const handleImageFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setIsUploadingImage(true);
      try {
        const imageUrl = await uploadProjectImage(file);
        setFormData((prev) => ({ ...prev, image: imageUrl }));
      } catch (err) {
        console.error("Upload error:", err);
      } finally {
        setIsUploadingImage(false);
      }
    }
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.category) return;

    if (editingProject) {
      await updateProject(editingProject.id, formData);
    } else {
      await createProject(formData);
    }

    setIsFormOpen(false);
    await loadProjects();
    onProjectsUpdated();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await deleteProject(id);
      await loadProjects();
      onProjectsUpdated();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-overlay">
        <div className="admin-header">
          <h1>
            <MdLock /> Admin Portal
          </h1>
          <button className="admin-btn admin-btn-secondary" onClick={onClose}>
            <MdClose /> Close
          </button>
        </div>
        <div className="admin-login-container">
          <h2>Admin Login</h2>
          <p>Please enter your admin passcode to manage projects</p>
          <form onSubmit={handleLogin}>
            <div className="admin-form-group">
              <label>Admin Passcode</label>
              <input
                type="password"
                className="admin-form-input"
                placeholder="Enter passcode..."
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                autoFocus
              />
            </div>
            {authError && <p className="admin-error-msg">{authError}</p>}
            <button
              type="submit"
              className="admin-btn admin-btn-primary"
              style={{ width: "100%", justifyContent: "center", marginTop: 15 }}
            >
              Authenticate & Access
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-overlay">
      <div className="admin-header">
        <h1>Admin Control Panel</h1>
        <div className="admin-header-actions">
          <button className="admin-btn admin-btn-primary" onClick={openAddForm}>
            <MdAdd /> Add Project
          </button>
          <button className="admin-btn admin-btn-secondary" onClick={handleLogout}>
            <MdLogout /> Logout
          </button>
          <button className="admin-btn admin-btn-secondary" onClick={onClose}>
            <MdClose /> Close
          </button>
        </div>
      </div>

      <div className="admin-content">
        <h2>Manage Work Projects</h2>
        {loading ? (
          <p style={{ marginTop: 20 }}>Loading projects...</p>
        ) : (
          <div className="admin-projects-grid">
            {projects.map((project) => (
              <div className="admin-project-card" key={project.id}>
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="admin-project-img"
                  />
                )}
                <div className="admin-project-body">
                  <span className="admin-project-category">
                    {project.category}
                  </span>
                  <h3 className="admin-project-title">{project.title}</h3>
                  <p className="admin-project-tools">
                    <strong>Tools:</strong> {project.tools}
                  </p>
                  <div className="admin-project-actions">
                    <button
                      className="admin-btn admin-btn-secondary"
                      onClick={() => openEditForm(project)}
                    >
                      <MdEdit /> Edit
                    </button>
                    <button
                      className="admin-btn admin-btn-danger"
                      onClick={() => handleDelete(project.id)}
                    >
                      <MdDelete /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isFormOpen && (
        <div
          className="admin-modal-backdrop"
          onClick={() => setIsFormOpen(false)}
        >
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="admin-modal-title">
              {editingProject ? "Edit Project" : "Add New Project"}
            </h3>
            <form onSubmit={handleSubmitForm}>
              <div className="admin-form-group">
                <label>Project Title</label>
                <input
                  type="text"
                  required
                  className="admin-form-input"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>
              <div className="admin-form-group">
                <label>Category</label>
                <input
                  type="text"
                  required
                  className="admin-form-input"
                  placeholder="e.g. Full Stack & AI"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                />
              </div>
              <div className="admin-form-group">
                <label>Tools & Technologies (comma separated)</label>
                <input
                  type="text"
                  className="admin-form-input"
                  placeholder="React, TypeScript, Python..."
                  value={formData.tools}
                  onChange={(e) =>
                    setFormData({ ...formData, tools: e.target.value })
                  }
                />
              </div>
              <div className="admin-form-group">
                <label>Upload Project Cover Picture</label>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="admin-form-input"
                    style={{ padding: "8px" }}
                  />
                </div>
                {isUploadingImage && (
                  <p style={{ fontSize: "12px", color: "#e31b6d", marginTop: "4px" }}>
                    <MdUpload /> Uploading image to Supabase Storage...
                  </p>
                )}
                <div style={{ marginTop: "10px" }}>
                  <label style={{ fontSize: "12px", color: "#888" }}>
                    Or Image URL:
                  </label>
                  <input
                    type="text"
                    className="admin-form-input"
                    placeholder="/images/placeholder.webp or https://..."
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                  />
                </div>
                {formData.image && (
                  <div style={{ marginTop: "10px" }}>
                    <img
                      src={formData.image}
                      alt="Preview"
                      style={{
                        height: "80px",
                        borderRadius: "6px",
                        objectFit: "cover",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="admin-form-group">
                <label>Live Preview Link (Optional)</label>
                <input
                  type="text"
                  className="admin-form-input"
                  placeholder="https://..."
                  value={formData.link}
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                />
              </div>
              <div className="admin-form-group">
                <label>GitHub Repository Link (Optional)</label>
                <input
                  type="text"
                  className="admin-form-input"
                  placeholder="https://github.com/..."
                  value={formData.github_link}
                  onChange={(e) =>
                    setFormData({ ...formData, github_link: e.target.value })
                  }
                />
              </div>
              <div className="admin-form-group">
                <label>Description</label>
                <textarea
                  className="admin-form-textarea"
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                ></textarea>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  justifyContent: "flex-end",
                  marginTop: 20,
                }}
              >
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary"
                  onClick={() => setIsFormOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
