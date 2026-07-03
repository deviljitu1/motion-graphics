import Link from 'next/link';

export const metadata = {
  title: 'Templates - MotionForge AI',
};

const templates = [
  {
    id: 'SearchAnimationScene',
    title: 'Google Search Animation',
    description: 'Simulate a user typing a query into a search engine.',
    category: 'Viral Hooks',
    color: 'from-blue-500 to-green-500'
  },
  {
    id: 'TweetMockupScene',
    title: 'Viral Tweet Mockup',
    description: 'A glassmorphism Twitter post with ticking engagement.',
    category: 'Social Media',
    color: 'from-blue-400 to-indigo-500'
  },
  {
    id: 'CyberpunkScene',
    title: 'Cyberpunk Grid',
    description: 'Neon colors and a retro-futuristic grid.',
    category: 'SaaS Promos',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'HeroScene',
    title: 'Standard Clean',
    description: 'A clean, professional look for corporate videos.',
    category: 'SaaS Promos',
    color: 'from-indigo-500 to-cyan-500'
  },
  {
    id: 'MinimalistScene',
    title: 'Minimalist Sliding',
    description: 'Smooth sliding animations with a minimalist aesthetic.',
    category: 'Educational',
    color: 'from-gray-700 to-gray-900'
  }
];

export default function HooksGallery() {
  return (
    <div className="min-h-screen bg-black text-white p-8 md:p-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Viral Animation Templates
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Choose a template below to start customizing your AI-generated motion graphics video. No complex timelines required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((tpl) => (
            <Link 
              key={tpl.id} 
              href={`/hooks/${tpl.id}/customize`}
              className="group flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all hover:-translate-y-1 shadow-lg shadow-black/50"
            >
              <div className={`h-48 w-full bg-gradient-to-br ${tpl.color} opacity-80 group-hover:opacity-100 transition-opacity flex items-center justify-center`}>
                <span className="text-4xl opacity-50 font-bold mix-blend-overlay">Preview</span>
              </div>
              <div className="p-6">
                <div className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-2">
                  {tpl.category}
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-purple-300 transition-colors">
                  {tpl.title}
                </h3>
                <p className="text-gray-400">
                  {tpl.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
