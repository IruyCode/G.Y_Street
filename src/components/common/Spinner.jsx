import PropTypes from 'prop-types';
import { Loader2 } from 'lucide-react';

/**
 * Spinner Component
 * Loading indicator with various sizes
 */
export const Spinner = ({
  size = 'md',
  color = 'primary',
  className = '',
  text,
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  // Color classes
  const colorClasses = {
    primary: 'text-primary-600',
    white: 'text-white',
    gray: 'text-gray-600',
    black: 'text-black',
  };

  const spinnerClasses = `
    ${sizeClasses[size] || sizeClasses.md}
    ${colorClasses[color] || colorClasses.primary}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Loader2 className={`${spinnerClasses} animate-spin`} />
      {text && <p className="text-sm text-gray-600">{text}</p>}
    </div>
  );
};

Spinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  color: PropTypes.oneOf(['primary', 'white', 'gray', 'black']),
  className: PropTypes.string,
  text: PropTypes.string,
};

/**
 * Full Page Spinner Component
 * Covers entire screen with loading indicator
 */
export const FullPageSpinner = ({ text = 'A carregar...' }) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
      <Spinner size="xl" text={text} />
    </div>
  );
};

FullPageSpinner.propTypes = {
  text: PropTypes.string,
};

export default Spinner;
