import React from 'react';
import { ChevronDown } from 'lucide-react';

const SelectField = ({ label, placeholder, options = [], value, onChange, ...props }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-xs text-gray-500 mb-1 ml-1 uppercase tracking-wider">{label}</label>}
      <div className="relative flex items-center">
        <select
          value={value}
          onChange={onChange}
          className="w-full bg-lexgo-bg border border-gray-100 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 appearance-none text-gray-700"
          {...props}
        >
          <option value="" disabled hidden>{placeholder}</option>
          {options.map((opt, i) => (
            <option key={i} value={opt}>{opt}</option>
          ))}
        </select>
        <div className="absolute right-4 text-gray-700 pointer-events-none">
          <ChevronDown size={18} />
        </div>
      </div>
    </div>
  );
};

export default SelectField;
