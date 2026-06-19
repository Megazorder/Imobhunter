# MASTER PROMPT IMOBHUNTER

## 1. Visão do produto

O **ImobHunter** é um SaaS imobiliário moderno voltado para profissionais, equipes e empresas do mercado imobiliário que precisam centralizar a prospecção, organização, análise e acompanhamento de oportunidades de imóveis e clientes.

A plataforma deve evoluir como um produto confiável, escalável e fácil de manter, com foco em:

- produtividade para corretores e gestores imobiliários;
- experiência de uso simples, rápida e responsiva;
- dados organizados e seguros;
- arquitetura modular preparada para crescimento;
- integrações futuras com portais, CRMs, ERPs, serviços de mapas, automações e inteligência artificial.

Este documento é a **constituição técnica do projeto**. Toda decisão de implementação deve respeitar as diretrizes aqui descritas, exceto quando houver decisão técnica documentada em ADR ou revisão arquitetural formal.

## 2. Objetivos

### 2.1 Objetivos de produto

- Criar uma base sólida para um SaaS imobiliário multiusuário.
- Permitir evolução incremental por módulos independentes.
- Oferecer uma experiência consistente para usuários técnicos e não técnicos.
- Priorizar confiabilidade, segurança, performance e clareza operacional.
- Preparar a aplicação para futuras funcionalidades de negócio, como gestão de imóveis, leads, clientes, funis, tarefas, relatórios e automações.

### 2.2 Objetivos técnicos

- Usar uma stack moderna, produtiva e bem suportada pela comunidade.
- Separar responsabilidades entre interface, regras de aplicação, acesso a dados e integrações externas.
- Manter uma organização de pastas previsível e escalável.
- Estabelecer padrões claros para código, componentes React, testes, commits e Pull Requests.
- Evitar acoplamento prematuro com funcionalidades de negócio.
- Garantir que autenticação, autorização e segurança sejam planejadas desde a fundação.

### 2.3 Fora do escopo desta fundação

Nesta etapa, **não devem ser implementadas funcionalidades de negócio**, tais como:

- cadastro real de imóveis;
- cadastro real de clientes ou leads;
- funil comercial;
- integrações externas;
- automações;
- relatórios operacionais;
- regras financeiras;
- dashboards com dados reais.

A fundação deve se limitar à documentação, arquitetura, convenções e estrutura planejada.

## 3. Stack tecnológica

### 3.1 Frontend

- **React** como biblioteca principal de UI.
- **TypeScript** como linguagem padrão.
- **Vite** como ferramenta de build e desenvolvimento, salvo decisão futura por Next.js quando houver necessidade clara de SSR, SSG, rotas server-side ou SEO avançado.
- **React Router** para roteamento client-side em aplicações SPA.
- **TanStack Query** para cache, sincronização e estados assíncronos de APIs.
- **React Hook Form** para formulários.
- **Zod** para validação e contratos de dados.
- **Tailwind CSS** para estilização utilitária.
- **shadcn/ui** ou biblioteca equivalente baseada em componentes acessíveis e customizáveis.
- **Lucide React** para ícones.

### 3.2 Backend e infraestrutura de dados

- **Supabase** como plataforma inicial para:
  - autenticação;
  - banco PostgreSQL;
  - Row Level Security;
  - storage;
  - edge functions, quando necessário;
  - realtime, quando houver caso de uso validado.
- **PostgreSQL** como banco relacional principal.
- **Supabase Client** no frontend apenas para operações permitidas por políticas RLS.
- **Edge Functions** ou API backend dedicada para operações sensíveis, integrações externas, webhooks e regras que não devem ficar no cliente.

### 3.3 Qualidade e desenvolvimento

- **ESLint** para análise estática.
- **Prettier** para formatação.
- **Vitest** para testes unitários.
- **React Testing Library** para testes de componentes.
- **Playwright** para testes end-to-end.
- **Husky** e **lint-staged** para checks antes de commits, quando o projeto exigir automação local.
- **GitHub Actions** para CI, executando lint, typecheck, testes e build.

