import IconButton from './IconButton'

export default function PreferenceTag({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-pill border border-border bg-panel py-1 pl-3 pr-1.5 text-xs font-medium text-ink">
      {label}
      {onRemove && (
        <IconButton
          icon="×"
          label={`Remove ${label}`}
          onClick={onRemove}
          size="sm"
        />
      )}
    </span>
  )
}
