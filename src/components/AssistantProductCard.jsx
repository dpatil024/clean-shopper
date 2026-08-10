import Button from './Button'
import IconButton from './IconButton'
import VerdictBadge from './VerdictBadge'

export default function AssistantProductCard({
  image,
  imageAlt,
  brand,
  name,
  verdict,
  note,
  onAddToList,
  onSave,
}) {
  return (
    <article className="flex w-full gap-4 rounded-card border border-border bg-panel p-3 shadow-card">
      <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-md bg-surface">
        <img
          src={image}
          alt={imageAlt}
          className="h-full w-full object-cover"
        />
        <div className="absolute left-1.5 top-1.5">
          <VerdictBadge verdict={verdict} variant="ribbon" />
        </div>
        <div className="absolute right-1.5 top-1.5">
          <IconButton
            icon="♡"
            label={`Save ${name}`}
            onClick={onSave}
            variant="onPhoto"
            size="sm"
          />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-2">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">
          {brand}
        </p>
        <h2 className="font-display text-2xl leading-tight text-ink">
          {name}
        </h2>

        <VerdictBadge verdict={verdict} variant="pill" />

        {note && (
          <p className="text-xs leading-relaxed text-ink-soft">{note}</p>
        )}

        <div className="mt-1">
          <Button variant="primary" onClick={onAddToList}>
            Add to shopping list
          </Button>
        </div>
      </div>
    </article>
  )
}
