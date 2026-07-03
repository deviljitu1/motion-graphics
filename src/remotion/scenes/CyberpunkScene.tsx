import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from 'remotion';

export const CyberpunkScene: React.FC<{
  title: string;
  subtitle: string;
  emoji?: string;
  brandColor: string;
}> = ({ title, subtitle, emoji, brandColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance pop
  const scale = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 120 },
  });

  const glitchOffsetX = frame % 10 === 0 ? interpolate(frame, [0, 100], [-10, 10], {extrapolateRight: 'clamp'}) : 0;
  
  // Neon pulse
  const pulse = interpolate(Math.sin(frame / 5), [-1, 1], [0.5, 1]);

  return (
    <AbsoluteFill style={{ 
      backgroundColor: '#09090b', 
      fontFamily: '"Courier New", Courier, monospace', 
      alignItems: 'center', 
      justifyContent: 'center',
      color: brandColor,
      backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
      backgroundSize: '40px 40px',
    }}>
      
      <div style={{
        transform: `scale(${scale}) translateX(${glitchOffsetX}px)`,
        border: `4px solid ${brandColor}`,
        padding: '60px',
        boxShadow: `0 0 ${40 * pulse}px ${brandColor}88, inset 0 0 ${20 * pulse}px ${brandColor}88`,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(10px)',
        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%)',
        textAlign: 'center',
        maxWidth: '1000px',
      }}>
        
        {emoji && (
          <div style={{ fontSize: '80px', marginBottom: '20px', filter: 'grayscale(100%) sepia(100%) hue-rotate(250deg) saturate(500%)' }}>
            {emoji}
          </div>
        )}

        <h1 style={{ 
          fontSize: '80px', 
          fontWeight: 'bold', 
          margin: '0 0 20px 0', 
          textTransform: 'uppercase',
          textShadow: `4px 4px 0px rgba(255,0,0,0.5), -4px -4px 0px rgba(0,255,255,0.5)`
        }}>
          {title}
        </h1>
        <p style={{ 
          fontSize: '32px', 
          color: 'white',
          margin: 0,
          opacity: 0.9
        }}>
          &gt; {subtitle}_
        </p>
      </div>

    </AbsoluteFill>
  );
};
