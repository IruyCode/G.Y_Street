import PropTypes from 'prop-types';
import { AlertCircle } from 'lucide-react';

/**
 * Form Error Component
 * Displays error messages with icon
 */
export const FormError = ({ message, className = '' }) => {
  if (!message) return null;

  return (
    <div
      className={`flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg ${className}`}
      role="alert"
    >
      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
      <p className="text-sm text-red-800 flex-1">{message}</p>
    </div>
  );
};

FormError.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
};

export default FormError;
