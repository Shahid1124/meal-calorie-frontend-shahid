
import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  tag?: keyof HTMLElementTagNameMap; // Allows dynamic HTML tags
}

const Container = ({ children, className, tag: Tag = 'div' }: ContainerProps) => {
  return (
    <Tag className={`min-h-screen w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 ${className || ''}`}>
      {children}
    </Tag>
  );
};

export default Container;
