import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";

import MyButton from "../../components/Button.tsx";
import "./PadPalPage.css";

const sections = [
    { id: "overview", label: "Project Overview" },
    { id: "user-persona", label: "User Persona" },
    { id: "how-padpal-helps", label: "How PadPal Helps" },
    { id: "mockups", label: "Lofi/Hifi Mockups" },
    { id: "technical-implementation", label: "Technical Implementation" },
    { id: "challenges-learnings", label: "Challenges / Learnings" },
    { id: "future-improvements", label: "Future Improvements" },
] as const;

type SectionId = (typeof sections)[number]["id"];

const howPadPalHelps = [
    {
        title: "Mandatory ID Verification",
        desc: "Facial recognition compares a live capture to a government-issued ID, eliminating bots and building the trust users need to feel safe meeting matches in person.",
    },
    {
        title: "Survey-Driven Filters & Sorting",
        desc: "Onboarding preferences (budget, age, lifestyle) power the compatibility algorithm so the feed surfaces candidates who actually fit — no manual sifting required.",
    },
    {
        title: "Swipe-Based Feed",
        desc: "Familiar card mechanics inspired by Bumble and Tinder reduce the learning curve and let users evaluate many candidates quickly without feeling overwhelmed.",
    },
    {
        title: "Compatibility Scoring",
        desc: "Point-based matching ranks roommates by how well they align with a user's survey responses, putting the highest-signal profiles at the top of the feed.",
    },
    {
        title: "Expressive Profiles",
        desc: "Hobby badges and richer profile fields give users more signal at a glance, so they can make informed decisions beyond a single photo.",
    },
    {
        title: "Motion Hints & Onboarding",
        desc: "Guided onboarding screens and subtle microinteractions teach swipe mechanics to first-time users and make the experience feel engaging rather than confusing.",
    },
];

const challenges = [
    {
        label: "Teaching swipe mechanics",
        desc: "Older and less tech-savvy users struggled with pure swipe interactions, so motion hints and onboarding flows were introduced to explain the core gestures.",
    },
    {
        label: "Balancing expression and simplicity",
        desc: "Users wanted more ways to present themselves, which led to hobby badges and richer profiles without overloading the interface.",
    },
    {
        label: "Making the feed feel alive",
        desc: "Early versions felt flat; layered microinteractions, like and dislike states, and small animations made the experience more rewarding.",
    },
];

const futureImprovements = [
    {
        label: "01",
        desc: "Run additional user interviews and usability sessions to validate flows and uncover edge cases in the matching journey.",
    },
    {
        label: "02",
        desc: "Evolve the matching algorithm beyond a point-based system by leveraging more advanced AI-driven scoring and ranking.",
    },
    {
        label: "03",
        desc: "Use Redis to store frequently accessed data and improve response times, and scale application horizontally to handle increased traffic.",
    },
];

const personaGoals = [
    "Efficiently find a compatible roommate in the greater Los Angeles area.",
];

const personaPainPoints = [
    "Skeptical about meeting people online, especially as a woman",
    "Intimidated by laborious searches due to lack of specific filters in popular apps like Facebook groups, Craigslist, and Roommates.com",
    "Struggles to figure out how to use modern roommate apps",
];


const MotionBox = motion(Box);
const MotionStack = motion(Stack);

