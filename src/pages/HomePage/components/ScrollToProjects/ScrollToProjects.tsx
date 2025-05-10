import React, { useEffect, useState } from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { motion, useAnimation } from 'framer-motion';
import IconButton from '@mui/material/IconButton';

const ScrollIndicator = () => {
    const controls = useAnimation();
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;

            if (scrollY > 30 && !hasScrolled) {
                setHasScrolled(true);
                controls.start({ opacity: 0, transition: { duration: 0.3 } });
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [controls, hasScrolled]);

    return (
        <motion.div
            animate={controls}
            initial={{ opacity: 1 }}
            style={{
                zIndex: 2,
                textAlign: 'center',
            }}
        >
            <p style={{opacity:'50%'}}>Check out my projects!</p>
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
            >

                <IconButton href="#projects"><ArrowDownwardIcon sx={{opacity:'50%'}} fontSize="large" /></IconButton>

            </motion.div>
        </motion.div>

    );
};

export default ScrollIndicator;
