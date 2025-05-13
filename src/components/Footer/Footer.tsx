import React from "react";
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu'
import Menu from '@mui/material/Menu';

import "./Footer.css"

function Footer() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const pages = [
        {
            name: "Projects",
            link: "#projects"
        },
        {
            name: "About",
            link: "#"
        },
        {
            name: "Resume",
            link: "https://drive.google.com/file/d/1FfE7ADeQH9Zn20GMBc1hPOQTqTLzfaE8/view?usp=sharing"
        },
        {
            name: "Contact",
            link: "mailto:hiyabwoldegebriel@gmail.com"
        }
    ]


    return (
        <Box id="footer">
            <Box>
                <Typography className="footerLogo subheader"><a href="#homePage">Heyab Woldegebriel</a></Typography>
                <Typography className="footerDesc halfOpacity"><a href="#homePage">Frontend Developer</a></Typography>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'row' }}>
                <Box sx={{ marginRight: '3rem' }}>
                    <Typography className="footerLink"><a href="#projects">Projects</a></Typography>
                    <Typography className="footerLink"><a href="/about">About</a></Typography>
                    <Typography className="footerLink"><a href="mailto:hiyabwoldegebriel@gmail.com">Contact</a></Typography>
                </Box>
                <Box>
                    <Typography className="footerLink"><a onClick={() => window.open("https://github.com/HiyabW")}>Github</a></Typography>
                    <Typography className="footerLink"><a onClick={() => window.open("https://www.linkedin.com/in/hiyab-woldegebriel-119009178/")}>LinkedIn</a></Typography>
                    <Typography className="footerLink"><a onClick={() => window.open("mailto:hiyabwoldegebriel@gmail.com")}>Email</a></Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default Footer