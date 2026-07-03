import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

interface HeroSceneProps {
  title: string;
  subtitle: string;
  brandColor: string;
}

export const HeroScene: React.FC<HeroSceneProps> = ({ title, subtitle, brandColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Intro animations
  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [50, 0]);

  const subtitleProgress = spring({
    frame: frame - 15, // Delay start
    fps,
    config: { damping: 12 },
  });

  const subtitleOpacity = interpolate(subtitleProgress, [0, 1], [0, 1]);
  const subtitleY = interpolate(subtitleProgress, [0, 1], [30, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0a0a0a', // Dark theme background
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1
        style={{
          color: 'white',
          fontSize: '120px',
          fontWeight: 'bold',
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textAlign: 'center',
          fontFamily: 'Inter, sans-serif',
          margin: 0,
        }}
      >
        {title}
      </h1>
      <p
        style={{
          color: brandColor,
          fontSize: '60px',
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          textAlign: 'center',
          fontFamily: 'Inter, sans-serif',
          marginTop: '40px',
        }}
      >
        {subtitle}
      </p>
    </AbsoluteFill>
  );
};
