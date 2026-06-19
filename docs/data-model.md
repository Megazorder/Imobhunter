# Modelo de dados inicial — ImobHunter

Este documento descreve a modelagem inicial do banco de dados do ImobHunter para Supabase/PostgreSQL.
A implementação está em `supabase/migrations/20260619000000_initial_schema.sql`.

## Convenções adotadas

- Todas as tabelas usam chave primária `uuid`.
- As entidades criadas pela aplicação usam `gen_random_uuid()` como valor padrão.
- `profiles.id` referencia diretamente `auth.users.id`, mantendo o mesmo UUID do usuário autenticado no Supabase.
- Todas as tabelas possuem `created_at` e `updated_at` com `timestamptz`.
- O campo `updated_at` é mantido por trigger (`public.set_updated_at`).
- Multi-tenancy é feito por `company_id` nas entidades de negócio.
- Row Level Security está habilitado em todas as tabelas públicas do modelo.
- As políticas restringem acesso aos usuários membros da mesma empresa.

## Tabelas

### profiles

Armazena dados públicos/operacionais do usuário autenticado.

Campos principais:

- `id`: UUID do usuário em `auth.users`.
- `full_name`: nome completo.
- `phone`: telefone.
- `avatar_url`: URL do avatar.
- `created_at`, `updated_at`: auditoria temporal.

### companies

Representa imobiliárias, equipes ou organizações que agrupam usuários e dados de negócio.

Campos principais:

- `id`: UUID da empresa.
- `name`: nome comercial.
- `legal_name`: razão social.
- `document_number`: identificador fiscal, único quando informado.
- `created_by`: usuário que criou a empresa.
- Campos de contato e endereço.

### company_members

Tabela de associação entre usuários e empresas.

Campos principais:

- `company_id`: empresa.
- `profile_id`: usuário membro.
- `role`: papel do membro (`owner`, `admin`, `agent`).
- `invited_by`: usuário que convidou/adicionou o membro.

A restrição única `(company_id, profile_id)` impede duplicidade de vínculo.

### properties

Representa imóveis gerenciados por uma empresa.

Campos principais:

- `company_id`: empresa proprietária dos dados.
- `created_by`: usuário que cadastrou o imóvel.
- `assigned_to`: usuário responsável pelo atendimento/gestão.
- `title`, `description`: informações de apresentação.
- `status`: situação do imóvel.
- `purpose`: venda, aluguel ou ambos.
- `property_type`: tipo do imóvel.
- Campos financeiros, características e localização.

### property_images

Imagens associadas a um imóvel.

Campos principais:

- `property_id`: imóvel relacionado.
- `storage_path`: caminho do arquivo no Supabase Storage.
- `display_order`: ordenação de exibição.
- `is_cover`: indica imagem de capa.

### property_documents

Documentos associados a um imóvel.

Campos principais:

- `property_id`: imóvel relacionado.
- `storage_path`: caminho do arquivo no Supabase Storage.
- `document_type`: tipo do documento.
- `file_name`, `mime_type`, `file_size_bytes`: metadados do arquivo.
- `uploaded_by`: usuário responsável pelo upload.

### clients

Contatos/clientes da empresa.

Campos principais:

- `company_id`: empresa proprietária dos dados.
- `assigned_to`: usuário responsável.
- `full_name`, `email`, `phone`, `document_number`: identificação e contato.
- `status`: ciclo do cliente.
- `notes`: observações internas.

### leads

Oportunidades geradas a partir de interesse em imóveis ou contato direto.

Campos principais:

- `company_id`: empresa proprietária dos dados.
- `property_id`: imóvel relacionado, quando existir.
- `client_id`: cliente vinculado, quando convertido/identificado.
- `assigned_to`: usuário responsável.
- `source`: origem do lead.
- `status`: etapa do funil.
- `message`: mensagem inicial ou contexto.

### lead_interactions

Histórico de interações feitas em um lead.

Campos principais:

- `lead_id`: lead relacionado.
- `profile_id`: usuário que registrou a interação.
- `interaction_type`: tipo de interação.
- `content`: conteúdo/observação.
- `next_follow_up_at`: data de próximo acompanhamento, quando aplicável.

## Diagrama textual de relacionamentos

```text
auth.users 1 ── 1 profiles
profiles 1 ── N companies.created_by
profiles 1 ── N company_members.profile_id
profiles 1 ── N properties.created_by
profiles 1 ── N properties.assigned_to
profiles 1 ── N clients.assigned_to
profiles 1 ── N leads.assigned_to
profiles 1 ── N lead_interactions.profile_id

companies 1 ── N company_members
companies 1 ── N properties
companies 1 ── N clients
companies 1 ── N leads

properties 1 ── N property_images
properties 1 ── N property_documents
properties 1 ── N leads

clients 1 ── N leads
leads 1 ── N lead_interactions
```

## Segurança e RLS

A migração cria funções auxiliares com `security definer` para evitar políticas recursivas em `company_members`:

- `current_user_company_ids()` retorna as empresas do usuário autenticado.
- `is_company_member(company_id)` valida se o usuário pertence à empresa.
- `is_company_admin(company_id)` valida se o usuário é `owner` ou `admin`.

Políticas principais:

- Usuários leem o próprio perfil e perfis de colegas das mesmas empresas.
- Usuários autenticados podem criar empresas informando `created_by = auth.uid()`.
- Somente membros acessam dados da empresa.
- Alterações destrutivas em dados sensíveis ficam restritas a administradores/owners.
- Imagens, documentos e interações herdam a autorização pela tabela pai (`properties` ou `leads`).

## Decisões de modelagem

1. **Empresa como fronteira de tenant**: dados operacionais possuem `company_id` direto ou indireto para permitir isolamento por imobiliária/equipe.
2. **Membership separado de profile**: um usuário pode participar de múltiplas empresas sem duplicar cadastro.
3. **Enums para estados controlados**: status e tipos com vocabulário controlado reduzem inconsistências no funil e no inventário.
4. **Arquivos por metadata no banco**: imagens e documentos guardam metadados e `storage_path`; os binários devem ficar no Supabase Storage.
5. **Leads podem existir antes do cliente**: `client_id` é opcional para permitir capturar oportunidades antes da conversão em cliente consolidado.
6. **Histórico separado de interações**: `lead_interactions` preserva linha do tempo sem sobrescrever o estado atual do lead.
7. **Soft workflow por status, não soft delete**: o modelo inicial usa status como `archived`; deleções continuam disponíveis, porém mais restritas por RLS.
8. **Índices em FKs e filtros comuns**: chaves estrangeiras, status e localização de imóveis recebem índices para consultas frequentes.

## Observações para próximos sprints

- Criar buckets e políticas de Storage para documentos e imagens.
- Adicionar migrations de seeds apenas para dados estáticos, se necessário; este sprint não inclui mocks.
- Considerar views/materialized views para dashboards.
- Avaliar triggers para garantir que `leads.property_id` e `leads.client_id`, quando informados, pertençam ao mesmo `company_id` do lead.
