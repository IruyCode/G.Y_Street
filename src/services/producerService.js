import { STORAGE_KEYS } from '../utils/constants';
import { generateUUID } from '../utils/helpers';
import { getItem, setItem } from './storageService';

/**
 * Mock Producer Service
 * Manages producers (fornecedores) using LocalStorage
 */

const getAllProducers = () => {
  return getItem(STORAGE_KEYS.PRODUCERS_DB) || [];
};

const saveProducers = (producers) => {
  setItem(STORAGE_KEYS.PRODUCERS_DB, producers, false);
};

/**
 * Get all producers
 * @returns {Array} Array of producer objects
 */
export const getProducers = async () => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return getAllProducers();
};

/**
 * Get producer by ID
 * @param {string} id - Producer ID
 * @returns {Object|null} Producer object or null
 */
export const getProducerById = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const producers = getAllProducers();
  return producers.find((p) => p.id === id) || null;
};

/**
 * Create a new producer
 * @param {Object} data - Producer data
 * @returns {Object} Created producer
 */
export const createProducer = async (data) => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const producers = getAllProducers();

  const existing = producers.find(
    (p) => p.email.toLowerCase() === data.email.toLowerCase()
  );
  if (existing) {
    throw new Error('Já existe um produtor com este email.');
  }

  const newProducer = {
    id: generateUUID(),
    name: data.name.trim(),
    company: data.company.trim(),
    email: data.email.toLowerCase().trim(),
    phone: data.phone.trim(),
    category: data.category,
    status: data.status || 'active',
    notes: data.notes?.trim() || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  producers.push(newProducer);
  saveProducers(producers);

  return newProducer;
};

/**
 * Update an existing producer
 * @param {string} id - Producer ID
 * @param {Object} updates - Fields to update
 * @returns {Object} Updated producer
 */
export const updateProducer = async (id, updates) => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const producers = getAllProducers();
  const index = producers.findIndex((p) => p.id === id);

  if (index === -1) {
    throw new Error('Produtor não encontrado.');
  }

  // Check email uniqueness (excluding current producer)
  if (updates.email) {
    const emailTaken = producers.some(
      (p) => p.id !== id && p.email.toLowerCase() === updates.email.toLowerCase()
    );
    if (emailTaken) {
      throw new Error('Já existe um produtor com este email.');
    }
  }

  producers[index] = {
    ...producers[index],
    ...updates,
    email: updates.email ? updates.email.toLowerCase().trim() : producers[index].email,
    updatedAt: new Date().toISOString(),
  };

  saveProducers(producers);
  return producers[index];
};

/**
 * Delete a producer
 * @param {string} id - Producer ID
 */
export const deleteProducer = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const producers = getAllProducers();
  const filtered = producers.filter((p) => p.id !== id);

  if (filtered.length === producers.length) {
    throw new Error('Produtor não encontrado.');
  }

  saveProducers(filtered);
};

/**
 * Seed demo producers if none exist
 */
export const seedProducers = () => {
  const existing = getAllProducers();
  if (existing.length > 0) return;

  const demo = [
    {
      id: generateUUID(),
      name: 'Carlos Mendes',
      company: 'FashionPro Lda.',
      email: 'carlos@fashionpro.pt',
      phone: '+351 912 345 678',
      category: 'Vestuário',
      status: 'active',
      notes: 'Fornecedor principal de t-shirts e hoodies.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: generateUUID(),
      name: 'Ana Ribeiro',
      company: 'StreetWear Imports',
      email: 'ana@streetwear.pt',
      phone: '+351 934 567 890',
      category: 'Acessórios',
      status: 'active',
      notes: 'Especialista em bonés e mochilas.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: generateUUID(),
      name: 'João Costa',
      company: 'Urban Kicks',
      email: 'joao@urbankicks.pt',
      phone: '+351 967 890 123',
      category: 'Calçado',
      status: 'inactive',
      notes: 'Fornecedor de calçado urbano.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  saveProducers(demo);
};
