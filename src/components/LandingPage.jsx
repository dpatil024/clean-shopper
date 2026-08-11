import Button from './Button'

const STEPS = [
  {
    label: 'Step one',
    title: 'Tell us what to watch for',
    body: 'Ingredients to avoid, brands you already trust, certifications you care about — saved once.',
  },
  {
    label: 'Step two',
    title: 'Browse with your standards applied',
    body: 'Every product you look at is checked against what you told us, automatically.',
  },
  {
    label: 'Step three',
    title: 'Build a list you trust',
    body: 'Save what fits, compare what doesn’t, and shop knowing it already passed your bar.',
  },
]

export default function LandingPage({ onEnter }) {
  return (
    <div className="min-h-screen bg-cream">
      <section className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 px-6 pt-16 pb-8 md:grid-cols-[1.1fr_0.9fr] md:gap-12 md:pt-24">
        <div>
          <p className="text-base font-semibold tracking-[0.08em] text-clean uppercase">
            Clean Shopper
          </p>
          <h1 className="mt-3 font-display text-4xl leading-[1.18] text-ink md:text-5xl">
            Replacing one toxic product at a time shouldn&rsquo;t feel like a
            research project.
          </h1>
          <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-ink-soft">
            You already know which ingredients worry you. Clean Shopper just
            remembers them — and does the label-reading for every product
            you&rsquo;re curious about, so the research doesn&rsquo;t start
            over every time.
          </p>
          <div className="mt-8">
            <Button variant="primary" onClick={onEnter}>
              Start browsing →
            </Button>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=800&h=1000&fit=crop"
          alt="Bottle of skincare oil resting on a desk"
          className="aspect-[4/5] w-full rounded-[16px] object-cover shadow-card"
        />
      </section>

      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 py-16 md:grid-cols-3 md:gap-8">
        {STEPS.map((step) => (
          <div key={step.label} className="border-t border-border pt-5">
            <p className="text-xs font-semibold tracking-[0.08em] text-muted uppercase">
              {step.label}
            </p>
            <h2 className="mt-2 font-display text-xl text-ink">
              {step.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {step.body}
            </p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-[720px] px-6 pt-2 pb-16 text-center">
        <p className="font-display text-2xl leading-snug text-ink">
          &ldquo;Worth a closer look&rdquo; isn&rsquo;t a scare tactic —
          it&rsquo;s just what&rsquo;s true, stated plainly.
        </p>
      </section>
    </div>
  )
}
