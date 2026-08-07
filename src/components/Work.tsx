import React from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Project } from "../lib/supabase";

gsap.registerPlugin(useGSAP);

interface WorkProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

const Work: React.FC<WorkProps> = ({ projects, onSelectProject }) => {
  useGSAP(() => {
    if (!projects || projects.length === 0) return;

    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      if (!box || box.length === 0) return;

      const rectLeft = document
        .querySelector(".work-container")
        ?.getBoundingClientRect().left || 0;
      const rect = box[0].getBoundingClientRect();
      const parentWidth =
        box[0].parentElement?.getBoundingClientRect().width || 0;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX =
        rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX > 0 ? translateX : 800}`, // Use actual scroll width
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, [projects]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div
              className="work-box"
              key={project.id || index}
              onClick={() => onSelectProject(project)}
              data-cursor="pointer"
              title="Click to view project details"
            >
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage
                image={project.image || "/images/placeholder.webp"}
                alt={project.title}
                link={project.link}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
