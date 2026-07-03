import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from 'remotion';

export const SearchAnimationScene: React.FC<{
  title: string;
  subtitle: string;
  brandColor: string;
}> = ({ title, subtitle, brandColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Typing effect
  const charsShown = Math.floor(
    interpolate(frame, [15, 60], [0, title.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.ease),
    })
  );
  
  const textToDisplay = title.substring(0, charsShown);

  // Search Bar appear animation
  const scale = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  // Cursor movement with smoother human-like easing
  const cursorEasing = Easing.bezier(0.25, 1, 0.5, 1);
  const cursorX = interpolate(frame, [0, 60, 75, 90], [800, 800, 800, 250], {
    extrapolateRight: 'clamp', easing: cursorEasing
  });
  const cursorY = interpolate(frame, [0, 60, 75, 90], [600, 600, 600, 40], {
    extrapolateRight: 'clamp', easing: cursorEasing
  });
  
  // Click effect at frame 90
  const clickScale = spring({
    frame: frame - 90,
    fps,
    config: { damping: 10, stiffness: 200 },
    durationInFrames: 10,
  });
  const buttonScale = frame >= 90 ? interpolate(clickScale, [0, 0.5, 1], [1, 0.9, 1]) : 1;

  // Results page transition (after click)
  const resultsTransition = spring({ frame: frame - 100, fps, config: { damping: 14 } });
  const resultsOpacity = interpolate(resultsTransition, [0, 1], [0, 1], { extrapolateRight: 'clamp' });
  const searchBarMoveY = interpolate(resultsTransition, [0, 1], [0, -400], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#f8f9fa', fontFamily: 'sans-serif', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Search Bar Container */}
      <div 
        style={{ 
          transform: `scale(${scale}) translateY(${searchBarMoveY}px)`, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          position: 'relative',
          width: '100%',
        }}
      >
        <h1 style={{ color: '#202124', fontSize: '80px', fontWeight: 800, marginBottom: '40px', letterSpacing: '-2px' }}>
          <span style={{color: '#4285F4'}}>G</span>
          <span style={{color: '#EA4335'}}>o</span>
          <span style={{color: '#FBBC05'}}>o</span>
          <span style={{color: '#4285F4'}}>g</span>
          <span style={{color: '#34A853'}}>l</span>
          <span style={{color: '#EA4335'}}>e</span>
        </h1>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          width: '800px',
          height: '90px',
          backgroundColor: 'white',
          borderRadius: '45px',
          boxShadow: '0 1px 6px rgba(32,33,36,.28)',
          padding: '0 30px',
          border: '1px solid #dfe1e5',
        }}>
          {/* Magnifying Glass Icon */}
          <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{width: '30px', height: '30px', color: '#9aa0a6', marginRight: '20px'}}>
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor"></path>
          </svg>
          
          <div style={{ fontSize: '36px', color: '#202124', flex: 1 }}>
            {textToDisplay}
            {/* Blinking Cursor */}
            <span style={{ opacity: frame % 30 < 15 ? 1 : 0 }}>|</span>
          </div>
        </div>

        {/* Buttons underneath */}
        <div style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
          <div style={{
            backgroundColor: '#f8f9fa',
            border: '1px solid #f8f9fa',
            borderRadius: '4px',
            color: '#3c4043',
            fontSize: '24px',
            padding: '16px 32px',
            transform: `scale(${buttonScale})`,
          }}>
            Google Search
          </div>
          <div style={{
            backgroundColor: '#f8f9fa',
            border: '1px solid #f8f9fa',
            borderRadius: '4px',
            color: '#3c4043',
            fontSize: '24px',
            padding: '16px 32px',
          }}>
            I'm Feeling Lucky
          </div>
        </div>
        
        {/* Fake Mouse Cursor */}
        {frame < 100 && (
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: `translate(${cursorX}px, ${cursorY}px)`,
            zIndex: 10,
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.3))' }}>
              <path d="M5.5 3.5L19 12.5L12 14.5L16 22L13 23L9 15.5L4 19V3.5Z" fill="black" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>

      {/* Fake Search Results showing subtitle */}
      <div style={{
        position: 'absolute',
        top: '250px',
        left: '100px',
        right: '100px',
        opacity: resultsOpacity,
        display: 'flex',
        flexDirection: 'column',
        gap: '40px'
      }}>
        <div style={{ fontSize: '24px', color: '#70757a' }}>About 1,450,000,000 results (0.34 seconds)</div>
        
        <div>
          <div style={{ fontSize: '24px', color: '#202124', marginBottom: '8px' }}>https://www.motionforge.ai › result</div>
          <div style={{ fontSize: '40px', color: '#1a0dab', textDecoration: 'none', marginBottom: '12px' }}>{title}</div>
          <div style={{ fontSize: '28px', color: '#4d5156', lineHeight: '1.6' }}>{subtitle}</div>
        </div>
      </div>

    </AbsoluteFill>
  );
};
