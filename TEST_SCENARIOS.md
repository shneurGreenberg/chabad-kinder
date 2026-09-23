# Test Scenarios for Admin CMS

## Scenario 1: Edit Homepage Hero Text

**Goal:** Change the main hero text on the homepage

**Steps:**
1. Open http://localhost:5173/chabad-kinder/he
2. Note the current hero text (title)
3. Click "כניסת הורים" (Login)
4. Enter: `admin@demo.local` / `demo`
5. Click on "ניהול" (Admin) in navigation
6. Click on "תוכן אתר" (Site Content) in sidebar
7. Should land on "כותרת ראשית" (Hero) tab by default
8. Edit the title fields:
   - עברית: "בית חם וידידותי לילדים"
   - English: "A warm and friendly home for children"
   - Русский: "Теплый и дружелюбный дом для детей"
9. Click "שמור" (Save)
10. Go back to homepage (click logo or "בית")
11. **Expected:** Hero title should show the new text

**Rollback:**
- Go back to Admin → Site Content → Hero
- Change back to original text
- Or: Go to Export/Import tab → Reset to defaults

## Scenario 2: Add a New Value

**Goal:** Add a fourth value to the values section

**Steps:**
1. Log in as admin (see Scenario 1)
2. Go to Admin → Site Content
3. Click on "ערכים" (Values) tab
4. Fill in the form at the top:
   - כותרת עברית: "אוכל בריא"
   - כותרת English: "Healthy food"
   - כותרת Русский: "Здоровая еда"
   - תיאור עברית: "ארוחות מוכנות טריות מדי יום"
   - תיאור English: "Meals prepared fresh daily"
   - תיאור Русский: "Блюда готовятся свежими каждый день"
5. Click "הוסף" (Add)
6. **Expected:** New value appears in the list below
7. Go to homepage
8. Scroll to values section (blue cards)
9. **Expected:** Fourth value card appears with the new text

## Scenario 3: Edit Weekly Menu

**Goal:** Change Wednesday's menu item

**Steps:**
1. Log in as admin
2. Go to Admin → Site Content → "תפריט" (Menu) tab
3. Find the Wednesday (רביעי) section
4. Change the Hebrew text to: "מרק ירקות"
5. Change the English text to: "Vegetable soup"
6. Change the Russian text to: "Овощной суп"
7. Click outside the input (blur) to auto-save
8. Go to Gan page (דף הגן)
9. Scroll to menu section
10. **Expected:** Wednesday shows the new menu item

## Scenario 4: Add a News Item

**Goal:** Add a new announcement

**Steps:**
1. Log in as admin
2. Go to Admin → Site Content → "חדשות" (News) tab
3. Fill in the form:
   - תאריך: Today's date
   - כותרת עברית: "יום משפחות בשבוע הבא"
   - כותרת English: "Family day next week"
   - כותרת Русский: "День семьи на следующей неделе"
   - תוכן עברית: "כל המשפחות מוזמנות!"
   - תוכן English: "All families are invited!"
   - תוכן Русский: "Все семьи приглашены!"
4. Click "הוסף" (Add)
5. **Expected:** News item appears in list
6. Go to homepage
7. Scroll to news section
8. **Expected:** New news item appears (should be in top 3)

## Scenario 5: Export and Import Content

**Goal:** Backup content and restore it

**Steps:**
1. Log in as admin
2. Go to Admin → Site Content → "ייצוא/ייבוא" (Export/Import) tab
3. Click "ייצא תוכן" (Export Content)
4. **Expected:** JSON file downloads (site-content-YYYY-MM-DD.json)
5. Open the JSON file in a text editor
6. **Expected:** See all content in structured JSON format
7. Go back to admin, make some changes (e.g., edit hero text)
8. Go to Export/Import tab
9. Click "Choose File" and select the downloaded JSON
10. Click "ייבא תוכן" (Import Content)
11. **Expected:** Alert says "תוכן יובא בהצלחה!" (Content imported successfully)
12. Go to homepage
13. **Expected:** Content reverted to exported state

## Scenario 6: GitHub Configuration (Requires Token)

**Goal:** Configure GitHub integration

**Pre-requisites:**
- GitHub account
- Personal Access Token with `repo` scope

**Steps:**
1. Log in as admin
2. Go to Admin → GitHub
3. Fill in form:
   - GitHub Token: (your token)
   - Owner: `shneurGreenberg`
   - Repository: `chabad-kinder`
   - Branch: `main`
4. Click "שמור הגדרות" (Save Settings)
5. **Expected:** Settings saved message
6. Click "בדוק חיבור" (Test Connection)
7. **Expected:** Green checkmark "✓ חיבור תקין!"
8. If fails: Red X with error message

