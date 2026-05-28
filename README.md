# LexConsult — Legal Consultation Platform
### Group D Project | React Group Assignment

---

## 🚀 Getting Started (Node v24 Compatible)

### Installation & Run

```bash
# 1. Open the LegalConsult folder in VS Code

# 2. Open terminal (Ctrl + `)

# 3. Install dependencies (takes 2-3 mins)
npm install

# 4. Start the app
npm run dev

# 5. Browser will open automatically at http://localhost:3000
```

---

## 🔐 Demo Login Credentials

| Role  | Email                  | Password  |
|-------|------------------------|-----------|
| Admin | admin@lexconsult.com   | admin123  |
| User  | olabisisimiloluwa359@gmail.com        | user123   |

---

## 📁 Project Structure

```
LegalConsult/
├── package.json
├── public/
│   └── index.html
└── src/
    ├── App.jsx
    ├── index.js
    ├── context/AuthContext.jsx
    ├── data/store.js
    ├── hooks/useToast.js
    ├── styles/global.css
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   └── LawyerCard.jsx
    └── pages/
        ├── Home.jsx
        ├── About.jsx
        ├── Services.jsx
        ├── Lawyers.jsx
        ├── BookLawyer.jsx
        ├── Dashboard.jsx
        ├── CaseManagement.jsx
        ├── Profile.jsx
        ├── Login.jsx
        ├── Register.jsx
        ├── AdminPage.jsx
        ├── Contact.jsx
        └── NotFound.jsx
```

---

## ✅ React Requirements Checklist

| Requirement       | Implementation |
|-------------------|----------------|
| React Components  | ✅ 13 pages + 3 shared components |
| React Router      | ✅ BrowserRouter, Routes, Route, Link, useNavigate, useParams |
| useState          | ✅ Forms, filters, tabs, toggles throughout |
| useEffect         | ✅ Data loading, scroll listeners |
| Props             | ✅ LawyerCard, Navbar, all shared components |
| Event Handling    | ✅ onClick, onChange, onSubmit throughout |
| Forms             | ✅ Login, Register, Booking, Case, Contact, Profile |
| API/JSON          | ✅ Lawyers JSON data + localStorage persistence |
| Responsive UI     | ✅ Mobile, tablet, desktop |
| Navbar + Footer   | ✅ Fixed navbar, full footer |
| Loading States    | ✅ Spinners on all async actions |
| Error Handling    | ✅ Toast notifications + try/catch |

---

## 🌐 Deployment (Netlify)

1. Run `npm run build`
2. Upload the `build/` folder to Netlify

---

*Submitted to: ogungbuyivictor@gmail.com | Deadline: June 12, 2026*
