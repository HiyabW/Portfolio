import React, { useState, useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence, useInView } from "framer-motion";

import ProjectType from "./types/ProjectType";
import SkillsBadge from "../../../../components/SkillsBadge/SkillsBadge.tsx";
import MyButton from "../../../../components/Button.tsx";
import './ProjectCard.css';

function ProjectCard(project: ProjectType) {
    const [isHovered, setIsHovered] = useState(false);
    const [showGif, setShowGif] = useState(false);
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" });

    useEffect(() => {
        if (isHovered && project.id !== 2) {
            const id = setTimeout(() => setShowGif(true), 600);
            return () => clearTimeout(id);
        } else {
            setShowGif(false);
        }
    }, [isHovered]);

    const imageComponent = useMemo(() => (
        <Grid size={{ xs: 12, md: 7 }} className={`imageGrid${project.id}`}>
            <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                <motion.img
                    src={`/images/${project.id}.webp`}
                    className={`image`}
                    alt={`Screenshot of ${project.name}`}
                    loading="lazy"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: 'auto',
                        opacity: showGif ? 0 : 1,
                        pointerEvents: showGif ? 'none' : 'auto',
                        transition: 'opacity 0.3s ease',
                    }}
                />
                <motion.video
                    src={`/images/${project.id}.mp4`}
                    className={`image`}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                        opacity: showGif ? 1 : 0,
                        pointerEvents: showGif ? 'auto' : 'none',
                        transition: 'opacity 0.3s ease',
                    }}
                />
            </Box>
        </Grid>

    ), [showGif, isHovered, project.id, project.name]);

    const textComponent = useMemo(() => (
        <Grid size={{ xs: 12, md: 5 }} className="text">
            <Box className="projectTitle">
                <Typography className="subheader number">0{project.id}.</Typography>
                <Typography className="subheader">{project.name}</Typography>
            </Box>

            <Box className="projectDescription">
                <Typography>{project.desc}</Typography>
                <Box className="skills">
                    {project.skills.map((skill, i) => (
                        <SkillsBadge key={i} className="skill">
                            <Typography className="skillsBadges">{skill}</Typography>
                        </SkillsBadge>
                    ))}
                </Box>

                <Box className="buttons">
                    <MyButton disabled={project.nda}>
                        {project.nda ? (
                            <>
                                <FontAwesomeIcon icon={faLock} style={{ marginRight: "0.5rem" }} />
                                <Typography className="skillsBadges">Project is under NDA</Typography>
                            </>
                        ) : (
                            <Typography className="skillsBadges">Learn More</Typography>
                        )}
                    </MyButton>

                    {project.id === 1 && (
                        <MyButton
                            onClick={() => window.open("https://padpal.onrender.com/", "_blank")}
                            sx={{ border: "0px", backgroundColor: "#0091E7", color: "white" }}
                            aria-label="Open live demo"
                        >
                            <Typography className="skillsBadges">Live Demo</Typography>
                        </MyButton>
                    )}
                </Box>
            </Box>
        </Grid>
    ), [project]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
            transition={{
                type: "spring",
                stiffness: 100,
                damping: 12,
                mass: 0.5,
            }}
        >
            <Grid
                container
                spacing={4}
                className={`projectCard ${isHovered ? "hovering" : ""}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {project.id % 2 ? imageComponent : textComponent}
                {project.id % 2 ? textComponent : imageComponent}
            </Grid>
        </motion.div>
    );
}

export default ProjectCard;
