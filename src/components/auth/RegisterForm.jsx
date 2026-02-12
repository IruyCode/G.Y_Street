import { useState } from 'react';
import { Mail, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { registerSchema } from '../../schemas/authSchemas';
import { ROUTES } from '../../utils/constants';
import Button from '../common/Button';
import Input from '../common/Input';
import PasswordInput from './PasswordInput';
import FormError from '../common/FormError';

/**
 * Register Form Component
 * Complete registration form with validation and password strength indicator
 */
export const RegisterForm = () => {
  const { register, isLoading, error: authError } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
      const validatedData = registerSchema.parse(formData);

      // Remove confirmPassword before sending to register
      const { confirmPassword, ...userData } = validatedData;

      // Attempt registration
      await register(userData);
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
        setFormError(error.message || 'Ocorreu um erro ao criar a conta');
      }
    }
  };

  // Calculate password strength
  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, label: '', color: '' };

    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    if (strength <= 2)
      return { strength: 33, label: 'Fraca', color: 'bg-red-500' };
    if (strength <= 4)
      return { strength: 66, label: 'Média', color: 'bg-yellow-500' };
    return { strength: 100, label: 'Forte', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Form-level Error */}
      {(formError || authError) && <FormError message={formError || authError} />}

      {/* Name Input */}
      <Input
        label="Nome Completo"
        name="name"
        type="text"
        value={formData.name}
        placeholder="Introduza o seu nome"
        error={errors.name}
        required
        leftIcon={<User className="w-5 h-5" />}
        onChange={handleChange}
        disabled={isLoading}
        autoComplete="name"
      />

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
      <div>
        <PasswordInput
          label="Palavra-passe"
          name="password"
          value={formData.password}
          placeholder="Crie uma palavra-passe"
          error={errors.password}
          required
          onChange={handleChange}
          disabled={isLoading}
          autoComplete="new-password"
        />

        {/* Password Strength Indicator */}
        {formData.password && (
          <div className="mt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-600">Força da palavra-passe:</span>
              <span className={`text-xs font-medium ${passwordStrength.color.replace('bg-', 'text-')}`}>
                {passwordStrength.label}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                style={{ width: `${passwordStrength.strength}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Confirm Password Input */}
      <PasswordInput
        label="Confirmar Palavra-passe"
        name="confirmPassword"
        value={formData.confirmPassword}
        placeholder="Confirme a palavra-passe"
        error={errors.confirmPassword}
        required
        onChange={handleChange}
        disabled={isLoading}
        autoComplete="new-password"
      />

      {/* Submit Button */}
      <Button type="submit" variant="primary" fullWidth isLoading={isLoading} disabled={isLoading}>
        {isLoading ? 'A criar conta...' : 'Criar Conta'}
      </Button>

      {/* Terms Text */}
      <p className="text-xs text-gray-600 text-center">
        Ao criar uma conta, concorda com os nossos{' '}
        <a href="#" className="text-primary-600 hover:underline" onClick={(e) => e.preventDefault()}>
          Termos de Serviço
        </a>{' '}
        e{' '}
        <a href="#" className="text-primary-600 hover:underline" onClick={(e) => e.preventDefault()}>
          Política de Privacidade
        </a>
      </p>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Já tem uma conta?</span>
        </div>
      </div>

      {/* Link to Login */}
      <Button
        type="button"
        variant="outline"
        fullWidth
        onClick={() => (window.location.href = ROUTES.LOGIN)}
        disabled={isLoading}
      >
        Iniciar Sessão
      </Button>
    </form>
  );
};

export default RegisterForm;
