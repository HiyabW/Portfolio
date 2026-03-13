import React from "react";
import Typography from "@mui/material/Typography";
import "./SkillMosaic.css";

export type SkillSize = "large" | "medium" | "small";

export interface SkillItem {
    name: string;
    logoUrl: string;
    size: SkillSize;
}

interface SkillMosaicProps {
    title: string;
    skills: SkillItem[];
}

function SkillTile({ skill }: { skill: SkillItem }) {
    return (
        <div
            className={`skill-tile skill-tile--${skill.size}`}
            role="img"
            aria-label={skill.name}
        >
            <img src={skill.logoUrl} alt={skill.name} loading="lazy" />
            <div className="skill-overlay">
                <span className="skill-overlay__label">{skill.name}</span>
            </div>
        </div>
    );
}

function SkillMosaic({ title, skills }: SkillMosaicProps) {
    return (
        <div className="skill-mosaic-card">
            <Typography className="halfOpacity skill-mosaic-title">
                <b>{title}</b>
            </Typography>
            <div className="skill-mosaic-grid">
                {skills.map((skill) => (
                    <SkillTile key={skill.name} skill={skill} />
                ))}
            </div>
        </div>
    );
}

export default SkillMosaic;
