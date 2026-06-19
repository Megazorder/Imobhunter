# ImobHunter

Fundação do SaaS ImobHunter criada com React 19, TypeScript, Vite, Tailwind CSS, shadcn/ui-style components, Supabase Auth, React Router, TanStack Query, React Hook Form, Zod, ESLint e Prettier.

## Requisitos

- Node.js 20+
- npm
- Projeto Supabase com Auth habilitado

## Instalação

```bash
npm install
cp .env.example .env
```

Preencha o arquivo `.env` com as credenciais públicas do Supabase:

```bash
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-publica
```

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run format
npm run preview
```

## Estrutura

A aplicação segue Feature-Based Architecture:

```text
src/
 ├── app/                 # Providers e composição raiz
 ├── components/          # Componentes reutilizáveis de UI e compartilhados
 │   ├── ui/
 │   └── shared/
 ├── features/            # Funcionalidades por domínio
 │   ├── auth/
 │   ├── dashboard/
 │   └── settings/
 ├── hooks/
 ├── layouts/
 ├── lib/
 ├── services/
 ├── types/
 ├── utils/
 ├── routes/
 └── assets/
```

## Decisões técnicas

- **Vite + React 19 + TypeScript strict** para uma base rápida, moderna e fortemente tipada.
- **Feature-Based Architecture** para manter autenticação, dashboard e configurações isolados por domínio.
- **Supabase Auth** centralizado em `AuthProvider`, com sessão persistida automaticamente pelo cliente Supabase.
- **React Router** com rotas públicas e `ProtectedRoute` para proteger o layout administrativo.
- **TanStack Query** configurado no nível da aplicação para futuras integrações assíncronas sem acoplamento.
- **React Hook Form + Zod** nos fluxos de autenticação para validação declarativa e mensagens consistentes.
- **Tailwind CSS e componentes no padrão shadcn/ui** para UI reutilizável, com tokens preparados para tema claro/escuro.
- **ESLint + Prettier** para padronização de qualidade e formatação.

## Escopo implementado

- Login, cadastro, recuperação de senha e logout com Supabase Auth.
- Rotas protegidas e persistência automática da sessão.
- Layout administrativo com sidebar responsiva, header e área principal.
- Dashboard protegido com boas-vindas e informações reais da conta autenticada.
- `.env.example` sem valores fixos de credenciais.

## Fora do escopo deste sprint

Não foram implementados imóveis, CRM, landing pages, IA, mapas, scraping ou analytics.
