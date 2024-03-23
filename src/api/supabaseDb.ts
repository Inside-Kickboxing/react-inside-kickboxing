import { supabase } from '../lib/supabase';
import { Event, Fight, Fighter, /*FightHistory, */ Organization, User } from '../interfaces/';
import { handleError } from '@/utils/errorHandler';

// Wrapper function for Supabase queries with error handling
async function querySupabase(query: any) {
  try {
    const { data, error } = await query;
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    handleError(error);
  }
}

// Events
export async function getAllEvents(): Promise<Event[] | null> {
  const query = supabase.from('Events').select('*');
  return querySupabase(query);
}

export async function getEventById(eventId: number): Promise<Event> {
  const query = supabase.from('Events').select('*').eq('event_id', eventId);
  return querySupabase(query).then((result) => (result ? result[0] : null));
}

//Fights
export async function getFightsByEventId(eventId: number): Promise<Fight[]> {
  const query = supabase.from('Fights').select('*').eq('event_id', eventId);
  return querySupabase(query) || [];
}
export async function getFightById(fightId: number): Promise<Fight[]> {
  const query = supabase.from('Fights').select('*').eq('fight_id', fightId);
  return querySupabase(query) || [];
}

// Fighters
export async function getAllFighters(): Promise<Fighter[] | null> {
  const query = supabase.from('Fighters').select('*');
  return querySupabase(query);
}

export async function getFighterById(fighterId: number): Promise<Fighter | null> {
  const query = supabase.from('Fighters').select('*').eq('fighter_id', fighterId);
  return querySupabase(query).then((result) => (result ? result[0] : null));
}

export async function getFightersByFightId(fightIds: number): Promise<Fighter[]> {
  const query = supabase.from('Fighters').select('*').eq('fight_id', fightIds);
  return querySupabase(query) || [];
}

// Organizations
export async function getAllOrganizations(): Promise<Organization[] | null> {
  const query = supabase.from('Organizations').select('*');
  return querySupabase(query);
}

export async function getOrganizationById(organizationId: number): Promise<Organization | null> {
  const query = supabase.from('Organizations').select('*').eq('organization_id', organizationId);
  return querySupabase(query).then((result) => (result ? result[0] : null));
}

// Users
export async function getUserByAuthId(authId: string): Promise<User> {
  const query = supabase.from('Users').select('*').eq('auth_id', authId);
  return querySupabase(query);
}
