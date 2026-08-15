import CompareCard from './CompareCard'

export default function ComparePage({
  products,
  shoppingListIds,
  onToggleList,
  onHome,
}) {
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
        <h1 className="font-display text-h1 text-ink">
          Compare
        </h1>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <CompareCard
            key={product.id}
            image={product.image}
            imageAlt={product.imageAlt}
            brand={product.brand}
            name={product.name}
            verdict={product.verdict}
            highlights={product.highlights}
            isInList={shoppingListIds.includes(product.id)}
            onAddToList={() => onToggleList(product.id)}
          />
        ))}
      </div>
    </div>
  )
}
