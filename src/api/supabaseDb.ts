import { supabase } from '../lib/supabase';
import { Event, Fight, Fighter, FightersInFight, Organization } from '../interfaces/';

// Events
export async function getAllEvents(): Promise<Event[] | null> {
  try {
    const { data: events, error } = await supabase.from('Events').select('*');
    if (error) {
      throw error;
    }
    return events;
  } catch (error) {
    throw error;
  }
}

export async function getEventById(eventId: number[]): Promise<Event[]> {
  try {
    const { data: event, error } = await supabase.from('Events').select('*').in('event_id', eventId);

    if (error) {
      throw error;
    }

    return event || [];
  } catch (error) {
    throw error;
  }
}

//Fights
export async function getFightsByEventId(eventId: number[]): Promise<Fight[]> {
  try {
    const { data: event, error } = await supabase.from('Fights').select('*').in('event_id', eventId);

    if (error) {
      throw error;
    }

    return event || [];
  } catch (error) {
    throw error;
  }
}

// Fighters
export async function getAllFighters(): Promise<Fighter[] | null> {
  try {
    const { data: events, error } = await supabase.from('Fighters').select('*');
    if (error) {
      throw error;
    }
    return events;
  } catch (error) {
    throw error;
  }
}

export async function getFighterById(fighterId: number[]): Promise<Fighter[]> {
  try {
    const { data: fighter, error } = await supabase.from('Fighters').select('*').in('fighter_id', fighterId);

    if (error) {
      throw error;
    }

    return fighter || [];
  } catch (error) {
    throw error;
  }
}

// Get  fighter through fighter_id in fightersInFight
export async function getFighterByFightersInFightFightId(fighterIds: number[]): Promise<Fighter[]> {
  try {
    const { data: fighters, error } = await supabase.from('Fighters').select('*').in('fighter_id', fighterIds);

    if (error) {
      throw error;
    }

    return fighters || [];
  } catch (error) {
    throw error;
  }
}

// FightersInFight
export async function getFightersInFightByFightId(fightId: number[]): Promise<FightersInFight[]> {
  try {
    const { data: fightersInFight, error } = await supabase.from('FightersInFight').select('*').in('fight_id', fightId);

    if (error) {
      throw error;
    }

    return fightersInFight || [];
  } catch (error) {
    throw error;
  }
}

// Organizations
export async function getAllOrganizations(): Promise<Organization[] | null> {
  try {
    const { data: events, error } = await supabase.from('Organizations').select('*');
    if (error) {
      throw error;
    }
    return events;
  } catch (error) {
    throw error;
  }
}

export async function getOrganizationById(organizationId: number[]): Promise<Organization[]> {
  try {
    const { data: organization, error } = await supabase
      .from('Organizations')
      .select('*')
      .in('organization_id', organizationId);

    if (error) {
      throw error;
    }

    return organization || [];
  } catch (error) {
    throw error;
  }
}

// You can create more functions for fetching specific events or other data as needed
