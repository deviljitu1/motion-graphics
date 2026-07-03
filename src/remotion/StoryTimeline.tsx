import React from 'react';
import { Series } from 'remotion';
import { HeroScene } from './scenes/HeroScene';
import { CyberpunkScene } from './scenes/CyberpunkScene';
import { MinimalistScene } from './scenes/MinimalistScene';

export type SceneData = {
  title: string;
  subtitle: string;
  durationInSeconds: number;
};

interface StoryTimelineProps {
  theme: "HeroScene" | "CyberpunkScene" | "MinimalistScene";
  brandColor: string;
  scenes: SceneData[];
}

export const StoryTimeline: React.FC<StoryTimelineProps> = ({ theme, brandColor, scenes }) => {
  const SceneComponent = 
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
