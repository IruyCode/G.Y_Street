import { useState } from 'react';
import { Mail } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { loginSchema } from '../../schemas/authSchemas';
import { ROUTES } from '../../utils/constants';
import Button from '../common/Button';
import Input from '../common/Input';
import Checkbox from '../common/Checkbox';
import PasswordInput from './PasswordInput';
import FormError from '../common/FormError';

/**
 * Login Form Component
 * Complete login form with validation, remember me, and error handling
 */
export const LoginForm = () => {
  const { login, isLoading, error: authError } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }

    // Clear form error
    setFormError('');
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setFormError('');

    try {
      // Validate with Zod
      const validatedData = loginSchema.parse(formData);

      // Attempt login
      await login(validatedData.email, validatedData.password, validatedData.rememberMe);
    } catch (error) {
      // Handle Zod validation errors
      if (error.errors) {
        const fieldErrors = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        // Handle auth errors
        setFormError(error.message || 'Ocorreu um erro ao iniciar sessão');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Form-level Error */}
      {(formError || authError) && <FormError message={formError || authError} />}

      {/* Email Input */}
      <Input
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        placeholder="exemplo@email.com"
        error={errors.email}
        required
        leftIcon={<Mail className="w-5 h-5" />}
        onChange={handleChange}
        disabled={isLoading}
        autoComplete="email"
      />

      {/* Password Input */}
      <PasswordInput
        label="Palavra-passe"
        name="password"
        value={formData.password}
        placeholder="Introduza a sua palavra-passe"
        error={errors.password}
        required
        onChange={handleChange}
        disabled={isLoading}
        autoComplete="current-password"
      />

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <Checkbox
          name="rememberMe"
          label="Lembrar-me"
          checked={formData.rememberMe}
          onChange={handleChange}
          disabled={isLoading}
        />

        {/* Link to forgot password (future implementation) */}
        <a
          href="#"
          className="text-sm font-medium text-primary-600 hover:text-primary-700 hover:underline transition-colors"
          onClick={(e) => e.preventDefault()}
        >
          Esqueceu a palavra-passe?
        </a>
      </div>

      {/* Submit Button */}
      <Button type="submit" variant="primary" fullWidth isLoading={isLoading} disabled={isLoading}>
        {isLoading ? 'A iniciar sessão...' : 'Iniciar Sessão'}
      </Button>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Precisa de uma conta?</span>
        </div>
      </div>

      {/* Link to Register */}
      <Button
        type="button"
        variant="outline"
        fullWidth
        onClick={() => (window.location.href = ROUTES.REGISTER)}
        disabled={isLoading}
      >
        Criar Nova Conta
      </Button>
    </form>
  );
};

export default LoginForm;
