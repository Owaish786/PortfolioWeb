# Portfolio Website — Mohamad Owaish Khalak

A personal portfolio website showcasing my skills, projects, experience, education, and certificates.

## 🔗 Live Preview

Open `index.html` in your browser.

## Tech Stack

**Frontend**
- HTML5, CSS3, JavaScript (Vanilla)
- Tailwind CSS (CDN)
- Font Awesome Icons
- Google Fonts (Inter, Fira Code)

**Backend**
- Node.js + Express.js
- MongoDB (Atlas) via Mongoose
- REST API for contact form submissions

## Features

- Dark / Light theme toggle with localStorage persistence
- Responsive design (mobile, tablet, desktop)
- Scroll animations with IntersectionObserver
- Typing effect on hero tagline
- Contact form connected to MongoDB Atlas
- Back-to-top button

## Project Structure

```
PortfolioWeb/
├── index.html          # Main portfolio page
├── style.css           # Styles with CSS variables for theming
├── script.js           # Interactivity & form submission
├── photo.jpeg          # Profile photo
├── README.md
└── server/
    ├── index.js        # Express API server
    ├── models/
    │   └── Contact.js  # Mongoose schema
    ├── .env            # MongoDB URI & port (not committed)
    ├── .gitignore
    └── package.json
```

## Getting Started

### Frontend

Simply open `index.html` in a browser.

### Backend (Contact Form)

```bash
cd server
npm install
```

Create a `.env` file in `server/`:

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/portfolio
PORT=5050
```

Start the server:

```bash
node index.js
```

## API Endpoints

| Method | Endpoint         | Description            |
|--------|-----------------|------------------------|
| POST   | `/api/contact`  | Save a contact message |
| GET    | `/api/contacts` | List all messages      |

## Contact

- **Email:** owaishk627@gmail.com
- **Phone:** +91-9157700722
- **GitHub:** [github.com/mohamadowaishkhalak](https://github.com/Owaish786)
