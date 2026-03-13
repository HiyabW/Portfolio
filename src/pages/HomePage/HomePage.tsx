"use client";
import * as React from "react";
import "../../styles/HomePage.css";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ProjectCard from "./components/ProjectCard/ProjectCard.tsx";
import ContactIcons from "./components/ContactIcons/ContactIcons.tsx";
import { useLocation } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import ScrollIndicator from "./components/ScrollToProjects/ScrollToProjects.tsx";

const MotionStack = motion(Stack);
const MotionBox = motion(Box);

function HomePage() {
  const projects = [
    {
      id: 1,
      name: 'PadPal',
      desc: 'A webapp streamlining roommate searching with facial recognition AI and compatibility assessment.',
      nda: false,
      skills: ["React", "HTML/CSS", "SQL", "FaceAPI"],
      link: "https://github.com/HiyabW/padpal",
      detailRoute: '/projects/padpal',
      hasVideo: true
    },
    {
      id: 5,
      name: 'Tokyo Afterfall',
      desc: 'A UI/UX case study designing accessibility features — high-contrast mode, scalable HUD, and audio cues — for visually impaired Nintendo Switch players.',
      nda: false,
      skills: ["Figma", "UX Research", "UI Design", "Prototyping"],
      detailRoute: '/projects/tokyoAfterfall',
      hasVideo: true
    },
    {
      id: 2,
      name: 'Dashboard of Cameo Data',
      desc: 'Dashboarding GUI that parses complex Cameo data using Python scripts into GoJS diagrams and 3D models.',
      nda: true,
      skills: ["React", "Docker", "Kubernetes"]
    },
    {
      id: 3,
      name: 'Mission Creation Diagram Builder',
      desc: 'Visual drag-and-drop builder powered by GoJs, allowing users to design task roadmaps.',
      nda: true,
      skills: ["Javascript", "Cypress", "Flask"]
    },
    // {
    //   id: 4,
    //   name: 'Sprint Progress Tracker',
    //   desc: 'Enhanced team productivity by developing a dynamic, intuitive dashboard to track tasking progress',
    //   nda: true,
    //   skills: ["React", "HTML/CSS", "Javascript"]
    // },
  ];

  const location = useLocation();

  React.useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const { scrollY } = useScroll();
  const spring = { stiffness: 80, damping: 25, restDelta: 0.001 };

  // As the projects section slides over the hero, the hero content
  // scales back with perspective — giving a layered 3D depth feel.
  const heroScale = useSpring(
    useTransform(scrollY, [0, 700], [1, 0.88]),
    spring
  );

  const motionDivProps = (delay = 0, scale = 1, duration = 0.3, type = "") => ({
    initial: { y: "10px", opacity: 0 },
    animate: { y: 0, opacity: 1, scale },
    transition: { duration, delay, type, bounce: 0.2, damping: 15, stiffness: 300 },
  });

  return (
    <Stack id="homePage" spacing={0}>

      {/* Hero — sticky so it stays pinned while projects slide over it */}
      <div id="heroSection">
        <motion.div
          className="heroContent"
          style={{
            scale: heroScale,
            willChange: 'auto',
          }}
        >
          <MotionStack {...motionDivProps(0)} className="intro" spacing={5}>
            <Box id="hiAndName">
              <Typography>Hi, i'm</Typography>
              <Box id="name">
                <Typography variant="h1">Hiyab</Typography>
                <Typography variant="h1">Woldegebriel</Typography>
              </Box>
            </Box>
            <MotionBox {...motionDivProps(0.3)}>
              <Typography className="introDesc">
                I'm a Full Stack Developer and UI/UX Designer with{" "}
                <b>3+ years of industry experience</b> in crafting digital solutions to real life problems.
              </Typography>
            </MotionBox>
            <MotionBox {...motionDivProps(0.6, 1.4, 0.1, "spring")}>
              <ContactIcons />
            </MotionBox>
          </MotionStack>
        </motion.div>

        <MotionBox
          className="scrollIndicatorWrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1.3 }}
        >
          <ScrollIndicator />
        </MotionBox>
      </div>

      {/* Projects — z-index: 2, slides over the sticky hero */}
      <Stack spacing={20} id="projects">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} {...project} index={index} />
        ))}
      </Stack>

    </Stack>
  );
}

export default HomePage;
