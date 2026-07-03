import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

interface SceneProps {
  title: string;
  subtitle: string;
  brandColor: string;
}

export const CyberpunkScene: React.FC<SceneProps> = ({ title, subtitle, brandColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 10, mass: 0.5 },
  });

  const titleScale = interpolate(titleProgress, [0, 1], [0.5, 1]);
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

  const subtitleProgress = spring({
    frame: frame - 20,
    fps,
    config: { damping: 10 },
  });

  const subtitleOpacity = interpolate(subtitleProgress, [0, 1], [0, 1]);

  // A grid background effect
  const backgroundY = (frame * 2) % 100;

  return (
    <AbsoluteFill style={{ backgroundColor: '#050510', overflow: 'hidden' }}>
      {/* Cyberpunk Grid */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(${brandColor}33 1px, transparent 1px), linear-gradient(90deg, ${brandColor}33 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
          backgroundPosition: `0 ${backgroundY}px`,
          transform: 'perspective(500px) rotateX(60deg) scale(2)',
          transformOrigin: 'bottom',
          opacity: 0.4
        }}
      />
      
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', zIndex: 10 }}>
        <h1
          style={{
            color: 'white',
            fontSize: '140px',
            fontWeight: '900',
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            textAlign: 'center',
            fontFamily: 'monospace',
            textTransform: 'uppercase',
            textShadow: `0 0 20px ${brandColor}, 0 0 40px ${brandColor}`,
            margin: 0,
            letterSpacing: '10px'
          }}
        >
          {title}
        </h1>
        <p
          style={{
            color: 'white',
            fontSize: '50px',
            opacity: subtitleOpacity,
            textAlign: 'center',
            fontFamily: 'sans-serif',
            marginTop: '40px',
            backgroundColor: brandColor,
            padding: '10px 30px',
            border: '2px solid white',
            boxShadow: `5px 5px 0px white`
          }}
        >
          {subtitle}
        </p>
      </div>
    </AbsoluteFill>
  );
};