### 3.4 Observabilidade futura

A aplicação deve ser preparada para integrar ferramentas de observabilidade, como:

- captura de erros no frontend;
- logs estruturados;
- métricas de performance;
- auditoria de ações relevantes;
- rastreamento de integrações externas.

A escolha da ferramenta deve ser feita quando houver ambiente de produção ou staging.

## 4. Arquitetura do sistema

### 4.1 Princípios arquiteturais

- **Modularidade:** funcionalidades devem ser organizadas por domínio ou módulo.
- **Baixo acoplamento:** módulos não devem depender internamente uns dos outros sem necessidade clara.
- **Alta coesão:** arquivos relacionados a uma mesma funcionalidade devem ficar próximos.
- **Separação de responsabilidades:** UI, hooks, serviços, validações e tipos devem ter papéis distintos.
- **Evolução incremental:** a arquitetura deve permitir crescimento sem grandes reescritas.
- **Segurança por padrão:** dados sensíveis não devem ser expostos sem autorização explícita.
- **Tipagem forte:** TypeScript deve ser usado para reduzir ambiguidades e erros em runtime.

### 4.2 Camadas propostas

A aplicação deve ser organizada em camadas lógicas:

1. **Interface de usuário**
   - páginas;
   - layouts;
   - componentes visuais;
   - feedbacks de carregamento, erro e vazio.

2. **Camada de aplicação**
   - hooks de caso de uso;
   - orquestração de chamadas;
   - composição entre formulário, validação e serviços;
   - regras de fluxo da interface.

3. **Camada de domínio leve**
   - tipos;
   - schemas;
   - constantes;
   - helpers puros;
   - regras reutilizáveis e testáveis.

4. **Camada de infraestrutura**
   - cliente Supabase;
   - clientes HTTP;
   - adaptadores de APIs externas;
   - funções de storage;
   - tratamento comum de erros.

5. **Camada de configuração**
   - variáveis de ambiente;
   - rotas;
   - providers globais;
   - feature flags futuras.

### 4.3 Fluxo de dependências

O fluxo recomendado é:

```text
UI -> Hooks de aplicação -> Serviços/Clients -> Supabase/APIs externas
UI -> Schemas/Tipos/Helpers
Serviços -> Schemas/Tipos
```

Regras:

- Componentes visuais não devem conhecer detalhes internos de Supabase ou HTTP.
- Serviços não devem importar componentes React.
- Módulos devem expor APIs internas claras por arquivos `index.ts` quando fizer sentido.
- Dependências cruzadas entre módulos devem ser evitadas; quando necessárias, devem passar por contratos explícitos.

## 5. Estrutura de pastas

A estrutura inicial recomendada para uma aplicação frontend é:

```text
.
├── docs/
│   ├── adr/
│   └── product/
├── public/
├── src/
│   ├── app/
│   │   ├── providers/
│   │   ├── routes/
│   │   └── config/
│   ├── assets/
│   ├── components/
│   │   ├── ui/
│   │   └── shared/
│   ├── features/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── properties/
│   │   ├── leads/
│   │   ├── clients/
│   │   ├── pipeline/
│   │   └── settings/
│   ├── hooks/
│   ├── lib/
│   │   ├── supabase/
│   │   ├── http/
│   │   ├── errors/
│   │   └── utils/
│   ├── styles/
│   ├── test/
│   └── types/
├── supabase/
│   ├── migrations/
│   ├── seed.sql
│   └── functions/
└── MASTER_PROMPT_IMOBHUNTER.md
```

### 5.1 Diretrizes para pastas principais

