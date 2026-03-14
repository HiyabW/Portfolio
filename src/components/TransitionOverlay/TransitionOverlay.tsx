import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { usePageTransition } from '../../context/TransitionContext.tsx';

export default function TransitionOverlay() {
    const { phase, onCoverComplete, onRevealComplete } = usePageTransition();
    const controls = useAnimation();

    useEffect(() => {
        if (phase === 'covering') {
            // Reset: collapsed line at bottom center, no vertical offset
            controls.set({ scaleY: 0, y: '0%' });
            controls
                .start({
                    scaleY: 1,
                    transition: { duration: 0.52, ease: [0.76, 0, 0.24, 1] },
                })
                .then(onCoverComplete);
        } else if (phase === 'revealing') {
            // Slide off the top with a semi-springy feel
            controls
                .start({
                    y: '-100%',
                    transition: {
                        type: 'spring',
                        stiffness: 48,
                        damping: 14,
                        mass: 1,
                    },
                })
                .then(() => {
                    // Reset for next use without animation
                    controls.set({ scaleY: 0, y: '0%' });
                    onRevealComplete();
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [phase]);

    return (
        <motion.div
            initial={{ scaleY: 0, y: '0%' }}
            animate={controls}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: '#000',
                zIndex: 99999,
                transformOrigin: 'bottom center',
                pointerEvents: phase !== 'idle' ? 'all' : 'none',
                willChange: 'transform',
            }}
        />
    );
}
