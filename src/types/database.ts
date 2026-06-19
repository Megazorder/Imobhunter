export type Profile = {
  id: string;
  company_id: string | null;
  full_name: string | null;
  email: string | null;
  role: string | null;
  created_at: string;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: {
          id: string;
          company_id?: string | null;
          full_name?: string | null;
          email?: string | null;
          role?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>;
      };
      companies: {
        Row: { id: string; name: string; invite_code: string | null; created_at: string };
        Insert: { id?: string; name: string; invite_code?: string | null; created_at?: string };
        Update: { name?: string; invite_code?: string | null };
      };
    };
  };
};
