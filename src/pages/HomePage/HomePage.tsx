"use client";
import * as React from "react";
import "../../styles/HomePage.css";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ProjectCard from "./components/ProjectCard/ProjectCard.tsx";
import ContactIcons from "./components/ContactIcons/ContactIcons.tsx";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useVelocity, useAnimation } from 'framer-motion';
import ScrollIndicator from "./components/ScrollToProjects/ScrollToProjects.tsx";
import { NeatGradient } from "@firecms/neat";

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
  const gradientRef = React.useRef<HTMLCanvasElement | null>(null);
  const gradientInstance = React.useRef<any>(null);
  const heroRef = React.useRef<HTMLDivElement>(null);

  // Only run the intro animation on desktop (>920px)
  const [isDesktop] = React.useState(
    () => typeof window !== 'undefined' && window.innerWidth > 920
  );

  // Skip the intro when arriving via an internal navigation (e.g. from a project page).
  // location.state is set by TransitionContext when it calls navigate().
  const runIntroAnimation = isDesktop && !location.state?.internalNav;

  const [introAnimating, setIntroAnimating] = React.useState(runIntroAnimation);
  const [textVisible, setTextVisible] = React.useState(!runIntroAnimation);

  const [nameHover, setNameHover] = React.useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Loosened spring so the image visibly lags and catches up
  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 15, mass: 0.4 });
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 15, mass: 0.4 });

  // Derive velocity from the already-smoothed X, then map it to a tilt angle.
  // A separate, snappier spring on the rotation makes it feel physically separate
  // from the position — move fast → card tilts, stop → springs back to 0.
  const xVelocity = useVelocity(smoothX);
  const rawRotate = useTransform(xVelocity, [-2000, 2000], [-26, 14]);
  const rotateZ = useSpring(rawRotate, { stiffness: 180, damping: 28 });

  const handleNameMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  // Pre-compute the scale values that map the canvas from its normal size to fullscreen.
  // scaleX: stretch (100vw - 80px) → 100vw
  // scaleY: stretch 80vh → 100vh  (= 1 / 0.8 = 1.25)
  const [initCanvasScale] = React.useState(() => {
    if (!runIntroAnimation || typeof window === 'undefined') return null;
    return {
      scaleX: window.innerWidth / (window.innerWidth - 80),
      scaleY: window.innerHeight / (window.innerHeight * 0.8),
      borderRadius: 0,
    };
  });

  const canvasControls = useAnimation();

  React.useEffect(() => {
    if (!gradientRef.current) return;

    const gradient = new NeatGradient({
      ref: gradientRef.current,
      colors: [
        { color: "#e14a4c", enabled: true },
        { color: "#f3732d", enabled: true },
        { color: "#f9961d", enabled: true },
        { color: "#f9c750", enabled: true },
        { color: "#91be6d", enabled: true },
        { color: "#42aa8b", enabled: true },
        { color: "#577591", enabled: true },
      ],
      speed: 1,
      horizontalPressure: 3,
      verticalPressure: 4,
      waveFrequencyX: 2,
      waveFrequencyY: 2,
      waveAmplitude: 3,
      shadows: 3,
      highlights: 4,
      colorSaturation: 2,
      colorBrightness: 1,
      wireframe: false,
      colorBlending: 8,
      backgroundColor: "#f7fcff",
      backgroundAlpha: 1,
      grainIntensity: 0,
      resolution: 1,
    });

    gradientInstance.current = gradient;

    return () => {
      gradient.destroy();
      gradientInstance.current = null;
    };
  }, []);

  // Desktop-only intro: canvas starts fullscreen, springs into its hero position,
  // then text animations are released.
  React.useEffect(() => {
    if (!runIntroAnimation || !initCanvasScale) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    const t = setTimeout(() => {
      const animPromise = canvasControls.start({
        scaleX: 1,
        scaleY: 1,
        borderRadius: 30,
        transition: {
          type: 'spring',
          duration: 2.5,
          bounce: 0.25,
        },
      });

      // Show text well before the spring settles — intentional overlap.
      const textT = setTimeout(() => setTextVisible(true), 800);
      timers.push(textT);

      animPromise.then(() => {
        setIntroAnimating(false);
        setTextVisible(true);
      });
    }, 0);

    timers.push(t);
    return () => timers.forEach(clearTimeout);
  }, [runIntroAnimation, initCanvasScale, canvasControls]);

  React.useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    // Normalized cursor position (0–1), defaulting to center
    const current = { x: 0.5, y: 0.5 };
    const target = { x: 0.5, y: 0.5 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      target.x = (e.clientX - rect.left) / rect.width;
      target.y = (e.clientY - rect.top) / rect.height;
    };

    const handleMouseLeave = () => {
      target.x = 0.5;
      target.y = 0.5;
    };

    hero.addEventListener('mousemove', handleMouseMove);
    hero.addEventListener('mouseleave', handleMouseLeave);

    let rafId: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      current.x = lerp(current.x, target.x, 0.04);
      current.y = lerp(current.y, target.y, 0.04);

      if (gradientInstance.current) {
        // Nudge ±1 around the initial defaults (hP: 3, vP: 4) so no colors leave the canvas
        gradientInstance.current.horizontalPressure = 2 + current.x * 2;
        gradientInstance.current.verticalPressure = 3 + current.y * 2;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      hero.removeEventListener('mousemove', handleMouseMove);
      hero.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  React.useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const { scrollY } = useScroll();
  const spring = { stiffness: 60, damping: 25, restDelta: 0.001 };

  // As the projects section slides over the hero, the hero content
  // scales back with perspective — giving a layered 3D depth feel.
  const heroScale = useSpring(
    useTransform(scrollY, [0, 2000], [1, 0.88]),
    spring
  );

  // Text animations are gated: on desktop they wait until the canvas intro finishes;
  // on mobile textVisible is true from mount so they run immediately as before.
  const motionDivProps = (delay = 0, scale = 1, duration = 0.3, type = "") => ({
    initial: { y: "10px", opacity: 0 },
    animate: textVisible ? { y: 0, opacity: 1, scale } : { y: "10px", opacity: 0 },
    transition: { duration, delay, type, bounce: 0.2, damping: 15, stiffness: 300 },
  });

  return (
    <Stack id="homePage" spacing={0}>

      {/* Hero — sticky so it stays pinned while projects slide over it.
          During the desktop intro, z-index is elevated above the navbar and
          overflow is opened so the fullscreen canvas isn't clipped. */}
      <div
        id="heroSection"
        ref={heroRef}
        style={introAnimating && isDesktop ? { overflow: 'visible', zIndex: 9999 } : undefined}
      >
        <motion.div
          className="heroContent"
          style={{
            scale: heroScale,
            willChange: 'auto',
          }}
        >
          {/* motion.canvas: starts fullscreen on desktop (via initCanvasScale initial),
              then springs to its normal hero position. */}
          <motion.canvas
            className="heroGradientCanvas"
            ref={gradientRef}
            initial={initCanvasScale ?? false}
            animate={canvasControls}
          />
          <MotionStack {...motionDivProps(0)} className="intro" spacing={5} style={{ width: "70vw" }}>
            <Box id="hiAndName">
              <Box id="name">
                <Box display="flex" flexDirection="row" gap={1}>
                  <Typography variant="h1">HIYAB</Typography>
                  <Box
                    onMouseEnter={() => setNameHover(true)}
                    onMouseLeave={() => setNameHover(false)}
                    onMouseMove={handleNameMouseMove}
                    style={{ position: "relative", cursor: "pointer", display: "inline-flex", alignSelf: "flex-start" }}
                    onClick={() => window.location.href = "/about"}>
                    <Typography variant="h1" id="asterisk">(*)</Typography>
                  </Box>
                </Box>
                <AnimatePresence>
                  {nameHover && (
                    <motion.div
                      key="namePreview"
                      style={{
                        position: "fixed",
                        left: smoothX,
                        top: smoothY,
                        x: 40,
                        y: 30,
                        translateX: "-50%",
                        translateY: "-50%",
                        zIndex: 2000,
                        rotate: rotateZ,
                        pointerEvents: "none",
                      }}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 180, damping: 18 }}
                    >
                      <img
                        src="/images/headshot.webp"
                        alt="preview"
                        style={{
                          width: 200,
                          borderRadius: 16,
                          boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
                          pointerEvents: "none",
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                <Typography variant="h1">WOLDE&shy;GEBRIEL</Typography>

              </Box>
            </Box>
            <MotionBox {...motionDivProps(0.3)}>
              <Typography className="introDesc">
                Is a Full Stack Developer and Product Designer with{" "}
                <b>industry experience</b> in crafting digital solutions to real life problems.
              </Typography>
            </MotionBox>
            <MotionBox {...motionDivProps(0.6, 1, 0.1, "spring")}>
              <ContactIcons />
              <MotionBox
                className="scrollIndicatorWrapper"
                initial={{ opacity: 0 }}
                animate={textVisible ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.3, delay: 1.3 }}
              >
                <ScrollIndicator />
              </MotionBox>
            </MotionBox>
          </MotionStack>
        </motion.div>
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
