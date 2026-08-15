import Button from './Button'
import IconButton from './IconButton'
import VerdictBadge from './VerdictBadge'

export default function ProductDetailPage({
  product,
  isSaved,
  isInList,
  isInCart,
  onBack,
  onToggleList,
  onToggleSave,
  onToggleCart,
}) {
  return (
    <div className="flex flex-col gap-8">
      <button
        type="button"
        onClick={onBack}
        className="flex w-fit items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        <span aria-hidden="true">←</span> Back to products
      </button>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-card bg-surface">
          <img
            src={product.image}
            alt={product.imageAlt}
            className="h-full w-full object-cover"
          />
          <div className="absolute left-3 top-3">
            <VerdictBadge verdict={product.verdict} variant="ribbon" />
          </div>
          <div className="absolute right-3 top-3">
            <IconButton
              icon={isSaved ? '♥' : '♡'}
              label={isSaved ? `Remove ${product.name} from saved` : `Save ${product.name}`}
              onClick={onToggleSave}
              variant="onPhoto"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            {product.brand}
          </p>
          <h1 className="font-display text-3xl leading-tight text-ink">
            {product.name}
          </h1>

          {product.note && (
            <p className="text-sm leading-relaxed text-ink-soft">{product.note}</p>
          )}

          {product.highlights?.length > 0 && (
            <ul className="flex flex-col gap-1.5 border-t border-border pt-4 text-sm text-ink-soft">
              {product.highlights.map((point) => (
                <li key={point} className="flex gap-2">
                  <span aria-hidden="true">•</span>
                  {point}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-2 flex max-w-xs items-center gap-2">
            <Button
              variant={isInCart ? 'secondary' : 'primary'}
              fullWidth
              onClick={onToggleCart}
            >
              {isInCart ? (
                <>
                  <span aria-hidden="true">✓</span> Added to cart
                </>
              ) : (
                'Add to cart'
              )}
            </Button>
            <div className="flex-shrink-0">
              <IconButton
                icon={
                  isInList ? (
                    '✓'
                  ) : (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    >
                      <circle cx="2" cy="4" r="1" fill="currentColor" stroke="none" />
                      <line x1="5" y1="4" x2="14" y2="4" />
                      <circle cx="2" cy="8" r="1" fill="currentColor" stroke="none" />
                      <line x1="5" y1="8" x2="14" y2="8" />
                      <circle cx="2" cy="12" r="1" fill="currentColor" stroke="none" />
                      <line x1="5" y1="12" x2="14" y2="12" />
                    </svg>
                  )
                }
                label={
                  isInList
                    ? `Remove ${product.name} from shopping list`
                    : `Add ${product.name} to shopping list`
                }
                onClick={onToggleList}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
