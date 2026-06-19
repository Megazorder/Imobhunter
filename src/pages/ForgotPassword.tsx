import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { useAuth } from '../hooks/useAuth';

export function ForgotPassword() {
  const { resetPassword, error } = useAuth();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await resetPassword(email);
    setSent(true);
  }

  return (
    <AuthLayout title="Recuperar senha" subtitle="Enviaremos um link seguro para seu e-mail.">
      <form onSubmit={handleSubmit} className="form-stack">
        {error && <div className="alert">{error}</div>}
        {sent && <div className="success">Se o e-mail existir, enviaremos instruções de recuperação.</div>}
        <label>E-mail<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
        <button>Enviar link</button>
      </form>
      <div className="auth-links"><Link to="/login">Voltar ao login</Link></div>
    </AuthLayout>
  );
}
