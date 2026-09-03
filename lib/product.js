// Shared helpers for validating / normalizing product input coming from the
// admin panel before it reaches the database.

const TAG_TYPES = ['sale', 'hit', 'new'];

function toInt(value, fallback = 0) {
  const n = parseInt(value, 10);
  return Number.isFinite(n) ? n : fallback;
}

export function normalizeProductInput(body = {}) {
  let sizes = body.sizes;
  if (typeof sizes === 'string') {
    sizes = sizes.split(',').map((s) => s.trim()).filter(Boolean);
  }
  if (!Array.isArray(sizes)) sizes = [];

  const price = toInt(body.price);

  return {
    name: String(body.name ?? '').trim(),
    cat: String(body.cat ?? '').trim() || 'Inne',
    brand: String(body.brand ?? '').trim(),
    condition: body.condition === 'Używany' ? 'Używany' : 'Nowy',
    price,
    old: toInt(body.old, price),
    tag: String(body.tag ?? '').trim(),
    tagType: TAG_TYPES.includes(body.tagType) ? body.tagType : 'new',
    stars: Math.min(5, Math.max(0, toInt(body.stars, 5))),
    reviews: Math.max(0, toInt(body.reviews)),
    color: String(body.color ?? '').trim(),
    sizes,
    material: String(body.material ?? '').trim(),
    gradient:
      String(body.gradient ?? '').trim() ||
      'linear-gradient(135deg,#1c1c22,#2a0409)',
    desc: String(body.desc ?? '').trim(),
  };
}

// Returns an array of human-readable validation errors (empty = valid).
export function validateProduct(data) {
  const errors = [];
  if (!data.name) errors.push('Nazwa jest wymagana.');
  if (!(data.price > 0)) errors.push('Cena musi być liczbą większą od 0.');
  return errors;
}
