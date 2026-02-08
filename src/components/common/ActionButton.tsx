import { Link } from 'react-router-dom';

/**
 * Reusable Action Button Component
 *
 * @param {string} children - Button text
 * @param {string} to - Link destination (uses Link if provided, button otherwise)
 * @param {function} onClick - Click handler
 * @param {string} variant - 'primary' (blue) | 'dark' (navy)
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {boolean} showIcon - Show the + icon
 * @param {boolean} fullWidth - Make button full width
 * @param {string} className - Additional classes
 */
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
}) => {
  // Base styles
  const baseStyles = 'inline-flex items-center justify-center font-semibold uppercase tracking-wide transition-all duration-300 hover:shadow-lg';

  // Variant styles
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    dark: 'bg-[#0A1929] text-white hover:bg-[#1A2942]',
    secondary: 'bg-white text-[#0A1929] hover:bg-gray-100',
  };

  // Size styles
  const sizes = {
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
      <Link to={to} className={combinedStyles} {...props}>
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