- `docs/`: documentação técnica, ADRs, decisões de produto e guias operacionais.
- `src/app/`: composição global da aplicação, providers, rotas e configuração.
- `src/components/ui/`: componentes base reutilizáveis e sem regra de negócio.
- `src/components/shared/`: componentes compartilhados com alguma composição de produto, mas ainda genéricos.
- `src/features/`: módulos de negócio ou áreas funcionais.
- `src/lib/`: integrações, clientes, utilitários técnicos e adaptadores.
- `src/hooks/`: hooks genéricos independentes de módulos.
- `src/types/`: tipos globais e contratos comuns.
- `supabase/`: migrations, seeds e funções relacionadas ao Supabase.

### 5.2 Estrutura interna de um módulo

Cada módulo dentro de `src/features` deve seguir um padrão semelhante:

```text
src/features/example/
├── components/
├── hooks/
├── pages/
├── services/
├── schemas/
├── types/
├── utils/
├── constants.ts
└── index.ts
```

Diretrizes:

- `components/`: componentes específicos do módulo.
- `hooks/`: hooks específicos do módulo.
- `pages/`: páginas ou telas relacionadas ao módulo.
- `services/`: chamadas de API, Supabase ou adaptadores do módulo.
- `schemas/`: validações Zod e contratos de entrada/saída.
- `types/`: tipos TypeScript específicos.
- `utils/`: funções puras e específicas do módulo.
- `constants.ts`: constantes do módulo.
- `index.ts`: exportações públicas internas do módulo, quando útil.

## 6. Convenções de nomenclatura

### 6.1 Arquivos e pastas

- Pastas: `kebab-case`.
- Componentes React: `PascalCase.tsx`.
- Hooks: `use-name.ts` ou `useName.ts`, mantendo um único padrão por projeto.
- Serviços: `example-service.ts`.
- Schemas: `example-schema.ts`.
- Tipos: `example-types.ts`.
- Testes: `*.test.ts`, `*.test.tsx`, `*.spec.ts` ou `*.spec.tsx`.

Padrão preferencial para este projeto:

```text
components/UserCard.tsx
hooks/use-user-profile.ts
services/user-service.ts
schemas/user-schema.ts
types/user-types.ts
```

### 6.2 Código TypeScript

- Tipos e interfaces: `PascalCase`.
- Variáveis e funções: `camelCase`.
- Constantes globais: `UPPER_SNAKE_CASE`.
- Enumerações devem ser evitadas quando unions literais resolverem o problema.
- Tipos booleanos devem usar prefixos claros, como `is`, `has`, `can` ou `should`.

Exemplos:

```ts
type UserRole = 'admin' | 'manager' | 'agent';
const isAuthenticated = true;
const canManageProperties = false;
```

### 6.3 Branches e commits

Branches devem seguir o padrão:

```text
type/short-description
```

Exemplos:

- `docs/master-prompt`
- `feat/auth-foundation`
- `fix/supabase-session-refresh`
- `chore/update-dependencies`

Commits devem seguir Conventional Commits:

```text
type(scope): description
```

Tipos permitidos:

- `feat`
- `fix`
- `docs`
- `style`
- `refactor`
- `test`
- `chore`
- `build`
- `ci`

Exemplo:

```text
docs(project): add master prompt constitution
```

## 7. Padrões de código

### 7.1 TypeScript

- Evitar `any`; usar `unknown` quando o tipo ainda precisa ser refinado.
- Preferir funções pequenas, puras e testáveis.
- Validar dados externos com Zod antes de usá-los como dados confiáveis.
- Tipar retornos de funções públicas ou exportadas.
- Evitar lógica complexa em componentes React.
- Evitar imports cíclicos.
- Não envolver imports em `try/catch`.

### 7.2 Tratamento de erros

- Erros de infraestrutura devem ser normalizados antes de chegar à UI.
- Mensagens técnicas não devem ser exibidas diretamente ao usuário final.
- A UI deve diferenciar estados de carregamento, sucesso, vazio e erro.
- Logs devem evitar dados sensíveis.

### 7.3 Variáveis de ambiente

- Variáveis públicas devem usar prefixo apropriado da ferramenta, como `VITE_` em Vite.
- Segredos nunca devem ser enviados para o frontend.
- Toda variável obrigatória deve ser documentada em `.env.example`.
- O acesso a variáveis de ambiente deve ser centralizado em um módulo de configuração.

