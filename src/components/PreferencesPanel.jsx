import PreferenceTag from './PreferenceTag'

export default function PreferencesPanel({ categories }) {
  return (
    <div className="flex flex-col gap-6">
      {categories.map((category) => (
        <div key={category.label} className="flex flex-col gap-3">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted">
            {category.label}
          </h2>
          {category.items.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <PreferenceTag
                  key={item.id}
                  label={item.label}
                  onRemove={
                    category.onRemove
                      ? () => category.onRemove(item.id)
                      : undefined
                  }
                />
              ))}
            </div>
          ) : (
            <p className="text-xs text-ink-soft">Nothing saved yet.</p>
          )}
        </div>
      ))}
    </div>
  )
}
