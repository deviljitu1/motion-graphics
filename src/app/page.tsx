import VideoPlayer from "@/components/video-player";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black -z-10" />
      
      <div className="container mx-auto px-4 py-24 flex flex-col items-center">
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-purple-300 backdrop-blur-md">
            ✨ MotionForge AI MVP
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent">
            Generate motion graphics <br className="hidden md:block" /> with AI.
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Create professional SaaS explainer videos, startup launch videos, and marketing ads from text prompts in seconds.
          </p>
        </div>

        <VideoPlayer />
      </div>
    </main>
  );
}
