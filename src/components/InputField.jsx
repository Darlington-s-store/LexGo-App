import React from 'react';

const InputField = ({ label, type = 'text', placeholder, icon: Icon, value, onChange, ...props }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-xs text-gray-500 mb-1 ml-1">{label}</label>}
      <div className="relative flex items-center">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full bg-lexgo-bg border border-gray-100 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder-gray-400"
          {...props}
        />
        {Icon && (
          <div className="absolute right-4 text-gray-400">
            <Icon size={18} />
          </div>
        )}
      </div>
    </div>
  );
};

export default InputField;
