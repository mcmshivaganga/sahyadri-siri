import React, { useState, useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import { motion } from 'motion/react';
import { Shield, AlertTriangle, Droplets, Info } from 'lucide-react';
import { Report } from '../types';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

export default function MapView() {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/reports')
      .then(res => res.json())
      .then(data => setReports(data));
  }, []);

  if (!hasValidKey) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-lg border border-slate-100">
          <Shield className="w-16 h-16 text-blue-600 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4">Google Maps API Key Required</h2>
          <p className="text-slate-600 mb-6">
            To view the real-time health map, please add your Google Maps API key.
          </p>
          <div className="text-left space-y-4">
            <p className="font-semibold text-sm text-slate-900 uppercase tracking-wider">Steps to setup:</p>
            <ol className="list-decimal list-inside space-y-2 text-slate-600 text-sm">
              <li>Open <strong>Settings</strong> (⚙️ top-right)</li>
              <li>Go to <strong>Secrets</strong></li>
              <li>Add key: <code>GOOGLE_MAPS_PLATFORM_KEY</code></li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  const selectedReport = reports.find(r => r.id === selectedId);

  return (
    <div className="h-[calc(100vh-64px)] relative flex flex-col md:flex-row overflow-hidden bg-white">
      {/* Sidebar - Alert Feed */}
      <div className="w-full md:w-80 h-1/3 md:h-full overflow-y-auto border-r border-slate-100 bg-slate-50/50 p-4">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-orange-500" />
          Alert Feed
        </h3>
        <div className="space-y-3 font-sans">
          {reports.map((report) => (
            <button
              key={report.id}
              onClick={() => setSelectedId(report.id)}
              className={`w-full text-left p-4 rounded-2xl transition-all border ${
                selectedId === report.id
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-[1.02]'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-sm truncate">{report.streamName}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  report.clarity > 3 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  Score: {report.clarity}/5
                </span>
              </div>
              <p className={`text-xs line-clamp-2 ${selectedId === report.id ? 'text-blue-50' : 'text-slate-500'}`}>
                {report.comments}
              </p>
              <div className={`mt-2 text-[10px] ${selectedId === report.id ? 'text-blue-100' : 'text-slate-400'}`}>
                {new Date(report.timestamp).toLocaleTimeString()} • {report.flow} Flow
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative">
        <APIProvider apiKey={API_KEY} version="weekly">
          <Map
            defaultCenter={{ lat: 13.5, lng: 75.0 }}
            defaultZoom={8}
            mapId="SAHYADRI_SIRI_MAP" // In a real app, use a proper Map ID for advanced markers
            className="w-full h-full"
            gestureHandling={'greedy'}
            disableDefaultUI={false}
            internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          >
            {reports.map((report) => (
              <MarkerWithInfo
                key={report.id}
                report={report}
                isSelected={selectedId === report.id}
                onSelect={() => setSelectedId(report.id)}
                onClose={() => setSelectedId(null)}
              />
            ))}
          </Map>
        </APIProvider>

        {/* Legend */}
        <div className="absolute bottom-6 right-6 p-4 bg-white/90 backdrop-blur shadow-lg rounded-2xl border border-slate-200 text-xs space-y-2 z-10 font-sans">
          <div className="font-bold mb-2">Water Quality Score</div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span>4-5 (Pristine/Safe)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span>3 (Caution/Testing req.)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span>1-2 (Hazardous/Polluted)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MarkerWithInfo({ report, isSelected, onSelect, onClose }: {
  report: Report;
  isSelected: boolean;
  onSelect: () => void;
  onClose: () => void;
  key?: string;
}) {
  const [markerRef, marker] = useAdvancedMarkerRef();

  const getHealthColor = (clarity: number) => {
    if (clarity >= 4) return '#22c55e'; // green-500
    if (clarity >= 3) return '#eab308'; // yellow-500
    return '#ef4444'; // red-500
  };

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={{ lat: report.lat, lng: report.lng }}
        onClick={onSelect}
      >
        <Pin
          background={getHealthColor(report.clarity)}
          borderColor="#fff"
          glyphColor="#fff"
          scale={isSelected ? 1.2 : 1}
        />
      </AdvancedMarker>
      {isSelected && (
        <InfoWindow
          anchor={marker}
          onCloseClick={onClose}
        >
          <div className="p-2 min-w-[200px] font-sans">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-4 h-4 text-blue-600" />
              <h4 className="font-bold text-slate-900">{report.streamName}</h4>
            </div>
            <div className="space-y-1 text-xs text-slate-600">
              <p><span className="font-semibold">Clarity:</span> {report.clarity}/5</p>
              <p><span className="font-semibold">Flow:</span> {report.flow}</p>
              <p><span className="font-semibold">Pollution:</span> {report.pollution}</p>
              <p className="mt-2 italic">"{report.comments}"</p>
              <p className="text-[10px] text-slate-400 mt-2">Reported by: {report.reporter}</p>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
}
