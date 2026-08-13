import { useState } from 'react'
import PreferencesPanel from './PreferencesPanel'
import { SAMPLE_PREFERENCE_CATEGORIES } from '../lib/sample-data'

export default function PreferencesPage({ onHome }) {
  const [categories, setCategories] = useState(SAMPLE_PREFERENCE_CATEGORIES)

  function handleRemove(categoryId, itemId) {
    setCategories((current) =>
      current.map((category) =>
        category.id === categoryId
          ? { ...category, items: category.items.filter((item) => item.id !== itemId) }
          : category,
      ),
    )
  }

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
          Your preferences
        </h1>
      </header>

      <PreferencesPanel
        categories={categories.map((category) => ({
          label: category.label,
          items: category.items,
          onRemove: (itemId) => handleRemove(category.id, itemId),
        }))}
      />
    </div>
  )
}
