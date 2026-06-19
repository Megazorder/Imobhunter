# Fluxo dos dados

## Objetivo

Garantir que dados transitem por camadas previsíveis, evitando acoplamento entre interface, regra de aplicação e infraestrutura.

## Fluxo de leitura

```txt
Page
  -> Hook
    -> Service
      -> Repository
        -> Supabase client em src/lib/
      <- Dados normalizados
    <- Estado de aplicação
  <- Renderização
```

## Fluxo de escrita

```txt
Component/Page
  -> Hook de ação
    -> Service valida orquestração
      -> Repository persiste alteração
        -> Supabase
      <- Resultado normalizado
    <- Estado atualizado/erro tratado
  <- Feedback visual
```

## Responsabilidades

- **Pages:** compor a tela e acionar hooks.
- **Components:** exibir dados e disparar eventos simples.
- **Hooks:** coordenar estado local, loading, erro e chamadas de services.
- **Services:** orquestrar operações e políticas de aplicação.
- **Repositories:** isolar persistência e detalhes de consulta.
- **Lib:** configurar clientes externos.
- **Types:** definir contratos usados no fluxo.

## Escalabilidade

Para bases grandes, todo fluxo de dados deve considerar:

- paginação obrigatória;
- filtros indexáveis;
- seleção explícita de colunas;
- cache e invalidação previsível;
- tratamento padronizado de erros;
- monitoramento de latência;
- proteção contra consultas excessivamente amplas.
