# חב״ד קינדר / Chabad Kinder

אתר תלת-לשוני (עברית, English, Русский) לגן ילדים ולבית ספר של חב״ד.

**גרסה 2.0 — Node + MongoDB Backend**

---

## 🏗️ ארכיטקטורה / Architecture

- **Backend**: Node.js + Express + MongoDB (multi-tenant)
- **Frontend**: React + Vite (SPA)
- **Auth**: Express sessions with bcrypt
- **Hosting**: Amvera (Node) + MongoDB Atlas
- **Multi-tenant**: Each city/kindergarten is a separate tenant with its own slug, content, and admins

---

## 🚀 התקנה מקומית / Local Setup

### דרישות קדם / Prerequisites

- Node.js 20+
- MongoDB (local או Atlas)
- npm או pnpm

### צעדים / Steps

```bash
# 1. התקן תלויות / Install dependencies
npm install

# 2. העתק את קובץ הסביבה / Copy environment file
cp .env.example .env

# 3. ערוך .env והגדר את MONGODB_URI שלך
# Edit .env and set your MONGODB_URI

# 4. הרץ seed כדי ליצור את העיר הראשונה (novosibirsk)
# Run seed to create the first tenant (novosibirsk)
npm run seed

# 5. הפעל את השרת והפרונטאנד
# Start the backend and frontend
npm run dev:full
```

הפרונטאנד יהיה זמין ב: `http://localhost:5173/chabad-kinder/he`  
הבקאנד יהיה זמין ב: `http://localhost:3000`

---

## 🔑 התחברות / Login Credentials

### אחרי seed:

**Admin של Novosibirsk:**
- City slug: `novosibirsk`
- Email: `admin@novosibirsk.local`
- Password: `demo123`

**⚠️ חובה לשנות סיסמאות בייצור!**

---

## 🗄️ MongoDB Atlas Setup

