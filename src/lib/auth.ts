import { supabase } from './supabase';
import { User } from '@/types';

export const authService = {
  async getSession() {
    const { data, error } = await supabase.auth.getSession();
    return { session: data.session, error };
  },

  async signInWithGoogle() {
    return supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/admin`,
      },
    });
  },

  async signOut() {
    return supabase.auth.signOut();
  },

  async getCurrentUser() {
    const { data, error } = await supabase.auth.getUser();
    return { user: data.user as User | null, error };
  },

  async onAuthStateChange(callback: (user: User | null) => void) {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        callback(session.user as User);
      } else {
        callback(null);
      }
    });
    return data.subscription;
  },
};
