import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from 'remotion';

export const TweetMockupScene: React.FC<{
  title: string;
  subtitle: string;
  brandColor: string;
}> = ({ title, subtitle, brandColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background gradient animation
  const bgPos = interpolate(frame, [0, 300], [0, 100], { extrapolateRight: 'clamp' });
  
  // Tweet card pop in
  const scale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  
  // Engagement numbers ticking up
  const likes = Math.floor(interpolate(frame, [30, 90], [120, 45200], { extrapolateRight: 'clamp', easing: Easing.out(Easing.ease) }));
  const retweets = Math.floor(interpolate(frame, [35, 95], [10, 8900], { extrapolateRight: 'clamp', easing: Easing.out(Easing.ease) }));

  return (
    <AbsoluteFill style={{ 
      background: `linear-gradient(${135 + bgPos}deg, #111827 0%, ${brandColor}33 100%)`, 
      fontFamily: 'sans-serif', 
      alignItems: 'center', 
      justifyContent: 'center',
      color: 'white'
    }}>
      
      {/* Tweet Card */}
      <div style={{
        width: '1000px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
        padding: '50px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        transform: `scale(${scale})`,
        opacity,
        display: 'flex',
        flexDirection: 'column',
      }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
          <div style={{ 
            width: '100px', 
            height: '100px', 
            borderRadius: '50%', 
            background: `linear-gradient(45deg, ${brandColor}, #4f46e5)`,
            marginRight: '25px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px',
            fontWeight: 'bold'
          }}>
            AI
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '36px', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              MotionForge 
              <svg style={{ marginLeft: '10px', width: '32px', height: '32px', color: '#1d9bf0' }} viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.918-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.337 2.25c-.416-.165-.866-.25-1.336-.25-2.21 0-3.918 1.79-3.918 4 0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.46.74 2.746 1.875 3.45-.06.273-.092.556-.092.846 0 2.754 2.246 5 5 5 1.5 0 2.85-.66 3.785-1.71.936 1.05 2.285 1.71 3.785 1.71 2.754 0 5-2.246 5-5 0-.29-.03-.573-.092-.846 1.135-.704 1.875-1.99 1.875-3.45zM10.14 16.01L7.26 13.12l1.24-1.24 1.64 1.64 5.36-5.36 1.24 1.24-6.6 6.61z"/>
              </svg>
            </div>
            <div style={{ fontSize: '28px', color: '#8899a6' }}>@motionforge</div>
          </div>
          <div>
            <svg style={{ width: '40px', height: '40px', color: '#1d9bf0' }} viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </div>
        </div>
        
        {/* Tweet Body */}
        <div style={{ fontSize: '48px', lineHeight: '1.4', marginBottom: '30px', fontWeight: 500 }}>
          {title}
        </div>
        
        {subtitle && (
          <div style={{ fontSize: '32px', color: brandColor, marginBottom: '30px' }}>
            {subtitle}
          </div>
        )}
        
        {/* Timestamp */}
        <div style={{ fontSize: '24px', color: '#8899a6', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '30px', marginBottom: '30px' }}>
          8:24 PM · Jul 3, 2026 · <span style={{ color: 'white', fontWeight: 'bold' }}>{(likes * 2.5).toLocaleString()}</span> Views
        </div>
        
        {/* Engagement Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#8899a6', fontSize: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <svg style={{ width: '36px', height: '36px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
            1,204
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: frame > 35 ? '#00ba7c' : '#8899a6' }}>
            <svg style={{ width: '36px', height: '36px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 1l4 4-4 4"/>
              <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
              <path d="M7 23l-4-4 4-4"/>
              <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
            </svg>
            {retweets.toLocaleString()}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: frame > 30 ? '#f91880' : '#8899a6' }}>
            <svg style={{ width: '36px', height: '36px' }} viewBox="0 0 24 24" fill={frame > 30 ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            {likes.toLocaleString()}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <svg style={{ width: '36px', height: '36px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
              <polyline points="16 6 12 2 8 6"/>
              <line x1="12" y1="2" x2="12" y2="15"/>
            </svg>
          </div>
        </div>
        
      </div>
    </AbsoluteFill>
  );
};
