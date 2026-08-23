# חב״ד קינדר / Chabad Kinder

אתר תלת-לשוני (עברית, English, Русский) לגן ילדים ולבית ספר של חב״ד. גרסה 1 היא אתר סטטי ל-GitHub Pages: אתר ציבורי, אשף הרשמה, פורטל הורים ופאנל ניהול עם נתוני הדגמה.

## הרצה מקומית

```bash
npm install
npm run dev
```

הכתובת המקומית: `http://localhost:5173/chabad-kinder/he`

## כניסה (הדגמה)

- הורה: `parent@demo.local` / `demo`
- מנהל: `admin@demo.local` / `demo`

אין שרת אחורית. הרשמות, תשלומים מדומים והודעות נשמרים ב-`localStorage`.

## פרסום

העלאה ל-`main` מפעילה GitHub Actions ומפרסמת ל-GitHub Pages:

`https://<user>.github.io/chabad-kinder/`
