# Tomato Admin Panel 🛠️

Admin dashboard for the [Tomato](https://food-orders-web.netlify.app/) food delivery platform. Built with React.js, it gives admins full control over products and orders from a clean, protected interface.

🌐 **Live Demo:** [tomato-admin-sand.vercel.app](https://tomato-admin-sand.vercel.app/)
🔗 **Main App:** [food-orders-web.netlify.app](https://food-orders-web.netlify.app/)
⚙️ **Backend Repo:** [Tomato-BackEnd](https://github.com/zaid-shaikh17/Tomato-BackEnd)

---

## Features

- **Admin Authentication** — Protected login, only authorized admins can access the panel
- **Order Management** — View all orders with full details and update delivery status
- **Order Search** — Search and filter through orders quickly
- **Product CRUD** — Add new food items or remove existing ones from the menu
- **Auto Image Generation** — Product images auto-generated via Unsplash API
- **View Order Details** — Detailed breakdown of each order including items, address, and payment

> 🚧 Revenue graph and order count dashboard coming soon

---

## Tech Stack

- **Frontend** — React.js, React Router, Axios
- **Auth** — JWT (token verified against backend)
- **Image API** — Unsplash API
- **Deployment** — Vercel

---

## Getting Started

### Prerequisites
- Node.js v18+
- Tomato backend running locally or on Render

### Clone & install

```bash
git clone https://github.com/zaid-shaikh17/Tomato-Admin.git
cd Tomato-Admin
npm install
```

### Environment variables

Create a `.env` file:

```env
VITE_API_URL=your_backend_url
```

### Run locally

```bash
npm run dev
```

---

## Admin Credentials (Demo)

> Use these to explore the live demo:

```
Email:    admin@tomato.com
Password: admin123
```

---

## Folder Structure

```
Tomato-Admin/
├── src/
│   ├── components/     # Sidebar, Navbar
│   ├── pages/          # Login, Orders, Add Product, List Products
│   └── App.jsx
├── public/
└── package.json
```

---

## Related Repos

| Repo | Description |
|------|-------------|
| [Tomato Frontend](https://github.com/zaid-shaikh17/Tomato-FrontEnd) | Customer-facing React app |
| [Tomato Backend](https://github.com/zaid-shaikh17/Tomato-BackEnd) | Express + MongoDB REST API |

---

## Author

**Shaikh Zaid** — [GitHub](https://github.com/zaid-shaikh17) · [LinkedIn](https://www.linkedin.com/in/shaikh-zaid-m8329981925/)

---

*Part of the Tomato MERN-stack food delivery project. Open to fresher MERN-stack roles and internships.*
