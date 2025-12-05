export interface Tip {
  title: string;
  description: string;
  category: 'Strategy' | 'Secret' | 'Mechanic' | 'General';
}

export interface GameData {
  gameName: string;
  tips: Tip[];
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface SearchHistoryItem {
  gameName: string;
  timestamp: number;
}