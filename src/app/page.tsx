import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-8 relative overflow-hidden text-center selection:bg-purple-500/30">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/40 via-black to-black -z-10" />
      
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-purple-300 text-sm font-medium mb-4 backdrop-blur-md">
          <Sparkles className="w-4 h-4" />
          <span>MotionForge AI is live</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">
          Create <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Viral Animations</span><br/> Online in Seconds
        </h1>
        
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          No complex timelines or keyframes. Pick a template, type your script, and let the AI Director build your motion graphics video instantly.
        </p>

        <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/hooks"
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-[0_0_40px_-10px_rgba(168,85,247,0.5)] transition-all hover:scale-105"
          >
            Browse Templates <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </main>
  );
}
