import AuthLayout from '../../components/auth/AuthLayout';
import LoginForm from '../../components/auth/LoginForm';
import { ROUTES } from '../../utils/constants';

/**
 * Login Page Component
 * User login page with form
 */
export const LoginPage = () => {
  return (
    <AuthLayout
      title="Bem-vindo de Volta"
      subtitle="Inicie sessão para aceder à sua conta"
      footerText="Não tem uma conta?"
      footerLink={ROUTES.REGISTER}
      footerLinkText="Criar conta"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
