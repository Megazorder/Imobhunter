# ImobHunter

Aplicação React + Supabase para gestão imobiliária.

## Autenticação

Configure as variáveis copiando `.env.example` para `.env.local` e preenchendo `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.

Execute `supabase/auth_schema.sql` no SQL editor do Supabase para criar `profiles`, vínculo com `companies` e políticas RLS compatíveis com o fluxo de cadastro.

## Scripts

- `npm run dev` — ambiente local
- `npm run build` — valida TypeScript e gera build de produção
- `npm run lint` — valida lint
