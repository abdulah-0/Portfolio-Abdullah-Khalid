import { lazy, PropsWithChildren, Suspense, useEffect, useState } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";
import ProjectDetailModal from "./ProjectDetailModal";
import Admin from "./Admin";
import { fetchProjects, Project } from "../lib/supabase";

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  const loadProjectsData = async () => {
    const data = await fetchProjects();
    setProjects(data);
  };

  useEffect(() => {
    loadProjectsData();

    // Check if URL contains #admin or ?admin=true
    if (
      window.location.hash === "#admin" ||
      window.location.search.includes("admin=true")
    ) {
      setIsAdminOpen(true);
    }
  }, []);

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [isDesktopView]);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar onOpenAdmin={() => setIsAdminOpen(true)} />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <WhatIDo />
            <Career />
            <Work
              projects={projects}
              onSelectProject={(project) => setSelectedProject(project)}
            />
            {isDesktopView && (
              <Suspense fallback={<div>Loading....</div>}>
                <TechStack />
              </Suspense>
            )}
            <Contact />
          </div>
        </div>
      </div>

      {/* Project Details Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Admin Panel Overlay */}
      {isAdminOpen && (
        <Admin
          onClose={() => setIsAdminOpen(false)}
          onProjectsUpdated={loadProjectsData}
        />
      )}
    </div>
  );
};

export default MainContainer;
