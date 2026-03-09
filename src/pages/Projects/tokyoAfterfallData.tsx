import React from "react";
import type { ProjectCaseStudyData } from "./projectCaseStudyTypes.ts";

const tokyoAfterfallData: ProjectCaseStudyData = {
    accentColor: {
        primary: "#B83A42",
        background: "#faeaeb",
    },

    hero: {
        title: "Tokyo Afterfall",
        tagline: (
            <>
                🎮 A{" "}
                <span className="csHighlight">
                    UI/UX case study designing accessibility features for visually impaired handheld game
                    players
                </span>{" "}
                — high-contrast mode, scalable HUD, and audio cues built into a Nintendo Switch game
                concept.
            </>
        ),
        dates: "Nov 2025 – Dec 2025",
        role: "Product Designer — UI Design · UX Research · Prototyping",
        videoSrc: "/images/TokyoAfterfallColorAdjustment.mp4",
        videoLabel: "Game preview",
    },

    overview: {
        text: "Tokyo Afterfall is a handheld video game concept that incorporates a high-contrast mode, heads-up display enlargement, and audio cues to assist visually impaired players through an interactive menu system. The project presents a narrative centered on a young girl exploring the abandoned city and temples of Tokyo in an immersive 2D style. Despite the popularity of the Nintendo Switch, many of its top-selling games offer limited accessibility features — leaving visually impaired players without the audible and visual feedback they need to enjoy the experience.",
        embedUrl: "https://www.youtube.com/embed/KDChzTR9Hcc?autoplay=1&mute=1&loop=1&playlist=KDChzTR9Hcc",
        embedLabel: "Partial design walkthrough",
    },

    userPersona: {
        intro:
            "Through a combination of secondary research, user interviews, and competitor analysis, I created a user persona reflecting the common needs and pain points of visually impaired Nintendo Switch players.",
        name: "Malcolm Thompson",
        imageSrc: "/images/tokyoAfterfallPersona.webp",
        synopsis: [
            { icon: "📍", text: "Seattle, WA · University of Washington student" },
            {
                icon: "🎮",
                text: "Active gamer with strong astigmatism and protanopia (a form of colorblindness)",
            },
        ],
        goals: [
            "Experience a Nintendo Switch game with built-in accessibility features that accommodate his visual needs.",
        ],
        painPoints: [
            "Overwhelmed by the amount of onscreen visual information during active gameplay.",
            "Frustrated by the difficulty of not being able to quickly process visual feedback in time-sensitive moments.",
            "Nintendo Switch system accessibility settings don't carry over into individual game titles.",
        ],
    },

    productDecisions: {
        sectionLabel: "Accessibility Features",
        intro: "Each design decision directly addresses a core pain point discovered through research:",
        items: [
            {
                title: "High Contrast Mode",
                desc: "Players can enable a high-contrast mode to reduce visual noise and cognitive overload. The mode uses grayscale to mute complex environments and applies bright primary colors (red, blue, green, yellow) to identify the player and enemies — assisting users with protanopia, deuteranopia, tritanopia, and astigmatism.",
            },
            {
                title: "Scalable UI (HUD Enlargement)",
                desc: "Players can enlarge the heads-up display to keep critical gameplay information — currently equipped weapon, health, and total collected currency — consistently visible. This supports players with presbyopia, myopia, hyperopia, and astigmatism by reducing visual strain at handheld screen sizes.",
            },
            {
                title: "Audio Cues",
                desc: "Audio cues are integrated into combat to provide anticipatory feedback before an enemy attack. Paired with a high-visibility visual indicator, the sound alert reinforces time-sensitive moments so players can react quickly without relying solely on visual processing.",
            },
        ],
    },

    designProcess: {
        sectionLabel: "Design Process",
        text: "The process began with a three-pronged research phase: secondary research reviewing videos and articles from visually impaired gamers (including Seren Jaye and James Rath), informal user interviews with four visually impaired players, and a competitor analysis across the Nintendo Switch and its top-selling titles. Findings revealed three core pain points — cognitive overload, non-scalable UI, and a lack of audio feedback — which led to a redefined design challenge: how might we design a handheld game that reduces cognitive overload, includes scalable UI, and uses audio feedback that improves the experience for low-vision and color-blind players? From there, I developed an information architecture to define the interactive menu structure, then produced high-fidelity designs and an interactive prototype incorporating the three accessibility pillars.",
        hifiGallery: [
            "/images/tokyoAfterfallHifis/Menu.png",
            "/images/tokyoAfterfallHifis/Menu-2.png",
            "/images/tokyoAfterfallHifis/Menu-3.png",
            "/images/tokyoAfterfallHifis/Menu-4.png",
            "/images/tokyoAfterfallHifis/Menu-5.png",
            "/images/tokyoAfterfallHifis/Menu-6.png",
            "/images/tokyoAfterfallHifis/Menu-7.png",
            "/images/tokyoAfterfallHifis/Menu-8.png",
            "/images/tokyoAfterfallHifis/Menu-9.png",
        ],
        hifiGalleryLabel: "High fidelity screens",
    },

    challenges: [
        {
            label: "Visual impairment is a spectrum",
            desc: "Initial research treated visual impairment as a single condition. A deeper dive revealed it spans color blindness, low vision, and light sensitivity — which required designing solutions broad enough to serve multiple conditions simultaneously.",
        },
        {
            label: "Balancing immersion with accessibility",
            desc: "High-contrast mode fundamentally changes the game's visual aesthetic. The challenge was preserving the atmospheric Tokyo setting while making the environment legible for visually impaired players.",
        },
        {
            label: "Platform-level limitations",
            desc: "The Nintendo Switch's built-in accessibility settings don't carry into individual game titles, meaning each game must implement its own solutions — a gap this project directly addresses by designing accessibility into the game itself.",
        },
    ],

    futureImprovements: [
        {
            label: "01",
            desc: "Integrate text-to-speech functionality to assist visually impaired players in navigating menus and reading in-game text outside of active gameplay.",
        },
        {
            label: "02",
            desc: "Interview a broader range of visually impaired users to better understand the diverse assistive features this community needs across different types of visual impairment.",
        },
        {
            label: "03",
            desc: "Include assistive features for the hard-of-hearing community to push the awareness for accessibility in video games beyond vision impairment.",
        },
    ],
};

export default tokyoAfterfallData;
