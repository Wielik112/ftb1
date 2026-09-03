'use client';

import { useEffect, useState, useCallback } from 'react';

const EMPTY = {
  name: '', cat: 'Koszulki', brand: '', condition: 'Nowy',
  price: '', old: '', tag: '', tagType: 'new', stars: 5, reviews: 0,
  color: '', sizes: '', material: '',
  gradient: 'linear-gradient(135deg,#1c1c22,#2a0409)', desc: '',
};

const CATEGORIES = ['Obuwie', 'Bluzy', 'Koszulki', 'Spodnie', 'Kurtki', 'Akcesoria'];

export default function AdminPage() {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);

  const checkSession = useCallback(async () => {
    try {
      const r = await fetch('/api/admin/session', { cache: 'no-store' });
      const d = await r.json();
      setAuthed(!!d.authed);
    } catch {
      setAuthed(false);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => { checkSession(); }, [checkSession]);

  if (!ready) return <div className="adm-loading">Ładowanie…</div>;
  if (!authed) return <Login onSuccess={() => setAuthed(true)} />;
  return <Dashboard onLogout={() => setAuthed(false)} />;
}

/* ---------------- Login ---------------- */
function Login({ onSuccess }) {
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErr('');
    setBusy(true);
    try {
      const r = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (r.ok) { onSuccess(); return; }
      const d = await r.json().catch(() => ({}));
      setErr(d.message || (r.status === 401 ? 'Nieprawidłowe hasło.' : 'Błąd logowania.'));
    } catch {
      setErr('Błąd sieci.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="adm-center">
      <form className="adm-card adm-login" onSubmit={submit}>
        <div className="adm-brand" style={{ marginBottom: 18 }}>
          <span className="dot" /><h1>FBT Outlet</h1>
        </div>
        <h2>Panel administratora</h2>
        <p>Zaloguj się, aby zarządzać produktami.</p>
        {err && <div className="alert alert-err">{err}</div>}
        <div className="field">
          <label htmlFor="pw">Hasło</label>
          <input id="pw" type="password" value={password} autoFocus
            onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        </div>
        <button className="btn btn-primary" style={{ width: '100%' }} disabled={busy}>
          {busy ? 'Logowanie…' : 'Zaloguj się'}
        </button>
      </form>
    </div>
  );
}

/* ---------------- Dashboard ---------------- */
function Dashboard({ onLogout }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null); // product object or 'new' or null

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const r = await fetch('/api/products', { cache: 'no-store' });
      if (!r.ok) throw new Error();
      setProducts(await r.json());
    } catch {
      setError('Nie udało się pobrać produktów. Sprawdź konfigurację bazy danych (DATABASE_URL).');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    onLogout();
  }

  async function remove(p) {
    if (!confirm(`Usunąć produkt „${p.name}"?`)) return;
    const r = await fetch(`/api/products/${p.id}`, { method: 'DELETE' });
    if (r.ok) load();
    else alert('Nie udało się usunąć produktu.');
  }

  return (
    <div className="adm-wrap">
      <div className="adm-top">
        <div className="adm-brand">
          <span className="dot" />
          <div>
            <h1>FBT Outlet - Produkty</h1>
            <div className="adm-muted">{products.length} produktów w bazie</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <a className="btn" href="/index.html" target="_blank" rel="noreferrer">Zobacz sklep ↗</a>
          <button className="btn" onClick={logout}>Wyloguj</button>
        </div>
      </div>

      <div className="adm-toolbar">
        <h2 style={{ margin: 0, fontSize: 18 }}>Katalog</h2>
        <button className="btn btn-primary" onClick={() => setEditing('new')}>+ Dodaj produkt</button>
      </div>

      {error && <div className="alert alert-err">{error}</div>}

      {loading ? (
        <div className="adm-loading">Ładowanie produktów…</div>
      ) : products.length === 0 && !error ? (
        <div className="adm-card adm-empty">
          Brak produktów. Kliknij „Dodaj produkt", aby utworzyć pierwszy.
        </div>
      ) : (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Nazwa</th><th>Kategoria</th><th>Marka</th>
                <th>Stan</th><th>Cena</th><th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.cat}</td>
                  <td>{p.brand || '-'}</td>
                  <td>
                    <span className={`pill ${p.condition === 'Używany' ? 'pill-used' : 'pill-new'}`}>
                      {p.condition === 'Używany' ? 'Używany' : 'Nowy'}
                    </span>
                  </td>
                  <td>
                    {p.price} zł
                    {p.old > p.price ? <span className="old-price">{p.old} zł</span> : null}
                  </td>
                  <td>
                    <div className="adm-actions">
                      <button className="btn btn-sm" onClick={() => setEditing(p)}>Edytuj</button>
                      <button className="btn btn-sm btn-danger" onClick={() => remove(p)}>Usuń</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <ProductModal
          product={editing === 'new' ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={() => { setEditing(null); load(); }}
        />
      )}
    </div>
  );
}

