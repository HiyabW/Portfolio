import React from "react";
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import "./AboutPage.css"
import Stack from "@mui/material/Stack";
import SkillsBadge from "../../components/SkillsBadge/SkillsBadge.tsx";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";

function AboutPage() {
    const frontendTechnologies = ["React", "SQL", "Typescript", "SQL", "Styled Components",
        "React Queries", "HTML/CSS", "Tailwind CSS", "FaceAPI", "GoJs", "Javvascript", "Figma", "NodeJs", "Express", "Flask"]

    const toolsAndPlatforms = ["Git", "Github Actions", "Figma", "npm/yarn/pip", "Webpack", "Jest", "Developer Tools", "Cypress", "CI/CD", "Docker", "Kubernetes", "Jenkins"]

    const motionDivProps = (delay = 0) => {
        return {
            initial: { y: "10px", opacity: 0 },
            animate: { y: 0, opacity: 1 },
            transition: {
                duration: 0.3,
                delay: delay,
            }
        };
    }

    const MotionBox = motion(Box); // Convert Stack to a motion component

    return (
        <Box className="aboutPage">
            <Stack spacing={20}>
                <Box className="aboutIntro" >
                    <MotionBox {...motionDivProps(0)} className="aboutBlurb">
                        <Typography>About Me</Typography>
                        <Typography className="subheader">I'm a Frontend Developer from Los Angeles, CA ☼</Typography>
                        <Typography className="subheader"> I build performant, responsive interfaces with modern web tools.</Typography>
                    </MotionBox>
                    <MotionBox {...motionDivProps(0.3)} className="aboutImg">
                        <img src="/images/aboutMe.jpg" />
                    </MotionBox>
                </Box>

                <MotionBox {...motionDivProps(0.6)} className="aboutDesc">
                    <Typography>I earned my B.S. in <b>Computer Science with Business Applications</b> from <i>UC Riverside</i>, where I also interned as a frontend developer at ThinqTv, a nonprofit supporting women of color in tech through educational resources.</Typography>
                    <Typography>As a Software Engineer at <i>The Aerospace Corporation</i>, I design and build dynamic user interfaces using HTML, CSS, React, and JavaScript. I <b>mentor junior developers</b>, <b>lead UI/UX and backend initiatives</b>, and <b>seamlessly adapt to diverse roles</b>. My dedication to excellence and innovation has been recognized with two SPOT Awards for outstanding performance.</Typography>
                </MotionBox>

                <MotionBox {...motionDivProps(0.9)} id="skillsAndExpertise">
                    <Box className="skillsBlurb">
                        <Typography className="subheader">Skills & Expertise</Typography>
                        <Typography>I've worked with a range of technologies in web development,
                            from back-end to design.</Typography>
                    </Box>
                    <Grid className="skills" spacing={5}>
                        <Box className="skillsCard">
                            <Typography className="halfOpacity"><b>Frontend Technologies</b></Typography>
                            <Box className="skillsList">
                                {
                                    frontendTechnologies.map((skill) => {
                                        return <SkillsBadge className={'skill'}><Typography className="skillsBadges">{skill}</Typography></SkillsBadge>
                                    })
                                }
                            </Box>
                        </Box>
                        <Box className="skillsCard">
                            <Typography className="halfOpacity"><b>Tools & Platforms</b></Typography>
                            <Box className="skillsList">
                                {
                                    toolsAndPlatforms.map((skill) => {
                                        return <SkillsBadge className={'skill'}><Typography className="skillsBadges">{skill}</Typography></SkillsBadge>
                                    })
                                }
                            </Box>
                        </Box>
                    </Grid>
                </MotionBox>

                <MotionBox {...motionDivProps(0.12)} className="photographySection">
                    <Typography className="photographyBlurb">I also like photography! :-{')'}</Typography>
                    <Box className="photos">
                        <img src="/images/photo4.jpeg" />
                        <img src="/images/photo1.jpeg" />
                        <img src="/images/photo2.jpeg" />
                        <img src="/images/photo3.jpeg" />
                        <img src="/images/photo5.jpeg" />
                        <img src="/images/photo6.jpeg" />
                    </Box>
                </MotionBox>
            </Stack>
        </Box>
    )
}

export default AboutPage