### 7.4 Acessibilidade

- Componentes interativos devem ser navegáveis por teclado.
- Elementos devem ter nomes acessíveis.
- Contraste visual deve ser suficiente.
- Modais, menus e popovers devem gerenciar foco corretamente.
- Feedbacks de erro em formulários devem ser claros e associados aos campos.

### 7.5 Performance

- Evitar renderizações desnecessárias.
- Dividir bundles por rotas quando o projeto crescer.
- Usar cache de dados de forma explícita com TanStack Query.
- Evitar buscar dados em cascata sem necessidade.
- Carregar imagens de forma otimizada.

## 8. Padrões de componentes React

### 8.1 Tipos de componentes

- **Componentes de UI:** botões, inputs, modais, cards e elementos visuais genéricos.
- **Componentes de composição:** unem componentes de UI para formar blocos reutilizáveis.
- **Componentes de página:** representam telas roteadas.
- **Componentes de módulo:** pertencem a uma feature específica.

### 8.2 Regras gerais

- Componentes devem ser funcionais.
- Props devem ser explicitamente tipadas.
- Componentes devem ter responsabilidade única.
- Componentes visuais não devem fazer chamadas diretas a APIs.
- Componentes devem receber dados já tratados sempre que possível.
- Estados complexos devem ser movidos para hooks.
- Componentes compartilhados devem ser documentados por exemplos ou stories quando houver Storybook.

### 8.3 Estrutura sugerida de componente

```tsx
type ExampleCardProps = {
  title: string;
  description?: string;
  isLoading?: boolean;
};

export function ExampleCard({ title, description, isLoading = false }: ExampleCardProps) {
  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <article>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </article>
  );
}
```

### 8.4 Formulários

- Formulários devem usar React Hook Form.
- Validação deve ser feita com Zod.
- Schemas devem ficar fora do componente.
- Mensagens de erro devem ser amigáveis.
- Submissões devem tratar estados de loading e erro.

### 8.5 Estados de tela

Toda tela que consome dados deve prever:

- estado inicial;
- carregamento;
- erro;
- vazio;
- sucesso;
- atualização ou refetch, quando aplicável.

## 9. Estratégia de autenticação com Supabase

### 9.1 Diretrizes gerais

A autenticação deve usar **Supabase Auth** como provedor inicial. O sistema deve ser planejado para suportar:

- login por e-mail e senha;
- recuperação de senha;
- confirmação de e-mail;
- magic link, se validado pelo produto;
- OAuth, se necessário em etapa futura;
- sessões persistentes;
- controle de acesso por papéis e permissões.

### 9.2 Gestão de sessão

- A sessão deve ser inicializada em um provider global.
- O estado de autenticação deve ser disponibilizado por hook dedicado.
- Rotas privadas devem verificar autenticação antes de renderizar conteúdo protegido.
- A aplicação deve tratar expiração e renovação de sessão.
- O logout deve limpar estados sensíveis e caches associados ao usuário.

### 9.3 Autorização

A autorização deve ser baseada em múltiplas camadas:

1. **Frontend:** controle de exibição e navegação.
2. **RLS no PostgreSQL:** barreira principal de segurança para dados.
3. **Edge Functions ou backend:** validações sensíveis e operações privilegiadas.

O frontend nunca deve ser considerado fonte de segurança definitiva.

### 9.4 Row Level Security

- Toda tabela com dados de usuário ou organização deve ter RLS habilitado.
- Políticas devem ser escritas de forma explícita e testável.
- Dados multi-tenant devem possuir chave de organização, conta ou workspace.
- Usuários só devem acessar dados pertencentes ao seu escopo autorizado.
- Migrations devem documentar a intenção das políticas.

### 9.5 Papéis e permissões

Papéis iniciais planejados:

- `owner`: proprietário da conta ou organização;
- `admin`: usuário administrativo;
- `manager`: gestor de equipe;
- `agent`: corretor ou operador;
- `viewer`: usuário somente leitura, se necessário.