## Scenario 7: Push Content to GitHub (Requires Token)

**Goal:** Deploy content changes to live site

**Pre-requisites:**
- Completed Scenario 6
- Test connection succeeded

**Steps:**
1. Log in as admin
2. Make some content changes (e.g., edit hero text)
3. Go to Admin → GitHub
4. Ensure test connection shows success
5. Click "שמור תוכן ל-GitHub" (Save Content to GitHub)
6. **Expected:** Button shows "שומר..." (Saving...)
7. Wait for completion
8. **Expected:** Green success message
9. Go to GitHub repository
10. **Expected:** New commit to `public/site-content.json`
11. Go to Actions tab
12. **Expected:** Workflow running or completed
13. Wait 2-3 minutes
14. Visit live site: https://shneurgreenberg.github.io/chabad-kinder/he
15. **Expected:** Changes visible on live site

## Scenario 8: Add a Staff Member

**Goal:** Add a new teacher profile

**Steps:**
1. Log in as admin
2. Go to Admin → Site Content → "צוות" (Staff) tab
3. Fill in form:
   - תפקיד עברית: "גננת"
   - תפקיד English: "Teacher"
   - תפקיד Русский: "Воспитатель"
   - שם עברית: "שרה כהן"
   - שם English: "Sarah Cohen"
   - שם Русский: "Сара Коэн"
   - ביוגרפיה עברית: "עובדת במוסד 5 שנים"
   - ביוגרפיה English: "Works here for 5 years"
   - ביוגרפיה Русский: "Работает 5 лет"
   - Check "פעיל" (Active)
4. Click "הוסף" (Add)
5. **Expected:** Staff member appears in list
6. Go to Gan page
7. Scroll to staff section
8. **Expected:** New staff card appears

## Scenario 9: Edit Gallery Caption

**Goal:** Change a gallery image caption

**Steps:**
1. Log in as admin
2. Go to Admin → Site Content → "גלריה" (Gallery) tab
3. Find an existing gallery item
4. Click "ערוך" (Edit) on one of them
5. Change captions:
   - עברית: "חצר המשחקים החדשה"
   - English: "The new playground"
   - Русский: "Новая детская площадка"
6. Click "עדכן" (Update)
7. Go to homepage
8. Scroll to gallery section
9. **Expected:** Updated caption appears

## Scenario 10: Test Routing

**Goal:** Verify language routes work

**Steps:**
1. Open http://localhost:5173/chabad-kinder/
2. **Expected:** Redirects to /he
3. Open http://localhost:5173/chabad-kinder/en
4. **Expected:** English site loads
5. Open http://localhost:5173/chabad-kinder/ru
6. **Expected:** Russian site loads
7. Open http://localhost:5173/chabad-kinder/invalidroute
8. **Expected:** Redirects to /he (default language)

## Scenario 11: Edit Contact Information

**Goal:** Update contact details

**Steps:**
1. Log in as admin
2. Go to Admin → Site Content → "יצירת קשר" (Contact) tab
3. Edit fields:
   - שעות עברית: "א׳–ה׳ 8:00–17:00"
   - שעות English: "Sun–Thu 8:00–17:00"
   - שעות Русский: "Вс–Чт 8:00–17:00"
   - Update phone, email as desired
4. Click "שמור" (Save)
5. Go to Contact page (צור קשר)
6. **Expected:** Updated hours and info appear

## Scenario 12: Reset to Defaults

**Goal:** Clear all changes and restore original content

**⚠️ Warning:** This deletes all edits!

**Steps:**
1. Log in as admin
2. Go to Admin → Site Content → "ייצוא/ייבוא" (Export/Import) tab
3. Click "איפוס לברירת מחדל" (Reset to defaults)
4. **Expected:** Confirmation dialog appears
5. Click OK/Confirm
6. **Expected:** All content resets
7. Go to homepage
8. **Expected:** Original default content appears

## Pass/Fail Criteria

**Pass:** 
- ✅ Changes save and persist across page refreshes
- ✅ Changes appear immediately on public pages
- ✅ Export produces valid JSON
- ✅ Import restores exported content
- ✅ All language variants update correctly

**Fail:**
- ❌ Changes don't save
- ❌ Changes disappear after refresh
- ❌ Public pages don't update
- ❌ Export/import errors
- ❌ Languages don't sync

## Automated Test Ideas (Future)

1. Unit tests for ContentContext CRUD operations
2. Integration tests for GitHub API service
3. E2E tests with Playwright/Cypress
4. Visual regression tests for content changes
5. Accessibility tests for admin forms
