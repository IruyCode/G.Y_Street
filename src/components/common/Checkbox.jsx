import PropTypes from 'prop-types';
import { forwardRef } from 'react';

/**
 * Reusable Checkbox Component
 * Supports labels, error states, and custom styling
 */
export const Checkbox = forwardRef(
  (
    {
      label,
      name,
      checked = false,
      disabled = false,
      required = false,
      error,
      className = '',
      onChange,
      ...props
    },
    ref
  ) => {
    const checkboxId = `checkbox-${name}`;
    const hasError = !!error;

    // Base checkbox classes
    const checkboxClasses = `
      w-4 h-4 text-primary-600 bg-white border-gray-300 rounded
      focus:ring-2 focus:ring-primary-500 focus:ring-offset-0
      transition-all duration-200
      ${hasError ? 'border-red-500' : ''}
      ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
    `.trim().replace(/\s+/g, ' ');

    // Label classes
    const labelClasses = `
      text-sm text-gray-700 select-none
      ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
    `.trim().replace(/\s+/g, ' ');

    return (
      <div className={className}>
        <div className="flex items-start">
          {/* Checkbox */}
          <div className="flex items-center h-5">
            <input
              ref={ref}
              id={checkboxId}
              name={name}
              type="checkbox"
              checked={checked}
              disabled={disabled}
              required={required}
              className={checkboxClasses}
              onChange={onChange}
              aria-invalid={hasError}
              aria-describedby={error ? `${checkboxId}-error` : undefined}
              {...props}
            />
          </div>

          {/* Label */}
          {label && (
            <div className="ml-2 flex-1">
              <label htmlFor={checkboxId} className={labelClasses}>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </label>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <p
            id={`${checkboxId}-error`}
            className="mt-1 ml-6 text-sm text-red-600 flex items-center"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

Checkbox.propTypes = {
  label: PropTypes.node,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
};

export default Checkbox;
