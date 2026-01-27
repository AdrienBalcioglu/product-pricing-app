import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function Input({ className = '', ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`bg-[#0a0a0b] border border-[#1a1a1d] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cyan-400 ${className}`}
    />
  );
}