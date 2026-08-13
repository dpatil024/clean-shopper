import { useState } from 'react'
import ProductCard from './ProductCard'
import SearchField from './SearchField'
import { VERDICT_STYLES } from './VerdictBadge'

export default function LibraryPage({
  products,
  isLoading,
  loadError,
  savedIds,
  shoppingListIds,
  onToggleList,
  onToggleSave,
  onSelectProduct,
  onHome,
}) {
  const [verdictFilter, setVerdictFilter] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [submittedQuery, setSubmittedQuery] = useState('')

  function handleVerdictClick(verdict) {
    setVerdictFilter((current) => (current === verdict ? null : verdict))
  }

  const query = submittedQuery.trim().toLowerCase()

  const visibleProducts = products.filter((product) => {
    const matchesVerdict = !verdictFilter || product.verdict === verdictFilter
    const matchesQuery =
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query)
    return matchesVerdict && matchesQuery
  })

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={onHome}
            className="w-fit text-xs font-medium uppercase tracking-wide text-clean hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Clean Shopper
          </button>
          <h1 className="font-display text-4xl leading-tight text-ink">
            Browse Products
          </h1>
        </div>

        <SearchField
          id="library-search"
          label="Search products"
          placeholder="Search products"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSubmit={() => setSubmittedQuery(searchQuery)}
        />
      </header>

      {isLoading && (
        <p className="text-sm text-ink-soft">Loading products…</p>
      )}

      {loadError && !isLoading && (
        <p className="text-sm text-avoid">
          Couldn't load products ({loadError}). Try refreshing the page.
        </p>
      )}

      {!isLoading && !loadError && (
        <>
          {verdictFilter && (
            <div className="-mt-4 flex items-center gap-2 text-xs text-ink-soft">
              Filtering by
              <button
                type="button"
                onClick={() => setVerdictFilter(null)}
                className="inline-flex items-center gap-1.5 rounded-pill border border-border-strong px-2.5 py-1 font-medium text-ink hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                {VERDICT_STYLES[verdictFilter].label}
                <span aria-hidden="true">×</span>
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                image={product.image}
                imageAlt={product.imageAlt}
                brand={product.brand}
                name={product.name}
                verdict={product.verdict}
                note={product.note}
                isSaved={savedIds.includes(product.id)}
                isInList={shoppingListIds.includes(product.id)}
                onAddToList={() => onToggleList(product.id)}
                onSave={() => onToggleSave(product.id)}
                onSelect={() => onSelectProduct(product.id)}
                onVerdictClick={handleVerdictClick}
                verdictFilterActive={verdictFilter === product.verdict}
              />
            ))}
          </div>

          {visibleProducts.length === 0 && (
            <p className="text-sm text-ink-soft">
              {query
                ? `No products match "${searchQuery}".`
                : 'No products match that filter right now.'}
            </p>
          )}
        </>
      )}
    </div>
  )
}
