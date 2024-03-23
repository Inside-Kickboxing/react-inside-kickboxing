// Organizations interface
export interface Organization {
  organization_id: number;
  organization_name: string;
  organization_description: string | null;
  organization_url: string | null;
  photo_url: string | null;
  created_at: string;
  updated_at: string | null;
  created_by: string;
  updated_by: string;
}

// Events interface
export interface Event {
  event_id: number;
  event_name: string;
  event_date: string | null;
  event_location: string | null;
  organization_id: number;
  is_locked: boolean;
  photo_url: string | null;
  created_at: string;
  updated_at: string | null;
  created_by: string;
  updated_by: string;
}

// Fighters interface
export interface Fighter {
  fighter_id: number;
  fighter_name: string;
  created_at: string;
  updated_at: string | null;
  photo_url?: string | null;
  organization_id?: number | null;
  created_by: string;
  updated_by: string;
  wikipedia_url?: string | null;
  tapology_url?: string | null;
  fight_id?: number | null;
}

// Fights interface
export interface Fight {
  fight_id: number;
  event_id: number;
  created_at: string;
  updated_at: string | null;
  winner_id?: number | null;
  method?: string | null;
  round?: string | null;
  time_of_stoppage?: string | null;
  created_by: string;
  updated_by: string;
  weight_class?: string | null;
  title_name?: string | null;
  tournament_name?: string | null;
}

// FightHistory interface
export interface FightHistory {
  fight_history_id: number;
  fight_id: number;
  fighter_id: number;
  created_at: string;
}

// Scores interface
export interface Score {
  score_id: number;
  event_id: number;
  user_id: number;
  score: number;
  created_at: string;
  updated_at: string | null;
}

// User interface
export interface User {
  user_id: number;
  username: string;
  location: string | null;
  photo_url: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface UserEventTracking {
  id: number;
  created_at: string;
  event_id: number;
  user_id: number;
  watched: boolean | null;
  want_to_watch: boolean | null;
  rating: number | null;
}

// User Predictions interface
export interface UserPrediction {
  prediction_id: number;
  fight_id: number;
  user_id: number;
  predicted_winner_id: number | null;
  method: string | null;
  round: string | null;
  created_at: string;
  updated_at: string | null;
}

// Leaderboard interfaces
export interface EventLeaderboard {
  leaderboard_id: number;
  event_id: number;
  user_id: number;
  event_score: number;
  created_at: string;
  updated_at: string | null;
}

export interface WeeklyLeaderboard {
  leaderboard_id: number;
  week_number: number;
  year: number;
  user_id: number;
  weekly_score: number;
  created_at: string;
  updated_at: string | null;
}

export interface MonthlyLeaderboard {
  leaderboard_id: number;
  month_number: number;
  year: number;
  user_id: number;
  month_score: number;
  created_at: string;
  updated_at: string | null;
}

export interface AllTimeLeaderboard {
  leaderboard_id: number;
  user_id: number;
  all_time_score: number;
  created_at: string;
  updated_at: string | null;
}
