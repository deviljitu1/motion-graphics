"use client";

import { useState } from "react";
import { Player } from "@remotion/player";
import { HeroScene } from "@/remotion/scenes/HeroScene";
import { CyberpunkScene } from "@/remotion/scenes/CyberpunkScene";
import { MinimalistScene } from "@/remotion/scenes/MinimalistScene";
import { Button } from "@/components/ui/button";
import { Loader2, Download } from "lucide-react";

export default function VideoPlayer() {
  const [title, setTitle] = useState("MotionForge AI");
  const [subtitle, setSubtitle] = useState("Professional videos in seconds.");
  const [brandColor, setBrandColor] = useState("#a855f7");
  const [aspectRatio, setAspectRatio] = useState<"16:9" | "9:16" | "1:1">("16:9");
  const [template, setTemplate] = useState<"HeroScene" | "CyberpunkScene" | "MinimalistScene">("HeroScene");

  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleGenerate = async () => {
    if (!aiPrompt) return;
    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiPrompt }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setTitle(data.title || title);
        setSubtitle(data.subtitle || subtitle);
        setBrandColor(data.brandColor || brandColor);
      } else {
        console.error("Failed to generate:", data.error);
        alert("Generation failed: " + data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch("/api/render", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          template,
          title,
          subtitle,
          brandColor
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to render video");
      }

      // Handle the blob download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `${template}-motion-graphic.mp4`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      console.error(error);
      alert("Render failed: " + error.message + "\n(Note: Vercel may timeout for 30s videos. Test this locally!)");
    } finally {
      setIsDownloading(false);
    }
  };

  // Determine width and height based on aspect ratio
  let width = 1920;
  let height = 1080;

  if (aspectRatio === "9:16") {
    width = 1080;
    height = 1920;
  } else if (aspectRatio === "1:1") {
    width = 1080;
    height = 1080;
  }

  // Get active component
  const ActiveComponent = 
    template === "HeroScene" ? HeroScene :
    template === "CyberpunkScene" ? CyberpunkScene : MinimalistScene;

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">
      {/* AI Generator Bar */}
      <div className="w-full bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <label className="block text-sm text-gray-400 mb-2 font-medium">Describe your project to generate the video</label>
          <input 
            type="text" 
            placeholder="e.g. A neon green cyberpunk CRM SaaS tool..."
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-3 text-white focus:outline-none focus:border-purple-500"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleGenerate();
            }}
          />
        </div>
        <Button 
          onClick={handleGenerate}
          disabled={isGenerating || !aiPrompt}
          className="w-full md:w-auto h-12 px-8 bg-purple-600 hover:bg-purple-700 text-white font-medium disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating...
            </>
          ) : (
            "✨ Generate Video"
          )}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start w-full">
        {/* Controls Panel */}
        <div className="w-full md:w-1/3 flex flex-col gap-6 p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
          <h2 className="text-xl font-semibold mb-2 text-white">Customize Video</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Template</label>
              <select
                value={template}
                onChange={(e) => setTemplate(e.target.value as any)}
                className="w-full bg-black/50 border border-white/20 rounded-md px-3 py-2 text-white focus:outline-none focus:border-purple-500 appearance-none"
              >
                <option value="HeroScene">Standard Theme</option>
                <option value="CyberpunkScene">Cyberpunk Grid</option>
                <option value="MinimalistScene">Minimalist Sliding</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Title</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-black/50 border border-white/20 rounded-md px-3 py-2 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">Subtitle</label>
              <input 
                type="text" 
                value={subtitle} 
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full bg-black/50 border border-white/20 rounded-md px-3 py-2 text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Brand Color</label>
              <div className="flex gap-3">
                <input 
                  type="color" 
                  value={brandColor} 
                  onChange={(e) => setBrandColor(e.target.value)}
                  className="h-10 w-14 rounded-md cursor-pointer border-0 p-0 bg-transparent"
                />
                <input 
                  type="text" 
                  value={brandColor} 
                  onChange={(e) => setBrandColor(e.target.value)}
                  className="flex-1 bg-black/50 border border-white/20 rounded-md px-3 py-2 text-white uppercase focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Aspect Ratio</label>
              <div className="flex gap-2">
                <Button 
                  variant={aspectRatio === "16:9" ? "default" : "outline"} 
                  onClick={() => setAspectRatio("16:9")}
                  className={aspectRatio === "16:9" ? "bg-purple-600 hover:bg-purple-700 flex-1" : "text-white hover:text-white hover:bg-white/10 border-white/20 flex-1"}
                >
                  16:9
                </Button>
                <Button 
                  variant={aspectRatio === "9:16" ? "default" : "outline"} 
                  onClick={() => setAspectRatio("9:16")}
                  className={aspectRatio === "9:16" ? "bg-purple-600 hover:bg-purple-700 flex-1" : "text-white hover:text-white hover:bg-white/10 border-white/20 flex-1"}
                >
                  9:16
                </Button>
                <Button 
                  variant={aspectRatio === "1:1" ? "default" : "outline"} 
                  onClick={() => setAspectRatio("1:1")}
                  className={aspectRatio === "1:1" ? "bg-purple-600 hover:bg-purple-700 flex-1" : "text-white hover:text-white hover:bg-white/10 border-white/20 flex-1"}
                >
                  1:1
                </Button>
              </div>
            </div>
            
            <div className="pt-4 border-t border-white/10">
              <Button 
                onClick={handleDownload}
                disabled={isDownloading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold h-12 disabled:opacity-50"
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Rendering MP4... (Takes ~1 min)
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-5 w-5" />
                    Download MP4
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Video Player */}
        <div className="w-full md:w-2/3 rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black flex justify-center items-center h-full min-h-[400px]">
          <Player
            component={ActiveComponent}
            inputProps={{
              title,
              subtitle,
              brandColor,
            }}
            durationInFrames={900}
            fps={30}
            compositionWidth={width}
            compositionHeight={height}
            style={{
              width: "100%",
              aspectRatio: aspectRatio === "16:9" ? "16/9" : aspectRatio === "9:16" ? "9/16" : "1/1",
              maxHeight: "70vh", // Prevent portrait from being too tall on screen
            }}
            controls
            autoPlay
            loop
          />
        </div>
      </div>
    </div>
  );
}
