// Organizations interface
export interface Organization {
  created_at: string;
  created_by: string;
  organization_description: string | null;
  organization_id: number;
  organization_name: string;
  organization_url: string | null;
  photo_url: string | null;
  updated_at: string | null;
  updated_by: string;
}

// Events interface
export interface Event {
  created_at: string;
  created_by: string;
  event_date: string | null;
  event_id: number;
  event_location: string | null;
  event_name: string;
  is_locked: boolean;
  organization_id: number;
  photo_url: string | null;
  updated_at: string | null;
  updated_by: string;
}

// Fighters interface
export interface Fighter {
  created_at: string;
  created_by: string;
  fighter_name: string;
  fighter_id: number;
  organization_id: number | null;
  photo_url: string | null;
  tapology_url: string | null;
  updated_at: string | null;
  updated_by: string;
  wikipedia_url: string | null;
}

// Fights interface
export interface Fight {
  created_at: string;
  created_by: string;
  event_id: number;
  fight_id: number;
  method: string | null;
  round: string | null;
  time_of_stoppage: string | null;
  title_name: string | null;
  tournament_name: string | null;
  updated_at: string | null;
  updated_by: string;
  weight_class: string | null;
  winner_id: number | null;
}

// FightersInFight interface
export interface FightersInFight {
  created_at: string;
  fight_id: number;
  fighter_id: number;
  fighter_in_fight_id: number;
  is_fighter1: boolean;
  updated_at: string | null;
}

// Scores interface
export interface Score {
  created_at: string;
  event_id: number;
  score: number;
  score_id: number;
  updated_at: string | null;
  user_id: number;
}

// User
export interface User {
  created_at: string;
  location: string | null;
  photo_url: string | null;
  updated_at: string | null;
  user_id: number;
  username: string;
}

// User Predictions
export interface UserPrediction {
  created_at: string;
  fight_id: number;
  method: string | null;
  predicted_winner_id: number | null;
  prediction_id: number;
  round: string | null;
  updated_at: string | null;
  user_id: number;
}

// Leaderboard
export interface EventLeaderboard {
  created_at: string;
  event_id: number;
  event_score: number;
  leaderboard_id: number;
  updated_at: string | null;
  user_id: number;
}

export interface WeeklyLeaderboard {
  created_at: string;
  leaderboard_id: number;
  updated_at: string | null;
  user_id: number;
  week_number: number;
  weekly_score: number;
  year: number;
}

export interface MonthlyLeaderboard {
  created_at: string;
  leaderboard_id: number;
  month_number: number;
  month_score: number;
  updated_at: string | null;
  user_id: number;
  year: number;
}

export interface AllTimeLeaderboard {
  all_time_score: number;
  created_at: string;
  leaderboard_id: number;
  updated_at: string | null;
  user_id: number;
}