/* ---------------- Product form modal ---------------- */
function ProductModal({ product, onClose, onSaved }) {
  const isEdit = !!product;
  const [form, setForm] = useState(() =>
    product
      ? { ...EMPTY, ...product, sizes: (product.sizes || []).join(', ') }
      : { ...EMPTY });
  const [errs, setErrs] = useState([]);
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function save(e) {
    e.preventDefault();
    setErrs([]);
    setBusy(true);
    try {
      const url = isEdit ? `/api/products/${product.id}` : '/api/products';
      const method = isEdit ? 'PUT' : 'POST';
      const r = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (r.ok) { onSaved(); return; }
      const d = await r.json().catch(() => ({}));
      if (r.status === 401) setErrs(['Sesja wygasła. Odśwież stronę i zaloguj się ponownie.']);
      else setErrs(d.errors || [d.message || 'Nie udało się zapisać produktu.']);
    } catch {
      setErrs(['Błąd sieci.']);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="adm-modal-bg" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <form className="adm-card adm-modal" onSubmit={save}>
        <h2>{isEdit ? 'Edytuj produkt' : 'Nowy produkt'}</h2>
        {errs.length > 0 && (
          <div className="alert alert-err">
            {errs.map((x, i) => <div key={i}>{x}</div>)}
          </div>
        )}

        <div className="field">
          <label>Nazwa *</label>
          <input value={form.name} onChange={set('name')} required />
        </div>

        <div className="grid-3">
          <div className="field">
            <label>Kategoria</label>
            <select value={form.cat} onChange={set('cat')}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Marka</label>
            <input value={form.brand} onChange={set('brand')} placeholder="np. Nike" />
          </div>
          <div className="field">
            <label>Stan</label>
            <select value={form.condition} onChange={set('condition')}>
              <option value="Nowy">Nowy</option>
              <option value="Używany">Używany</option>
            </select>
          </div>
        </div>

        <div className="grid-3">
          <div className="field">
            <label>Cena (zł) *</label>
            <input type="number" min="0" value={form.price} onChange={set('price')} required />
          </div>
          <div className="field">
            <label>Cena przed (zł)</label>
            <input type="number" min="0" value={form.old} onChange={set('old')} />
          </div>
          <div className="field">
            <label>Kolor</label>
            <input value={form.color} onChange={set('color')} placeholder="np. Czarny" />
          </div>
        </div>

        <div className="grid-3">
          <div className="field">
            <label>Etykieta</label>
            <input value={form.tag} onChange={set('tag')} placeholder="np. -30%, HIT, NOWOŚĆ" />
          </div>
          <div className="field">
            <label>Typ etykiety</label>
            <select value={form.tagType} onChange={set('tagType')}>
              <option value="new">Nowość (szara)</option>
              <option value="hit">Hit (szara)</option>
              <option value="sale">Promocja (czerwona)</option>
            </select>
          </div>
          <div className="field">
            <label>Rozmiary (po przecinku)</label>
            <input value={form.sizes} onChange={set('sizes')} placeholder="S, M, L, XL" />
          </div>
        </div>

        <div className="grid-3">
          <div className="field">
            <label>Ocena (0–5)</label>
            <input type="number" min="0" max="5" value={form.stars} onChange={set('stars')} />
          </div>
          <div className="field">
            <label>Liczba opinii</label>
            <input type="number" min="0" value={form.reviews} onChange={set('reviews')} />
          </div>
          <div className="field">
            <label>Materiał</label>
            <input value={form.material} onChange={set('material')} placeholder="np. 100% bawełna" />
          </div>
        </div>

        <div className="field">
          <label>Tło (CSS gradient)</label>
          <input value={form.gradient} onChange={set('gradient')} />
        </div>

        <div className="field">
          <label>Opis</label>
          <textarea value={form.desc} onChange={set('desc')} />
        </div>

        <div className="adm-modal-foot">
          <button type="button" className="btn" onClick={onClose}>Anuluj</button>
          <button className="btn btn-primary" disabled={busy}>
            {busy ? 'Zapisywanie…' : (isEdit ? 'Zapisz zmiany' : 'Dodaj produkt')}
          </button>
        </div>
      </form>
    </div>
  );
}
