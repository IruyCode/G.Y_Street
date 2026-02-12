import { z } from 'zod';
import { ERROR_MESSAGES, PASSWORD_REGEX } from '../utils/constants';

/**
 * Zod Validation Schemas for Authentication Forms
 */

// Login Schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, ERROR_MESSAGES.REQUIRED_FIELD)
    .email(ERROR_MESSAGES.INVALID_EMAIL),
  password: z
    .string()
    .min(1, ERROR_MESSAGES.REQUIRED_FIELD)
    .min(PASSWORD_REGEX.MIN_LENGTH, ERROR_MESSAGES.MIN_PASSWORD_LENGTH),
  rememberMe: z.boolean().optional().default(false),
});

// Register Schema
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, ERROR_MESSAGES.REQUIRED_FIELD)
      .min(3, 'Nome deve ter pelo menos 3 caracteres')
      .max(50, 'Nome muito longo')
      .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras'),
    email: z
      .string()
      .min(1, ERROR_MESSAGES.REQUIRED_FIELD)
      .email(ERROR_MESSAGES.INVALID_EMAIL),
    password: z
      .string()
      .min(1, ERROR_MESSAGES.REQUIRED_FIELD)
      .min(PASSWORD_REGEX.MIN_LENGTH, ERROR_MESSAGES.MIN_PASSWORD_LENGTH)
      .regex(
        PASSWORD_REGEX.STRONG,
        'Palavra-passe deve conter maiúsculas, minúsculas e números'
      ),
    confirmPassword: z.string().min(1, 'Confirmação de palavra-passe é obrigatória'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: ERROR_MESSAGES.PASSWORD_MISMATCH,
    path: ['confirmPassword'],
  });

// Profile Update Schema
export const profileUpdateSchema = z.object({
  name: z
    .string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(50, 'Nome muito longo')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras')
    .optional(),
});

// Password Reset Schema (for future use)
export const passwordResetSchema = z
  .object({
    currentPassword: z.string().min(1, 'Palavra-passe atual é obrigatória'),
    newPassword: z
      .string()
      .min(PASSWORD_REGEX.MIN_LENGTH, ERROR_MESSAGES.MIN_PASSWORD_LENGTH)
      .regex(
        PASSWORD_REGEX.STRONG,
        'Palavra-passe deve conter maiúsculas, minúsculas e números'
      ),
    confirmNewPassword: z.string().min(1, 'Confirmação de palavra-passe é obrigatória'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: ERROR_MESSAGES.PASSWORD_MISMATCH,
    path: ['confirmNewPassword'],
  });

// Email Schema (for forgot password, etc)
export const emailSchema = z.object({
  email: z
    .string()
    .min(1, ERROR_MESSAGES.REQUIRED_FIELD)
    .email(ERROR_MESSAGES.INVALID_EMAIL),
});

// Type inference for forms (JavaScript compatible)
// Usage: const validatedData = loginSchema.parse(formData);
// TypeScript users can use: type LoginFormData = z.infer<typeof loginSchema>;
