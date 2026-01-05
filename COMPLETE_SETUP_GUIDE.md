# ATL ESnet - Complete Setup Guide

## ✅ COMPLETED

All 5 pages have been created with:
- ✅ Consistent ATL ESnet branding and header
- ✅ Working sidebar navigation (highlights active page)
- ✅ Responsive design
- ✅ Professional Embassy Suites styling

**Files created:**
1. index.html - Front Office Communications (READY TO USE)
2. room-reference.html - Room Reference Guide (NEEDS CONTENT UPDATE)
3. training-binder.html - Training Materials (NEEDS CONTENT)
4. nearby-attractions.html - Atlanta Attractions (NEEDS CONTENT)
5. lv-restaurants.html - LV Restaurants (NEEDS CONTENT)

---

## 📝 HOW TO UPDATE EACH PAGE

All pages currently show the "Communications" content. Here's how to customize each one:

### 1. INDEX.HTML - Communications Page
**Status:** ✅ COMPLETE - Ready to use!

**To add new MOD messages:**
1. Open index.html in a text editor
2. Find: `<div class="messages-container" id="messagesContainer">`
3. Add new messages at the top using this template:

```html
<div class="message-card priority-LEVEL">
    <div class="message-header">
        <div class="mod-info">
            <span class="mod-badge">MOD</span>
            <span class="mod-name">Manager Name (Title)</span>
        </div>
        <span class="message-time">Date/Time</span>
    </div>
    <div class="message-content">
        Your message here...
    </div>
</div>
```

**Priority levels:**
- `priority-high` = Red (urgent)
- `priority-normal` = Gold (regular)
- `priority-low` = Green (info)

---

### 2. ROOM-REFERENCE.HTML - Room Guide
**Status:** ⏳ NEEDS CONTENT

**What to do:**
Replace the messages section with the room table.

1. Open room-reference.html
2. Find the entire `<div class="communications-section">` block
3. Replace it with room table content

**Room Table Template** (add between `<main class="main-content">` tags):

```html
<div class="page-header">
    <h2>
        <span>🏨</span>
        Room Reference Guide
    </h2>
    <p class="description">Internal room codes comparison</p>
</div>

<div class="search-section">
    <div class="search-container">
        <input type="text" class="search-input" id="searchInput" 
               placeholder="Search by room number, bed type, location, or code...">
        <div class="filter-buttons">
            <button class="filter-btn active" data-filter="all">All Rooms</button>
            <button class="filter-btn" data-filter="king">King</button>
            <button class="filter-btn" data-filter="queen">Queen</button>
            <button class="filter-btn" data-filter="double">Double</button>
            <button class="filter-btn" data-filter="suite">Suite</button>
        </div>
    </div>
</div>

<div class="content">
    <div class="stats-bar">
        <div class="stat">
            <div class="stat-label">Total Rooms</div>
            <div class="stat-value" id="totalRooms">0</div>
        </div>
        <div class="stat">
            <div class="stat-label">Showing</div>
            <div class="stat-value" id="visibleRooms">0</div>
        </div>
    </div>

    <table id="roomTable">
        <thead>
            <tr>
                <th>Room Number</th>
                <th>Bed Type</th>
                <th>Location</th>
                <th>Internal Code</th>
                <th>Website Code</th>
            </tr>
        </thead>
        <tbody id="tableBody">
            <!-- ADD YOUR ROOM DATA HERE -->
            <tr data-bed-type="king">
                <td class="room-number">101</td>
                <td><span class="badge badge-king">1 King</span></td>
                <td><span class="location-tag">First Floor - East</span></td>
                <td><div class="code-box">K1-101</div></td>
                <td><div class="code-box">ESK-101</div></td>
            </tr>
            <!-- Repeat for each room -->
        </tbody>
    </table>
</div>
```

**Then add the JavaScript at the bottom** (before `</body>`):

```javascript
<script>
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const tableBody = document.getElementById('tableBody');
const totalRooms = document.getElementById('totalRooms');
const visibleRooms = document.getElementById('visibleRooms');

let activeFilter = 'all';

// Update stats
const rows = tableBody.querySelectorAll('tr');
totalRooms.textContent = rows.length;
visibleRooms.textContent = rows.length;

// Search functionality
searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    let visible = 0;
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const bedType = row.getAttribute('data-bed-type');
        const matchesSearch = text.includes(searchTerm);
        const matchesFilter = activeFilter === 'all' || bedType === activeFilter;
        if (matchesSearch && matchesFilter) {
            row.style.display = '';
            visible++;
        } else {
            row.style.display = 'none';
        }
    });
    visibleRooms.textContent = visible;
});

// Filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        activeFilter = this.getAttribute('data-filter');
        searchInput.dispatchEvent(new Event('input'));
    });
});
</script>
```

---

### 3. TRAINING-BINDER.HTML
**Status:** ⏳ NEEDS CONTENT

**Suggested content structure:**

