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
            link: currPage === "/" ? "#projects" : "/#projects"
        },
        {
            name: "About",
            link: "/about"
        },
        {
            name: "Resume",
            link: "https://drive.google.com/file/d/1FfE7ADeQH9Zn20GMBc1hPOQTqTLzfaE8/view?usp=sharing"
        }
    ]


    return (
        <Box id="navbar">
            <Box>
                <Typography className="navLogo subheader"><a href={`${currPage === "/" ? "#homePage" : "/"}`}>Hw</a></Typography>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                    <Typography className="navLink"><a href={page.name!=="Resume" ? page.link : undefined} onClick={() => page.name==="Resume" ? window.open(page.link) : undefined}>{page.name}</a></Typography>
                ))}
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Typography className="navLink"><a href={"mailto:hiyabwoldegebriel@gmail.co"}>Contact</a></Typography>
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
                            <Typography sx={{ textAlign: 'center' }}><a href={page.link}>{page.name}</a></Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        </Box>
    )
}

export default Navbar