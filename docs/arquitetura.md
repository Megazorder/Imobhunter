# Arquitetura do ImobHunter

## Visão geral

O ImobHunter deve seguir Clean Architecture, mantendo a regra de negócio independente de frameworks, bibliotecas de UI, banco de dados e provedores externos.

Nesta etapa, a estrutura contém apenas diretórios e documentação. Nenhuma regra de negócio foi implementada.

## Princípios

- **Independência de framework:** React, Vite, Tailwind e Supabase são detalhes de entrega e infraestrutura.
- **Separação de responsabilidades:** cada pasta tem uma finalidade clara.
- **Baixo acoplamento:** páginas e componentes não devem acessar diretamente recursos externos.
- **Alta coesão:** arquivos relacionados ao mesmo papel arquitetural devem permanecer próximos.
- **Evolução modular:** novos domínios podem ser adicionados sem reescrever a base.
- **Escalabilidade operacional:** a arquitetura deve considerar performance, observabilidade, segurança e isolamento de responsabilidades.

## Camadas previstas

### Interface

Responsável pela experiência visual e composição de telas.

Pastas relacionadas:

- `src/components/`
- `src/pages/`
- `src/layouts/`
- `src/assets/`

### Aplicação

Responsável por orquestrar fluxos de uso da aplicação, estados de UI e composição entre interface e domínio.

Pastas relacionadas:

- `src/hooks/`
- `src/contexts/`
- `src/services/`

### Domínio

Responsável por contratos, tipos, entidades e regras puras quando forem criadas futuramente.

Pastas relacionadas:

- `src/types/`
- futuros módulos de domínio, se necessário.

### Infraestrutura

Responsável por comunicação com Supabase, APIs externas, storage, autenticação, cache e adaptadores.

Pastas relacionadas:

- `src/lib/`
- `src/repositories/`

### Compartilhado

Responsável por utilitários puros e helpers sem dependência de UI ou infraestrutura.

Pastas relacionadas:

- `src/utils/`

## Regra de dependência

Dependências devem apontar para dentro da aplicação, nunca para fora:

```txt
UI -> Hooks/Contexts -> Services -> Repositories -> Lib/Infra
                  -> Types/Utils
```

Regras futuras de negócio não devem depender de React, Supabase ou Tailwind.

## Preparação para escala

Para suportar crescimento acima de 100 mil usuários, a arquitetura deve permitir:

- paginação e filtros em todas as listagens críticas;
- cache local e remoto quando apropriado;
- controle de permissões por perfil e organização;
- uso rigoroso de Row Level Security no Supabase;
- telemetria e logs estruturados;
- limites de taxa em operações sensíveis;
- separação futura por módulos ou pacotes;
- lazy loading de páginas e componentes pesados;
- versionamento de contratos e migrações.
