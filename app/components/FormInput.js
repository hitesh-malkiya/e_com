import React from 'react'

export default function FormInput({
  label,
  name,
  type = 'text',
  placeholder = '',
  required = false,
  className = '',
  error
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[var(--text-color)] mb-2" htmlFor={name} >
        {label}{required ? ' *' : ''}
      </label>
      <input
id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-3 border rounded-lg focus:border-transparent transition duration-200 ${className} ${
          error ? 'border-red-500' : 'border-[var(--accent-color)]'
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
  
}
