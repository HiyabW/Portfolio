import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid"
import ProjectType from "./types/ProjectType";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { height, styled } from '@mui/system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

import './ProjectCard.css'
import MyButton from "../../../../components/Button.tsx";
import { AnimatePresence, motion } from "framer-motion";
import SkillsBadge from "../../../../components/SkillsBadge/SkillsBadge.tsx";

function ProjectCard(project: ProjectType) {
    const [isHovered, setIsHovered] = useState<boolean>(false)
    const [showGif, setShowGif] = useState<boolean>(false)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (isHovered && project.id !== 2) {
            // Set the timeout to show the GIF after 1 second
            timeoutRef.current = setTimeout(() => {
                setShowGif(true);
            }, 600);
        } else {
            // Clear the timeout immediately if the hover state changes
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null; // Reset the timeout reference
            }
            setShowGif(false);
        }

        // Cleanup function to ensure the timeout is cleared when the component unmounts or state changes
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };
    }, [isHovered]); // Re-run when `isHovered` changes

    const imageComponent =
        (<Grid size={7} className={`imageGrid${project.id}`}>
            <AnimatePresence>
                <AnimatePresence mode="wait">
                    {showGif === false ? (
                        <motion.img
                            key="image"
                            src={`/images/${project.id}.png`}
                            className={`${isHovered ? 'hovering' : ''} image`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, scale: isHovered ? 1.03 : 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        />
                    ) : (
                        <motion.img
                            key="text"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="image"
                            src={`/images/nyan-cat.gif`}
                        />
                    )}
                </AnimatePresence>

            </AnimatePresence>

        </Grid>)

    const textComponent = (
        <Grid size={5} className="text">
            <Box className="projectTitle">
                <Typography className="subheader number">0{project.id}.</Typography>
                <Typography className="subheader">{project.name}</Typography>
            </Box>
            <Box className="projectDescription">
                <Typography>{project.desc}</Typography>
                <Box className="skills">
                    {
                        project.skills.map((skill) => {
                            return <SkillsBadge className={'skill'}><Typography className="skillsBadges">{skill}</Typography></SkillsBadge>
                        })
                    }
                </Box>
                <Box className="buttons">
                    <MyButton disabled={project.nda ? true : false}>{project.nda ? <><FontAwesomeIcon icon={faLock} style={{ marginRight: '0.5rem' }} />Project is under NDA</> : <>Learn More</>}</MyButton>
                    {project.id === 1 && <MyButton onClick={() => window.open('https://padpal.onrender.com/')} sx={{ border: '0px', backgroundColor: '#0091E7', color: 'white' }}>Live Demo</MyButton>}
                </Box>
            </Box>
        </Grid>
    )
    return (
        <Grid container sx={{ transition: 'all 0.3s linear' }} className={`projectCard ${isHovered ? 'hovering' : ''}`} onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)} onClick={() => { if (project?.link) window.open(`${project?.link}`) }} >
            {project.id % 2 ? imageComponent : textComponent}
            {project.id % 2 ? textComponent : imageComponent}
        </Grid>
    )
}

export default ProjectCard