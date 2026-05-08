
## Project Structure

```
hn-app/
├── backend/
│   ├── config/         # DB connection
│   ├── controllers/    # Business logic
│   ├── middleware/     # Auth middleware
│   ├── models/         # Mongoose schemas
│   ├── routes/         # Express routes
│   ├── server.js       # Entry point
│  
└── frontend/
    ├── public/
    └── src/
        ├── api/        # Axios + API calls
        ├── components/ # Navbar, StoryCard, ProtectedRoute
        ├── context/    # AuthContext (React Context API)
        ├── pages/      # Home, Login, Register, Bookmarks
        ├── App.js
        └── App.css
```

---

## Prerequisites

- Node.js v18+
- MongoDB (Atlas)
- npm

---

## Setup & Run

### 1. Backend

```terminal
cd backend
# create .env & update with your credentials
   PORT=5000
   MONGO_URI=mongodb_url
   JWT_SECRET=your_super_secret_jwt_key_change_this
   JWT_EXPIRE=7d
npm install
npm run dev
```

The server starts on **http://localhost:5000** and auto-scrapes HN on startup.

### 2. Frontend

```terminal
cd frontend
# create .env & update with your credentials
   REACT_APP_API_URL=http://localhost:5000/api
npm install
npm start
```

The React app runs on **http://localhost:3000**.

---

## API Reference

### Auth
| Method | Endpoint             | Description         | Auth |
|--------|----------------------|---------------------|------|
| POST   | /api/auth/register   | Register new user   | No   |
| POST   | /api/auth/login      | Login, get JWT      | No   |
| GET    | /api/auth/me         | Get current user    | Yes  |

### Stories
| Method | Endpoint                  | Description                        | Auth |
|--------|---------------------------|------------------------------------|------|
| GET    | /api/stories              | All stories (sorted by points ↓)   | No   |
| GET    | /api/stories/:id          | Single story                       | No   |
| POST   | /api/stories/:id/bookmark | Toggle bookmark                    | Yes  |
| GET    | /api/stories/bookmarks    | Get user's bookmarks               | Yes  |

### Scraper
| Method | Endpoint    | Description               | Auth |
|--------|-------------|---------------------------|------|
| POST   | /api/scrape | Trigger manual HN scrape  | No   |

---

