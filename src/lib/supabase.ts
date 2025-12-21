import { createClient } from '@supabase/supabase-js';

// Validação das variáveis de ambiente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('⚠️ Variáveis de ambiente do Supabase não configuradas!');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓ Configurada' : '✗ Ausente');
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✓ Configurada' : '✗ Ausente');
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || '',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

// Tipos do banco de dados
export type Profile = {
  id: string;
  nome: string;
  nivel: string;
  objetivo: string | null;
  created_at: string;
  updated_at: string;
};

export type UserWorkout = {
  id: string;
  user_id: string;
  nome: string;
  tipo: string;
  progresso: number;
  ultima_sessao: string | null;
  proxima_sessao: string | null;
  celebridade_id: string | null;
  created_at: string;
  updated_at: string;
};

export type WorkoutHistory = {
  id: string;
  user_id: string;
  workout_id: string | null;
  data: string;
  duracao_minutos: number | null;
  calorias_queimadas: number | null;
  exercicios_completos: number | null;
  created_at: string;
};

export type TrainingCalendar = {
  id: string;
  user_id: string;
  data: string;
  treinou: boolean;
  created_at: string;
};