1. צור חשבון ב-[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. צור Cluster חדש (M0 free tier מספיק להתחלה)
3. ב-Database Access: צור משתמש עם הרשאות read/write
4. ב-Network Access: הוסף את כתובת ה-IP שלך או `0.0.0.0/0` (לפיתוח בלבד!)
5. לחץ Connect → Connect your application → העתק את connection string
6. החלף `<password>` ושם מסד הנתונים ל-`chabad-kinder`

דוגמה:
```
mongodb+srv://username:password@cluster.mongodb.net/chabad-kinder?retryWrites=true&w=majority
```

---

## ☁️ פריסה ל-Amvera / Amvera Deployment

1. צור חשבון ב-[Amvera](https://amvera.io)
2. צור פרויקט חדש והתחבר ל-GitHub repository
3. Amvera יזהה אוטומטית את `amvera.yaml`
4. הגדר משתני סביבה (Environment Variables):

```bash
MONGODB_URI=mongodb+srv://...  # מ-Atlas
SESSION_SECRET=RANDOM_STRING_64_CHARS  # הפק מחרוזת רנדומלית חזקה
MASTER_ADMIN_PASSWORD=STRONG_PASSWORD  # סיסמת מנהל על לניהול ערים
NODE_ENV=production
PORT=3000
TRUST_PROXY=1
```

5. Amvera יבנה וידפלוי אוטומטית
6. השרת ישרת גם את ה-SPA וגם את ה-API

---

## 📋 ניהול תוכן / Content Management

### כמנהל עיר / As City Admin

1. התחבר עם slug, email, password שלך
2. עבור ל-**ניהול תוכן אתר** בתפריט הניהול
3. ערוך דף הבית, תוכניות, צוות, גלריה, חדשות, תפריט, יצירת קשר
4. השינויים נשמרים אוטומטית ל-MongoDB
5. האתר הציבורי מציג את התוכן המעודכן מיד

### כמנהל על / As Master Admin

1. התחבר עם `MASTER_ADMIN_PASSWORD`
2. צור ערים/גנים חדשים (slug, שם, admin email + password ראשוני)
3. כל עיר מקבלת namespace נפרד עם תוכן וניהול משלה

---

## 🏛️ מבנה ה-Codebase / Codebase Structure

```
chabad-kinder/
├── server/                 # Backend (Express + MongoDB)
│   ├── models/            # Mongoose schemas
│   │   └── Kindergarten.ts
│   ├── routes/            # API routes
│   │   ├── public.ts      # Public content API
│   │   ├── admin.ts       # Admin login + CRUD
│   │   └── master.ts      # Master admin tenant mgmt
│   ├── middleware/        # Auth middleware
│   ├── utils/
│   │   └── db.ts          # MongoDB connection
│   ├── index.ts           # Express app
│   └── seed.ts            # Initial data seed
├── src/                   # Frontend (React + Vite)
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── lib/
│   │   └── api.ts         # API client
│   └── ...
├── public/
│   └── site-content.json  # Legacy (used by seed)
├── amvera.yaml            # Amvera deployment config
├── .env.example           # Environment template
└── package.json
```

---

## 🔐 אבטחה / Security

### בייצור / In Production:

- **חובה** להגדיר `SESSION_SECRET` חזק (64+ תווים רנדומליים)
- **חובה** להגדיר `MASTER_ADMIN_PASSWORD` שאינו ברירת מחדל
- השרת **יסרב להתחיל** עם סודות ברירת מחדל ב-production
- כל הסיסמאות מוצפנות עם bcrypt
- Sessions מאוחסנות ב-MongoDB עם TTL 7 ימים

### אחסון סיסמאות / Password Storage:

- Admin passwords מוצפנות עם bcrypt (10 rounds)
- אף סיסמה לא נשמרת בטקסט פשוט
- Master admin password נשמרת כ-environment variable בלבד

---

## 🧪 סקריפטים / Scripts

```bash
npm run dev              # Frontend dev server (Vite)
npm run dev:server       # Backend dev server (tsx watch)
npm run dev:full         # הרץ שניהם במקביל / Run both concurrently
npm run build            # Build production bundle
npm start                # Start production server
npm run seed             # Seed initial tenant (novosibirsk)
npm run lint             # Lint with oxlint
```

---

## 📚 API Endpoints

### Public
- `GET /api/public/content/:slug` — Get site content for a city

### Admin
- `POST /api/admin/login` — Login (body: `{ slug, email, password }`)
- `POST /api/admin/logout` — Logout
- `GET /api/admin/session` — Check session
- `GET /api/admin/content` — Get content (auth required)
- `PUT /api/admin/content` — Update content (auth required)

### Master Admin
- `POST /api/master/login` — Master login (body: `{ password }`)
- `GET /api/master/tenants` — List all tenants
- `POST /api/master/tenants` — Create new tenant

---

## 🔄 Migration from v1 (localStorage + GitHub Pages)

**מה השתנה / What Changed:**

- תוכן עבר מ-localStorage ו-`public/site-content.json` ל-MongoDB
- אין יותר "push to GitHub" לפרסום תוכן — השינויים חיים מיד
- כל עיר היא tenant נפרד עם admins משלה
- GitHub נשאר **רק לקוד**, לא לתוכן

**Backwards Compatibility:**

- GitHub Pages deploy עדיין עובד (אבל ללא backend)
- `AdminGitHub` page עדיין קיים אבל מסומן כ-deprecated
- `site-content.json` משמש רק ל-seed ראשוני

---

## 🌍 Multi-Tenant Model

כל kindergarten/עיר היא **tenant** נפרד:

- **slug** ייחודי (לדוגמה: `novosibirsk`, `jerusalem`, `moscow`)
- **content** — כל התוכן המקומי (homepage, programs, staff, news...)
- **adminUsers** — רשימת admins עם סיסמאות מוצפנות
- **settings** — active, timezone וכו׳

Public routes משתמשים ב-`/api/public/content/:slug`  
Admin routes מזהים את ה-tenant מה-session

---

## 📖 להוראות מפורטות יותר / For More Details

- ראה `ADMIN_GUIDE.md` למדריך ניהול מלא בעברית
- ראה `
- IMPLEMENTATION.md`
-
- <!-- Amvera deployment trigger -->לפרטים טכניים

---

## 🤝 Contributing

PRs are welcome! Please ensure:
- Code passes `npm run lint`
- New features include Hebrew UI translations
- Security: never commit secrets or passwords

---

## 📄 License

ISC
