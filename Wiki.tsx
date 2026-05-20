import { motion } from 'motion/react';
import { BookOpen, Droplets, Shield, Heart, Info, Globe, AlertCircle } from 'lucide-react';

export default function Wiki() {
  const sections = [
    {
      title: "Sacred Springs of Sahyadri",
      icon: Droplets,
      content: "The Western Ghats, also known as Sahyadri, are home to thousands of perennial springs. In local culture, these are often considered sacred (Devraj) and are the primary source of clean drinking water for forest dwellers and downstream villages.",
      color: "blue"
    },
    {
      title: "Why Clarity Matters",
      icon: Eye,
      content: "Sudden changes in water clarity (turbidity) often indicate upstream soil erosion, illegal mining, or industrial discharge. Monitoring clarity is the simplest way for citizens to detect early signs of ecosystem stress.",
      color: "cyan"
    },
    {
      title: "Common Pollutants",
      icon: AlertCircle,
      content: "Agricultural runoff (nitrates), industrial effluent, and untreated sewage are the biggest threats. Many streams show 'oily films' or 'strange foams' which should be reported immediately to prevent community health crises.",
      color: "orange"
    },
    {
      title: "The River System Connectivity",
      icon: Globe,
      content: "Remember that every stream is a vein in the larger Sahyadri river system. Pollution in a small spring at 800m altitude quickly affects major rivers like the Krishna, Kaveri, and Netravati, impacting millions.",
      color: "indigo"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 pt-12">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex p-3 bg-blue-100 rounded-2xl mb-4 text-blue-600"
        >
          <BookOpen className="w-8 h-8" />
        </motion.div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Educational Wiki</h1>
        <p className="text-slate-600 max-w-2xl mx-auto italic font-sans text-lg">
          "Understanding our natural resources is the first step toward preserving them."
        </p>
      </div>

      <div className="grid gap-12 mb-20">
        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <motion.section
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row gap-8 items-start"
            >
              <div className={`w-16 h-16 rounded-3xl flex-shrink-0 flex items-center justify-center bg-${section.color}-50 text-${section.color}-600`}>
                <Icon className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  {section.title}
                </h2>
                <div className="prose prose-slate prose-lg font-sans text-slate-600 leading-relaxed">
                  <p>{section.content}</p>
                </div>
              </div>
            </motion.section>
          );
        })}
      </div>

      <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden mb-20">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-400" />
            Citizen Stewardship
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-2xl leading-relaxed">
            By using Sahyadri-Siri, you are not just an app user; you are a steward of the Ghats. Your data provides the evidence needed for ecological conservation and holds polluters accountable.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h4 className="font-bold text-blue-400 mb-2 uppercase tracking-widest text-xs">Mission 01</h4>
              <p className="text-sm font-sans">Document all perennial springs in your taluk.</p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h4 className="font-bold text-blue-400 mb-2 uppercase tracking-widest text-xs">Mission 02</h4>
              <p className="text-sm font-sans">Report illegal sand mining and waste dumping.</p>
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
      </div>
    </div>
  );
}

function Eye(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
  );
}
