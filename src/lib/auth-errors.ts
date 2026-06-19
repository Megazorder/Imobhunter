export function friendlyAuthError(message?: string) {
  const value = message?.toLowerCase() ?? '';

  if (value.includes('invalid login') || value.includes('invalid credentials')) {
    return 'E-mail ou senha inválidos. Verifique os dados e tente novamente.';
  }
  if (value.includes('email not confirmed')) {
    return 'Confirme seu e-mail antes de acessar sua conta.';
  }
  if (value.includes('already registered') || value.includes('user already')) {
    return 'Este e-mail já está cadastrado. Tente entrar ou recuperar a senha.';
  }
  if (value.includes('password')) {
    return 'A senha deve atender aos requisitos de segurança do Supabase.';
  }
  if (value.includes('rate limit')) {
    return 'Muitas tentativas em pouco tempo. Aguarde alguns minutos e tente novamente.';
  }

  return 'Não foi possível concluir a operação. Tente novamente.';
}
