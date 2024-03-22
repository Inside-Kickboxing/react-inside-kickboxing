import { supabase } from '../lib/supabase';
import { Event, Fight, Fighter, FightHistory, Organization } from '../interfaces/';
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

export async function getEventById(eventId: number[]): Promise<Event[]> {
  const query = supabase.from('Events').select('*').in('event_id', eventId);
  return querySupabase(query) || [];
}

//Fights
export async function getFightsByEventId(eventId: number[]): Promise<Fight[]> {
  const query = supabase.from('Fights').select('*').in('event_id', eventId);
  return querySupabase(query) || [];
}

// Fighters
export async function getAllFighters(): Promise<Fighter[] | null> {
  const query = supabase.from('Fighters').select('*');
  return querySupabase(query);
}

export async function getFighterById(fighterId: number[]): Promise<Fighter[]> {
  const query = supabase.from('Fighters').select('*').in('fighter_id', fighterId);
  return querySupabase(query) || [];
}

export async function getFightersByFightId(fightIds: number[]): Promise<Fighter[][]> {
  const query = supabase.from('Fighters').select('*').in('fight_id', fightIds);
  return querySupabase(query) || [];
}

// Organizations
export async function getAllOrganizations(): Promise<Organization[] | null> {
  const query = supabase.from('Organizations').select('*');
  return querySupabase(query);
}

export async function getOrganizationById(organizationId: number[]): Promise<Organization[]> {
  const query = supabase.from('Organizations').select('*').in('organization_id', organizationId);
  return querySupabase(query) || [];
}