Permissões devem ser modeladas por capacidade, como:

- `canCreateProperty`;
- `canEditProperty`;
- `canManageUsers`;
- `canViewReports`.

## 10. Estratégia para consumo de APIs

### 10.1 Princípios

- Toda chamada externa deve passar por uma camada de serviço ou client.
- Componentes React não devem chamar `fetch`, Supabase ou SDKs externos diretamente.
- Dados externos devem ser validados com Zod quando houver risco de contrato instável.
- Erros devem ser normalizados.
- Caches devem ter chaves previsíveis.

### 10.2 TanStack Query

- Queries devem ser usadas para leitura de dados remotos.
- Mutations devem ser usadas para criação, atualização e exclusão.
- Query keys devem ser centralizadas por módulo.
- Invalidação de cache deve ser explícita após mutations.
- Estados de loading e erro devem ser tratados na UI.

Exemplo conceitual de query keys:

```ts
export const propertyQueryKeys = {
  all: ['properties'] as const,
  lists: () => [...propertyQueryKeys.all, 'list'] as const,
  detail: (id: string) => [...propertyQueryKeys.all, 'detail', id] as const,
};
```

### 10.3 Supabase Client

- O cliente Supabase deve ser criado em um único ponto da aplicação.
- Tipos gerados do banco devem ser usados quando disponíveis.
- Operações de escrita devem respeitar validações de entrada.
- Operações sensíveis devem ser movidas para Edge Functions ou backend seguro.

### 10.4 APIs externas

Integrações futuras devem seguir este padrão:

```text
src/lib/http/base-client.ts
src/features/integration-name/services/integration-name-service.ts
src/features/integration-name/schemas/integration-name-schema.ts
```

Cada integração deve documentar:

- origem dos dados;
- autenticação usada;
- limites de taxa;
- estratégia de retry;
- estratégia de cache;
- tratamento de falhas;
- implicações de privacidade.

## 11. Organização por módulos

### 11.1 Módulos planejados

A evolução do ImobHunter deve ser orientada por módulos:

- **Auth:** autenticação, recuperação de senha, sessão e rotas protegidas.
- **Dashboard:** visão inicial com indicadores e atalhos.
- **Properties:** gestão de imóveis.
- **Leads:** captação e acompanhamento de leads.
- **Clients:** gestão de clientes e contatos.
- **Pipeline:** funil comercial e etapas de negociação.
- **Tasks:** tarefas, follow-ups e lembretes.
- **Reports:** relatórios e métricas.
- **Settings:** configurações de conta, equipe e preferências.
- **Integrations:** conexões com serviços externos.
- **Billing:** planos, assinaturas e cobrança, quando necessário.

### 11.2 Regras de dependência entre módulos

- `auth` pode ser usado por todos os módulos para informações de usuário e sessão.
- `settings` pode fornecer preferências globais.
- Módulos de negócio não devem acessar diretamente detalhes internos de outros módulos.
- Contratos compartilhados devem ir para `src/types` ou `src/lib`, se forem realmente globais.
- Antes de tornar algo global, validar se existe uso real em mais de um módulo.

### 11.3 Módulo shared não deve virar depósito genérico

A pasta `shared` deve ser usada com cuidado. Antes de mover algo para `shared`, verificar:

- o item é usado por pelo menos dois módulos?
- o item não contém regra específica de um único domínio?
- o nome e a API são compreensíveis fora do contexto original?
- existe teste ou exemplo suficiente para evitar uso incorreto?

## 12. Roadmap de desenvolvimento por Sprints

### Sprint 0 — Fundação técnica

Objetivo: preparar o repositório, documentação e ferramentas base.

Entregas:

- documentação constitucional do projeto;
- definição de stack;
- estrutura inicial de pastas;
- configuração de TypeScript;
- configuração de lint, format e testes;
- configuração básica de CI;
- `.env.example` documentado;
- guia de contribuição;
- templates de PR e issues, se aplicável.

