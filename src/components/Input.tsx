import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  error?: string;
}

export default function Input({
  id,
  type,
  defaultValue,
  error,
  placeholder,
  label,
  ...rest
}: InputProps) {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={id} className="uppercase">
          {label}
        </label>
      )}
      <input
        type={type}
        {...rest}
        defaultValue={defaultValue}
        className="bg-transparent border-b border-black focus:border-slate-400 p-1 focus:ring-transparent focus:outline-none focus:placeholder:text-slate-400 placeholder:text-slate-500"
        placeholder={placeholder}
      />
      {error && <p className="text-red">{error}</p>}
    </div>
  );
}
