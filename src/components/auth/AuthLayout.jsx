import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

/**
 * Auth Layout Component
 * Provides consistent layout for authentication pages (login, register)
 */
export const AuthLayout = ({ children, title, subtitle, footerText, footerLink, footerLinkText }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-2xl mb-4 shadow-lg">
            <ShoppingBag className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">G.Y Street</h1>
          <p className="text-sm text-gray-600 mt-1">E-Commerce & Gestão de Inventário</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 fade-in">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            {subtitle && <p className="text-sm text-gray-600 mt-2">{subtitle}</p>}
          </div>

          {/* Content */}
          <div>{children}</div>

          {/* Footer */}
          {footerText && footerLink && footerLinkText && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {footerText}{' '}
                <Link
                  to={footerLink}
                  className="font-medium text-primary-600 hover:text-primary-700 hover:underline transition-colors"
                >
                  {footerLinkText}
                </Link>
              </p>
            </div>
          )}
        </div>

        {/* Bottom Text */}
        <p className="text-center text-xs text-gray-500 mt-6">
          © {new Date().getFullYear()} G.Y Street. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  footerText: PropTypes.string,
  footerLink: PropTypes.string,
  footerLinkText: PropTypes.string,
};

export default AuthLayout;
