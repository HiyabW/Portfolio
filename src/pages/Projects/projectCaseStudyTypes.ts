import type { ReactNode } from "react";

export type HeroButton = {
    label: string;
    url: string;
    primary?: boolean;
};

export type HeroData = {
    title: string;
    tagline: ReactNode;
    dates: string;
    role: string;
    videoSrc?: string;
    videoLabel?: string;
    buttons?: HeroButton[];
};

export type OverviewData = {
    text: ReactNode;
    embedUrl?: string;
    embedLabel?: string;
};

export type PersonaSynopsisItem = {
    icon: string;
    text: string;
};

export type PersonaData = {
    intro?: string;
    imageSrc?: string;
    name: string;
    synopsis: PersonaSynopsisItem[];
    goals: string[];
    painPoints: string[];
};

export type ProductDecisionItem = {
    title: string;
    desc: string;
};

export type ProductDecisionsData = {
    sectionLabel?: string;
    intro?: string;
    items: ProductDecisionItem[];
};

export type DesignProcessData = {
    sectionLabel?: string;
    text?: ReactNode;
    figmaEmbedUrl?: string;
    figmaEmbedLabel?: string;
};

export type DiagramLegendItem = {
    color: string;
    label: ReactNode;
};

export type TechnicalImplementationData = {
    text: ReactNode;
    diagramSrc: string;
    diagramAlt?: string;
    diagramLegend?: DiagramLegendItem[];
};

export type ChallengeItem = {
    label: string;
    desc: string;
};

export type FutureItem = {
    label: string;
    desc: string;
};

export type AccentColor = {
    /** Primary accent — used for TOC links, highlight text, and diagram outlines */
    primary: string;
    /** Subtle tint — used for card and list-item backgrounds */
    background: string;
};

export type ProjectCaseStudyData = {
    /**
     * Optional theme accent. Defaults to the blue PadPal palette when omitted.
     * Override per-project to give each case study its own color identity.
     */
    accentColor?: AccentColor;
    hero: HeroData;
    overview?: OverviewData;
    userPersona?: PersonaData;
    productDecisions?: ProductDecisionsData;
    designProcess?: DesignProcessData;
    technicalImplementation?: TechnicalImplementationData;
    challenges?: ChallengeItem[];
    futureImprovements?: FutureItem[];
};
