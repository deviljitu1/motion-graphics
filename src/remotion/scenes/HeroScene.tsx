import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from 'remotion';

export const HeroScene: React.FC<{
  title: string;
  subtitle: string;
  emoji?: string;
  brandColor: string;
}> = ({ title, subtitle, emoji, brandColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background animated gradient
  const bgPos = interpolate(frame, [0, 150], [0, 100], { extrapolateRight: 'clamp', easing: Easing.inOut(Easing.ease) });

  // 3D Glassmorphism Card Entrance
  const cardSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const rotateX = interpolate(cardSpring, [0, 1], [15, 0], { extrapolateRight: 'clamp' });
  const translateY = interpolate(cardSpring, [0, 1], [100, 0], { extrapolateRight: 'clamp' });
  const opacity = interpolate(cardSpring, [0, 1], [0, 1], { extrapolateRight: 'clamp' });

  // Emoji Pop Animation
  const emojiSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 10, stiffness: 200 }, // punchy bounce
  });
  
  const emojiScale = interpolate(emojiSpring, [0, 1], [0, 1], { extrapolateRight: 'clamp' });
  const emojiRotate = interpolate(emojiSpring, [0, 1], [-20, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ 
      background: `linear-gradient(${135 + bgPos}deg, #0f172a 0%, ${brandColor}44 100%)`, 
      fontFamily: 'Inter, sans-serif', 
      alignItems: 'center', 
      justifyContent: 'center',
      color: 'white',
      perspective: '1000px' // Required for 3D transforms
    }}>
      
      {/* Glassmorphism Card */}
      <div style={{
        width: '80%',
        maxWidth: '1200px',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(30px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '32px',
        padding: '80px 60px',
        boxShadow: `0 30px 60px -12px rgba(0, 0, 0, 0.5), 0 0 80px ${brandColor}22`,
        transform: `translateY(${translateY}px) rotateX(${rotateX}deg)`,
        opacity,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        
        {/* Floating Emoji */}
        {emoji && (
          <div style={{
            fontSize: '100px',
            marginBottom: '30px',
            transform: `scale(${emojiScale}) rotate(${emojiRotate}deg)`,
            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))'
          }}>
            {emoji}
          </div>
        )}

        <h1 style={{ 
          fontSize: '72px', 
          fontWeight: 800, 
          marginBottom: '24px', 
          letterSpacing: '-2px',
          background: `linear-gradient(to right, white, ${brandColor})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          {title}
        </h1>
        
        {subtitle && (
          <p style={{ 
            fontSize: '36px', 
            color: 'rgba(255, 255, 255, 0.7)',
            fontWeight: 500,
            maxWidth: '800px',
            lineHeight: '1.4'
          }}>
            {subtitle}
          </p>
        )}
      </div>

    </AbsoluteFill>
  );
};
