# ATL ESnet - Atlanta Embassy Suites Network

## Overview

ATL ESnet is a comprehensive internal portal for the Embassy Suites Centennial Park front office team. It includes multiple sections accessible through a unified navigation system.

## File Structure

```
ATL ESnet/
├── index.html                  (Main page - Front Office Communications)
├── room-reference.html         (Room codes and information)
├── training-binder.html        (Training materials - TO BE COMPLETED)
├── nearby-attractions.html     (Local attractions - TO BE COMPLETED)
└── lv-restaurants.html         (Legacy Ventures restaurants - TO BE COMPLETED)
```

## Deployment Options

### Option 1: Network Drive (Recommended)
1. Create a folder called "ATL_ESnet" on your shared network drive
2. Copy all HTML files into this folder
3. Team members can bookmark the location
4. Set index.html as the homepage

### Option 2: Cloud Hosting
1. Upload all files to Google Drive, Dropbox, or similar
2. Share the folder with the team
3. Provide the link to index.html

### Option 3: Simple Web Server
1. Use GitHub Pages, Netlify, or similar
2. Upload all files
3. Team can access via permanent URL

## How to Update Each Section

### 1. Front Office Communications (index.html)

Messages are displayed in the main content area. To add a new message:

**Message Template:**
```html
<div class="message-card priority-LEVEL">
    <div class="message-header">
        <div class="mod-info">
            <span class="mod-badge">MOD</span>
            <span class="mod-name">NAME (TITLE)</span>
        </div>
        <span class="message-time">DATE/TIME</span>
    </div>
    <div class="message-content">
        Your message text here...
    </div>
</div>
```

**Priority Levels:**
- `priority-high` - Red border, pink background (urgent messages)
- `priority-normal` - Gold border, blue background (regular messages)
- `priority-low` - Green border, green background (informational)

**Where to add:**
- Open index.html in a text editor
- Find `<div class="messages-container" id="messagesContainer">`
- Add new messages at the top (most recent first)
- Delete old messages to keep it clean

### 2. Room Reference Guide (room-reference.html)

This page is complete and functional. To add/update rooms:

**Room Template:**
```html
<tr data-bed-type="TYPE">
    <td class="room-number">ROOM_NUMBER</td>
    <td><span class="badge badge-TYPE">BED_TYPE</span></td>
    <td><span class="location-tag">LOCATION</span></td>
    <td><div class="code-box">INTERNAL_CODE</div></td>
    <td><div class="code-box">WEBSITE_CODE</div></td>
</tr>
```

**Bed Types:**
- `king` / `badge-king` - King rooms
- `queen` / `badge-queen` - Queen rooms
- `double` / `badge-double` - Double rooms
- `suite` / `badge-suite` - Suite rooms

**Where to add:**
- Open room-reference.html in a text editor
- Find `<tbody id="tableBody">`
- Add new room rows
- Save and reload

### 3. Training Binder (training-binder.html)
**Status:** Placeholder - Needs content

**Recommended content:**
- Check-in/Check-out procedures
- System tutorials
- Guest service standards
- Emergency procedures
- Contact information

### 4. Nearby Attractions (nearby-attractions.html)
**Status:** Placeholder - Needs content

**Recommended content:**
- Atlanta attractions with descriptions
- Distance from hotel
- Hours of operation
- Recommended for different guest types
- Driving/walking directions

### 5. LV Restaurants (lv-restaurants.html)
**Status:** Placeholder - Needs content

**Recommended content:**
- Legacy Ventures restaurant locations
- Menu highlights
- Hours and contact info
- Special offers for hotel guests
- Directions from hotel

## Navigation System

All pages share the same navigation sidebar with these sections:
- 📢 Communications (Main page)
- 🏨 Room Reference Guide
- 📚 Training Binder
- 🎯 Nearby Attractions
- 🍽️ LV Restaurants

The active page is highlighted in blue.

## Design Features

✅ **Embassy Suites Branding** - Professional navy and gold color scheme
✅ **Responsive Design** - Works on desktop, tablet, and mobile
✅ **Live Search** - Room reference includes searchable database
✅ **Real-time Updates** - Date and time display automatically
✅ **Priority Messages** - Color-coded communications system
✅ **No Login Required** - Instant access for team

## Quick Info Panel

The sidebar shows:
- Total Rooms (update in Quick Info section)
- Current Date (auto-updates)
- Current Time (auto-updates)

To update total rooms:
1. Open index.html
2. Find `<span class="info-value">TBD</span>`
3. Replace TBD with your room count

## Customization

### Changing Colors
Edit the CSS variables in any HTML file:
```css
:root {
    --embassy-navy: #003057;
    --embassy-blue: #0057A0;
    --embassy-gold: #C7A961;
    --embassy-light-blue: #E8F1F8;
}
```

### Adding New Sections
1. Copy any existing HTML file
2. Update the title
3. Change the content area
4. Add a new navigation link to ALL pages
5. Update the active class

## Technical Notes

- All files are self-contained (CSS and JavaScript embedded)
- No external dependencies required
- Works offline
- No database needed
- Compatible with all modern browsers
- Mobile-responsive design

## Support

All files use the same design system. To modify:
- Edit with any text editor (Notepad, VS Code, etc.)
- Changes take effect immediately when files are saved
- Keep backup copies before major changes

## Next Steps

1. ✅ Deploy index.html and room-reference.html (completed)
2. ⏳ Add room data to room-reference.html
3. ⏳ Build out training-binder.html content
4. ⏳ Add nearby-attractions.html content
5. ⏳ Add lv-restaurants.html content

---

**ATL ESnet** - Making the front desk team's job easier, one click at a time.
