import VideoPlayer from "@/components/video-player";
import { ThemeType } from "@/remotion/StoryTimeline";

// This is required for Next.js App Router dynamic params
export default async function CustomizePage({ params }: { params: Promise<{ templateId: string }> }) {
  const resolvedParams = await params;
  
  return (
    <main className="min-h-screen bg-black p-8 md:p-24 pt-32 relative text-white">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black -z-10" />
      
      <div className="max-w-7xl mx-auto mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Customize Template
        </h1>
        <a href="/hooks" className="text-gray-400 hover:text-white transition-colors border border-gray-800 rounded-full px-4 py-2 text-sm font-medium hover:bg-white/5">
          ← Back to Gallery
        </a>
      </div>

      <VideoPlayer initialTemplate={resolvedParams.templateId as ThemeType} />
    </main>
  );
}
