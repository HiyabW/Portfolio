import React from "react";
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import "./AboutPage.css"
import Stack from "@mui/material/Stack";
import { motion } from "framer-motion";
import SkillMosaic, { SkillItem } from "../../components/SkillMosaic/SkillMosaic.tsx";

const DI = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const SI = "https://cdn.simpleicons.org";

// Each array is ordered by importance. "large" tiles appear first in each section
// and anchor the mosaic; subsequent large tiles mid-array create the jumbled look.
// Layout in a 3-col dense grid: large (2×2) fills left, two smalls stack right of it.

const languagesAndFrameworks: SkillItem[] = [
    // large anchor → [JS][JS][TS  ]
    //                [JS][JS][React]
    { name: "JavaScript", logoUrl: `${DI}/javascript/javascript-original.svg`, size: "large" },
    { name: "TypeScript", logoUrl: `${DI}/typescript/typescript-original.svg`, size: "small" },
    { name: "React",      logoUrl: `${DI}/react/react-original.svg`,           size: "small" },
    // three smalls fill a row
    { name: "PostgreSQL", logoUrl: `${DI}/postgresql/postgresql-original.svg`, size: "small" },
    { name: "NextJS",     logoUrl: `${DI}/nextjs/nextjs-original.svg`,         size: "small" },
    { name: "REST APIs",  logoUrl: `${SI}/postman/FF6C37`,                     size: "small" },
    // mid-array large → jumbles the grid: [Redis][Redis][Mongo]
    //                                      [Redis][Redis][Python]
    { name: "Redis",      logoUrl: `${DI}/redis/redis-original.svg`,           size: "large" },
    { name: "MongoDB",    logoUrl: `${DI}/mongodb/mongodb-original.svg`,       size: "small" },
    { name: "Python",     logoUrl: `${DI}/python/python-original.svg`,         size: "small" },
    // final row of smalls
    { name: "HTML",       logoUrl: `${DI}/html5/html5-original.svg`,           size: "small" },
    { name: "CSS",        logoUrl: `${DI}/css3/css3-original.svg`,             size: "small" },
    { name: "Prisma",     logoUrl: `${DI}/prisma/prisma-original.svg`,         size: "small" },
];

const toolsAndPlatforms: SkillItem[] = [
    // large anchor top-left: [NodeJS][NodeJS][Express]
    //                         [NodeJS][NodeJS][Flask  ]
    { name: "NodeJS",          logoUrl: `${DI}/nodejs/nodejs-original.svg`,                            size: "large"  },
    { name: "Express",         logoUrl: `${DI}/express/express-original.svg`,                          size: "small"  },
    { name: "Flask",           logoUrl: `${DI}/flask/flask-original.svg`,                              size: "small"  },
    // dense fills Git(col1), then Figma medium spans cols 2-3: [Git][Figma][Figma]
    //                                                            [Wpk][Figma][Figma] ← 2×1 accent
    { name: "Git",             logoUrl: `${DI}/git/git-original.svg`,                                  size: "small"  },
    { name: "Figma",           logoUrl: `${DI}/figma/figma-original.svg`,                              size: "medium" },
    { name: "Webpack",         logoUrl: `${DI}/webpack/webpack-original.svg`,                          size: "small"  },
    // three smalls row
    { name: "Jest",            logoUrl: `${DI}/jest/jest-plain.svg`,                                   size: "small"  },
    { name: "Developer Tools", logoUrl: `${DI}/chrome/chrome-original.svg`,                           size: "small"  },
    { name: "Cypress",         logoUrl: `${SI}/cypress/058a5e`,                                        size: "small"  },
    // CI/CD fills gap, Docker large anchors bottom: [CI/CD][Docker][Docker]
    //                                                 [Kube ][Docker][Docker]
    { name: "CI/CD",           logoUrl: `${SI}/githubactions/2088FF`,                                  size: "small"  },
    { name: "Docker",          logoUrl: `${DI}/docker/docker-original.svg`,                            size: "large"  },
    { name: "Kubernetes",      logoUrl: `${DI}/kubernetes/kubernetes-plain.svg`,                       size: "small"  },
    { name: "Jenkins",         logoUrl: `${DI}/jenkins/jenkins-original.svg`,                          size: "small"  },
    { name: "AWS",             logoUrl: `${DI}/amazonwebservices/amazonwebservices-plain-wordmark.svg`, size: "small"  },
];

function AboutPage() {
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

    const MotionBox = motion(Box);
    const MotionStack = motion(Stack);

    return (
        <Box className="aboutPage">
            <Stack spacing={20}>
                <Box className="aboutIntro" >
                    <MotionStack {...motionDivProps(0)} className="aboutBlurb" spacing={2}>
                        <Typography>About Me</Typography>
                        <Typography className="subheader">I'm a Web Developer from Los Angeles, CA ☀️</Typography>
                        <Typography className="subheader"> I build performant, responsive interfaces with modern web tools.</Typography>
                    </MotionStack>
                    <MotionBox {...motionDivProps(0.3)} className="aboutImg">
                        <img loading="lazy" src="/images/aboutMe.webp" />
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
                    <Box className="skills">
                        <SkillMosaic title="Technologies & Frameworks" skills={languagesAndFrameworks} />
                        <SkillMosaic title="Tools & Platforms" skills={toolsAndPlatforms} />
                    </Box>
                </MotionBox>

                <MotionBox {...motionDivProps(0.12)} className="photographySection">
                    <Typography className="photographyBlurb">I also like photography! :-{')'}</Typography>
                    <Box className="photos">
                        <img loading="lazy" src="/images/photo4.webp" />
                        <img loading="lazy" src="/images/photo1.webp" />
                        <img loading="lazy" src="/images/photo2.webp" />
                        <img loading="lazy" src="/images/photo3.webp" />
                        <img loading="lazy" src="/images/photo5.webp" />
                        <img loading="lazy" src="/images/photo6.webp" />
                    </Box>
                </MotionBox>
            </Stack>
        </Box>
    )
}

export default AboutPage
