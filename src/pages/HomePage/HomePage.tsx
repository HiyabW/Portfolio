"use client";
import * as React from "react";
import { useState } from "react";
import "../../styles/HomePage.css";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography'
import ProjectCard from "./components/ProjectCard/ProjectCard.tsx";
import ContactIcons from "./components/ContactIcons/ContactIcons.tsx";
import RotatingDesc from "./components/RotatingDesc/RotatingDesc.tsx"
import { useLocation } from "react-router-dom";
import framer, { motion } from 'framer-motion'
import ScrollIndicator from "./components/ScrollToProjects/ScrollToProjects.tsx";

function HomePage() {
  const projects = [
    {
      id: 1,
      name: 'PadPal',
      desc: 'A webapp streamlining roommate searching with facial recognition AI and compatibility assessment.',
      nda: false,
      skills: ["React", "HTML/CSS", "SQL", "FaceAPI"],
      link: "https://github.com/HiyabW/padpal"
    },
    {
      id: 2,
      name: 'Dashboard of Cameo Data',
      desc: 'Dashboarding GUI that coverts complex Cameo data into GoJS diagrams.',
      nda: true,
      skills: ["React", "Docker", "Kubernetes"]
    }
  ]

  const location = useLocation();

  React.useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const motionDivProps = (delay = 0, scale = 1, duration = 0.3, type = "") => {
    return {
      initial: { y: "10px", opacity: 0 },
      animate: { y: 0, opacity: 1, scale: scale },
      transition: {
        duration: duration,
        delay: delay,
        type: type,
        bounce: 0.2, // Less bouncy
        damping: 15, // Adds more friction
        stiffness: 300
      }
    };
  }

  const MotionStack = motion(Stack); // Convert Stack to a motion component
  const MotionBox = motion(Box); // Convert Stack to a motion component

  return (
    <Stack id="homePage" spacing={0}>
      <Stack id="heroSection" spacing={10}>
        <MotionStack {...motionDivProps(0)} className="intro" spacing={5}>
          <Box
            id="hiAndName">
            <Typography>Hi, i'm</Typography>
            <Box id="name">
              <Typography variant="h1"><i>Heyab</i></Typography>
              <Typography variant="h1"><i>Woldegebriel</i></Typography>
            </Box>
          </Box>

          <MotionBox {...motionDivProps(0.3, 1.4, 0.1, "spring")}>
            <ContactIcons />
          </MotionBox >
          <MotionBox {...motionDivProps(0.6)}>
            <Typography className="introDesc">I'm a full stack developer with <b>2.5+ years of industry experience</b> in crafting digital solutions to real life problems.</Typography>
          </MotionBox>
          {/* <Box>
            <RotatingDesc />
          </Box> */}
        </MotionStack>
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.3,
            delay: 1.3
          }}>
          <ScrollIndicator />
        </MotionBox>
      </Stack>
      <MotionStack {...motionDivProps(0)} spacing={20} id="projects">
        {
          projects.map((project) => {
            return <ProjectCard key={project.id} {...project} />
          })
        }
      </MotionStack>
    </Stack>
  );
}

export default HomePage;