```html
<div class="page-header">
    <h2>
        <span>📚</span>
        Training Binder
    </h2>
    <p class="description">Essential training materials and procedures</p>
</div>

<div class="content">
    <div class="training-categories">
        
        <div class="training-section">
            <h3>📝 Check-In Procedures</h3>
            <ul>
                <li>Standard check-in process</li>
                <li>Early check-in requests</li>
                <li>VIP guest handling</li>
                <li>Group check-ins</li>
            </ul>
        </div>

        <div class="training-section">
            <h3>💳 Payment Processing</h3>
            <ul>
                <li>Credit card authorization</li>
                <li>Cash payments</li>
                <li>Corporate billing</li>
                <li>Payment disputes</li>
            </ul>
        </div>

        <div class="training-section">
            <h3>🔑 Room Assignment</h3>
            <ul>
                <li>Room types and codes</li>
                <li>Room preferences</li>
                <li>Accessibility requirements</li>
                <li>Connecting rooms</li>
            </ul>
        </div>

        <div class="training-section">
            <h3>📞 Guest Service</h3>
            <ul>
                <li>Handling complaints</li>
                <li>Special requests</li>
                <li>Service recovery</li>
                <li>Guest feedback</li>
            </ul>
        </div>

        <div class="training-section">
            <h3>🚨 Emergency Procedures</h3>
            <ul>
                <li>Fire alarm protocol</li>
                <li>Medical emergencies</li>
                <li>Security incidents</li>
                <li>Evacuation procedures</li>
            </ul>
        </div>

        <div class="training-section">
            <h3>📱 System Training</h3>
            <ul>
                <li>PMS navigation</li>
                <li>Reservation management</li>
                <li>Reporting functions</li>
                <li>Night audit basics</li>
            </ul>
        </div>
    </div>
</div>
```

**Add this CSS for training sections:**

```css
.training-categories {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    padding: 30px;
}

.training-section {
    background: var(--embassy-light-blue);
    padding: 25px;
    border-radius: 8px;
    border-left: 4px solid var(--embassy-gold);
}

.training-section h3 {
    color: var(--embassy-navy);
    margin-bottom: 15px;
    font-size: 18px;
}

.training-section ul {
    list-style: none;
    padding-left: 0;
}

.training-section li {
    padding: 8px 0;
    padding-left: 25px;
    position: relative;
    color: var(--text-primary);
}

.training-section li:before {
    content: '✓';
    position: absolute;
    left: 0;
    color: var(--embassy-blue);
    font-weight: bold;
}
```

---

### 4. NEARBY-ATTRACTIONS.HTML
**Status:** ⏳ NEEDS CONTENT

**Suggested content structure:**

```html
<div class="page-header">
    <h2>
        <span>🎯</span>
        Nearby Attractions
    </h2>
    <p class="description">Atlanta attractions to recommend to guests</p>
</div>

<div class="content">
    <div class="attractions-grid">
        
        <div class="attraction-card">
            <div class="attraction-icon">🏛️</div>
            <h3>Georgia Aquarium</h3>
            <div class="distance">0.3 miles</div>
            <p>World's largest aquarium. Perfect for families.</p>
            <div class="hours">Open daily 9AM-6PM</div>
        </div>

        <div class="attraction-card">
            <div class="attraction-icon">🎭</div>
            <h3>World of Coca-Cola</h3>
            <div class="distance">0.4 miles</div>
            <p>Interactive museum about Coca-Cola history.</p>
            <div class="hours">Open daily 10AM-5PM</div>
        </div>

        <div class="attraction-card">
            <div class="attraction-icon">⚾</div>
            <h3>Mercedes-Benz Stadium</h3>
            <div class="distance">0.8 miles</div>
            <p>Home of the Falcons and Atlanta United.</p>
            <div class="hours">Event schedule varies</div>
        </div>

        <div class="attraction-card">
            <div class="attraction-icon">🌳</div>
            <h3>Centennial Olympic Park</h3>
            <div class="distance">0.1 miles</div>
            <p>21-acre park built for 1996 Olympics.</p>
            <div class="hours">Open 24 hours</div>
        </div>

        <div class="attraction-card">
            <div class="attraction-icon">📺</div>
            <h3>CNN Center</h3>
            <div class="distance">0.5 miles</div>
            <p>Behind-the-scenes tours of CNN headquarters.</p>
            <div class="hours">Tours: 9AM-5PM daily</div>
        </div>

        <div class="attraction-card">
            <div class="attraction-icon">🛍️</div>
            <h3>Peachtree Center</h3>
            <div class="distance">1.2 miles</div>
            <p>Shopping and dining complex.</p>
            <div class="hours">Hours vary by store</div>
        </div>
    </div>
</div>
```

**Add this CSS:**

