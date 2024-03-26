// Organizations interface
export interface Organization {
  id: number;
  name: string;
  description?: string;
  url?: string;
  photo_url?: string;
  created_at: string;
  updated_at?: string;
  created_by: string;
  updated_by: string;
}

// Events interface
export interface Event {
  id: number;
  name: string;
  date?: string;
  location?: string;
  organization_id: number;
  is_locked: boolean;
  photo_url?: string;
  created_at: string;
  updated_at?: string;
  created_by: string;
  updated_by: string;
}

// Fighters interface
export interface Fighter {
  id: number;
  name: string;
  created_at: string;
  updated_at?: string;
  photo_url?: string;
  organization_id?: number;
  created_by: string;
  updated_by: string;
  wikipedia_url?: string;
  tapology_url?: string;
  fight_id?: number;
}

// Fights interface
export interface Fight {
  id: number;
  event_id: number;
  created_at: string;
  updated_at?: string;
  winner_id?: number;
  method?: string;
  round?: string;
  time_of_stoppage?: string;
  created_by: string;
  updated_by: string;
  weight_class?: string;
  title_name?: string;
  tournament_name?: string;
}

// FightHistory interface
export interface FightHistory {
  id: number;
  fight_id: number;
  fighter_id: number;
  created_at: string;
}

// Scores interface
export interface Score {
  id: number;
  event_id: number;
  user_id: number;
  score: number;
  created_at: string;
  updated_at?: string;
}

// User interface
export interface User {
  id: number;
  auth_id: string;
  role: string; // 'admin' | 'user';
  display_name: string;
  location?: string;
  biography?: string;
  created_at: string;
  updated_at?: string;
}

// User Predictions interface
export interface UserPrediction {
  id: number;
  fight_id: number;
  user_id: number;
  predicted_winner_id?: number;
  method?: string;
  round?: string;
  created_at: string;
  updated_at?: string;
}

// User Event Tracking interface
export interface UserEventTracking {
  id: number;
  created_at: string;
  event_id: number;
  user_id: number;
  watched?: boolean;
  want_to_watch?: boolean;
  rating?: number;
  dated_watched?: Date;
}

// Leaderboard interfaces
export interface EventLeaderboard {
  id: number;
  event_id: number;
  user_id: number;
  event_score: number;
  created_at: string;
  updated_at?: string;
}

export interface WeeklyLeaderboard {
  id: number;
  week_number: number;
  year: number;
  user_id: number;
  weekly_score: number;
  created_at: string;
  updated_at?: string;
}

export interface MonthlyLeaderboard {
  id: number;
  month_number: number;
  year: number;
  user_id: number;
  month_score: number;
  created_at: string;
  updated_at?: string;
}

export interface AllTimeLeaderboard {
  id: number;
  user_id: number;
  all_time_score: number;
  created_at: string;
  updated_at?: string;
}
