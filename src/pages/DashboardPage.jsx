import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import {
  Home,
  Package,
  LogOut,
  User,
  ShoppingBag,
  TrendingUp,
  AlertTriangle,
  BarChart3,
} from 'lucide-react';
import { ROUTES } from '../utils/constants';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import AddProducts from '../components/products/addproducts';

/**
 * Dashboard Page Component
 * Main dashboard after login with overview stats and quick actions
 */
export const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleProductSuccess = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    loadProducts();
  };

  const [products, setProducts] = useState([]);

  const loadProducts = () => {
    const stored = JSON.parse(localStorage.getItem('products') || '[]');
    setProducts(stored);
  };

  React.useEffect(() => {
    loadProducts();
  }, []);

  const totalProducts = products.length;
  const lowStockCount = products.filter(p => Number(p.stock) < 5).length;
  const totalValue = products.reduce((sum, p) => sum + Number(p.price || 0), 0);
  const categoryCount = new Set(products.map(p => p.category)).size;

  const stats = [
    {
      label: 'Total de Produtos',
      value: totalProducts,
      icon: Package,
      color: 'text-primary-600',
      bgColor: 'bg-primary-100',
    },
    {
      label: 'Stock Baixo',
      value: lowStockCount,
      icon: AlertTriangle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      label: 'Valor Total',
      value: `€${totalValue.toFixed(2)}`,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      label: 'Categorias',
      value: categoryCount,
      icon: BarChart3,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary-600 rounded-lg">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">G.Y Street</h1>
                <p className="text-xs text-gray-500">E-Commerce</p>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <Button variant="danger" size="sm" onClick={logout}>
                <LogOut className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Sair</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Bem-vindo de Volta, {user?.name?.split(' ')[0]}! 👋
          </h2>
          <p className="text-gray-600">
            Aqui está um resumo do seu inventário hoje.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Ações Rápidas
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              to={ROUTES.PRODUCTS}
              className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all group"
            >
              <Package className="w-6 h-6 text-gray-600 group-hover:text-primary-600" />
              <div>
                <p className="font-medium text-gray-900 group-hover:text-primary-600">
                  Gerir Produtos
                </p>
                <p className="text-sm text-gray-500">Ver e editar produtos</p>
              </div>
            </Link>

            <button
              className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all group"
              onClick={handleOpenAdd}
            >
              <Home className="w-6 h-6 text-gray-600 group-hover:text-primary-600" />
              <div>
                <p className="font-medium text-gray-900 group-hover:text-primary-600">
                  Adicionar Produto
                </p>
                <p className="text-sm text-gray-500">Criar novo item</p>
              </div>
            </button>

            <button
              className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all group text-left"
              onClick={() => alert('Funcionalidade em desenvolvimento')}
            >
              <User className="w-6 h-6 text-gray-400 group-hover:text-primary-600" />
              <div>
                <p className="font-medium text-gray-600 group-hover:text-primary-600">
                  Perfil
                </p>
                <p className="text-sm text-gray-500">Ver perfil</p>
              </div>
            </button>
          </div>
        </div>

        {/* Modal para adicionar/editar produto */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingProduct ? 'Editar Produto' : 'Novo Produto'}
        >
          <AddProducts
            onSuccess={handleProductSuccess}
            initialData={editingProduct}
          />
        </Modal>

        {/* Info Card */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl shadow-lg p-8 text-white">
          <h3 className="text-2xl font-bold mb-2">
            Sistema de Autenticação Funcional! ✅
          </h3>
          <p className="text-primary-100 mb-4">
            O sistema de autenticação está completo e operacional. Você pode
            fazer login, registar-se, e a sua sessão é mantida mesmo após
            fechar o navegador (se selecionou "Lembrar-me").
          </p>
          <p className="text-sm text-primary-100">
            Próximos passos: Implementar CRUD de produtos e gestão de
            inventário.
          </p>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
