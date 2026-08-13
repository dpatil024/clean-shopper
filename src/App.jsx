import { useEffect, useState } from 'react'
import LandingPage from './components/LandingPage'
import LibraryPage from './components/LibraryPage'
import ShoppingListPage from './components/ShoppingListPage'
import PreferencesPage from './components/PreferencesPage'
import ComparePage from './components/ComparePage'
import ProductDetailPage from './components/ProductDetailPage'
import { fetchProducts } from './lib/api/products'

const NAV_ITEMS = [
  { id: 'library', label: 'Product library' },
  { id: 'shopping-list', label: 'Shopping list' },
  { id: 'preferences', label: 'Preferences' },
  { id: 'compare', label: 'Compare' },
]

function App() {
  const [hasEnteredApp, setHasEnteredApp] = useState(false)
  const [activePage, setActivePage] = useState('library')
  const [shoppingListIds, setShoppingListIds] = useState([])
  const [savedIds, setSavedIds] = useState([])
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)

  useEffect(() => {
    let cancelled = false

    fetchProducts()
      .then((data) => {
        if (!cancelled) setProducts(data)
      })
      .catch((error) => {
        if (!cancelled) setLoadError(error.message)
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  function handleToggleList(productId) {
    setShoppingListIds((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    )
  }

  function handleRemoveFromList(productId) {
    setShoppingListIds((current) => current.filter((id) => id !== productId))
  }

  function handleToggleSave(productId) {
    setSavedIds((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    )
  }

  function handleNavigate(pageId) {
    setSelectedProductId(null)
    setActivePage(pageId)
  }

  const shoppingListProducts = products.filter((product) =>
    shoppingListIds.includes(product.id),
  )
  const selectedProduct = products.find((p) => p.id === selectedProductId)

  if (!hasEnteredApp) {
    return <LandingPage onEnter={() => setHasEnteredApp(true)} />
  }

  return (
    <div className="min-h-screen bg-cream">
      <nav
        aria-label="Main"
        className="border-b border-border bg-panel px-6 py-3"
      >
        <div className="mx-auto flex max-w-5xl items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = !selectedProductId && activePage === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigate(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`rounded-pill px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                  isActive
                    ? 'bg-surface text-ink'
                    : 'text-ink-soft hover:text-ink'
                }`}
              >
                {item.label}
                {item.id === 'shopping-list' && shoppingListIds.length > 0 && (
                  <span className="ml-1.5 text-xs text-muted">
                    ({shoppingListIds.length})
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </nav>

      <main className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          {selectedProduct ? (
            <ProductDetailPage
              product={selectedProduct}
              isSaved={savedIds.includes(selectedProduct.id)}
              isInList={shoppingListIds.includes(selectedProduct.id)}
              onBack={() => setSelectedProductId(null)}
              onToggleList={() => handleToggleList(selectedProduct.id)}
              onToggleSave={() => handleToggleSave(selectedProduct.id)}
            />
          ) : (
            <>
              {activePage === 'library' && (
                <LibraryPage
                  products={products}
                  isLoading={isLoading}
                  loadError={loadError}
                  savedIds={savedIds}
                  shoppingListIds={shoppingListIds}
                  onToggleList={handleToggleList}
                  onToggleSave={handleToggleSave}
                  onSelectProduct={setSelectedProductId}
                  onHome={() => setHasEnteredApp(false)}
                />
              )}
              {activePage === 'shopping-list' && (
                <ShoppingListPage
                  items={shoppingListProducts}
                  onRemove={handleRemoveFromList}
                  onHome={() => setHasEnteredApp(false)}
                />
              )}
              {activePage === 'preferences' && (
                <PreferencesPage onHome={() => setHasEnteredApp(false)} />
              )}
              {activePage === 'compare' && (
                <ComparePage
                  products={products}
                  shoppingListIds={shoppingListIds}
                  onToggleList={handleToggleList}
                  onHome={() => setHasEnteredApp(false)}
                />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
