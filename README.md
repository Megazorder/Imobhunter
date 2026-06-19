# ImobHunter — README técnico

ImobHunter é um SaaS imobiliário preparado para evoluir com React, TypeScript, Vite, Supabase e Tailwind CSS, seguindo princípios de Clean Architecture.

> Estado atual: este repositório contém apenas a estrutura inicial da arquitetura. Não há telas, regras de negócio, integrações ou fluxos implementados.

## Stack prevista

- **React** para composição da interface.
- **TypeScript** para tipagem estática e contratos claros.
- **Vite** para build e ambiente de desenvolvimento.
- **Supabase** para autenticação, banco de dados, storage, realtime e edge functions quando necessário.
- **Tailwind CSS** para design system utilitário e escalável.

## Objetivo da estrutura

A estrutura foi organizada para permitir crescimento sustentável, separação de responsabilidades e baixa dependência entre camadas. A arquitetura deve suportar evolução para múltiplos módulos, times, integrações externas e uma base superior a 100 mil usuários.

## Estrutura inicial

```txt
src/
  assets/
  components/
  contexts/
  hooks/
  layouts/
  lib/
  pages/
  repositories/
  services/
  types/
  utils/
docs/
  arquitetura.md
  convencoes.md
  estrutura-de-pastas.md
  fluxo-autenticacao.md
  fluxo-dados.md
  fluxo-supabase.md
```

## Documentação

- [Arquitetura](docs/arquitetura.md)
- [Convenções de código](docs/convencoes.md)
- [Estrutura de pastas](docs/estrutura-de-pastas.md)
- [Fluxo dos dados](docs/fluxo-dados.md)
- [Fluxo da autenticação](docs/fluxo-autenticacao.md)
- [Fluxo do Supabase](docs/fluxo-supabase.md)

## Diretrizes de escalabilidade

- Separar regras de negócio de detalhes de UI e infraestrutura.
- Centralizar contratos e tipos compartilhados.
- Encapsular integrações externas em bibliotecas, serviços e repositórios.
- Evitar acoplamento direto entre páginas e Supabase.
- Planejar cache, paginação, observabilidade, auditoria e limites de acesso desde o início.
- Preparar a base para code splitting, lazy loading e módulos independentes.

## Próximos passos sugeridos

1. Inicializar Vite, React, TypeScript e Tailwind.
2. Configurar Supabase client em `src/lib/`.
3. Definir contratos globais em `src/types/`.
4. Criar módulos por domínio quando as primeiras regras de negócio forem definidas.
5. Adicionar testes, lint, formatador e pipeline de CI/CD.
