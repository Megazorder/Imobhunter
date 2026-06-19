import { FormEvent, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { useAuth } from '../hooks/useAuth';

export function Login() {
  const { signIn, user, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname ?? '/app';

  if (user) return <Navigate to="/app" replace />;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    try {
      await signIn(email, password);
      navigate(from, { replace: true });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthLayout title="Entrar" subtitle="Acesse sua conta para continuar.">
      <form onSubmit={handleSubmit} className="form-stack">
        {error && <div className="alert">{error}</div>}
        <label>E-mail<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
        <label>Senha<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
        <button disabled={submitting}>{submitting ? 'Entrando...' : 'Entrar'}</button>
      </form>
      <div className="auth-links"><Link to="/recuperar-senha">Esqueci minha senha</Link><Link to="/cadastro">Criar conta</Link></div>
    </AuthLayout>
  );
}
