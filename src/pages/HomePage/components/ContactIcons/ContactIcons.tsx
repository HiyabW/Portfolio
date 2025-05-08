import React from "react";
import Box from '@mui/material/Box'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

import './ContactIcons.css'

function ContactIcons() {
    return (
        <Box className='contactIcons'>
            <a href="https://github.com/HiyabW"><GitHubIcon className="icon" /></a>
            <a href="https://www.linkedin.com/in/hiyab-woldegebriel-119009178/"><LinkedInIcon className="icon" /></a>
            <a href="mailto:hiyabwoldegebriel@gmail.com"><EmailIcon className="icon" /></a>
        </Box>
    )

}

export default ContactIcons