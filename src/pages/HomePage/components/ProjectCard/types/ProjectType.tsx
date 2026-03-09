type ProjectType = {
    id: number;
    name: string;
    desc: string;
    nda: boolean;
    skills: string[];
    link?: string;
    detailRoute?: string;
    hasVideo?: boolean;
}

export default ProjectType