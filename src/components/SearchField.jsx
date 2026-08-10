export default function SearchField({ id, label, placeholder, value, onChange }) {
  return (
    <form
      role="search"
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
    </form>
  )
}
