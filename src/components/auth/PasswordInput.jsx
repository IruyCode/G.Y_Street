import PropTypes from 'prop-types';
import { useState, forwardRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Input from '../common/Input';

/**
 * Password Input Component with Show/Hide Toggle
 * Extends the base Input component with password visibility toggle
 */
export const PasswordInput = forwardRef(
  (
    {
      label = 'Palavra-passe',
      name = 'password',
      placeholder = 'Introduza a sua palavra-passe',
      error,
      helperText,
      disabled = false,
      required = true,
      fullWidth = true,
      className = '',
      value,
      onChange,
      onBlur,
      onFocus,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    // Toggle button component
    const ToggleButton = (
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors"
        aria-label={showPassword ? 'Ocultar palavra-passe' : 'Mostrar palavra-passe'}
        tabIndex={-1}
      >
        {showPassword ? (
          <EyeOff className="w-5 h-5" />
        ) : (
          <Eye className="w-5 h-5" />
        )}
      </button>
    );

    return (
      <Input
        ref={ref}
        label={label}
        name={name}
        type={showPassword ? 'text' : 'password'}
        value={value}
        placeholder={placeholder}
        error={error}
        helperText={helperText}
        disabled={disabled}
        required={required}
        fullWidth={fullWidth}
        rightIcon={ToggleButton}
        className={className}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        {...props}
      />
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

PasswordInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
};

export default PasswordInput;
