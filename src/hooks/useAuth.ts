import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@/types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const getSession = async () => {
      try {
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        if (mounted) {
          setUser(currentUser as User | null);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Auth error'));
          setLoading(false);
        }
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (mounted) {
          setUser(session?.user as User | null);
        }
      }
    );

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  return { user, loading, error };
}

export function useIsAdmin() {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkAdmin = async () => {
      if (!user?.email) {
        if (mounted) {
          setIsAdmin(false);
          setLoading(false);
        }
        return;
      }

      try {
        const { data, error } = await supabase
          .from('admin_users')
          .select('role')
          .eq('email', user.email)
          .single();

        if (mounted) {
          setIsAdmin(!!data && data.role === 'admin');
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setIsAdmin(false);
          setLoading(false);
        }
      }
    };

    checkAdmin();

    return () => {
      mounted = false;
    };
  }, [user?.email]);

  return { isAdmin, loading };
}