### Sprint 1 — Base visual e navegação

Objetivo: criar esqueleto visual sem regras de negócio.

Entregas:

- layout público;
- layout autenticado;
- rotas públicas e privadas;
- componentes base de UI;
- tema visual inicial;
- estados globais mínimos;
- páginas placeholder para módulos planejados.

### Sprint 2 — Autenticação

Objetivo: implementar autenticação segura com Supabase.

Entregas:

- login;
- logout;
- recuperação de senha;
- confirmação de e-mail;
- provider de sessão;
- proteção de rotas;
- políticas RLS iniciais;
- testes de fluxo de autenticação.

### Sprint 3 — Modelo multi-tenant e configurações

Objetivo: preparar conta, organização e papéis.

Entregas:

- modelagem de organizações ou workspaces;
- associação de usuários a organizações;
- papéis iniciais;
- permissões básicas;
- tela de configurações inicial;
- testes de autorização.

### Sprint 4 — Módulo de imóveis

Objetivo: iniciar o primeiro módulo de negócio.

Entregas:

- modelagem de imóveis;
- listagem;
- criação;
- edição;
- detalhe;
- filtros básicos;
- validações;
- testes unitários e de integração.

### Sprint 5 — Leads e clientes

Objetivo: estruturar relacionamento comercial.

Entregas:

- cadastro de leads;
- cadastro de clientes;
- associação com imóveis;
- histórico básico;
- filtros e busca;
- testes principais.

### Sprint 6 — Pipeline comercial

Objetivo: acompanhar oportunidades e negociações.

Entregas:

- etapas do funil;
- movimentação de oportunidades;
- atividades por etapa;
- regras de permissão;
- visão kanban ou lista;
- testes e métricas iniciais.

### Sprint 7 — Tarefas e notificações

Objetivo: apoiar rotina operacional.

Entregas:

- tarefas;
- lembretes;
- vencimentos;
- notificações in-app;
- integração futura com e-mail ou WhatsApp documentada.

### Sprint 8 — Relatórios e observabilidade

Objetivo: fornecer visibilidade de operação e saúde técnica.

Entregas:

- indicadores iniciais;
- relatórios por período;
- eventos de auditoria;
- captura de erros;
- métricas de uso;
- refinamento de performance.

## 13. Critérios de qualidade

### 13.1 Critérios técnicos

- Código tipado e sem erros de TypeScript.
- Lint sem erros.
- Formatação padronizada.
- Testes relevantes para regras e fluxos críticos.
- Build executando com sucesso.
- Ausência de segredos versionados.
- Componentes acessíveis.
- Estados de erro e vazio implementados.
- Uso correto de cache e invalidação.
- Migrations revisadas e reversíveis quando possível.

### 13.2 Critérios de produto

- Interface clara e consistente.
- Fluxos principais compreensíveis.
- Textos amigáveis para o usuário final.
- Feedback visual para ações assíncronas.
- Comportamento previsível em dispositivos móveis.
- Não expor detalhes técnicos ao usuário.

### 13.3 Critérios de segurança

- RLS habilitado em tabelas sensíveis.
- Políticas revisadas antes de produção.
- Segredos apenas em ambiente seguro.
- Validação de entradas no cliente e no servidor quando aplicável.
- Logs sem dados sensíveis.
- Autorização não dependente apenas do frontend.
- Revisão de permissões para toda nova tabela ou função.

### 13.4 Critérios de manutenibilidade

- Arquivos pequenos e coesos.
- Nomes claros e consistentes.
- Baixa duplicação.
- Dependências explícitas.
- Decisões arquiteturais registradas.
- Documentação atualizada junto com mudanças relevantes.

## 14. Estratégia de testes

### 14.1 Pirâmide de testes

A estratégia deve seguir uma pirâmide equilibrada:

