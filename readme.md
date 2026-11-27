# Prata Imports

A curated lifestyle, beauty, fragrance, and home decor e-commerce storefront built with **HTML5**, **CSS3**, and **Vanilla JavaScript (ES6 Modules)**, powered by the [DummyJSON Products API](https://dummyjson.com/products) with `localStorage` cart persistence and WhatsApp order checkout.

## Key Features

* **Dynamic Catalog & Category Filtering:** Fetches products asynchronously, caches them in memory (`produtosCache`), and filters by URL query parameter (`?categoria=beleza`, `casa`, `essenciais`, `ofertas`).
* **Discount & Currency Formatting:** Applies percentage discounts on `ofertas` and formats prices in Brazilian Reais (`R$`).
* **Interactive Storefront Sections:** Includes an announcement bar, sticky header, featured highlight section, category cards, product grid, dual editorial banners, manifesto block, and a 5-card shoppable `@PrataImports` grid.
* **Persistent Shopping Bag (`localStorage`):** Adds items from product cards, Instagram cards, or the featured banner, increments quantities, removes items, syncs the cart counter, and verifies item availability.
* **WhatsApp Order Summary:** Builds a formatted message containing each item's name, quantity, subtotal, and grand total to open directly in WhatsApp (`wa.me`)[cite: 8].
* **Institutional Pages:** Separate pages under `Auxiliares/` for *Sobre Nós*, *Política de Privacidade* (LGPD), *Termos de Uso*, and *Trocas e Devoluções*.

## Tech Stack & Tooling

* **Markup & Styling:** HTML5, CSS3 (CSS custom properties, Grid, Flexbox, responsive media queries), Google Fonts (`Inter` & `Playfair Display`), Font Awesome.
* **Scripting:** JavaScript (ES6 Modules, `async/await`, `fetch`, `localStorage`, `URLSearchParams`).
* **Linting:** ESLint `^9.39.5` (`eslint-plugin-react`, `globals`) configured in `eslint.config.mjs`.

## Project Structure

```text
├── Auxiliares/
│   ├── privacidade.html
│   ├── sobre.html
│   ├── termos.html
│   └── trocas-devolucoes.html
├── Client/
│   └── Api.js
├── css/
│   ├── institucional.css
│   └── style.css
├── js/
│   ├── Carrinho.js
│   ├── FotosProdutos.js
│   └── index.js
├── eslint.config.mjs
├── index.html
├── package.json
└── tarefa.txt