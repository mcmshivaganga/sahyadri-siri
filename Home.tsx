import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Droplets, Map as MapIcon, ClipboardList, Shield, Zap, Heart } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6"
        >
          <Droplets className="w-4 h-4" />
          Protecting the Lifeblood of the Ghats
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6"
        >
          Community Water Monitoring for <span className="text-blue-600 italic">Sahyadri</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-slate-600 mb-10 leading-relaxed"
        >
          An early warning system powered by citizens. Map the cleanliness of our sacred springs and local streams to ensure safe water for all.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/report"
            className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold transition-all hover:bg-blue-700 hover:scale-[1.02] shadow-lg shadow-blue-200"
          >
            <ClipboardList className="mr-2 w-5 h-5" />
            Report Water Quality
          </Link>
          <Link
            to="/map"
            className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-white text-slate-700 font-semibold border border-slate-200 transition-all hover:bg-slate-50 hover:scale-[1.02] shadow-sm"
          >
            <MapIcon className="mr-2 w-5 h-5" />
            View Health Map
          </Link>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-20">
        <FeatureCard
          index={0}
          icon={Shield}
          title="Water Security"
          description="Protect the source of drinking water for millions in the Western Ghats."
          color="blue"
        />
        <FeatureCard
          index={1}
          icon={Zap}
          title="Early Warning"
          description="Instant notifications when pollution is detected upstream from your village."
          color="cyan"
        />
        <FeatureCard
          index={2}
          icon={Heart}
          title="Ecological Pride"
          description="Connect with nature and preserve the sacred heritage of our heritage springs."
          color="indigo"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-700 p-12 text-white overflow-hidden relative"
      >
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Why it matters?</h2>
          <p className="text-blue-100 text-lg mb-8">
            The Sahyadri range holds thousands of sacred springs. But industrial runoff and untreated waste are threatening these vital resources. By reporting what you see, you help create a real-time health map that protects everyone downstream.
          </p>
          <Link
            to="/wiki"
            className="inline-flex items-center px-6 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
          >
            Learn more in our Wiki <BookOpen className="ml-2 w-4 h-4" />
          </Link>
        </div>
        
        {/* Abstract background blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-400/20 rounded-full blur-2xl -ml-10 -mb-10" />
      </motion.div>
    </div>
  );
}

function FeatureCard({ index, icon: Icon, title, description, color }: any) {
  const colors: any = {
    blue: 'bg-blue-50 text-blue-600',
    cyan: 'bg-cyan-50 text-cyan-600',
    indigo: 'bg-indigo-50 text-indigo-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="p-8 rounded-3xl bg-white border border-slate-100 hover:border-blue-200 transition-all hover:shadow-xl hover:shadow-blue-50/50"
    >
      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6", colors[color])}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}

function BookOpen(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
