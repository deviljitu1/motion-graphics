import React from "react";
import { Composition } from "remotion";
import { HeroScene } from "./scenes/HeroScene";

// This is the main Remotion Root component that registers all compositions.
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HeroScene"
        component={HeroScene as React.FC<any>}
        durationInFrames={150} // 5 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "Generate AI Videos",
          subtitle: "Create professional motion graphics from text.",
          brandColor: "#6366f1", // Indigo 500
        }}
      />
    </>
  );
};
