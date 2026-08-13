import ShoppingListItem from './ShoppingListItem'

export default function ShoppingListPage({ items, onRemove, onHome }) {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <button
          type="button"
          onClick={onHome}
          className="w-fit text-xs font-medium uppercase tracking-wide text-muted hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          Clean Shopper
        </button>
        <h1 className="font-display text-4xl leading-tight text-ink">
          Shopping list
        </h1>
      </header>

      {items.length > 0 ? (
        <ul className="flex max-w-lg flex-col gap-3">
          {items.map((product) => (
            <ShoppingListItem
              key={product.id}
              image={product.image}
              imageAlt={product.imageAlt}
              brand={product.brand}
              name={product.name}
              verdict={product.verdict}
              onRemove={() => onRemove(product.id)}
            />
          ))}
        </ul>
      ) : (
        <p className="text-sm text-ink-soft">
          Nothing here yet — add products from your library or a comparison.
        </p>
      )}
    </div>
  )
}
