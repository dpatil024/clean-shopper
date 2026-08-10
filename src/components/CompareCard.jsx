import Button from './Button'
import VerdictBadge from './VerdictBadge'

export default function CompareCard({
  image,
  imageAlt,
  brand,
  name,
  verdict,
  highlights,
  isInList,
  onAddToList,
}) {
  return (
    <article className="flex w-full flex-col overflow-hidden rounded-card border border-border bg-panel shadow-card">
      <div className="aspect-square w-full bg-surface">
        <img src={image} alt={imageAlt} className="h-full w-full object-cover" />
      </div>

      <div className="flex flex-col gap-2 p-4">
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
          {brand}
        </p>
        <h2 className="text-sm font-semibold leading-snug text-ink">{name}</h2>

        <VerdictBadge verdict={verdict} variant="pill" />

        {highlights && highlights.length > 0 && (
          <ul className="flex flex-col gap-1 border-t border-border pt-2 text-xs text-ink-soft">
            {highlights.map((point) => (
              <li key={point} className="flex gap-1.5">
                <span aria-hidden="true">•</span>
                {point}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-1">
          <Button variant="secondary" fullWidth onClick={onAddToList}>
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
