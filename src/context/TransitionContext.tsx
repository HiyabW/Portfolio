import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export type TransitionPhase = 'idle' | 'covering' | 'revealing';

interface TransitionContextValue {
    phase: TransitionPhase;
    transitionTo: (path: string) => void;
    onCoverComplete: () => void;
    onRevealComplete: () => void;
}

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function TransitionProvider({ children }: { children: React.ReactNode }) {
    const [phase, setPhase] = useState<TransitionPhase>('idle');
    const navigate = useNavigate();
    const pendingPath = useRef<string | null>(null);
    const isTransitioning = useRef(false);

    const transitionTo = useCallback((path: string) => {
        if (isTransitioning.current) return;
        isTransitioning.current = true;
        pendingPath.current = path;
        setPhase('covering');
    }, []);

    const onCoverComplete = useCallback(() => {
        if (pendingPath.current) {
            navigate(pendingPath.current);
            window.scrollTo(0, 0);
            pendingPath.current = null;
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setPhase('revealing');
                });
            });
        }
    }, [navigate]);

    const onRevealComplete = useCallback(() => {
        setPhase('idle');
        isTransitioning.current = false;
    }, []);

    return (
        <TransitionContext.Provider value={{ phase, transitionTo, onCoverComplete, onRevealComplete }}>
            {children}
        </TransitionContext.Provider>
    );
}

export function usePageTransition() {
    const ctx = useContext(TransitionContext);
    if (!ctx) throw new Error('usePageTransition must be used within TransitionProvider');
    return ctx;
}
