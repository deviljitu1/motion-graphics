import React from 'react';
import { Series } from 'remotion';
import { HeroScene } from './scenes/HeroScene';
import { CyberpunkScene } from './scenes/CyberpunkScene';
import { MinimalistScene } from './scenes/MinimalistScene';
import { SearchAnimationScene } from './scenes/SearchAnimationScene';
import { TweetMockupScene } from './scenes/TweetMockupScene';

export type SceneData = {
  title: string;
  subtitle: string;
  durationInSeconds: number;
};

export type ThemeType = "HeroScene" | "CyberpunkScene" | "MinimalistScene" | "SearchAnimationScene" | "TweetMockupScene";

interface StoryTimelineProps {
  theme: ThemeType;
  brandColor: string;
  scenes: SceneData[];
}

export const StoryTimeline: React.FC<StoryTimelineProps> = ({ theme, brandColor, scenes }) => {
  const SceneComponent = 
    theme === "SearchAnimationScene" ? SearchAnimationScene :
    theme === "TweetMockupScene" ? TweetMockupScene :
    theme === "CyberpunkScene" ? CyberpunkScene : 
    theme === "MinimalistScene" ? MinimalistScene : HeroScene;

  return (
    <Series>
      {scenes.map((scene, index) => {
        const frames = Math.max(30, scene.durationInSeconds * 30); // Prevent 0-frame sequences
        return (
          <Series.Sequence key={index} durationInFrames={frames}>
            <SceneComponent 
              title={scene.title}
              subtitle={scene.subtitle}
              brandColor={brandColor}
            />
          </Series.Sequence>
        );
      })}
    </Series>
  );
};
