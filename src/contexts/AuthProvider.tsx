import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { friendlyAuthError } from '../lib/auth-errors';
import type { Profile } from '../types/database';

type SignUpInput = {
  email: string;
  password: string;
  fullName: string;
  companyId?: string;
};

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (input: SignUpInput) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  clearError: () => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = useCallback(async (userId: string) => {
    const { data, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profileError) {
      setProfile(null);
      setError('Login realizado, mas não foi possível carregar seu perfil.');
      return;
    }

    setProfile(data as Profile);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!session?.user.id) return;
    await loadProfile(session.user.id);
  }, [loadProfile, session?.user.id]);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(async ({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      if (data.session?.user.id) await loadProfile(data.session.user.id);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setError(null);

      if (nextSession?.user.id) {
        void loadProfile(nextSession.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [loadProfile]);

  const signIn = useCallback(async (email: string, password: string) => {
    setError(null);
    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      const message = friendlyAuthError(signInError.message);
      setError(message);
      throw new Error(message);
    }
    if (data.user) await loadProfile(data.user.id);
  }, [loadProfile]);

  const signUp = useCallback(async ({ email, password, fullName, companyId }: SignUpInput) => {
    setError(null);
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, company_id: companyId ?? null },
      },
    });

    if (signUpError) {
      const message = friendlyAuthError(signUpError.message);
      setError(message);
      throw new Error(message);
    }

    if (data.user) {
      const { error: profileError } = await supabase.from('profiles').upsert({
        id: data.user.id,
        email,
        full_name: fullName,
        company_id: companyId ?? null,
        role: 'member',
      });

      if (profileError) {
        setError('Conta criada, mas não foi possível vincular seu perfil à empresa.');
        throw new Error('Conta criada, mas não foi possível vincular seu perfil à empresa.');
      }
    }
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    setError(null);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });
    if (resetError) {
      const message = friendlyAuthError(resetError.message);
      setError(message);
      throw new Error(message);
    }
  }, []);

  const signOut = useCallback(async () => {
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
      const message = friendlyAuthError(signOutError.message);
      setError(message);
      throw new Error(message);
    }
    setProfile(null);
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user: session?.user ?? null,
    session,
    profile,
    loading,
    error,
    signIn,
    signUp,
    resetPassword,
    signOut,
    refreshProfile,
    clearError: () => setError(null),
  }), [error, loading, profile, refreshProfile, resetPassword, session, signIn, signOut, signUp]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
