import { Link } from 'react-router-dom';
import type { ReactNode, MouseEventHandler } from 'react';

interface ActionButtonProps {
  children: ReactNode;
  to?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: 'primary' | 'dark' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  fullWidth?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const ActionButton = ({
  children,
  to,
  onClick,
  variant = 'primary',
  size = 'md',
  showIcon = true,
  fullWidth = false,
  className = '',
  type = 'button',
  ...props
}: ActionButtonProps) => {
  // Base styles
  const baseStyles = 'inline-flex items-center justify-center font-semibold uppercase tracking-wide transition-all duration-300 hover:shadow-lg';

  // Variant styles
  const variants: Record<string, string> = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    dark: 'bg-[#0A1929] text-white hover:bg-[#1A2942]',
    secondary: 'bg-white text-[#0A1929] hover:bg-gray-100',
  };

  // Size styles
  const sizes: Record<string, string> = {
    sm: 'px-6 py-2.5 text-sm gap-2',
    md: 'px-8 py-3 text-sm gap-2',
    lg: 'px-10 py-4 text-base gap-3',
  };

  const combinedStyles = `
    ${baseStyles}
    ${variants[variant] || variants.primary}
    ${sizes[size] || sizes.md}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim();

  const content = (
    <>
      {children}
      {showIcon && <span className="text-lg leading-none">+</span>}
    </>
  );

  // Render as Link if 'to' prop is provided
  if (to) {
    return (
      <Link to={to} className={combinedStyles}>
        {content}
      </Link>
    );
  }

  // Render as button
  return (
    <button type={type} onClick={onClick} className={combinedStyles} {...props}>
      {content}
    </button>
  );
};

export default ActionButton;
