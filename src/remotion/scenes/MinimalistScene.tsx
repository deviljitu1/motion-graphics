import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

interface SceneProps {
  title: string;
  subtitle: string;
  brandColor: string;
}

export const MinimalistScene: React.FC<SceneProps> = ({ title, subtitle, brandColor }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  // Smooth sliding animations
  const slideProgress = spring({
    frame,
    fps,
    config: { damping: 15 },
  });

  const slideX = interpolate(slideProgress, [0, 1], [-width, 0]);
  
  const textProgress = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14 },
  });
  
  const textOpacity = interpolate(textProgress, [0, 1], [0, 1]);
  const textY = interpolate(textProgress, [0, 1], [40, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff', display: 'flex', flexDirection: 'row' }}>
      
      {/* Brand Color Sidebar */}
      <div 
        style={{
          width: '25%',
          height: '100%',
          backgroundColor: brandColor,
          transform: `translateX(${slideX}px)`
        }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '100px', flex: 1 }}>
        <h1
          style={{
            color: '#111',
            fontSize: '130px',
            fontWeight: '300',
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
            fontFamily: 'Helvetica, sans-serif',
            margin: 0,
            letterSpacing: '-2px'
          }}
        >
          {title}
        </h1>
        <p
          style={{
            color: '#666',
            fontSize: '50px',
            fontWeight: '400',
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
            fontFamily: 'Helvetica, sans-serif',
            marginTop: '30px',
          }}
        >
          {subtitle}
        </p>
      </div>
    </AbsoluteFill>
  );
};
