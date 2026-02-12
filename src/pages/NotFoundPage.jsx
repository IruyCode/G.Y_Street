import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { ROUTES } from '../utils/constants';
import Button from '../components/common/Button';

/**
 * 404 Not Found Page Component
 * Displayed when user navigates to non-existent route
 */
export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        {/* 404 Illustration */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-600 mb-4">404</h1>
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-primary-600 to-transparent"></div>
        </div>

        {/* Content */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Página Não Encontrada
        </h2>
        <p className="text-gray-600 mb-8">
          Oops! A página que procura não existe ou foi movida. Verifique o URL
          ou volte para a página inicial.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            size="lg"
            onClick={() => (window.location.href = ROUTES.HOME)}
          >
            <Home className="w-5 h-5 mr-2" />
            Página Inicial
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar Atrás
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Se achar que isto é um erro, por favor contacte o suporte.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
