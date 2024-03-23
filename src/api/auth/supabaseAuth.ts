import { supabase } from '../../lib/supabase';

export async function signInWithEmail(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  } catch (error) {
    throw error;
  }
}

export async function signUp(email: string, password: string, displayName: string) {
  try {
    // Sign up the user with Supabase authentication
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    if (data && displayName) {
      // After successful signup, insert user data into the "users" table
      await createUserInUsersTable(data.user?.id as string, displayName);
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function createUserInUsersTable(authId: string, displayName: string) {
  try {
    // Insert user data into the "users" table
    const { data, error } = await supabase.from('Users').insert([
      {
        auth_id: authId,
        display_name: displayName,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(), // Set updated_at to current timestamp
      },
    ]);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export const checkDisplayNameUnique = async (displayName: string) => {
  try {
    // Query the 'users' table to check if the display name is unique
    const { data, error } = await supabase
      .from('Users') // Remove the schema prefix from the table name
      .select('display_name')
      .eq('display_name', displayName);

    if (error) {
      throw error;
    }

    // If data exists, display name is not unique
    return !data || data.length === 0;
  } catch (error) {
    console.error('Error checking display name uniqueness:', (error as Error).message);
    return false; // Return false in case of an error
  }
};
