import IconButton from './IconButton'
import VerdictBadge from './VerdictBadge'

export default function ShoppingListItem({
  image,
  imageAlt,
  brand,
  name,
  verdict,
  onRemove,
}) {
  return (
    <li className="flex items-center gap-4 rounded-card border border-border bg-panel p-3">
      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-surface">
        <img src={image} alt={imageAlt} className="h-full w-full object-cover" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
          {brand}
        </p>
        <h2 className="truncate text-sm font-semibold text-ink">{name}</h2>
        <VerdictBadge verdict={verdict} variant="pill" />
      </div>

      <IconButton
        icon="×"
        label={`Remove ${name} from shopping list`}
        onClick={onRemove}
      />
    </li>
  )
}
