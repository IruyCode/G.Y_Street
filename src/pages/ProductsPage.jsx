import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  LogOut,
  Package,
  Plus,
  Search,
  Pencil,
  Trash2
} from 'lucide-react';
import { ROUTES } from '../utils/constants';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import AddProducts from '../components/products/addproducts';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';

DataTable.use(DT);

/**
 * Products Page Component
 */
export const ProductsPage = () => {
  const { user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // Função para carregar produtos 
  const loadProducts = () => {
    const stored = JSON.parse(localStorage.getItem('products') || '[]');
    setProducts(stored);
  };

  // Carrega os produtos assim que a página carrega
  useEffect(() => {
    loadProducts();
  }, []);

  // Esta função é chamada pelo AddProducts quando o save tem sucesso
  const handleProductAdded = () => {
    setIsModalOpen(false); // Fecha o Modal
    loadProducts();        // Recarrega a lista do LocalStorage para atualizar a tabela
  };

  //Edição de produtos
  const handleOpenEdit = (product) => {
    setEditingProduct(product); // Passa os dados do produto para o estado
    setIsModalOpen(true);
  };

  const handleOpenAdd = () => {
    setEditingProduct(null); // Garante que o form vem vazio
    setIsModalOpen(true);
  };

  const handleProductSuccess = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    loadProducts();
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem a certeza que deseja eliminar este produto?')) {
      const stored = JSON.parse(localStorage.getItem('products') || '[]');
      const filtered = stored.filter(p => p.id !== id);
      localStorage.setItem('products', JSON.stringify(filtered));
      loadProducts(); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* --- HEADER --- */}
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

      {/* --- NAVIGATION --- */}
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

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Produtos</h2>
            <p className="text-gray-600">Gerir o seu inventário de produtos</p>
          </div>
          <Button variant="primary" onClick={handleOpenAdd}>
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Produto
          </Button>
        </div>

        <Modal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            title={editingProduct ? "Editar Produto" : "Novo Produto"} >
          <AddProducts 
            onSuccess={handleProductSuccess} 
            initialData={editingProduct} 
          />
        </Modal>

        {/* Search and Filters 
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
        </div> */}

        {products.length > 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-4 sm:p-6">
            <DataTable className="w-full table-auto border-collapse text-sm text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{product.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{Number(product.price).toFixed(2)}€</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${product.stock > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {product.stock}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleOpenEdit(product)} 
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                          title="Editar"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </DataTable>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <Package className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum Produto Encontrado</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Ainda não tem produtos no inventário. Comece por adicionar o seu primeiro produto para gerir o stock.
            </p>
            <Button variant="primary" size="lg" onClick={() => setIsModalOpen(true)}> 
              <Plus className="w-5 h-5 mr-2" />
              Adicionar Primeiro Produto
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductsPage;