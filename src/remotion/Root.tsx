import React from "react";
import { Composition } from "remotion";
import { HeroScene } from "./scenes/HeroScene";
import { CyberpunkScene } from "./scenes/CyberpunkScene";
import { MinimalistScene } from "./scenes/MinimalistScene";

// This is the main Remotion Root component that registers all compositions.
export const RemotionRoot: React.FC = () => {
  const commonProps = {
    durationInFrames: 900, // 30 seconds at 30fps
    fps: 30,
    width: 1920,
    height: 1080,
    defaultProps: {
      title: "Generate AI Videos",
      subtitle: "Create professional motion graphics from text.",
      brandColor: "#6366f1", // Indigo 500
    }
  };

  return (
    <>
      <Composition id="HeroScene" component={HeroScene as React.FC<any>} {...commonProps} />
      <Composition id="CyberpunkScene" component={CyberpunkScene as React.FC<any>} {...commonProps} />
      <Composition id="MinimalistScene" component={MinimalistScene as React.FC<any>} {...commonProps} />
    </>
  );
};
