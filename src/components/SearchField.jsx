export default function SearchField({
  id,
  label,
  placeholder,
  value,
  onChange,
  onSubmit,
}) {
  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit?.()
      }}
      className="flex min-w-[220px] items-center gap-2 rounded-pill border-2 border-border-strong bg-panel px-4 py-2.5 focus-within:border-ink"
    >
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none"
      />
      <button
        type="submit"
        aria-label="Search"
        className="shrink-0 text-ink-soft transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        →
      </button>
    </form>
  )
}
