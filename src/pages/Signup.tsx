import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { useAuth } from '../hooks/useAuth';

export function Signup() {
  const { signUp, error } = useAuth();
  const [fullName, setFullName] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await signUp({ email, password, fullName, companyId: companyId || undefined });
    setMessage('Cadastro criado. Verifique seu e-mail se a confirmação estiver ativa.');
    setTimeout(() => navigate('/app', { replace: true }), 900);
  }

  return (
    <AuthLayout title="Criar conta" subtitle="Cadastre-se e associe seu perfil a uma empresa.">
      <form onSubmit={handleSubmit} className="form-stack">
        {error && <div className="alert">{error}</div>}
        {message && <div className="success">{message}</div>}
        <label>Nome completo<input value={fullName} onChange={(e) => setFullName(e.target.value)} required /></label>
        <label>ID da empresa<input value={companyId} onChange={(e) => setCompanyId(e.target.value)} placeholder="Opcional" /></label>
        <label>E-mail<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
        <label>Senha<input type="password" minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
        <button>Cadastrar</button>
      </form>
      <div className="auth-links"><Link to="/login">Já tenho conta</Link></div>
    </AuthLayout>
  );
}
