import { z } from 'zod';

/**
 * Zod Validation Schemas for Producer Forms
 */

export const PRODUCER_CATEGORIES = [
  'Vestuário',
  'Calçado',
  'Acessórios',
  'Electrónica',
  'Desporto',
  'Outro',
];

export const producerSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(100, 'Nome muito longo'),
  company: z
    .string()
    .min(1, 'Empresa é obrigatória')
    .min(2, 'Nome da empresa deve ter pelo menos 2 caracteres')
    .max(100, 'Nome da empresa muito longo'),
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido'),
  phone: z
    .string()
    .min(1, 'Telefone é obrigatório')
    .min(9, 'Telefone deve ter pelo menos 9 dígitos'),
  category: z
    .string()
    .min(1, 'Categoria é obrigatória'),
  status: z.enum(['active', 'inactive']).default('active'),
  notes: z.string().max(500, 'Notas muito longas').optional().default(''),
});

export const PRODUCT_CATEGORIES = [
  'Vestuário',
  'Calçado',
  'Acessórios',
  'Electrónica',
  'Desporto',
  'Outro',
];

export const productSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome muito longo'),
  description: z
    .string()
    .max(500, 'Descrição muito longa')
    .optional()
    .default(''),
  price: z
    .string()
    .min(1, 'Preço é obrigatório')
    .refine((v) => !isNaN(parseFloat(v)) && parseFloat(v) >= 0, 'Preço inválido'),
  stock: z
    .string()
    .min(1, 'Stock é obrigatório')
    .refine((v) => !isNaN(parseInt(v)) && parseInt(v) >= 0, 'Stock inválido'),
  category: z.string().min(1, 'Categoria é obrigatória'),
  producerId: z.string().optional().default(''),
  image: z.string().optional().default(''),
  status: z.enum(['active', 'inactive']).default('active'),
});
