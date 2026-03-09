import React from "react";
import type { ProjectCaseStudyData } from "./projectCaseStudyTypes.ts";

const padpalData: ProjectCaseStudyData = {
    hero: {
        title: "PadPal",
        tagline: (
            <>
                🔎 A{" "}
                <span className="csHighlight">
                    roommate search web app that prioritizes compatibility, user safety, and efficiency
                </span>{" "}
                by combining survey-driven matching, a modern swipe experience, and identity verification.
            </>
        ),
        dates: "Jan 2025 – March 2025",
        role: "Lead Designer · Frontend Developer · Backend Developer",
        videoSrc: "/images/1.mp4",
        videoLabel: "App preview",
        buttons: [
            { label: "View Live Demo", url: "https://padpal.onrender.com/", primary: true },
            { label: "View on GitHub", url: "https://github.com/HiyabW/padpal" },
        ],
    },

    overview: {
        text: "PadPal is a web application that helps people find compatible roommates by surfacing high-quality matches in a feed-style interface. Users complete a survey capturing lifestyle, budget, and preferences; PadPal turns those answers into a compatibility score and powers a swipeable experience that feels closer to modern social apps than legacy listing sites.",
        embedUrl:
            "https://www.youtube.com/embed/Hd4mF6R9ZKI?autoplay=1&mute=1&loop=1&playlist=Hd4mF6R9ZKI",
        embedLabel: "Full app walkthrough",
    },

    userPersona: {
        intro:
            "To better understand the challenges of finding a compatible roommate, I created a user persona representing a typical renter navigating the search process. This helped guide the design decisions behind PadPal.",
        imageSrc: "/images/padpalPersona.webp",
        name: "Natalie Miller",
        synopsis: [
            { icon: "👤", text: "24 years old, female" },
            {
                icon: "❓",
                text: "Accepted a job offer in Los Angeles and needs to relocate by end of month",
            },
        ],
        goals: ["Efficiently find a compatible roommate in the greater Los Angeles area."],
        painPoints: [
            "Skeptical about meeting people online, especially as a woman",
            "Intimidated by laborious searches due to lack of specific filters in popular apps like Facebook groups, Craigslist, and Roommates.com",
            "Struggles to figure out how to use modern roommate apps",
        ],
    },

    productDecisions: {
        sectionLabel: "How PadPal Helps",
        intro: "Each product decision maps directly to a pain point in the roommate search experience:",
        items: [
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
        ],
    },

    designProcess: {
        sectionLabel: "Lofi/Hifi Mockups",
        text: "The initial design work started with low-fidelity wireframes that explored different ways to structure the feed, filters, and profile details. Through multiple iterations and user feedback sessions, those flows were refined into high-fidelity mockups inspired by successful pairing apps like Bumble, Hinge, and Tinder. The final visuals introduced motion hints, clearer hierarchy in the feed, and more expressive profile layouts that translated directly into the working demo.",
        figmaEmbedUrl:
            "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FtxPVDJMpXtP82WFM3THG9r%2FPadPal%3Fcontent-scaling%3Dfixed%26kind%3Dproto%26node-id%3D89-2%26page-id%3D4%253A11%26scaling%3Dcontain%26starting-point-node-id%3D89%253A2",
        figmaEmbedLabel: "Interactive hi-fi prototype",
    },

    technicalImplementation: {
        text: "The PadPal demo is built as a React web application with a focus on fluid, responsive UI. The front end manages survey flows, feed interactions, and real-time feedback as users swipe through candidates. Compatibility scores are computed from survey responses and persisted in a SQL-backed data model, which keeps the feed focused on high-signal matches. For safety, PadPal integrates facial recognition via FaceAPI to compare a live capture against an uploaded ID, adding a layer of identity verification beyond simple email or phone checks.",
        diagramSrc: "/images/PadpalHighLevelDiagram.webp",
        diagramAlt: "PadPal high-level architecture diagram",
        diagramLegend: [
            {
                color: "#0091E7",
                label: (
                    <>
                        <b>Left side</b> — Current high-level system architecture
                    </>
                ),
            },
            {
                color: "#a855f7",
                label: (
                    <>
                        <b>Right side</b> — Areas to improve at scale
                    </>
                ),
            },
        ],
    },

    challenges: [
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
    ],

    futureImprovements: [
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
    ],
};

export default padpalData;
