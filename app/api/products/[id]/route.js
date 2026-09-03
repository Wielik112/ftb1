import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { isAuthed } from '@/lib/auth';
import { normalizeProductInput, validateProduct } from '@/lib/product';

export const dynamic = 'force-dynamic';

// GET /api/products/:id — public.
export async function GET(_req, { params }) {
  const { id } = await params;
  try {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      return NextResponse.json({ error: 'not_found' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch {
    return NextResponse.json({ error: 'db_unavailable' }, { status: 503 });
  }
}

// PUT /api/products/:id — update (admin only).
export async function PUT(req, { params }) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const { id } = await params;
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
  try {
    const updated = await prisma.product.update({ where: { id }, data });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }
}

// DELETE /api/products/:id — delete (admin only).
export async function DELETE(_req, { params }) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const { id } = await params;
  try {
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }
}
