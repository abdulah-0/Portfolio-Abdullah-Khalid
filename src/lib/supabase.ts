import { createClient } from "@supabase/supabase-js";

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tools: string;
  image: string;
  link?: string;
  github_link?: string;
  created_at?: string;
}

export interface EducationItem {
  credential: string;
  institution: string;
  result: string;
}

export interface ExperienceItem {
  title: string;
  company: string;
  period?: string;
  description: string;
  tech?: string;
  link?: string;
}

export interface ResumeData {
  name: string;
  title: string;
  phone: string;
  email: string;
  location: string;
  linkedin: string;
  github: string;
  summary: string;
  pdfUrl: string;
  skills: {
    languages: string;
    frontend: string;
    backend: string;
    databases: string;
    tools: string;
    concepts: string;
  };
  education: EducationItem[];
  experience: ExperienceItem[];
  certifications: string[];
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "1",
    title: "AI Interactive Portfolio",
    category: "Full Stack & 3D Web",
    description:
      "A high-performance interactive 3D portfolio website showcasing web applications, interactive WebGL character rendering, GSAP animations, and Supabase integration.",
    tools: "React, TypeScript, Three.js, GSAP, Supabase",
    image: "/images/placeholder.webp",
    link: "https://github.com/abdulah-0/Portfolio-Abdullah-Khalid",
    github_link: "https://github.com/abdulah-0/Portfolio-Abdullah-Khalid",
  },
  {
    id: "2",
    title: "Intelligent Automation Suite",
    category: "AI & Software Engineering",
    description:
      "A robust automated system designed for API orchestration, real-time data processing, and intelligent workflow automation built with Python, C++, and Node.js.",
    tools: "Python, C++, Node.js, PostgreSQL, Express",
    image: "/images/placeholder.webp",
    link: "https://github.com/abdulah-0",
    github_link: "https://github.com/abdulah-0",
  },
  {
    id: "3",
    title: "Full Stack Web Application",
    category: "Full Stack Development",
    description:
      "Modern web application featuring dynamic user dashboards, real-time database sync, authentication, and optimized API services.",
    tools: "React, TypeScript, Node.js, Supabase, PostgreSQL",
    image: "/images/placeholder.webp",
    link: "https://github.com/abdulah-0",
    github_link: "https://github.com/abdulah-0",
  },
];

export const DEFAULT_RESUME: ResumeData = {
  name: "Abdullah Khalid",
  title: "Computer Engineer & Full-Stack Software Developer",
  phone: "+92 334 9211642",
  email: "abdullahkhalid.00019@gmail.com",
  location: "Rawalpindi, Pakistan",
  linkedin: "https://www.linkedin.com/in/abdullah-khalid-823790284/",
  github: "https://github.com/abdulah-0",
  pdfUrl: "",
  summary:
    "Full-stack developer and Computer Engineering student with hands-on experience building scalable, real-world applications including POS systems, AI chatbots, and CRM platforms. Strong foundation in modern web technologies, cloud integration, and product-focused development.",
  skills: {
    languages: "JavaScript, TypeScript, C++, SQL, Python",
    frontend: "React.js, Vite, Material UI, HTML, CSS, TailwindCSS",
    backend: "Node.js, Express.js, REST APIs",
    databases: "MongoDB, PostgreSQL, Supabase",
    tools: "Git, GitHub, Cloudinary, Postman, MATLAB, Arduino, VS Code",
    concepts: "Authentication, MVC Architecture, Agile Development, API Integration, Product Thinking",
  },
  education: [
    {
      credential: "Bachelor's of Computer Engineering",
      institution: "COMSATS University Islamabad, Wah Campus",
      result: "CGPA: 3.31 (Current)",
    },
    {
      credential: "Higher Secondary School Certificate",
      institution: "Emallah Foundation School and College",
      result: "81%",
    },
    {
      credential: "Higher School Certificate",
      institution: "Capital Education System",
      result: "84.7%",
    },
  ],
  experience: [
    {
      title: "AI Driving Assistant",
      company: "Personal / AI Project",
      period: "2025",
      description:
        "Built an AI driving assistant that checks in real time if the driver is feeling drowsy or over speeding and automatically contacts helplines in emergency situations.",
      tech: "Flutter, Python, Firebase",
      link: "https://github.com/abdulah-0/Ai-Driving-Assistent",
    },
    {
      title: "POS System for Retail (Vaporium POS)",
      company: "Full-Stack Retail Application",
      period: "2024 — 2025",
      description:
        "Developed a full-stack POS system tailored for retail operations. Implemented inventory tracking, supplier ledger management, and real-time transaction processing.",
      tech: "React, Node.js, PostgreSQL",
      link: "https://github.com/abdulah-0/vaporium-pos",
    },
    {
      title: "Telemedicine Chatbot (MedVision AI)",
      company: "AI & Healthcare",
      period: "2024",
      description:
        "Developed an AI-powered chatbot for medical assistance and symptom-based interaction with NLP response handling.",
      tech: "Node.js, AI APIs, NLP",
      link: "https://github.com/abdulah-0/medvision-ai",
    },
    {
      title: "CRM System (GSL CRM)",
      company: "Business Solutions",
      period: "2024",
      description:
        "Customer relationship management system for tracking leads, client interactions, and optimizing business process workflows.",
      tech: "React, Node.js, MongoDB",
      link: "https://github.com/abdulah-0/gsl-crm",
    },
    {
      title: "E-Commerce Store (BS Sole)",
      company: "E-Commerce Platform",
      period: "2024",
      description:
        "Complete e-commerce platform with product catalog, cart, checkout, responsive UI, and backend order management.",
      tech: "React, Node.js, PostgreSQL",
      link: "https://github.com/abdulah-0/BS_Sole",
    },
  ],
  certifications: [
    "Nestlé E-Learning Certification — Nestlé",
  ],
};

