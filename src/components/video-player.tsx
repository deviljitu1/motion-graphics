"use client";

import { useState, useMemo } from "react";
import { Player } from "@remotion/player";
import { StoryTimeline, SceneData } from "@/remotion/StoryTimeline";
import { Button } from "@/components/ui/button";
import { Loader2, Download, Film, Clock } from "lucide-react";

export default function VideoPlayer() {
  const [brandColor, setBrandColor] = useState("#a855f7");
  const [aspectRatio, setAspectRatio] = useState<"16:9" | "9:16" | "1:1">("16:9");
  const [template, setTemplate] = useState<"HeroScene" | "CyberpunkScene" | "MinimalistScene">("HeroScene");
  
  const [scenes, setScenes] = useState<SceneData[]>([
    {
      title: "MotionForge AI",
      subtitle: "Professional videos in seconds.",
      durationInSeconds: 5
    }
  ]);

  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Calculate total duration
  const totalDurationInSeconds = useMemo(() => {
    return scenes.reduce((acc, scene) => acc + scene.durationInSeconds, 0);
  }, [scenes]);

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
        if (data.scenes && Array.isArray(data.scenes)) {
          setScenes(data.scenes);
        }
        if (data.theme) {
          setTemplate(data.theme);
        }
        if (data.brandColor) {
          setBrandColor(data.brandColor);
        }
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
          template: "StoryTimeline", // Always use the master composition
          theme: template,
          scenes,
          brandColor
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to render video");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `storyboard-video.mp4`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      console.error(error);
      alert("Render failed: " + error.message + "\n(Note: Vercel may timeout for long videos. Test this locally!)");
    } finally {
      setIsDownloading(false);
    }
  };

  let width = 1920;
  let height = 1080;
  if (aspectRatio === "9:16") { width = 1080; height = 1920; } 
  else if (aspectRatio === "1:1") { width = 1080; height = 1080; }

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-8">
      {/* AI Generator Bar */}
      <div className="w-full bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/30 rounded-xl p-6 backdrop-blur-md flex flex-col md:flex-row gap-4 items-end shadow-lg shadow-purple-900/20">
        <div className="flex-1 w-full">
          <label className="block text-sm text-purple-200 mb-2 font-medium">Describe your project (AI Video Director)</label>
          <input 
            type="text" 
            placeholder="e.g. A 30s promo for a neon cyberpunk coffee shop, explain the benefits..."
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            className="w-full bg-black/60 border border-purple-500/30 rounded-md px-4 py-4 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all text-lg"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleGenerate();
            }}
          />
        </div>
        <Button 
          onClick={handleGenerate}
          disabled={isGenerating || !aiPrompt}
          className="w-full md:w-auto h-[60px] px-8 bg-purple-600 hover:bg-purple-500 text-white font-bold disabled:opacity-50 text-lg rounded-md"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-3 h-6 w-6 animate-spin" />
              Directing Story...
            </>
          ) : (
            "✨ Generate Storyboard"
          )}
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
        {/* Controls & Script Panel */}
        <div className="w-full lg:w-[400px] flex flex-col gap-6">
          
          {/* Global Settings */}
          <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
            <h2 className="text-xl font-semibold mb-4 text-white flex items-center"><Film className="w-5 h-5 mr-2"/> Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1 font-semibold">Theme</label>
                <select
                  value={template}
                  onChange={(e) => setTemplate(e.target.value as any)}
                  className="w-full bg-black/50 border border-white/20 rounded-md px-3 py-2 text-white focus:outline-none focus:border-purple-500 appearance-none"
                >
                  <option value="HeroScene">Standard Clean</option>
                  <option value="CyberpunkScene">Cyberpunk Grid</option>
                  <option value="MinimalistScene">Minimalist Sliding</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1 font-semibold">Brand Color</label>
                <div className="flex gap-3">
                  <input type="color" value={brandColor} onChange={(e) => setBrandColor(e.target.value)} className="h-10 w-14 rounded-md cursor-pointer border-0 p-0 bg-transparent" />
                  <input type="text" value={brandColor} onChange={(e) => setBrandColor(e.target.value)} className="flex-1 bg-black/50 border border-white/20 rounded-md px-3 py-2 text-white uppercase focus:outline-none focus:border-purple-500" />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2 font-semibold">Aspect Ratio</label>
                <div className="flex gap-2">
                  <Button variant={aspectRatio === "16:9" ? "default" : "outline"} onClick={() => setAspectRatio("16:9")} className={aspectRatio === "16:9" ? "bg-purple-600 hover:bg-purple-700 flex-1" : "text-white hover:text-white hover:bg-white/10 border-white/20 flex-1"}>16:9</Button>
                  <Button variant={aspectRatio === "9:16" ? "default" : "outline"} onClick={() => setAspectRatio("9:16")} className={aspectRatio === "9:16" ? "bg-purple-600 hover:bg-purple-700 flex-1" : "text-white hover:text-white hover:bg-white/10 border-white/20 flex-1"}>9:16</Button>
                  <Button variant={aspectRatio === "1:1" ? "default" : "outline"} onClick={() => setAspectRatio("1:1")} className={aspectRatio === "1:1" ? "bg-purple-600 hover:bg-purple-700 flex-1" : "text-white hover:text-white hover:bg-white/10 border-white/20 flex-1"}>1:1</Button>
                </div>
              </div>
            </div>
          </div>

          {/* AI Storyboard Editor */}
          <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md flex-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Storyboard</h2>
              <span className="text-sm bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full border border-purple-500/30 font-mono">
                {totalDurationInSeconds}s
              </span>
            </div>
            
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {scenes.map((scene, idx) => (
                <div key={idx} className="bg-black/40 border border-white/10 rounded-lg p-4 relative group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-purple-500 rounded-l-lg opacity-50"></div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-gray-500 uppercase">Scene {idx + 1}</span>
                    <span className="text-xs flex items-center text-gray-400 bg-white/5 px-2 py-1 rounded">
                      <Clock className="w-3 h-3 mr-1" /> {scene.durationInSeconds}s
                    </span>
                  </div>
                  <input 
                    className="w-full bg-transparent text-white font-semibold text-lg focus:outline-none focus:bg-white/5 rounded px-1 -ml-1 mb-1"
                    value={scene.title}
                    onChange={(e) => {
                      const newScenes = [...scenes];
                      newScenes[idx].title = e.target.value;
                      setScenes(newScenes);
                    }}
                  />
                  <textarea 
                    className="w-full bg-transparent text-gray-400 text-sm focus:outline-none focus:bg-white/5 rounded px-1 -ml-1 resize-none"
                    value={scene.subtitle}
                    rows={2}
                    onChange={(e) => {
                      const newScenes = [...scenes];
                      newScenes[idx].subtitle = e.target.value;
                      setScenes(newScenes);
                    }}
                  />
                </div>
              ))}
            </div>
            
            <div className="pt-6 mt-2 border-t border-white/10">
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
                    Download {totalDurationInSeconds}s Video
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Video Player */}
        <div className="flex-1 rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black flex justify-center items-center h-full min-h-[400px] lg:sticky lg:top-8">
          <Player
            component={StoryTimeline}
            inputProps={{
              theme: template,
              scenes: scenes,
              brandColor,
            }}
            durationInFrames={Math.max(30, totalDurationInSeconds * 30)}
            fps={30}
            compositionWidth={width}
            compositionHeight={height}
            style={{
              width: "100%",
              aspectRatio: aspectRatio === "16:9" ? "16/9" : aspectRatio === "9:16" ? "9/16" : "1/1",
              maxHeight: "80vh",
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
