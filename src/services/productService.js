import { STORAGE_KEYS } from '../utils/constants';
import { generateUUID } from '../utils/helpers';
import { getItem, setItem } from './storageService';

/**
 * Mock Product Service
 * Manages products using LocalStorage
 */

const getAllProducts = () => {
  return getItem(STORAGE_KEYS.PRODUCTS_DB) || [];
};

const saveProducts = (products) => {
  setItem(STORAGE_KEYS.PRODUCTS_DB, products, false);
};

/**
 * Get all products
 * @returns {Array} Array of product objects
 */
export const getProducts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return getAllProducts();
};

/**
 * Get product by ID
 * @param {string} id
 * @returns {Object|null}
 */
export const getProductById = async (id) => {
  const products = getAllProducts();
  return products.find((p) => p.id === id) || null;
};

/**
 * Create a new product
 * @param {Object} data
 * @returns {Object} Created product
 */
export const createProduct = async (data) => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const products = getAllProducts();

  const newProduct = {
    id: generateUUID(),
    name: data.name.trim(),
    description: data.description?.trim() || '',
    price: parseFloat(data.price),
    stock: parseInt(data.stock, 10),
    category: data.category,
    producerId: data.producerId || null,
    image: data.image?.trim() || '',
    status: data.status || 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  products.push(newProduct);
  saveProducts(products);

  return newProduct;
};

/**
 * Update an existing product
 * @param {string} id
 * @param {Object} updates
 * @returns {Object} Updated product
 */
export const updateProduct = async (id, updates) => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const products = getAllProducts();
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    throw new Error('Produto não encontrado.');
  }

  products[index] = {
    ...products[index],
    ...updates,
    price: updates.price !== undefined ? parseFloat(updates.price) : products[index].price,
    stock: updates.stock !== undefined ? parseInt(updates.stock, 10) : products[index].stock,
    updatedAt: new Date().toISOString(),
  };

  saveProducts(products);
  return products[index];
};

/**
 * Delete a product
 * @param {string} id
 */
export const deleteProduct = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const products = getAllProducts();
  const filtered = products.filter((p) => p.id !== id);

  if (filtered.length === products.length) {
    throw new Error('Produto não encontrado.');
  }

  saveProducts(filtered);
};

/**
 * Get product stats
 * @returns {Object} Stats object
 */
export const getProductStats = () => {
  const products = getAllProducts();
  const totalProducts = products.length;
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5).length;
  const outOfStock = products.filter((p) => p.stock === 0).length;
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
  const categories = [...new Set(products.map((p) => p.category))].length;

  return { totalProducts, lowStock, outOfStock, totalValue, categories };
};

/**
 * Seed demo products if none exist
 */
export const seedProducts = () => {
  const existing = getAllProducts();
  if (existing.length > 0) return;

  const categories = ['Vestuário', 'Calçado', 'Acessórios'];
  const images = [
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
    'https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=400&q=80',
    'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&q=80',
    'https://images.unsplash.com/photo-1606890542729-aa5e7f71e83b?w=400&q=80',
  ];

  const demo = [
    {
      id: generateUUID(),
      name: 'Hoodie Classic GY',
      description: 'Hoodie premium com bordado G.Y Street. Disponível em várias cores.',
      price: 49.99,
      stock: 25,
      category: 'Vestuário',
      producerId: null,
      image: images[0],
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: generateUUID(),
      name: 'Sapatilhas Urban Runner',
      description: 'Sapatilhas de alta performance para o dia-a-dia urbano.',
      price: 89.99,
      stock: 12,
      category: 'Calçado',
      producerId: null,
      image: images[1],
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: generateUUID(),
      name: 'Mochila Street Pack',
      description: 'Mochila resistente e estilosa. Capacidade de 20L.',
      price: 34.99,
      stock: 3,
      category: 'Acessórios',
      producerId: null,
      image: images[2],
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: generateUUID(),
      name: 'Boné Snapback GY',
      description: 'Boné snapback com logo bordado G.Y Street.',
      price: 22.99,
      stock: 40,
      category: 'Acessórios',
      producerId: null,
      image: images[3],
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: generateUUID(),
      name: 'T-Shirt Oversize',
      description: 'T-shirt oversize de algodão 100% com estampado exclusivo.',
      price: 29.99,
      stock: 0,
      category: 'Vestuário',
      producerId: null,
      image: images[4],
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: generateUUID(),
      name: 'Sweatshirt Crewneck',
      description: 'Sweatshirt confortável com gola redonda e design minimalista.',
      price: 44.99,
      stock: 18,
      category: 'Vestuário',
      producerId: null,
      image: images[5],
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  saveProducts(demo);
};
