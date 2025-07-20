# Inkwell ✒️

A modern blogging and note-taking app built with **Vue 3**, **Vite**, **Pinia**, and **Naive UI** on the frontend, powered by a **Django REST Framework** backend. Includes user authentication, blog post creation, rich text editing, notes, and a clean responsive UI styled with TailwindCSS.

## 🧰 Tech Stack

* [Vue 3](https://vuejs.org/)
* [Vite](https://vitejs.dev/)
* [Pinia](https://pinia.vuejs.org/) for state management
* [Naive UI](https://www.naiveui.com/) for elegant UI components
* [TailwindCSS](https://tailwindcss.com/) for utility-first styling
* [Django + DRF](https://www.django-rest-framework.org/) for the backend (see `inkwell_api` repo)
* [Prettier](https://prettier.io/) for code formatting

---

## 🧑‍💻 Project Setup

```sh
npm install
```

---

## 🚀 Development

Start the local dev server:

```sh
npm run dev
```

Make sure your Django API is running at the expected base URL (default is `http://localhost:8000`).

---

## ✅ Type Check & Build

```sh
npm run type-check
npm run build
```

---

## 🥪 Run Unit Tests

```sh
npm run test:unit
```

---

## 🧹 Code Linting

```sh
npm run lint
```

---

## 🎨 Prettier Formatting

```sh
npm run format
```

> You can also set your editor to format on save.

---

## ✨ VSCode Recommended Extensions

* [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (disable Vetur)
* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

---

## 📁 File Structure Highlights

* `src/stores/` – Pinia stores (`storeAuth`, `storePosts`, `storeNotes`)
* `src/views/` – App views (Home, Posts, Notes, Stats, etc.)
* `src/components/` – Shared UI components
* `src/api/` – Axios API helpers for Django backend
* `src/utils/` – Utilities like date formatters and content sanitizers

---

## 🧳 Deployment Notes

This frontend can be deployed to:

* **Netlify**
* **Vercel**
* **Render (Static Site)**

You must set the API base URL in your environment:

```env
VITE_API_BASE=http://localhost:8000
```

> Use `.env.local` for local overrides. `.env` is gitignored.

---

## 🔐 Authentication Notes

* JWT-based authentication via Django REST Framework
* Tokens are stored in `localStorage`
* Auth state is handled via Pinia store (`storeAuth`)

---

Happy building! 🧱
See also: Inkwell UI api
