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

const LOCAL_STORAGE_KEY = "abdullah_portfolio_projects";

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
      } else if (error) {
        console.warn("Supabase storage bucket upload warning:", error.message);
      }
    } catch (e) {
      console.error("Supabase storage error:", e);
    }
  }

  // Fallback: Convert file to Base64 data URL
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
}
