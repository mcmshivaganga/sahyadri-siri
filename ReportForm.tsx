import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, Droplets, MapPin, Send, CheckCircle2, AlertCircle, Eye, Wind, Trash2 } from 'lucide-react';
import { cn } from '../lib/utils';

export default function ReportForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    streamName: '',
    clarity: 3,
    flow: 'Medium',
    pollution: 'None',
    comments: '',
    reporter: 'Anonymous',
    lat: 13.5,
    lng: 75.0
  });

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    setUseCurrentLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData(prev => ({
          ...prev,
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }));
        setLocationError(null);
      },
      (error) => {
        setLocationError('Unable to retrieve your location. Please check permissions.');
        setUseCurrentLocation(false);
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => navigate('/map'), 2000);
      }
    } catch (error) {
      console.error('Failed to submit report:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 pt-20 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-3xl shadow-xl border border-blue-50"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Report Submitted!</h2>
          <p className="text-slate-600 mb-8">
            Thank you for being a part of Sahyadri-Siri. Your contribution helps protect our water resources.
          </p>
          <p className="text-sm text-blue-600 font-medium animate-pulse">Redirecting to Map...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pt-12 font-sans">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-blue-100 rounded-2xl">
          <ClipboardList className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Report Observation</h1>
          <p className="text-slate-500">Contribute your observations to the community health map.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8">
            {/* Stream Identification */}
            <section>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Droplets className="w-5 h-5 text-blue-500" />
                Stream Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Stream or Spring Name</label>
                  <input
                    required
                    type="text"
                    value={formData.streamName}
                    onChange={e => setFormData({ ...formData, streamName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="e.g. Netravati Tributary, Sacred Spring X"
                  />
                </div>
              </div>
            </section>

            {/* Quality Metrics */}
            <section className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-slate-400" /> Clarity (1-5)
                </label>
                <div className="flex items-center gap-4">
                  {[1, 2, 3, 4, 5].map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setFormData({ ...formData, clarity: val })}
                      className={cn(
                        "w-10 h-10 rounded-full font-bold transition-all",
                        formData.clarity === val
                          ? "bg-blue-600 text-white scale-110 shadow-lg shadow-blue-200"
                          : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                      )}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
                  <Wind className="w-4 h-4 text-slate-400" /> Flow Level
                </label>
                <div className="flex gap-2">
                  {['Low', 'Medium', 'High'].map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setFormData({ ...formData, flow: val as any })}
                      className={cn(
                        "flex-1 py-2 px-4 rounded-xl border text-sm font-medium transition-all",
                        formData.flow === val
                          ? "bg-blue-50 border-blue-200 text-blue-600"
                          : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                      )}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Pollution */}
            <section>
              <label className="block text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
                <Trash2 className="w-4 h-4 text-slate-400" /> Observed Pollution
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['None', 'Garbage', 'Oily Film', 'Silt/Sand', 'Odor', 'Foam'].map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setFormData({ ...formData, pollution: val })}
                    className={cn(
                      "py-2 px-3 rounded-lg border text-xs font-medium transition-all text-center",
                      formData.pollution === val
                        ? "bg-orange-50 border-orange-200 text-orange-600"
                        : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                    )}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </section>

            {/* Location */}
            <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold flex items-center gap-2 uppercase tracking-wider text-slate-500">
                  <MapPin className="w-4 h-4" /> Location
                </h3>
                <button
                  type="button"
                  onClick={handleGetLocation}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 bg-white px-3 py-1.5 rounded-full border border-blue-200 shadow-sm transition-all active:scale-95"
                >
                  <MapPin className="w-3 h-3" />
                  {useCurrentLocation ? 'Refreshing...' : 'Use Current GPS'}
                </button>
              </div>
              
              {locationError && (
                <div className="mb-4 flex items-center gap-2 text-xs text-red-600 bg-red-50 p-2 rounded-lg border border-red-100">
                  <AlertCircle className="w-3 h-3" /> {locationError}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="block text-[10px] text-slate-400 font-bold uppercase">Latitude</span>
                  <span className="font-mono text-sm">{formData.lat.toFixed(6)}</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="block text-[10px] text-slate-400 font-bold uppercase">Longitude</span>
                  <span className="font-mono text-sm">{formData.lng.toFixed(6)}</span>
                </div>
              </div>
            </section>

            <section>
              <label className="block text-sm font-medium text-slate-700 mb-1 font-sans">Additional Comments</label>
              <textarea
                value={formData.comments}
                onChange={e => setFormData({ ...formData, comments: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all h-24 resize-none"
                placeholder="Describe clarity, smell, or any changes you've noticed..."
              />
            </section>

            <button
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-200"
            >
              {isSubmitting ? 'Submitting...' : (
                <>
                  <Send className="w-5 h-5" /> Submit Report
                </>
              )}
            </button>
          </form>
        </div>

        <div>
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm sticky top-24">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-blue-500" />
              Reporting Tips
            </h3>
            <ul className="space-y-4 text-sm text-slate-600 font-sans">
              <li className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-blue-600">1</div>
                <p>Observe the water from a safe distance, never enter deep or fast-flowing streams.</p>
              </li>
              <li className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-blue-600">2</div>
                <p>Note any unusual smells like chemicals, sewage, or excessive organic rot.</p>
              </li>
              <li className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-blue-600">3</div>
                <p>Look for foams or oily sheen on the surface, which could indicate industrial dumping.</p>
              </li>
              <li className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-blue-600">4</div>
                <p>Use "Anonymous" as reporter name if reporting sensitive information about illegal activities.</p>
              </li>
            </ul>

            <div className="mt-8 p-4 bg-orange-50 rounded-2xl border border-orange-100 italic text-xs text-orange-800 leading-relaxed">
              "When we protect our springs, we protect the heart of the Sahyadri."
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
