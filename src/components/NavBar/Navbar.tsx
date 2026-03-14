import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import { useLocation } from "react-router-dom";
import { usePageTransition } from "../../context/TransitionContext.tsx";

import "./Navbar.css";

function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [projectsInView, setProjectsInView] = React.useState(false);
    const location = useLocation();
    const currPage = location.pathname;
    const { transitionTo } = usePageTransition();

    React.useEffect(() => {
        const projectsEl = document.getElementById("projects");
        if (!projectsEl) return;

        const observer = new IntersectionObserver(
            ([entry]) => setProjectsInView(entry.isIntersecting),
            { threshold: 0.1 }
        );

        observer.observe(projectsEl);
        return () => observer.disconnect();
    }, [currPage]);

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
            link: currPage === "/" ? "#projects" : "/#projects",
            route: null,
        },
        {
            name: "About",
            link: "/about",
            route: "/about",
        },
        {
            name: "Resume",
            link: "https://drive.google.com/file/d/1FfE7ADeQH9Zn20GMBc1hPOQTqTLzfaE8/view?usp=sharing",
            route: null,
        },
    ];


    const handleNavClick = (
        e: React.MouseEvent,
        page: { name: string; link: string; route: string | null }
    ) => {
        if (page.name === "Resume") {
            e.preventDefault();
            window.open(page.link);
            return;
        }
        if (page.route && !page.route.includes("#")) {
            e.preventDefault();
            transitionTo(page.route);
        }
    };

    const handleLogoClick = (e: React.MouseEvent) => {
        if (currPage !== "/") {
            e.preventDefault();
            transitionTo("/");
        }
    };

    return (
        <Box id="navbar">
            <Box>
                <Typography className="navLogo subheader">
                    <a
                        href={currPage === "/" ? "#homePage" : "/"}
                        onClick={handleLogoClick}
                    >
                        Hw
                    </a>
                </Typography>
            </Box>

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                    <Typography
                        key={page.name}
                        className={`navLink${
                            (page.name === "Projects" && projectsInView) ||
                            (page.route && currPage === page.route)
                                ? " active"
                                : ""
                        }`}
                    >
                        <a
                            href={page.name !== "Resume" ? page.link : undefined}
                            onClick={(e) => handleNavClick(e, page)}
                        >
                            {page.name}
                        </a>
                    </Typography>
                ))}
            </Box>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Typography className="navLink">
                    <a href={"mailto:hiyabwoldegebriel@gmail.co"}>Contact</a>
                </Typography>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
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
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{ display: { xs: "block", md: "none" } }}
                >
                    {pages.map((page) => (
                        <MenuItem
                            key={page.name}
                            onClick={(e) => {
                                handleCloseNavMenu();
                                handleNavClick(e as unknown as React.MouseEvent, page);
                            }}
                        >
                            <Typography sx={{ textAlign: "center" }}>
                                <a
                                    href={page.link}
                                    onClick={(e) => handleNavClick(e, page)}
                                >
                                    {page.name}
                                </a>
                            </Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        </Box>
    );
}

export default Navbar;