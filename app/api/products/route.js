import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { isAuthed } from '@/lib/auth';
import { normalizeProductInput, validateProduct } from '@/lib/product';

export const dynamic = 'force-dynamic';

// GET /api/products — public catalogue used by the storefront.
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'asc' },
    });
    return NextResponse.json(products);
  } catch (e) {
    // DB not configured yet — the storefront falls back to its bundled data.
    return NextResponse.json(
      { error: 'db_unavailable', message: 'Baza danych jest niedostępna.' },
      { status: 503 },
    );
  }
}

// POST /api/products — create a product (admin only).
export async function POST(req) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }
  const data = normalizeProductInput(body);
  const errors = validateProduct(data);
  if (errors.length) {
    return NextResponse.json({ error: 'validation', errors }, { status: 400 });
  }
  const created = await prisma.product.create({ data });
  return NextResponse.json(created, { status: 201 });
}
