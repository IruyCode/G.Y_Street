import AuthLayout from '../../components/auth/AuthLayout';
import RegisterForm from '../../components/auth/RegisterForm';
import { ROUTES } from '../../utils/constants';

/**
 * Register Page Component
 * User registration page with form
 */
export const RegisterPage = () => {
  return (
    <AuthLayout
      title="Criar Conta"
      subtitle="Comece a gerir o seu inventário hoje"
      footerText="Já tem uma conta?"
      footerLink={ROUTES.LOGIN}
      footerLinkText="Iniciar sessão"
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