```css
.attractions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    padding: 30px;
}

.attraction-card {
    background: white;
    border: 2px solid var(--embassy-light-blue);
    padding: 25px;
    border-radius: 12px;
    text-align: center;
    transition: all 0.3s ease;
}

.attraction-card:hover {
    border-color: var(--embassy-blue);
    box-shadow: 0 4px 15px rgba(0, 87, 160, 0.1);
    transform: translateY(-5px);
}

.attraction-icon {
    font-size: 48px;
    margin-bottom: 15px;
}

.attraction-card h3 {
    color: var(--embassy-navy);
    margin-bottom: 10px;
    font-size: 18px;
}

.distance {
    color: var(--embassy-blue);
    font-weight: 600;
    margin-bottom: 10px;
    font-size: 14px;
}

.attraction-card p {
    color: var(--text-secondary);
    margin-bottom: 15px;
    line-height: 1.5;
}

.hours {
    background: var(--embassy-light-blue);
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 13px;
    color: var(--embassy-navy);
    font-weight: 500;
}
```

---

### 5. LV-RESTAURANTS.HTML
**Status:** ⏳ NEEDS CONTENT

**Suggested content structure:**

```html
<div class="page-header">
    <h2>
        <span>🍽️</span>
        LV Restaurants
    </h2>
    <p class="description">Legacy Ventures restaurant locations and information</p>
</div>

<div class="content">
    <div class="restaurants-list">
        
        <div class="restaurant-card">
            <div class="restaurant-header">
                <h3>🥩 Restaurant Name</h3>
                <div class="cuisine-type">American Steakhouse</div>
            </div>
            <div class="restaurant-details">
                <div class="detail-row">
                    <span class="label">📍 Location:</span>
                    <span>123 Peachtree St, Atlanta, GA</span>
                </div>
                <div class="detail-row">
                    <span class="label">📞 Phone:</span>
                    <span>(404) 555-0100</span>
                </div>
                <div class="detail-row">
                    <span class="label">🕐 Hours:</span>
                    <span>11:30 AM - 10:00 PM Daily</span>
                </div>
                <div class="detail-row">
                    <span class="label">🚶 Distance:</span>
                    <span>0.5 miles from hotel</span>
                </div>
            </div>
            <div class="restaurant-description">
                Upscale steakhouse featuring prime cuts and an extensive wine list. Reservations recommended.
            </div>
            <div class="special-offers">
                💎 Hotel Guest Special: 10% off dinner entrées
            </div>
        </div>

        <!-- Add more restaurant cards here -->
    </div>
</div>
```

**Add this CSS:**

```css
.restaurants-list {
    padding: 30px;
}

.restaurant-card {
    background: white;
    border: 2px solid var(--embassy-light-blue);
    padding: 25px;
    border-radius: 12px;
    margin-bottom: 20px;
}

.restaurant-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 2px solid var(--embassy-light-blue);
}

.restaurant-header h3 {
    color: var(--embassy-navy);
    font-size: 22px;
}

.cuisine-type {
    background: var(--embassy-gold);
    color: white;
    padding: 6px 15px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 600;
}

.restaurant-details {
    margin-bottom: 20px;
}

.detail-row {
    display: flex;
    gap: 10px;
    padding: 10px 0;
    border-bottom: 1px solid var(--embassy-light-blue);
}

.detail-row .label {
    font-weight: 600;
    color: var(--embassy-navy);
    min-width: 120px;
}

.restaurant-description {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 15px;
}

.special-offers {
    background: var(--embassy-light-blue);
    padding: 15px;
    border-radius: 8px;
    border-left: 4px solid var(--embassy-gold);
    color: var(--embassy-navy);
    font-weight: 500;
}
```

---

## 🚀 DEPLOYMENT

All files are ready to deploy! Here's how:

### Option 1: Network Drive (Easiest)
1. Create folder: `\\network-drive\ATL_ESnet\`
2. Copy all 5 HTML files to the folder
3. Front desk agents bookmark: `\\network-drive\ATL_ESnet\index.html`
4. Done! No internet needed.

### Option 2: Google Drive
1. Upload all files to Google Drive folder
2. Share folder with team
3. Get shareable link
4. Team can access from any device

### Option 3: Simple Web Hosting
1. Use GitHub Pages, Netlify, or Vercel (all free)
2. Upload all 5 files
3. Get permanent URL
4. Share with team

---

## 📌 QUICK REFERENCE

**Current Status:**
- ✅ index.html = READY (Communications)
- ⏳ room-reference.html = Update with room table
- ⏳ training-binder.html = Add training content
- ⏳ nearby-attractions.html = Add Atlanta attractions
- ⏳ lv-restaurants.html = Add restaurant info

**To update any page:**
1. Open the HTML file in Notepad or text editor
2. Find the `<main class="main-content">` section
3. Replace the content between `<main>` and `</main>`
4. Save the file
5. Refresh browser to see changes

**All pages have:**
- ✅ Professional Embassy Suites branding
- ✅ Working navigation sidebar
- ✅ Responsive design (works on mobile)
- ✅ Consistent styling

---

## 💡 TIPS

1. **Test locally first** - Open the HTML files in your browser before deploying
2. **Keep backups** - Save copies before making major changes
3. **Update incrementally** - Update one page at a time
4. **Use Find & Replace** - For bulk updates across files
5. **Ask for help** - If stuck, provide specific page/section details

---

**You now have a complete, professional intranet system ready to customize and deploy!**
