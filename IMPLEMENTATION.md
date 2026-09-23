# Admin CMS Implementation Guide

## Overview

This implementation provides a comprehensive admin CMS for the Chabad Kinder site, allowing administrators to edit all public-facing content without touching code.

## What Was Implemented

### 1. Site Content Data Model (`src/data/content.ts`)

Created a unified content structure for:
- **Homepage**: Hero section, stats, values, testimonial quotes
- **Programs**: Gan programs (full/half day, hourly, emergency) and School programs
- **Staff**: Staff profiles with roles, names, and bios
- **Gallery**: Images with captions and display order
- **News**: News items and announcements
- **Menu**: Weekly menu for all days
- **Contact**: Hours, address, phone, email
- **About**: Mission, history, values

All content is trilingual (Hebrew/English/Russian).

### 2. Content Context Provider (`src/context/ContentContext.tsx`)

- Manages all site content state
- Persists to `localStorage` for local editing
- Loads content from `public/site-content.json` if available (for deployed sites)
- Provides update/add/remove functions for all content types
- Includes export/import functionality

### 3. Admin Content Editor (`src/pages/admin/AdminContent.tsx`)

Tabbed interface for editing:
- Homepage hero text
- Statistics
- Values
- Testimonial quotes
- Gan programs
- School programs
- Staff profiles
- Gallery items
- News/announcements
- Weekly menu
- Contact information
- About section
- Export/Import content as JSON

### 4. GitHub Integration (`src/lib/github.ts` + `src/pages/admin/AdminGitHub.tsx`)

- GitHub API service for committing content to repository
- Admin page for configuring GitHub Personal Access Token
- Push content to `public/site-content.json` in the repo
- Test connection before committing
- Triggers automatic GitHub Actions deployment

### 5. Updated Public Pages

- `HomePage`: Uses dynamic content from ContentContext
- `GanPage`: Uses dynamic programs, staff, and menu from ContentContext
- Content loads from context instead of hardcoded mock data

## How to Use

### Local Testing (Demo Mode)

1. Start dev server: `npm run dev`
2. Navigate to `http://localhost:5173/chabad-kinder/he`
3. Log in as admin: `admin@demo.local` / `demo`
4. Go to Admin → Site Content
5. Edit any content in the tabbed interface
6. Changes saved to localStorage
7. View changes on public pages immediately

### Production Deployment with GitHub

#### Initial Setup:

1. Create a GitHub Personal Access Token:
   - Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click "Generate new token (classic)"
   - Select scope: `repo` (Full control of private repositories)
   - Generate and copy the token

2. Configure GitHub in Admin Panel:
   - Log in as admin
   - Go to Admin → GitHub
   - Enter your token, owner (`shneurGreenberg`), repo (`chabad-kinder`), branch (`main`)
   - Click "Save Settings"
   - Click "Test Connection" to verify

3. Push Content to Repository:
   - After editing content in Admin → Site Content
   - Go to Admin → GitHub
   - Click "Save Content to GitHub"
   - Content is committed to `public/site-content.json`
   - GitHub Actions automatically builds and deploys

#### Content Workflow:

```
1. Admin edits content in UI
   ↓
2. Content saved to localStorage (immediate preview)
   ↓
3. Admin clicks "Save Content to GitHub"
   ↓
4. Content committed to public/site-content.json
   ↓
5. GitHub Actions triggered
   ↓
6. Site rebuilt and deployed to GitHub Pages
   ↓
7. Public site loads content from site-content.json
```

## Security Considerations

### Demo Mode (Current):
- Demo credentials: `admin@demo.local` / `demo`
- Suitable for local testing only
- DO NOT use in production

### Production Recommendations:

1. **GitHub Token Security**:
   - Tokens stored in localStorage
   - Only use on trusted devices
   - For production, use environment variables or GitHub Actions secrets
   - Consider using GitHub Apps authentication

2. **Admin Authentication**:
   - Current demo auth is NOT secure
   - For production, implement:
     - Real user accounts with hashed passwords
     - OAuth/SSO (Google, Microsoft)
     - Multi-factor authentication
     - Session management

3. **Content Validation**:
   - Add server-side validation for content
   - Sanitize user inputs
   - Rate limit GitHub API calls

## File Structure

```
src/
├── data/
│   ├── content.ts           # Content data model
│   └── mock.ts              # Demo data (legacy)
├── context/
│   ├── ContentContext.tsx   # Content state management
│   └── AdminContext.tsx     # Admin operations (existing)
├── pages/
│   ├── HomePage.tsx         # Updated to use ContentContext
│   ├── GanPage.tsx          # Updated to use ContentContext
│   └── admin/
│       ├── AdminContent.tsx # Content editor
│       └── AdminGitHub.tsx  # GitHub integration
└── lib/
    └── github.ts            # GitHub API service

public/
└── site-content.json        # Deployed site content
```

## What Still Needs Work

### High Priority:
1. **Production Authentication**: Replace demo credentials with real auth
2. **Content Validation**: Add validation for required fields, formats
3. **Image Upload**: Add ability to upload images (currently requires manual file placement)
4. **Audit Logging**: Track who changed what and when

### Medium Priority:
1. **Content Versioning**: Track history of content changes
2. **Draft/Publish Workflow**: Edit without immediately publishing
3. **Multi-user Editing**: Handle concurrent edits
4. **Content Preview**: Preview changes before saving

### Low Priority:
1. **Rich Text Editor**: WYSIWYG for longer content
2. **Bulk Operations**: Import/export specific sections
3. **Content Search**: Find content items quickly
4. **Scheduled Publishing**: Set future publish dates

## Routing Fix

The `/he` route works correctly with the existing SPA fallback:
- `vite.config.ts` copies `index.html` → `404.html`
- GitHub Pages serves `404.html` for unknown routes
- React Router handles client-side routing
- All language routes (`/he`, `/en`, `/ru`) work correctly

## Testing Checklist

- [x] Build succeeds without errors
- [x] Dev server runs and /he route works
- [x] Admin can log in
- [x] Content editor tabs load
- [x] Can edit homepage hero text
- [x] Can add/edit/remove stats, values, quotes
- [x] Can edit programs (gan/school)
- [x] Can edit staff profiles
- [x] Can edit gallery items
- [x] Can edit news items
- [x] Can edit weekly menu
- [x] Can export content to JSON
- [x] Can import content from JSON
- [x] GitHub config page loads
- [ ] GitHub token test works (requires valid token)
- [ ] Content push to GitHub works (requires valid token)
- [ ] Changes appear on homepage after refresh
- [ ] Changes appear on gan page after refresh
- [ ] Deployed site loads content from site-content.json

## Next Steps for Production

1. Set up environment-specific configuration
2. Implement secure authentication
3. Add server-side API for content management (optional)
4. Set up automated backups of content
5. Add monitoring and error tracking
6. Document admin user guide
7. Train administrators on the system
