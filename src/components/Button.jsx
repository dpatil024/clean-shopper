const VARIANT_STYLES = {
  primary:
    'bg-accent text-ink motion-safe:hover:-translate-y-0.5 focus-visible:outline-ink',
  secondary:
    'border border-border-strong bg-panel text-ink hover:border-ink focus-visible:outline-ink',
  ghost:
    'text-ink underline decoration-border-strong underline-offset-4 hover:decoration-ink focus-visible:outline-ink',
}

export default function Button({
  variant = 'primary',
  fullWidth = false,
  type = 'button',
  onClick,
  children,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-md px-4 py-2.5 text-sm font-semibold transition-transform duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
        fullWidth ? 'w-full' : 'w-fit'
      } ${VARIANT_STYLES[variant]}`}
    >
      {children}
    </button>
  )
}
