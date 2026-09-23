# Admin CMS Audit - Chabad Kinder

## Current State

### What EXISTS for Admin Editing (localStorage only):
1. **AdminCampus page**: Add news items, edit weekly menu dishes
2. **AdminContext**: Children, staff (internal), tariffs, applications, attendance
3. All changes saved to `localStorage` only - lost on browser clear or different device

### What is HARDCODED (cannot be edited):
1. **Translation files** (393 lines each in he.json/en.json/ru.json):
   - Homepage: hero text, stats, values, quotes
   - Gan page: track descriptions, daily schedule, pricing displays
   - School page: grade descriptions, values, schedule
   - About/Contact/FAQ/Life: all content
   - All UI labels, navigation, form text

2. **Mock data** (src/data/mock.ts):
   - Public-facing news items (different from admin news)
   - Holiday calendar
   - Week menu for public display (different from admin menu)
   - Staff profiles for public site (role, name, bio)
   - Parent testimonial quotes
   - Gallery images and captions
   - Demo credentials (parent@demo.local, admin@demo.local)
   - All parent portal demo data

### GitHub Pages Routing:
- Already fixed: vite.config.ts copies index.html → 404.html for SPA routing
- /he should work on GitHub Pages

### Current Auth:
- Demo credentials hardcoded: `admin@demo.local / demo`
- No production auth mechanism
- AuthContext stores user in localStorage
- No write-protection for sensitive operations

## Limitations:
- No multi-device persistence (localStorage only)
- No real content versioning
- Admin content (news/menu) separate from public content (translations/mock)
- Cannot edit most public-facing text without code changes
- No backup/export mechanism
- No secure production auth
