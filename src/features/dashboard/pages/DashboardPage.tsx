import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';

export function DashboardPage() {
  const { user } = useAuth();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bem-vindo ao ImobHunter</h1>
        <p className="text-muted-foreground">
          Painel administrativo protegido por autenticação Supabase.
        </p>
      </div>
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Conta autenticada</CardTitle>
          <CardDescription>Informações retornadas da sessão atual.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            <strong>E-mail:</strong> {user?.email}
          </p>
          <p>
            <strong>ID:</strong> {user?.id}
          </p>
          <p>
            <strong>Último acesso:</strong>{' '}
            {user?.last_sign_in_at
              ? new Date(user.last_sign_in_at).toLocaleString('pt-BR')
              : 'Não disponível'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
