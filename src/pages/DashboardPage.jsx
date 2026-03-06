import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  LogOut,
  User,
  Package,
  TrendingUp,
  AlertTriangle,
  Users,
  Store,
} from 'lucide-react';
import { ROUTES, STORAGE_KEYS } from '../utils/constants';
import Button from '../components/common/Button';
import { getProductStats } from '../services/productService';
import { getItem } from '../services/storageService';

/**
 * Dashboard Page Component
 * Main dashboard after login with overview stats and quick actions
 */
export const DashboardPage = () => {
  const { user, logout } = useAuth();

  const productStats = getProductStats();
  const producersCount = (getItem(STORAGE_KEYS.PRODUCERS_DB) || []).length;

  const stats = [
    {
      label: 'Total de Produtos',
      value: productStats.totalProducts.toString(),
      icon: Package,
      color: 'text-primary-600',
      bgColor: 'bg-primary-100',
    },
    {
      label: 'Stock Baixo',
      value: productStats.lowStock.toString(),
      icon: AlertTriangle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      label: 'Valor Total',
      value: `€${productStats.totalValue.toFixed(2)}`,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      label: 'Produtores',
      value: producersCount.toString(),
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  const quickActions = [
    {
      to: ROUTES.STORE,
      icon: Store,
      title: 'Loja',
      description: 'Vitrina de produtos',
      ready: true,
    },
    {
      to: ROUTES.PRODUCERS,
      icon: Users,
      title: 'Gerir Produtores',
      description: 'CRUD de produtores',
      ready: true,
    },
    {
      to: ROUTES.PRODUCTS,
      icon: Package,
      title: 'Gerir Produtos',
      description: 'Ver e editar produtos',
      ready: true,
    },
    {
      to: ROUTES.PROFILE,
      icon: User,
      title: 'Perfil',
      description: 'Ver e editar perfil',
      ready: true,
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
              <Link to={ROUTES.PROFILE} className="hidden sm:flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600 transition-colors">
                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold text-xs">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </Link>
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
            Bem-vindo, {user?.name?.split(' ')[0]}!
          </h2>
          <p className="text-gray-600">
            Aqui está um resumo do seu e-commerce.
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
            Acesso Rápido
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.to}
                  to={action.to}
                  className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all group"
                >
                  <Icon className="w-6 h-6 text-gray-500 group-hover:text-primary-600 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 group-hover:text-primary-600 truncate">
                      {action.title}
                    </p>
                    <p className="text-sm text-gray-500 truncate">{action.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-xl shadow-lg p-8 text-white">
          <h3 className="text-2xl font-bold mb-2">
            G.Y Street E-Commerce
          </h3>
          <p className="text-primary-100 mb-4">
            Sistema completo com autenticação, gestão de produtores, catálogo de produtos e loja online.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to={ROUTES.STORE}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <Store className="w-4 h-4" />
              Visitar Loja
            </Link>
            <Link
              to={ROUTES.PRODUCERS}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <Users className="w-4 h-4" />
              Ver Produtores
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
