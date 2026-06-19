# Fluxo da autenticação

## Objetivo

Definir a direção arquitetural para autenticação futura sem implementar regras ou telas nesta etapa.

## Fluxo previsto

```txt
Página pública de autenticação
  -> Hook de autenticação
    -> AuthService
      -> AuthRepository
        -> Supabase Auth client
      <- Sessão/usuário normalizado
    <- Estado autenticado
  -> Redirecionamento conforme contexto
```

## Sessão

A sessão autenticada deve ser exposta para a aplicação por meio de context específico em `src/contexts/`, evitando chamadas diretas ao Supabase em componentes.

## Responsabilidades futuras

- `src/lib/`: inicialização do cliente Supabase.
- `src/repositories/`: comunicação direta com Supabase Auth.
- `src/services/`: orquestração de login, logout, recuperação de senha e renovação de sessão.
- `src/hooks/`: estado de loading, erro e ações usadas pela interface.
- `src/contexts/`: distribuição segura do usuário e sessão para a árvore React.
- `src/pages/`: composição das páginas públicas e privadas.

## Segurança

A autenticação deve considerar:

- uso de Row Level Security no Supabase;
- políticas por usuário, organização e perfil;
- separação entre dados públicos e privados;
- proteção de rotas autenticadas;
- tratamento seguro de tokens;
- logout global quando necessário;
- auditoria para ações críticas.
