export const VERDICT_STYLES = {
  clean: {
    label: 'Clean',
    ribbon: 'bg-clean text-cream',
    pill: 'bg-clean-bg text-clean',
  },
  caution: {
    label: 'Worth a closer look',
    ribbon: 'bg-caution text-cream',
    pill: 'bg-caution-bg text-caution',
  },
  avoid: {
    label: 'Skip this one',
    ribbon: 'bg-avoid text-cream',
    pill: 'bg-avoid-bg text-avoid',
  },
}

export default function VerdictBadge({ verdict, variant, onClick, pressed, className = '' }) {
  const style = VERDICT_STYLES[verdict]

  if (variant === 'ribbon') {
    const ribbonClasses = `rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${style.ribbon} ${className}`

    if (onClick) {
      return (
        <button
          type="button"
          onClick={onClick}
          aria-pressed={pressed}
          className={`${ribbonClasses} cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${
            pressed ? 'ring-2 ring-ink ring-offset-1 ring-offset-cream' : ''
          }`}
        >
          {style.label}
        </button>
      )
    }

    return <span className={ribbonClasses}>{style.label}</span>
  }

  const pillClasses = `inline-flex w-fit items-center rounded-pill px-2.5 py-1 text-xs font-semibold ${style.pill} ${className}`

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={pressed}
        className={`${pillClasses} cursor-pointer transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
          pressed ? 'ring-2 ring-ink' : ''
        }`}
      >
        {style.label}
      </button>
    )
  }

  return <span className={pillClasses}>{style.label}</span>
}
