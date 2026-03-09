import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";

import MyButton from "../../components/Button.tsx";
import "./ProjectCaseStudyTemplate.css";
import type { ProjectCaseStudyData } from "./projectCaseStudyTypes.ts";

const MotionBox = motion(Box);
const MotionStack = motion(Stack);

const motionDivProps = (delay = 0) => ({
    initial: { y: "10px", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.3, delay },
});

type TocProps = {
    sections: Array<{ id: string; label: string }>;
    activeSectionId: string | null;
};

function CaseStudyToc({ sections, activeSectionId }: TocProps) {
    return (
        <Box className="csToc">
            <Stack spacing={1} className="csTocList">
                {sections.map((section) => (
                    <a
                        key={section.id}
                        href={`#${section.id}`}
                        className={`csTocLink ${activeSectionId === section.id ? "active" : ""}`}
                    >
                        {section.label}
                    </a>
                ))}
            </Stack>
        </Box>
    );
}

function ProjectCaseStudyTemplate({ data }: { data: ProjectCaseStudyData }) {
    const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
    const [videoExpanded, setVideoExpanded] = useState(false);
    const [diagramOpen, setDiagramOpen] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
    const [galleryIndex, setGalleryIndex] = useState<number | null>(null);

    const tocSections = [
        data.overview && { id: "overview", label: "Project Overview" },
        data.userPersona && { id: "user-persona", label: "User Persona" },
        data.productDecisions && {
            id: "product-decisions",
            label: data.productDecisions.sectionLabel || "Product Decisions",
        },
        data.designProcess && {
            id: "design-process",
            label: data.designProcess.sectionLabel || "Design Process",
        },
        data.technicalImplementation && {
            id: "technical-implementation",
            label: "Technical Implementation",
        },
        data.challenges && { id: "challenges-learnings", label: "Challenges / Learnings" },
        data.futureImprovements && { id: "future-improvements", label: "Future Improvements" },
    ].filter(Boolean) as Array<{ id: string; label: string }>;

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
        if (galleryIndex === null) return;
        const gallery = data.designProcess?.hifiGallery ?? [];
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setGalleryIndex(null);
            if (e.key === "ArrowRight") setGalleryIndex((i) => (i !== null ? Math.min(i + 1, gallery.length - 1) : null));
            if (e.key === "ArrowLeft") setGalleryIndex((i) => (i !== null ? Math.max(i - 1, 0) : null));
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [galleryIndex, data.designProcess?.hifiGallery]);

    useEffect(() => {
        const sectionElements = document.querySelectorAll<HTMLElement>("[data-section-id]");
        if (!sectionElements.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute("data-section-id");
                        if (id) setActiveSectionId(id);
                    }
                });
            },
            { root: null, threshold: 0.4 }
        );

        sectionElements.forEach((el) => observer.observe(el));
        return () => {
            sectionElements.forEach((el) => observer.unobserve(el));
            observer.disconnect();
        };
    }, []);

    const accentStyle = data.accentColor
        ? ({
              "--cs-accent": data.accentColor.primary,
              "--cs-accent-bg": data.accentColor.background,
          } as React.CSSProperties)
        : undefined;

    return (
        <Box className="caseStudyPage" style={accentStyle}>
            <Grid container spacing={6} className="csLayout">

                {/* ── Hero ── */}
                <MotionBox
                    className={`csHero${videoExpanded ? " csHeroExpanded" : ""}`}
                    {...motionDivProps(0.1)}
                >
                    <Stack spacing={3} alignItems="left" className="csHeroText">
                        <Typography align="left">{data.hero.title}</Typography>
                        <Typography className="subheader" align="left">
                            {data.hero.tagline}
                        </Typography>
                        <Box>
                            <Typography className="halfOpacity" align="left">
                                {data.hero.dates}
                            </Typography>
                            <Typography className="halfOpacity" align="left">
                                {data.hero.role}
                            </Typography>
                        </Box>
                        {data.hero.buttons && data.hero.buttons.length > 0 && (
                            <Stack direction="row" spacing={2} className="csHeroActions">
                                {data.hero.buttons.map((btn) => (
                                    <MyButton
                                        key={btn.label}
                                        sx={
                                            btn.primary
                                                ? { backgroundColor: "#0091E7", color: "white", border: 0 }
                                                : {}
                                        }
                                        onClick={() => window.open(btn.url, "_blank")}
                                    >
                                        <Typography className="skillsBadges">{btn.label}</Typography>
                                    </MyButton>
                                ))}
                            </Stack>
                        )}
                    </Stack>
                    {data.hero.videoSrc && (
                        <Box className="csMediaBlock" sx={{ mt: "3vw" }}>
                            <Typography className="csVideoLabel">
                                {data.hero.videoLabel ?? "Preview"}
                            </Typography>
                            <Box className="csHeroMedia">
                                <video
                                    src={data.hero.videoSrc}
                                    className="csHeroVideo"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                />
                            </Box>
                        </Box>
                    )}
                </MotionBox>

                {/* ── TOC ── */}
                <Grid size={{ xs: 12, md: 3 }}>
                    <CaseStudyToc sections={tocSections} activeSectionId={activeSectionId} />
                </Grid>

                {/* ── Content ── */}
                <Grid size={{ xs: 12, md: 9 }} className="csContent">
                    <MotionStack spacing={10} {...motionDivProps(0.2)}>

                        {/* Project Overview */}
                        {data.overview && (
                            <MotionBox
                                id="overview"
                                data-section-id="overview"
                                className="csSection"
                                {...motionDivProps(0.25)}
                            >
                                <Typography className="subheader">Project Overview</Typography>
                                <Typography>{data.overview.text}</Typography>
                                {data.overview.embedUrl && (
                                    <Box className="csOverviewVideo">
                                        <Typography className="csVideoLabel">
                                            {data.overview.embedLabel ?? "Video"}
                                        </Typography>
                                        <Box className="csOverviewVideoEmbed">
                                            <iframe
                                                src={data.overview.embedUrl}
                                                title={`${data.hero.title} video`}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        </Box>
                                    </Box>
                                )}
                            </MotionBox>
                        )}

                        {/* User Persona */}
                        {data.userPersona && (
                            <MotionBox
                                id="user-persona"
                                data-section-id="user-persona"
                                className="csSection csPersona"
                                {...motionDivProps(0.25)}
                            >
                                <Typography className="subheader">User Persona</Typography>
                                {data.userPersona.intro && (
                                    <Typography>{data.userPersona.intro}</Typography>
                                )}
                                <Box className="csPersonaLayout">
                                    <Box className="csPersonaLeft">
                                        <Box className="csPersonaImageContainer">
                                            {data.userPersona.imageSrc ? (
                                                <img
                                                    src={data.userPersona.imageSrc}
                                                    alt={`${data.userPersona.name} persona`}
                                                    loading="lazy"
                                                    className="csPersonaImage"
                                                />
                                            ) : (
                                                <span className="csPersonaIcon">👤</span>
                                            )}
                                        </Box>
                                        <Typography className="csPersonaName">
                                            {data.userPersona.name}
                                        </Typography>
                                        <Box className="csPersonaSynopsisRows">
                                            {data.userPersona.synopsis.map((item, i) => (
                                                <Box key={i} className="csPersonaSynopsisRow">
                                                    <span className="csPersonaSynopsisIcon">{item.icon}</span>
                                                    <Typography className="csPersonaSynopsis">
                                                        {item.text}
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                    <Box className="csPersonaRight">
                                        <Box className="csPersonaBlock">
                                            <Typography className="csPersonaBlockTitle">
                                                Persona Goals
                                            </Typography>
                                            <Stack spacing={1.5} className="csPersonaList">
                                                {data.userPersona.goals.map((goal, i) => (
                                                    <Box key={i} className="csPersonaListItem goals">
                                                        <Typography className="skillsBadges">{goal}</Typography>
                                                    </Box>
                                                ))}
                                            </Stack>
                                        </Box>
                                        <Box className="csPersonaBlock">
                                            <Typography className="csPersonaBlockTitle">
                                                Pain Points
                                            </Typography>
                                            <Stack spacing={1.5} className="csPersonaList">
                                                {data.userPersona.painPoints.map((point, i) => (
                                                    <Box key={i} className="csPersonaListItem painPoints">
                                                        <Typography className="skillsBadges">{point}</Typography>
                                                    </Box>
                                                ))}
                                            </Stack>
                                        </Box>
                                    </Box>
                                </Box>
                            </MotionBox>
                        )}

                        {/* Product Decisions */}
                        {data.productDecisions && (
                            <MotionBox
                                id="product-decisions"
                                data-section-id="product-decisions"
                                className="csSection csHowHelps"
                                {...motionDivProps(0.3)}
                            >
                                <Typography className="subheader">
                                    {data.productDecisions.sectionLabel ?? "Product Decisions"}
                                </Typography>
                                {data.productDecisions.intro && (
                                    <Typography className="csHowHelpsIntro">
                                        {data.productDecisions.intro}
                                    </Typography>
                                )}
                                <Stack spacing={2} className="csHelpsList">
                                    {data.productDecisions.items.map((item) => (
                                        <Box key={item.title} className="csHelpsItem">
                                            <Typography className="csHelpsTitle">{item.title}</Typography>
                                            <Typography className="csHelpsDesc">{item.desc}</Typography>
                                        </Box>
                                    ))}
                                </Stack>
                            </MotionBox>
                        )}

                        {/* Design Process */}
                        {data.designProcess && (
                            <MotionBox
                                id="design-process"
                                data-section-id="design-process"
                                className="csSection"
                                {...motionDivProps(0.4)}
                            >
                                <Typography className="subheader">
                                    {data.designProcess.sectionLabel ?? "Design Process"}
                                </Typography>
                                {data.designProcess.text && (
                                    <Typography>{data.designProcess.text}</Typography>
                                )}
                                {data.designProcess.hifiGallery && data.designProcess.hifiGallery.length > 0 && (
                                    <Box className="csHifiGalleryBlock">
                                        <Typography className="csVideoLabel">
                                            {data.designProcess.hifiGalleryLabel ?? "High fidelity screens"}
                                        </Typography>
                                        <Box className="csHifiGallery">
                                            {data.designProcess.hifiGallery.map((src, i) => (
                                                <Box
                                                    key={i}
                                                    className="csHifiGalleryItem"
                                                    onClick={() => setGalleryIndex(i)}
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-label={`View high fidelity design ${i + 1}`}
                                                    onKeyDown={(e) => e.key === "Enter" && setGalleryIndex(i)}
                                                >
                                                    <img
                                                        src={src}
                                                        alt={`High fidelity screen ${i + 1}`}
                                                        loading="lazy"
                                                    />
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                )}
                                {data.designProcess.figmaEmbedUrl && (
                                    <Box className="csMediaBlock">
                                        <Typography className="csVideoLabel">
                                            {data.designProcess.figmaEmbedLabel ?? "Interactive hi-fi prototype"}
                                        </Typography>
                                        <Box className="csMockups csMockupsFigma">
                                            <iframe
                                                title={`${data.hero.title} prototype`}
                                                className="csFigmaEmbed"
                                                src={data.designProcess.figmaEmbedUrl}
                                                allowFullScreen
                                            />
                                        </Box>
                                    </Box>
                                )}
                            </MotionBox>
                        )}

                        {/* Technical Implementation */}
                        {data.technicalImplementation && (
                            <MotionBox
                                id="technical-implementation"
                                data-section-id="technical-implementation"
                                className="csSection"
                                {...motionDivProps(0.45)}
                            >
                                <Typography className="subheader">Technical Implementation</Typography>
                                <Box className="csMediaBlock">
                                    <Typography className="csVideoLabel">
                                        High-level system diagram
                                    </Typography>
                                    <Box className="csDiagramContext">
                                        {data.technicalImplementation.diagramLegend && (
                                            <Box className="csDiagramLegend">
                                                {data.technicalImplementation.diagramLegend.map((item, i) => (
                                                    <Box key={i} className="csDiagramLegendItem">
                                                        <span
                                                            className="csDiagramLegendDot"
                                                            style={{ backgroundColor: item.color }}
                                                        />
                                                        <Typography className="skillsBadges">
                                                            {item.label}
                                                        </Typography>
                                                    </Box>
                                                ))}
                                            </Box>
                                        )}
                                        <Box
                                            className="csDiagramThumb"
                                            onClick={() => setDiagramOpen(true)}
                                            role="button"
                                            tabIndex={0}
                                            aria-label="View full diagram"
                                            onKeyDown={(e) => e.key === "Enter" && setDiagramOpen(true)}
                                        >
                                            <img
                                                src={data.technicalImplementation.diagramSrc}
                                                alt={data.technicalImplementation.diagramAlt ?? "System diagram"}
                                                loading="lazy"
                                                className="csDiagramImg"
                                            />
                                            <Box className="csDiagramHint">
                                                <Typography className="skillsBadges">
                                                    Click to view full diagram
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>

                                {diagramOpen && (
                                    <Box
                                        className="csLightboxOverlay"
                                        onClick={closeDiagram}
                                        role="dialog"
                                        aria-modal="true"
                                        aria-label="Full diagram view"
                                    >
                                        <Box
                                            className="csLightboxContent"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <button
                                                className="csLightboxClose"
                                                onClick={closeDiagram}
                                                aria-label="Close diagram"
                                            >
                                                ✕
                                            </button>
                                            <Box
                                                className={`csLightboxImgWrap${isZoomed ? " zoomed" : ""}`}
                                                onMouseMove={handleLightboxMouseMove}
                                                onClick={() => setIsZoomed((z) => !z)}
                                            >
                                                <img
                                                    src={data.technicalImplementation.diagramSrc}
                                                    alt={`${data.technicalImplementation.diagramAlt ?? "System diagram"} – full view`}
                                                    className={`csLightboxImg${isZoomed ? " zoomed" : ""}`}
                                                    style={{
                                                        transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                )}

                                <Typography>{data.technicalImplementation.text}</Typography>
                            </MotionBox>
                        )}

                        {/* Challenges / Learnings */}
                        {data.challenges && (
                            <MotionBox
                                id="challenges-learnings"
                                data-section-id="challenges-learnings"
                                className="csSection csChallenges"
                                {...motionDivProps(0.5)}
                            >
                                <Typography className="subheader">Challenges / Learnings</Typography>
                                <Stack spacing={3} className="csChallengesList">
                                    {data.challenges.map((item) => (
                                        <Box key={item.label} className="csChallengeItem">
                                            <Typography className="csChallengeLabel">
                                                {item.label}
                                            </Typography>
                                            <Typography>{item.desc}</Typography>
                                        </Box>
                                    ))}
                                </Stack>
                            </MotionBox>
                        )}

                        {/* Future Improvements */}
                        {data.futureImprovements && (
                            <MotionBox
                                id="future-improvements"
                                data-section-id="future-improvements"
                                className="csSection csFuture"
                                {...motionDivProps(0.55)}
                            >
                                <Typography className="subheader">Future Improvements</Typography>
                                <Box className="csFutureGrid">
                                    {data.futureImprovements.map((item) => (
                                        <Box key={item.label} className="csFutureItem">
                                            <Typography className="csFutureNumber">
                                                {item.label}
                                            </Typography>
                                            <Typography>{item.desc}</Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </MotionBox>
                        )}

                    </MotionStack>
                </Grid>
            </Grid>

            {galleryIndex !== null && data.designProcess?.hifiGallery && (
                <Box
                    className="csLightboxOverlay"
                    onClick={() => setGalleryIndex(null)}
                    role="dialog"
                    aria-modal="true"
                    aria-label="High fidelity screen viewer"
                >
                    <Box
                        className="csLightboxContent csGalleryLightbox"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="csLightboxClose"
                            onClick={() => setGalleryIndex(null)}
                            aria-label="Close"
                        >
                            ✕
                        </button>
                        {galleryIndex > 0 && (
                            <button
                                className="csGalleryNav csGalleryNavPrev"
                                onClick={() => setGalleryIndex((i) => (i !== null ? i - 1 : null))}
                                aria-label="Previous image"
                            >
                                ‹
                            </button>
                        )}
                        <Box className="csLightboxImgWrap">
                            <img
                                src={data.designProcess.hifiGallery[galleryIndex]}
                                alt={`High fidelity screen ${galleryIndex + 1}`}
                                className="csLightboxImg"
                            />
                        </Box>
                        {galleryIndex < data.designProcess.hifiGallery.length - 1 && (
                            <button
                                className="csGalleryNav csGalleryNavNext"
                                onClick={() => setGalleryIndex((i) => (i !== null ? i + 1 : null))}
                                aria-label="Next image"
                            >
                                ›
                            </button>
                        )}
                        <Typography className="csGalleryCounter">
                            {galleryIndex + 1} / {data.designProcess.hifiGallery.length}
                        </Typography>
                    </Box>
                </Box>
            )}
        </Box>
    );
}

export default ProjectCaseStudyTemplate;