1. **Testes unitários:** maioria dos testes, rápidos e focados em funções, schemas e hooks puros.
2. **Testes de componentes:** validam renderização, interação e acessibilidade básica.
3. **Testes de integração:** validam módulos conectando serviços, hooks e UI.
4. **Testes end-to-end:** cobrem fluxos críticos de usuário, sem excesso.

### 14.2 Testes unitários

Devem cobrir:

- helpers;
- schemas Zod;
- formatadores;
- regras de permissão;
- geração de query keys;
- normalização de erros.

### 14.3 Testes de componentes

Devem cobrir:

- renderização com dados válidos;
- estados de loading;
- estados de erro;
- estados vazios;
- interações principais;
- mensagens de validação.

### 14.4 Testes end-to-end

Fluxos candidatos:

- login e logout;
- recuperação de senha;
- navegação em rotas privadas;
- criação de entidade principal quando módulos de negócio existirem;
- permissões por papel;
- fluxo comercial crítico.

### 14.5 Dados de teste

- Usar factories para dados repetidos.
- Evitar dependência de dados manuais em ambiente remoto.
- Separar ambiente de teste de desenvolvimento.
- Garantir limpeza de dados após testes de integração ou E2E.

### 14.6 Cobertura

Cobertura deve ser usada como indicador, não como objetivo isolado. Áreas críticas, como autenticação, autorização, validações e regras de negócio, devem ter prioridade sobre componentes puramente visuais.

## 15. Checklist antes de cada Pull Request

Antes de abrir um Pull Request, validar:

### 15.1 Código

- [ ] O código segue a estrutura de pastas definida.
- [ ] A nomenclatura segue os padrões do projeto.
- [ ] Não há `any` desnecessário.
- [ ] Não há imports não utilizados.
- [ ] Não há lógica de negócio em componentes puramente visuais.
- [ ] Não há segredos ou credenciais versionadas.
- [ ] Variáveis de ambiente novas foram documentadas.

### 15.2 Qualidade

- [ ] `lint` foi executado com sucesso.
- [ ] `typecheck` foi executado com sucesso.
- [ ] `test` foi executado com sucesso ou a ausência de testes foi justificada.
- [ ] `build` foi executado com sucesso quando aplicável.
- [ ] Estados de loading, erro e vazio foram considerados.
- [ ] Acessibilidade básica foi revisada.

### 15.3 Segurança

- [ ] A mudança não expõe dados sensíveis.
- [ ] Regras de autorização foram consideradas.
- [ ] Políticas RLS foram atualizadas quando houve mudança no banco.
- [ ] Operações sensíveis não foram implementadas apenas no frontend.
- [ ] Logs não incluem dados pessoais ou tokens.

### 15.4 Produto e UX

- [ ] O texto visível ao usuário está claro.
- [ ] O comportamento em mobile foi considerado.
- [ ] Erros são apresentados de forma amigável.
- [ ] A mudança não cria inconsistência visual.
- [ ] Screenshots ou evidências visuais foram anexadas quando houver alteração perceptível de UI.

### 15.5 Documentação

- [ ] Documentação técnica foi atualizada quando necessário.
- [ ] ADR foi criado para decisões arquiteturais relevantes.
- [ ] README foi atualizado se o fluxo de instalação, execução ou teste mudou.
- [ ] O Pull Request explica motivação, solução e forma de teste.

## 16. Diretrizes para evolução deste documento

Este documento deve ser atualizado sempre que houver mudança relevante em:

- stack tecnológica;
- arquitetura;
- organização de pastas;
- padrões de código;
- autenticação e autorização;
- estratégia de testes;
- critérios de qualidade;
- roadmap.

Mudanças significativas devem ser discutidas em Pull Request e, quando representarem decisão duradoura, acompanhadas de um ADR em `docs/adr/`.

## 17. Regra final

O ImobHunter deve evoluir com disciplina técnica. A velocidade de entrega não deve comprometer segurança, clareza, manutenibilidade e experiência do usuário. Toda funcionalidade nova deve nascer alinhada a esta constituição ou propor explicitamente sua atualização.
