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
import { useInView } from "framer-motion";

function ProjectCard(project: ProjectType) {
    const [isHovered, setIsHovered] = useState<boolean>(false)
    const [showGif, setShowGif] = useState<boolean>(false)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" });

    useEffect(() => {
        if (isHovered && project.id !== 2) {
            timeoutRef.current = setTimeout(() => {
                setShowGif(true);
            }, 600);
        } else {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
            setShowGif(false);
        }

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
                            src={`/images/${project.id}.webp`}
                            className={`${isHovered ? 'hovering' : ''} image`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, scale: isHovered ? 1.03 : 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        />
                    ) : (
                        <motion.video
                            key="text"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            width={'100%'}
                            height={'auto'}
                            style={{ objectFit: 'cover' }}
                            autoPlay
                            loop
                            muted
                            playsInline
                            src={`/images/${project.id}.mp4`}
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
                    <MyButton disabled={project.nda ? true : false}>{project.nda ? <><FontAwesomeIcon icon={faLock} style={{ marginRight: '0.5rem' }} /><Typography className="skillsBadges">Project is under NDA</Typography></> : <Typography className="skillsBadges">Learn More</Typography>}</MyButton>
                    {project.id === 1 && <MyButton onClick={() => window.open('https://padpal.onrender.com/')} sx={{ border: '0px', backgroundColor: '#0091E7', color: 'white' }}><Typography className="skillsBadges">Live Demo</Typography></MyButton>}
                </Box>
            </Box>
        </Grid>
    )
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
            transition={{
                type: "spring",
                stiffness: 100,
                damping: 12,
                mass: 0.5
            }}
        >

            <Grid
                container
                sx={{ transition: 'all 0.3s linear' }}
                className={`projectCard ${isHovered ? 'hovering' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => { if (project?.link) window.open(`${project?.link}`) }}
            >
                {project.id % 2 ? imageComponent : textComponent}
                {project.id % 2 ? textComponent : imageComponent}
            </Grid>
        </motion.div>


    )
}

export default ProjectCard