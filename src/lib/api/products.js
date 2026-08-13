import { supabase } from './supabase'

function mapRow(row) {
  return {
    id: row.id,
    image: row.image,
    imageAlt: row.image_alt,
    brand: row.brand,
    name: row.name,
    verdict: row.verdict,
    note: row.note,
    highlights: row.highlights,
    category: row.category,
  }
}

export async function fetchProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at')

  if (error) {
    throw error
  }

  return data.map(mapRow)
}
