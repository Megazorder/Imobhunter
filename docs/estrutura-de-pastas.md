# Estrutura de pastas

## `src/assets/`

Arquivos estáticos usados pela aplicação, como imagens, ícones, fontes e ilustrações.

## `src/components/`

Componentes reutilizáveis e independentes de rota. Não devem conter regra de negócio ou chamadas diretas ao Supabase.

## `src/contexts/`

Providers e contexts React para estado global transversal, como sessão autenticada, tema ou preferências.

## `src/hooks/`

Hooks customizados para encapsular estado, efeitos, leitura de contexts e orquestração de casos de uso da interface.

## `src/layouts/`

Estruturas de layout compartilhadas entre páginas, como layout autenticado, layout público e shells administrativos.

## `src/lib/`

Configuração de bibliotecas externas e clientes de infraestrutura, como Supabase, analytics, feature flags e observabilidade.

## `src/pages/`

Componentes de página associados a rotas. Devem compor layouts, components e hooks, sem concentrar regras de negócio.

## `src/repositories/`

Adaptadores de persistência e acesso a dados. Devem encapsular consultas Supabase e mapear dados externos para contratos internos.

## `src/services/`

Orquestração de operações da aplicação. Services consomem repositories e expõem operações para hooks ou contexts.

## `src/types/`

Tipos, interfaces e contratos compartilhados entre camadas.

## `src/utils/`

Funções puras e reutilizáveis sem dependência de React, Supabase ou estado global.

## Evolução recomendada

Quando o domínio crescer, pode ser adicionada uma organização por módulos, por exemplo:

```txt
src/modules/properties/
  components/
  hooks/
  repositories/
  services/
  types/
```

Essa evolução deve ser feita sem quebrar a regra de dependência da Clean Architecture.
