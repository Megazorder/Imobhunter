# Convenções de código

## Idioma

- Código, nomes de variáveis, funções, arquivos e commits devem preferir inglês.
- Documentação pode ser mantida em português.

## TypeScript

- Evitar `any` sem justificativa explícita.
- Preferir tipos e interfaces compartilhados em `src/types/`.
- Tipar entradas e saídas de serviços, repositórios e hooks.
- Manter contratos separados de detalhes de infraestrutura.

## React

- Componentes devem ser pequenos, reutilizáveis e sem regra de negócio complexa.
- Páginas devem compor layouts, componentes e hooks.
- Hooks devem encapsular estado, efeitos e orquestração de UI.
- Contexts devem ser usados apenas para estado global realmente necessário.

## Tailwind

- Utilizar classes utilitárias de forma consistente.
- Extrair padrões repetidos para componentes.
- Evitar lógica condicional extensa diretamente em strings de classe.

## Supabase

- Não acessar Supabase diretamente em componentes ou páginas.
- Centralizar cliente e configuração em `src/lib/`.
- Encapsular consultas em `src/repositories/`.
- Encapsular orquestrações em `src/services/`.

## Nomenclatura sugerida

- Componentes: `PascalCase.tsx`.
- Hooks: `useFeatureName.ts`.
- Contexts: `FeatureContext.tsx`.
- Services: `featureService.ts`.
- Repositories: `featureRepository.ts`.
- Types: `feature.ts` ou `feature.types.ts`.
- Utils: `formatDate.ts`, `parseCurrency.ts`, etc.

## Organização de imports

Ordem sugerida:

1. Bibliotecas externas.
2. Aliases internos.
3. Imports relativos.
4. Tipos.
5. Estilos/assets.

## Qualidade

Antes de novas implementações, recomenda-se configurar:

- ESLint;
- Prettier;
- testes unitários;
- testes de integração;
- verificação de tipos;
- pipeline de CI.
