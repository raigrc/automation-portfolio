import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  { at: 0,   text: 'Starting RavenOS 95…' },
  { at: 30,  text: 'Loading portfolio modules…' },
  { at: 65,  text: 'Initializing desktop environment…' },
  { at: 90,  text: 'Ready.' },
];

export default function BootScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [label, setLabel] = useState(STEPS[0].text);

  const finish = useCallback(() => {
    setVisible(false);
    setTimeout(onComplete, 350);
  }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + 3;
        const step = [...STEPS].reverse().find((s) => next >= s.at);
        if (step) setLabel(step.text);
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(finish, 300);
          return 100;
        }
        return next;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [finish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={finish}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#000000',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            cursor: 'pointer',
          }}
        >
          {/* Logo area */}
          <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <div style={{ fontSize: '56px', lineHeight: 1, marginBottom: '12px' }}>🪟</div>
            <p
              style={{
                color: '#FFFFFF',
                fontSize: '28px',
                fontFamily: 'Tahoma, Arial, sans-serif',
                fontWeight: 'bold',
                letterSpacing: '0.02em',
                marginBottom: '4px',
              }}
            >
              RavenOS 95
            </p>
            <p
              style={{
                color: '#808080',
                fontSize: '11px',
                fontFamily: 'Tahoma, Arial, sans-serif',
              }}
            >
              Portfolio Edition
            </p>
          </div>

          {/* Progress section */}
          <div style={{ width: '280px' }}>
            <div
              style={{
                width: '100%',
                height: '18px',
                background: '#1C1C1C',
                border: '1px solid #444444',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.04 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  background: '#000080',
                }}
              />
              {/* Segmented progress bar look */}
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: `${i * 5}%`,
                    width: '1px',
                    height: '100%',
                    background: '#000000',
                    opacity: 0.4,
                  }}
                />
              ))}
            </div>
            <p
              style={{
                color: '#808080',
                fontSize: '11px',
                fontFamily: 'Tahoma, Arial, sans-serif',
                marginTop: '8px',
                minHeight: '16px',
              }}
            >
              {label}
            </p>
          </div>

          {/* Copyright line */}
          <p
            style={{
              color: '#444444',
              fontSize: '10px',
              fontFamily: 'Tahoma, Arial, sans-serif',
              position: 'absolute',
              bottom: '20px',
            }}
          >
            Click anywhere to skip
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
