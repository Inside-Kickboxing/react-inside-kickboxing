import { supabase } from '../lib/supabase';
import { Event, Fighter, Organization } from '../interfaces/';

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
