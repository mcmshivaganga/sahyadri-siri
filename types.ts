export interface Report {
  id: string;
  streamName: string;
  clarity: number; // 1-5
  flow: 'Low' | 'Medium' | 'High';
  pollution: string;
  lat: number;
  lng: number;
  reporter: string;
  timestamp: string;
  comments: string;
}

export type WaterHealthScore = 1 | 2 | 3 | 4 | 5;
