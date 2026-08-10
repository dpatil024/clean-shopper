import Button from './Button'
import IconButton from './IconButton'
import VerdictBadge from './VerdictBadge'

export default function ProductCard({
  image,
  imageAlt,
  brand,
  name,
  verdict,
  note,
  isSaved,
  isInList,
  onAddToList,
  onSave,
  onSelect,
  onVerdictClick,
  verdictFilterActive,
}) {
  return (
    <article className="relative flex w-full flex-col overflow-hidden rounded-card border border-border bg-panel shadow-card">
      {onSelect && (
        <button
          type="button"
          onClick={onSelect}
          aria-label={`View ${name}`}
          className="absolute inset-0 z-0 rounded-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        />
      )}

      <div className="pointer-events-none relative aspect-square w-full bg-surface">
        <img
          src={image}
          alt={imageAlt}
          className="h-full w-full object-cover"
        />
        <div className="pointer-events-auto absolute left-2.5 top-2.5 z-10">
          <VerdictBadge
            verdict={verdict}
            variant="ribbon"
            pressed={verdictFilterActive}
            onClick={onVerdictClick ? () => onVerdictClick(verdict) : undefined}
          />
        </div>
        <div className="pointer-events-auto absolute right-2.5 top-2.5 z-10">
          <IconButton
            icon={isSaved ? '♥' : '♡'}
            label={isSaved ? `Remove ${name} from saved` : `Save ${name}`}
            onClick={onSave}
            variant="onPhoto"
          />
        </div>
      </div>

      <div className="pointer-events-none flex flex-col gap-2 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">
          {brand}
        </p>
        <h2 className="text-base font-semibold leading-snug text-ink">{name}</h2>

        {note && <p className="text-xs leading-relaxed text-ink-soft">{note}</p>}

        <div className="pointer-events-auto relative z-10 mt-auto">
          <Button
            variant={isInList ? 'secondary' : 'primary'}
            fullWidth
            onClick={onAddToList}
          >
            {isInList ? (
              <>
                <span aria-hidden="true">✓</span> Added to shopping list
              </>
            ) : (
              'Add to shopping list'
            )}
          </Button>
        </div>
      </div>
    </article>
  )
}
