import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-[#111113] border border-[#1a1a1d] rounded-xl p-4 ${className}`}>
      {children}
    </div>
  );
}