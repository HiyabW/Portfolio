import React from "react";
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu'
import Menu from '@mui/material/Menu';

import "./Navbar.css"

function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const currPage = window.location.pathname

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
        <Box id="navbar">
            <Box>
                <Typography className="navLogo"><a href={`${currPage==="/" ? "#homePage" : "/"}`}>Hw</a></Typography>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Typography className="navLink"><a href={`${currPage==="/" ? "#projects" : "/#projects"}`}>Projects</a></Typography>
                <Typography className="navLink"><a href="/about">About</a></Typography>
                <Typography className="navLink"><a href="https://drive.google.com/file/d/1FfE7ADeQH9Zn20GMBc1hPOQTqTLzfaE8/view?usp=sharing">Resume</a></Typography>
                <Typography className="navLink"><a href="mailto:hiyabwoldegebriel@gmail.com">Contact</a></Typography>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{ display: { xs: 'block', md: 'none' } }}
                >
                    {pages.map((page) => (
                        <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                            <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        </Box>
    )
}

export default Navbar