const LOCAL_STORAGE_KEY = "abdullah_portfolio_projects";
const RESUME_STORAGE_KEY = "abdullah_portfolio_resume";

export const getLocalProjects = (): Project[] => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error("Local storage error:", e);
  }
  return INITIAL_PROJECTS;
};

export const saveLocalProjects = (projects: Project[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
  } catch (e) {
    console.error("Failed to save local projects:", e);
  }
};

export async function fetchProjects(): Promise<Project[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: true });

      if (!error && data && data.length > 0) {
        return data as Project[];
      }
    } catch (e) {
      console.warn("Supabase fetch failed, falling back to local/initial data", e);
    }
  }
  return getLocalProjects();
}

export async function createProject(
  projectData: Omit<Project, "id">
): Promise<Project> {
  const newId = Date.now().toString();
  const newProject: Project = { ...projectData, id: newId };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("projects")
        .insert([projectData])
        .select()
        .single();
      if (!error && data) {
        return data as Project;
      }
    } catch (e) {
      console.error("Supabase create failed:", e);
    }
  }

  const projects = getLocalProjects();
  const updated = [newProject, ...projects];
  saveLocalProjects(updated);
  return newProject;
}

export async function updateProject(
  id: string,
  projectData: Partial<Project>
): Promise<boolean> {
  if (supabase) {
    try {
      const { error } = await supabase
        .from("projects")
        .update(projectData)
        .eq("id", id);
      if (!error) return true;
    } catch (e) {
      console.error("Supabase update failed:", e);
    }
  }

  const projects = getLocalProjects();
  const index = projects.findIndex((p) => p.id === id);
  if (index !== -1) {
    projects[index] = { ...projects[index], ...projectData };
    saveLocalProjects(projects);
    return true;
  }
  return false;
}

export async function deleteProject(id: string): Promise<boolean> {
  if (supabase) {
    try {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (!error) return true;
    } catch (e) {
      console.error("Supabase delete failed:", e);
    }
  }

  const projects = getLocalProjects().filter((p) => p.id !== id);
  saveLocalProjects(projects);
  return true;
}

export async function uploadProjectImage(file: File): Promise<string> {
  if (supabase) {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
      const filePath = `project-covers/${fileName}`;

      const { data, error } = await supabase.storage
        .from("projects")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (!error && data) {
        const { data: publicUrlData } = supabase.storage
          .from("projects")
          .getPublicUrl(filePath);

        if (publicUrlData?.publicUrl) {
          return publicUrlData.publicUrl;
        }
      }
    } catch (e) {
      console.error("Supabase storage error:", e);
    }
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
}

export async function fetchResumeData(): Promise<ResumeData> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("resume")
        .select("*")
        .single();
      if (!error && data) {
        return data as ResumeData;
      }
    } catch (e) {
      console.warn("Supabase fetch resume failed:", e);
    }
  }

  try {
    const stored = localStorage.getItem(RESUME_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.error("Local storage error:", e);
  }
  return DEFAULT_RESUME;
}

export async function saveResumeData(data: ResumeData): Promise<boolean> {
  if (supabase) {
    try {
      const { error } = await supabase
        .from("resume")
        .upsert([{ id: 1, ...data }]);
      if (!error) return true;
    } catch (e) {
      console.error("Supabase save resume failed:", e);
    }
  }

  try {
    localStorage.setItem(RESUME_STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error("Failed to save local resume data:", e);
    return false;
  }
}

export async function uploadResumePdf(file: File): Promise<string> {
  if (supabase) {
    try {
      const fileName = `resume_${Date.now()}_${file.name}`;
      const filePath = `resumes/${fileName}`;

      const { data, error } = await supabase.storage
        .from("projects")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (!error && data) {
        const { data: publicUrlData } = supabase.storage
          .from("projects")
          .getPublicUrl(filePath);

        if (publicUrlData?.publicUrl) {
          return publicUrlData.publicUrl;
        }
      }
    } catch (e) {
      console.error("Supabase upload resume error:", e);
    }
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
}
