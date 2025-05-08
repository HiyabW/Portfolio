import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typography from "@mui/material/Typography";

const texts = [
    { id: 0, text: "Currently @ The Aerospace Corporation" },
    { id: 3, text: "2.5+ years of industry experience" },
    { id: 1, text: "Based in Los Angeles" },
    { id: 2, text: "2 Time SPOT Award Winner" },
];

const transitionTime = 3; // seconds

export default function RotatingDesc() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % texts.length);
        }, transitionTime * 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ position: "relative", width: '100%' }}>
            <AnimatePresence>
                <motion.div
                    key={texts[index].text}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    style={{
                        position: "absolute",
                        width: "100%",
                        // height: "100%",
                    }}>
                    <Typography sx={{opacity: '50%'}}>{texts[index].text}</Typography>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}