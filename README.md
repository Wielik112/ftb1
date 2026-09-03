# FBT Outlet

Sklep sportowy z panelem administratora. Statyczny front (HTML/CSS/JS) serwowany
przez Next.js, z backendem (API + baza danych PostgreSQL przez Prisma) do
zarządzania produktami.

## Struktura

```
public/            # statyczny sklep (index, shop, product, cart, about, contact, terms)
  js/products.js   # pobiera produkty z /api/products (z fallbackiem do wbudowanej listy)
app/
  admin/           # panel administratora (/admin)
  api/products/    # REST API produktów (GET publiczne, POST/PUT/DELETE dla admina)
  api/admin/       # logowanie / wylogowanie / sesja
lib/               # klient bazy (db.js), auth (auth.js), walidacja (product.js)
prisma/            # schema.prisma + seed.js (12 startowych produktów)
```

Bare-domain `/` przekierowuje na `/index.html`. Sklep działa jak dotychczas,
tylko produkty pochodzą z bazy.

## Uruchomienie lokalne

1. **Baza danych** — załóż darmową bazę PostgreSQL, np. na
   [Neon](https://neon.tech) lub [Supabase](https://supabase.com), i skopiuj
   connection string.

2. **Konfiguracja**
   ```bash
   cp .env.example .env
   # uzupełnij DATABASE_URL, ADMIN_PASSWORD, AUTH_SECRET w .env
   ```

3. **Instalacja i baza**
   ```bash
   npm install
   npm run db:push    # utworzy tabelę Product w bazie
   npm run db:seed    # (opcjonalnie) wgra 12 startowych produktów
   ```

4. **Start**
   ```bash
   npm run dev
   ```
   - Sklep: http://localhost:3000/  (→ /index.html)
   - Panel: http://localhost:3000/admin

## Panel administratora

Wejdź na `/admin`, zaloguj się hasłem z `ADMIN_PASSWORD`. Możesz dodawać,
edytować i usuwać produkty — w tym ustawiać stan **Nowy / Używany**, cenę,
kategorię, markę, rozmiary itd. Zmiany są od razu widoczne w sklepie.

## Wdrożenie (Vercel)

1. Zaimportuj repo na [Vercel](https://vercel.com) (framework wykryje się jako Next.js).
2. Dodaj zmienne środowiskowe: `DATABASE_URL`, `ADMIN_PASSWORD`, `AUTH_SECRET`.
3. Deploy. Po pierwszym wdrożeniu wykonaj `npm run db:push` (lub `prisma migrate`)
   wobec bazy produkcyjnej i ewentualnie `npm run db:seed`.

## API

| Metoda | Ścieżka              | Dostęp   | Opis                     |
|--------|----------------------|----------|--------------------------|
| GET    | `/api/products`      | publiczny| lista produktów          |
| GET    | `/api/products/:id`  | publiczny| jeden produkt            |
| POST   | `/api/products`      | admin    | dodaj produkt            |
| PUT    | `/api/products/:id`  | admin    | edytuj produkt           |
| DELETE | `/api/products/:id`  | admin    | usuń produkt             |
| POST   | `/api/admin/login`   | publiczny| logowanie (hasło)        |
| POST   | `/api/admin/logout`  | publiczny| wylogowanie              |
| GET    | `/api/admin/session` | publiczny| stan sesji `{authed}`    |

Endpointy admina wymagają podpisanego ciasteczka sesji ustawianego przy logowaniu.
