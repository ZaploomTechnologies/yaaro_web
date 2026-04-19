import { motion } from 'framer-motion';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  className = '',
  icon,
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 cursor-pointer select-none';

  const variants = {
    primary:
      'bg-primary text-primary-lowest hover:bg-primary-container active:scale-95 shadow-primary-glow hover:shadow-[0_0_40px_rgba(208,234,89,0.5)]',
    secondary:
      'bg-surface-card text-surface-text border border-border hover:border-primary/50 hover:bg-surface-card/80 active:scale-95',
    ghost:
      'bg-transparent text-primary border border-primary/40 hover:bg-primary/10 hover:border-primary active:scale-95',
    outline:
      'bg-transparent text-surface-text border border-border hover:border-primary/30 active:scale-95',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  // icon is now a React element (SVG) passed directly
  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        {...props}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </motion.button>
  );
}