const motionDivProps = (delay = 0) => ({
    initial: { y: "10px", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: {
        duration: 0.3,
        delay,
    },
});

type TocProps = {
    activeSectionId: SectionId | null;
};

function PadPalToc({ activeSectionId }: TocProps) {
    return (
        <Box className="padpalToc">
            <Stack spacing={1} className="padpalTocList">
                {sections.map((section) => (
                    <a
                        key={section.id}
                        href={`#${section.id}`}
                        className={`padpalTocLink ${activeSectionId === section.id ? "active" : ""}`}
                    >
                        {section.label}
                    </a>
                ))}
            </Stack>
        </Box>
    );
}

function PadPalPage() {
    const [activeSectionId, setActiveSectionId] = useState<SectionId | null>(null);
    const [videoExpanded, setVideoExpanded] = useState(false);
    const [diagramOpen, setDiagramOpen] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, []);

    useEffect(() => {
        const handleScroll = () => setVideoExpanded(window.scrollY > 60);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const closeDiagram = () => {
        setDiagramOpen(false);
        setIsZoomed(false);
        setZoomOrigin({ x: 50, y: 50 });
    };

    const handleLightboxMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setZoomOrigin({ x, y });
    };

    useEffect(() => {
        if (!diagramOpen) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeDiagram();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [diagramOpen]);

    useEffect(() => {
        const sectionElements = document.querySelectorAll<HTMLElement>("[data-section-id]");
        if (!sectionElements.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute("data-section-id") as SectionId | null;
                        if (id) {
                            setActiveSectionId(id);
                        }
                    }
                });
            },
            {
                root: null,
                threshold: 0.4,
            }
        );

        sectionElements.forEach((el) => observer.observe(el));

        return () => {
            sectionElements.forEach((el) => observer.unobserve(el));
            observer.disconnect();
        };
    }, []);

    return (
        <Box className="padpalPage">
            <Grid container spacing={6} className="padpalLayout">
                <MotionBox
                    className={`padpalHero${videoExpanded ? " padpalHeroExpanded" : ""}`}
                    {...motionDivProps(0.1)}
                >
                    <Stack spacing={3} alignItems="left" className="padpalHeroText">
                        <Typography align="left">
                            PadPal
                        </Typography>
                        <Typography className="subheader" align="left">
                            🔎 A <span className="padpalHighlight">roommate search web app that prioritizes compatibility, user safety, and efficiency</span> by combining survey-driven matching, a modern swipe experience, and identity verification.
                        </Typography>
                        <Box>
                            <Typography className="halfOpacity" align="left">
                                Jan 2025 – March 2025</Typography>
                            <Typography className="halfOpacity" align="left">
                                Lead Designer · Frontend Developer · Backend Developer
                            </Typography>
                        </Box>
                        <Stack
                            direction="row"
                            spacing={2}
                            className="padpalHeroActions"
                        >
                            <MyButton
                                sx={{
                                    backgroundColor: "#0091E7",
                                    color: "white",
                                    border: 0,
                                }}
                                onClick={() =>
                                    window.open("https://padpal.onrender.com/", "_blank")
                                }
                            >
                                <Typography className="skillsBadges">
                                    View Live Demo
                                </Typography>
                            </MyButton>
                            <MyButton
                                onClick={() =>
                                    window.open("https://github.com/HiyabW/padpal", "_blank")
                                }
                            >
                                <Typography className="skillsBadges">
                                    View on GitHub
                                </Typography>
                            </MyButton>
                        </Stack>
                    </Stack>
                    <Box className="padpalMediaBlock" sx={{ mt: "3vw" }}>
                        <Typography className="padpalOverviewVideoLabel">
                            App preview
                        </Typography>
                        <Box className="padpalHeroMedia">
                            <video
                                src="/images/1.mp4"
                                className="padpalHeroVideo"
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                        </Box>
                    </Box>
                </MotionBox>
                <Grid size={{ xs: 12, md: 3 }}>
                    <PadPalToc activeSectionId={activeSectionId} />
                </Grid>
                <Grid size={{ xs: 12, md: 9 }} className="padpalContent">
                    <MotionStack spacing={10} {...motionDivProps(0.2)}>

                        <MotionBox
                            id="overview"
                            data-section-id="overview"
                            className="padpalSection"
                            {...motionDivProps(0.25)}
                        >
                            <Typography className="subheader">
                                Project Overview
                            </Typography>
                            <Typography>
                                PadPal is a web application that helps people find compatible
                                roommates by surfacing high-quality matches in a feed-style
                                interface. Users complete a survey capturing lifestyle,
                                budget, and preferences; PadPal turns those answers into a
                                compatibility score and powers a swipeable experience that
                                feels closer to modern social apps than legacy listing sites.
                            </Typography>
                            <Box className="padpalOverviewVideo">
                                <Typography className="padpalOverviewVideoLabel">
                                    Full app walkthrough
                                </Typography>
                                <Box className="padpalOverviewVideoEmbed">
                                    <iframe
                                        src="https://www.youtube.com/embed/Hd4mF6R9ZKI?autoplay=1&mute=1&loop=1&playlist=Hd4mF6R9ZKI"
                                        title="PadPal full app walkthrough"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </Box>
                            </Box>
                        </MotionBox>

                        <MotionBox
                            id="user-persona"
                            data-section-id="user-persona"
                            className="padpalSection padpalPersona"
                            {...motionDivProps(0.25)}
                        >
                            <Typography className="subheader">
                                User Persona
                            </Typography>
                            <Typography>
                                To better understand the challenges of finding a compatible roommate, I created a user persona representing a typical renter navigating the search process. This helped guide the design decisions behind PadPal.
                            </Typography>
                            <Box className="padpalPersonaLayout">
                                <Box className="padpalPersonaLeft">
                                    <Box className="padpalPersonaImageContainer">
                                        <img
                                            src="/images/padpalPersona.png"
                                            alt="PadPal persona"
                                            loading="lazy"
                                            className="padpalPersonaImage"
                                        />
                                    </Box>
                                    <Typography className="padpalPersonaName">
                                        Natalie Miller
                                    </Typography>
                                    <Box className="padpalPersonaSynopsisRows">
                                        <Box className="padpalPersonaSynopsisRow">
                                            <span className="padpalPersonaSynopsisIcon">👤</span>
                                            <Typography className="padpalPersonaSynopsis">24 years old, female</Typography>
                                        </Box>
                                        <Box className="padpalPersonaSynopsisRow">
                                            <span className="padpalPersonaSynopsisIcon">❓</span>
                                            <Typography className="padpalPersonaSynopsis">Accepted a job offer in Los Angeles and needs to relocate by end of month</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box className="padpalPersonaRight">
                                    <Box className="padpalPersonaBlock">
                                        <Typography className="padpalPersonaBlockTitle">
                                            Persona Goals
                                        </Typography>
                                        <Stack spacing={1.5} className="padpalPersonaList">
                                            {personaGoals.map((goal, i) => (
                                                <Box
                                                    key={i}
                                                    className="padpalPersonaListItem goals"
                                                >
                                                    <Typography className="skillsBadges">
                                                        {goal}
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Stack>
                                    </Box>
                                    <Box className="padpalPersonaBlock">
                                        <Typography className="padpalPersonaBlockTitle">
                                            Pain Points
                                        </Typography>
                                        <Stack spacing={1.5} className="padpalPersonaList">
                                            {personaPainPoints.map((point, i) => (
                                                <Box
                                                    key={i}
                                                    className="padpalPersonaListItem painPoints"
                                                >
                                                    <Typography className="skillsBadges">
                                                        {point}
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Stack>
                                    </Box>
                                </Box>
                            </Box>
                        </MotionBox>

                        <MotionBox
                            id="how-padpal-helps"
                            data-section-id="how-padpal-helps"
                            className="padpalSection padpalHowHelps"
                            {...motionDivProps(0.3)}
                        >
                            <Typography className="subheader">
                                How PadPal Helps
                            </Typography>
                            <Typography className="padpalHowHelpsIntro">
                                Each product decision maps directly to a pain point in the
                                roommate search experience:
                            </Typography>
                            <Stack spacing={2} className="padpalHelpsList">
                                {howPadPalHelps.map((item) => (
                                    <Box
                                        key={item.title}
                                        className="padpalHelpsItem"
                                    >
                                        <Typography className="padpalHelpsTitle">
                                            {item.title}
                                        </Typography>
                                        <Typography className="padpalHelpsDesc">
                                            {item.desc}
                                        </Typography>
                                    </Box>
                                ))}
                            </Stack>
                        </MotionBox>

                        <MotionBox
                            id="mockups"
                            data-section-id="mockups"
                            className="padpalSection"
                            {...motionDivProps(0.4)}
                        >
                            <Typography className="subheader">
                                Lofi/Hifi Mockups
                            </Typography>
                            <Typography>
                                The initial design work started with low-fidelity wireframes
                                that explored different ways to structure the feed, filters,
                                and profile details. Through multiple iterations and user
                                feedback sessions, those flows were refined into high-fidelity
                                mockups inspired by successful pairing apps like Bumble,
                                Hinge, and Tinder. The final visuals introduced motion hints,
                                clearer hierarchy in the feed, and more expressive profile
                                layouts that translated directly into the working demo.
                            </Typography>
                            <Box className="padpalMediaBlock">
                                <Typography className="padpalOverviewVideoLabel">
                                    Interactive hi-fi prototype
                                </Typography>
                                <Box className="padpalMockups padpalMockupsFigma">
                                    <iframe
                                        title="PadPal high-fidelity Figma prototype"
                                        className="padpalFigmaEmbed"
                                        src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FtxPVDJMpXtP82WFM3THG9r%2FPadPal%3Fcontent-scaling%3Dfixed%26kind%3Dproto%26node-id%3D89-2%26page-id%3D4%253A11%26scaling%3Dcontain%26starting-point-node-id%3D89%253A2"
                                        allowFullScreen
                                    />
                                </Box>
                            </Box>
                        </MotionBox>

                        <MotionBox
                            id="technical-implementation"
                            data-section-id="technical-implementation"
                            className="padpalSection"
                            {...motionDivProps(0.45)}
                        >
                            <Typography className="subheader">
                                Technical Implementation
                            </Typography>
                            <Box className="padpalMediaBlock">
                                <Typography className="padpalOverviewVideoLabel">
                                    High-level system diagram
                                </Typography>
                                <Box className="padpalDiagramContext">
                                    <Box className="padpalDiagramLegend">
                                        <Box className="padpalDiagramLegendItem">
                                            <span className="padpalDiagramLegendDot leftDot" />
                                            <Typography className="skillsBadges">
                                                <b>Left side</b> — Current high-level system architecture
                                            </Typography>
                                        </Box>
                                        <Box className="padpalDiagramLegendItem">
                                            <span className="padpalDiagramLegendDot rightDot" />
                                            <Typography className="skillsBadges">
                                                <b>Right side</b> — Areas to improve at scale
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box
                                        className="padpalDiagramThumb"
                                        onClick={() => setDiagramOpen(true)}
                                        role="button"
                                        tabIndex={0}
                                        aria-label="View full diagram"
                                        onKeyDown={(e) => e.key === "Enter" && setDiagramOpen(true)}
                                    >
                                        <img
                                            id="padpalHighLevelDiagram"
                                            src="/images/PadpalHighLevelDiagram.webp"
                                            alt="PadPal high-level architecture diagram"
                                            loading="lazy"
                                            className="padpalDiagramImg"
                                        />
                                        <Box className="padpalDiagramHint">
                                            <Typography className="skillsBadges">
                                                Click to view full diagram
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>

                            {diagramOpen && (
                                <Box
                                    className="padpalLightboxOverlay"
                                    onClick={closeDiagram}
                                    role="dialog"
                                    aria-modal="true"
                                    aria-label="Full diagram view"
                                >
                                    <Box
                                        className="padpalLightboxContent"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <button
                                            className="padpalLightboxClose"
                                            onClick={closeDiagram}
                                            aria-label="Close diagram"
                                        >
                                            ✕
                                        </button>
                                        <Box
                                            className={`padpalLightboxImgWrap${isZoomed ? " zoomed" : ""}`}
                                            onMouseMove={handleLightboxMouseMove}
                                            onClick={() => setIsZoomed((z) => !z)}
                                        >
                                            <img
                                                src="/images/PadpalHighLevelDiagram.webp"
                                                alt="PadPal high-level architecture diagram – full view"
                                                className={`padpalLightboxImg${isZoomed ? " zoomed" : ""}`}
                                                style={{
                                                    transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                            )}
                            <Typography>
                                The PadPal demo is built as a React web application with a
                                focus on fluid, responsive UI. The front end manages survey
                                flows, feed interactions, and real-time feedback as users
                                swipe through candidates. Compatibility scores are computed
                                from survey responses and persisted in a SQL-backed data
                                model, which keeps the feed focused on high-signal matches.
                                For safety, PadPal integrates facial recognition via
                                FaceAPI to compare a live capture against an uploaded ID,
                                adding a layer of identity verification beyond simple email
                                or phone checks.
                            </Typography>
                        </MotionBox>

                        <MotionBox
                            id="challenges-learnings"
                            data-section-id="challenges-learnings"
                            className="padpalSection padpalChallenges"
                            {...motionDivProps(0.5)}
                        >
                            <Typography className="subheader">
                                Challenges / Learnings
                            </Typography>
                            <Stack spacing={3} className="padpalChallengesList">
                                {challenges.map((item) => (
                                    <Box
                                        key={item.label}
                                        className="padpalChallengeItem"
                                    >
                                        <Typography className="padpalChallengeLabel">
                                            {item.label}
                                        </Typography>
                                        <Typography>
                                            {item.desc}
                                        </Typography>
                                    </Box>
                                ))}
                            </Stack>
                        </MotionBox>

                        <MotionBox
                            id="future-improvements"
                            data-section-id="future-improvements"
                            className="padpalSection padpalFuture"
                            {...motionDivProps(0.55)}
                        >
                            <Typography className="subheader">
                                Future Improvements
                            </Typography>
                            <Box className="padpalFutureGrid">
                                {futureImprovements.map((item) => (
                                    <Box
                                        key={item.label}
                                        className="padpalFutureItem"
                                    >
                                        <Typography className="padpalFutureNumber">
                                            {item.label}
                                        </Typography>
                                        <Typography>
                                            {item.desc}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </MotionBox>
                    </MotionStack>
                </Grid>
            </Grid>
        </Box>
    );
}

export default PadPalPage;

