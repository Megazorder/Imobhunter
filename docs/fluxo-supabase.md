# Fluxo do Supabase

## Objetivo

Definir como o Supabase deve ser integrado futuramente, mantendo a aplicação desacoplada da infraestrutura.

## Regra principal

Componentes, páginas, layouts e hooks não devem executar queries Supabase diretamente. O acesso deve passar por repositories e services.

## Fluxo previsto

```txt
UI
  -> Hooks/Contexts
    -> Services
      -> Repositories
        -> Supabase client
```

## `src/lib/`

Deve concentrar a criação e configuração de clientes externos, incluindo Supabase. Também pode conter configuração de observabilidade, feature flags e adaptadores técnicos.

## `src/repositories/`

Deve concentrar chamadas de banco, storage, realtime e auth, sempre retornando dados em contratos internos definidos em `src/types/`.

## `src/services/`

Deve orquestrar repositories, aplicar decisões de aplicação e padronizar respostas para hooks e contexts.

## Banco de dados

Para escala, o Supabase deve ser usado com:

- Row Level Security habilitado;
- policies revisadas por perfil de acesso;
- índices para campos filtrados e ordenados;
- queries paginadas;
- uso criterioso de realtime;
- migrations versionadas;
- separação clara entre tabelas transacionais, auditoria e agregações;
- funções ou views para consultas complexas quando necessário.

## Storage

Arquivos devem ser organizados por buckets, permissões e políticas de acesso. Uploads devem validar tamanho, tipo e ownership.

## Realtime

Realtime deve ser usado apenas onde gerar valor claro para o produto, evitando assinaturas amplas que prejudiquem performance.

## Edge Functions

Operações sensíveis, integrações com terceiros e tarefas que exigem segredo de servidor devem ser movidas para Edge Functions ou backend dedicado.
