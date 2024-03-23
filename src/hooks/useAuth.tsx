import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { useContext, useState, useEffect, createContext } from 'react';

// create a context for authentication
const AuthContext = createContext<{
  session: Session | null | undefined;
  authUser: User | null | undefined;
  signOut: () => void;
}>({ session: null, authUser: null, signOut: () => {} });

export const AuthProvider = ({ children }: any) => {
  const [authUser, setAuthUser] = useState<User>();
  const [session, setSession] = useState<Session | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setData = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) throw error;
      setSession(session);
      setAuthUser(session?.user);
      setLoading(false);
    };

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setAuthUser(session?.user);
      setLoading(false);
    });

    setData();

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const value = {
    session,
    authUser,
    signOut: () => supabase.auth.signOut(),
  };

  // use a provider to pass down the value
  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

// export the useAuth hook
export const useAuth = () => {
  return useContext(AuthContext);
};
