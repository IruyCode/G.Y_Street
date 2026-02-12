import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  LogOut,
  Package,
  Plus,
  Search,
} from 'lucide-react';
import { ROUTES } from '../utils/constants';
import Button from '../components/common/Button';

/**
 * Products Page Component
 * Product management page (placeholder for future CRUD implementation)
 */
export const ProductsPage = () => {
  const { user, logout } = useAuth();

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

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6">
            <Link
              to={ROUTES.DASHBOARD}
              className="px-3 py-4 text-sm font-medium text-gray-600 hover:text-primary-600 border-b-2 border-transparent hover:border-primary-600 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to={ROUTES.PRODUCTS}
              className="px-3 py-4 text-sm font-medium text-primary-600 border-b-2 border-primary-600"
            >
              Produtos
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Produtos</h2>
            <p className="text-gray-600">Gerir o seu inventário de produtos</p>
          </div>
          <Button variant="primary">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Produto
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Procurar produtos..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
              <option>Todas as Categorias</option>
              <option>Electrónicos</option>
              <option>Roupa</option>
              <option>Alimentos</option>
            </select>
          </div>
        </div>

        {/* Empty State */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
            <Package className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Nenhum Produto Encontrado
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Ainda não tem produtos no inventário. Comece por adicionar o seu
            primeiro produto para gerir o stock.
          </p>
          <Button variant="primary" size="lg">
            <Plus className="w-5 h-5 mr-2" />
            Adicionar Primeiro Produto
          </Button>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              💡 <strong>Dica:</strong> Esta página é um placeholder. A
              funcionalidade CRUD de produtos será implementada na próxima fase
              do projeto.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductsPage;
