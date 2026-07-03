import React from "react";
import { Composition } from "remotion";
import { StoryTimeline } from "./StoryTimeline";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition 
        id="StoryTimeline" 
        component={StoryTimeline} 
        durationInFrames={900} // This is just a default, the Player overrides it dynamically
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          theme: "HeroScene",
          brandColor: "#6366f1", // Indigo 500
          scenes: [
            { title: "Generate AI Videos", subtitle: "Create professional motion graphics from text.", durationInSeconds: 5 }
          ]
        }}
      />
    </>
  );
};
