const SIZE_STYLES = {
  md: 'h-7 w-7 text-sm',
  sm: 'h-6 w-6 text-xs',
}

export default function IconButton({
  icon,
  label,
  onClick,
  variant = 'default',
  size = 'md',
}) {
  const variantStyles =
    variant === 'onPhoto'
      ? 'border border-border bg-panel text-ink-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-cream'
      : 'border border-border-strong bg-transparent text-ink-soft hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink'

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`flex items-center justify-center rounded-full ${SIZE_STYLES[size]} ${variantStyles}`}
    >
      <span aria-hidden="true">{icon}</span>
    </button>
  )
}
