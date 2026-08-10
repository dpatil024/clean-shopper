export const SAMPLE_PRODUCTS = [
  {
    id: 1,
    image: 'https://picsum.photos/seed/lavender-cleaner/400/400',
    imageAlt: 'Bottle of lavender all-purpose cleaner',
    brand: 'Meadow & Co.',
    name: 'Lavender Field All-Purpose Cleaner',
    verdict: 'caution',
    note: "Contains a fragrance blend you've asked us to flag in the past.",
    highlights: ['Contains fragrance blend', 'Plant-based surfactants', 'Recyclable bottle'],
  },
  {
    id: 2,
    image: 'https://picsum.photos/seed/dish-soap/400/400',
    imageAlt: 'Bottle of unscented dish soap',
    brand: 'Clearwater',
    name: 'Unscented Dish Soap',
    verdict: 'clean',
    note: 'Meets your saved standards — nothing more to check.',
    highlights: ['Fragrance-free', 'EWG Verified', 'Refill available'],
  },
  {
    id: 3,
    image: 'https://picsum.photos/seed/glass-cleaner/400/400',
    imageAlt: 'Bottle of glass cleaner',
    brand: 'Brightside',
    name: 'Streak-Free Glass Cleaner',
    verdict: 'avoid',
    note: "Conflicts with an ingredient you've asked us to avoid.",
    highlights: ['Contains flagged solvent', 'Non-recyclable bottle'],
  },
]

export const SAMPLE_PREFERENCE_CATEGORIES = [
  {
    id: 'ingredients',
    label: 'Ingredients to avoid',
    items: [
      { id: 'fragrance', label: 'Fragrance' },
      { id: 'parabens', label: 'Parabens' },
    ],
  },
  {
    id: 'brands',
    label: 'Trusted brands',
    items: [{ id: 'clearwater', label: 'Clearwater' }],
  },
  {
    id: 'certifications',
    label: 'Certifications',
    items: [{ id: 'ewg', label: 'EWG Verified' }],
  },
]
