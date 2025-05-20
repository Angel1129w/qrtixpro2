import React from 'react';

const FormInput = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  required = false,
  className = '',
  ...props
}) => {
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`form-control ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''} ${className}`}
        required={required}
        {...props}
      />
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default FormInput;