import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';

type AuthMode = 'login' | 'register' | 'reset';

const schema = z.object({
  email: z.string().email('Informe um e-mail válido.'),
  password: z.string().min(6, 'Use pelo menos 6 caracteres.').optional(),
});
type AuthFormData = z.infer<typeof schema>;

const content: Record<AuthMode, { title: string; description: string; button: string }> = {
  login: { title: 'Entrar', description: 'Acesse sua conta ImobHunter.', button: 'Entrar' },
  register: {
    title: 'Criar conta',
    description: 'Cadastre-se para acessar o painel.',
    button: 'Cadastrar',
  },
  reset: {
    title: 'Recuperar senha',
    description: 'Receba um link de redefinição por e-mail.',
    button: 'Enviar link',
  },
};

export function AuthForm({ mode }: { mode: AuthMode }) {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormData>({ resolver: zodResolver(schema) });

  async function onSubmit(values: AuthFormData) {
    setError(null);
    setMessage(null);
    if (mode === 'login') {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password ?? '',
      });
      if (signInError) return setError(signInError.message);
      navigate('/dashboard');
    }
    if (mode === 'register') {
      const { error: signUpError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password ?? '',
      });
      if (signUpError) return setError(signUpError.message);
      setMessage('Cadastro criado. Verifique seu e-mail, se a confirmação estiver habilitada.');
    }
    if (mode === 'reset') {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo: window.location.origin,
      });
      if (resetError) return setError(resetError.message);
      setMessage('Enviamos as instruções de recuperação para seu e-mail.');
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{content[mode].title}</CardTitle>
        <CardDescription>{content[mode].description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" {...register('email')} />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>
          {mode !== 'reset' && (
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" {...register('password')} />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>
          )}
          {error && <p className="text-sm text-destructive">{error}</p>}
          {message && <p className="text-sm text-muted-foreground">{message}</p>}
          <Button className="w-full" disabled={isSubmitting}>
            {content[mode].button}
          </Button>
        </form>
        <div className="mt-4 flex justify-between text-sm text-muted-foreground">
          <Link to="/login">Entrar</Link>
          <Link to="/cadastro">Cadastro</Link>
          <Link to="/recuperar-senha">Senha?</Link>
        </div>
      </CardContent>
    </Card>
  );
}
