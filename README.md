# 🌿 Plant Nursery Catalogue

A web-based Plant Nursery Catalogue developed as part of the **Essentials of Web Programming** laboratory project.

The application allows users to explore different plants, search by name or category, view prices, and manage a shopping cart through a simple, user-friendly interface.

## ✨ Features

- 🌱 Browse a catalogue of six plants.
- 🔍 Search plants by name, category, or description.
- 🪴 Filter plants by Indoor, Outdoor, Flowering, and Medicinal categories.
- 🛒 Add plants to the cart and update quantities.
- 💰 View cart totals dynamically.
- 👤 Login and registration pages.
- 📱 Responsive user interface.
- 🔌 Backend API for retrieving plant details.
- 📁 JSON file-based storage without a separate database.

## 🛠️ Technologies Used

**Frontend**
- Angular
- TypeScript
- HTML5
- CSS3

**Backend**
- Node.js
- Express.js
- REST API
- JSON file storage

## 📂 Project Structure

```text
Plant-Nursery-Catalogue/
├── frontend/
│   └── plant-nursery-ui/
│       └── src/
├── backend/
│   ├── data/
│   │   ├── plants.json
│   │   └── users.json
│   ├── server.js
│   └── package.json
└── README.md
```

## ⚙️ Prerequisites

Install the following before running the project:

- Node.js and npm
- Angular CLI
- Visual Studio Code (recommended)

## 🚀 How to Run

### 1. Start the backend

Open a terminal and run:

```bash
cd backend
npm install
npm run dev
```

If the development command is unavailable, use:

```bash
npm start
```

The backend runs at:

`http://localhost:5000`

### 2. Start the frontend

Open another terminal and run:

```bash
cd frontend/plant-nursery-ui
npm install
ng serve
```

Open the application at:

`http://localhost:4200`

### 3. Test the API

- `GET /api/health` — Check backend status.
- `GET /api/plants` — Retrieve the plant catalogue.
- `POST /api/register` — Register a user.
- `POST /api/login` — Authenticate a user.

## 🌼 Plant Catalogue

The catalogue includes:

| Plant | Price |
|---|---:|
| Money Plant | ₹199 |
| Snake Plant | ₹249 |
| Aloe Vera | ₹179 |
| Rose Plant | ₹299 |
| Hibiscus Plant | ₹249 |
| Tulsi Plant | ₹99 |

## 🎯 Project Objective

The objective of this project is to apply web programming concepts, including Angular components, TypeScript, HTML, CSS, event handling, form validation, REST APIs, and JSON data handling, in a practical application.

## 🔮 Future Enhancements

- Persistent shopping cart
- Online payment integration
- Order management
- Database integration
- Plant care recommendations

## 👨‍💻 Academic Project

**Project:** Plant Nursery Catalogue  
**Subject:** Essentials of Web Programming  
**Purpose:** Laboratory and academic demonstration

---

*Developed for educational purposes.*
