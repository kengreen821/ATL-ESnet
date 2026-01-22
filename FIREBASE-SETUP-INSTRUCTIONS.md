# Firebase Authentication Setup for ATL ESnet

## 🔥 Firebase Project Setup Instructions

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Project name: `ATL-ESnet-Auth` (or your choice)
4. Disable Google Analytics (not needed for this demo)
5. Click "Create project"

### Step 2: Enable Authentication

1. In Firebase Console, click **Authentication** in left sidebar
2. Click **Get started**
3. Click **Sign-in method** tab
4. Click **Email/Password**
5. Toggle **Enable** to ON
6. Click **Save**

### Step 3: Enable Firestore Database

1. In Firebase Console, click **Firestore Database** in left sidebar
2. Click **Create database**
3. Select **Start in production mode**
4. Choose location: `us-central` (or closest to Atlanta)
5. Click **Enable**

### Step 4: Set Firestore Security Rules

1. Click **Rules** tab in Firestore
2. Replace default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read their own profile
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Only admins can read all user profiles
    match /users/{userId} {
      allow read: if request.auth != null && 
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'Admin';
    }
  }
}
```

3. Click **Publish**

### Step 5: Get Firebase Configuration

1. Click **Project Settings** (gear icon, top left)
2. Scroll down to **Your apps**
3. Click **Web** icon (`</>`)
4. Register app name: `ATL ESnet Portal`
5. Click **Register app**
6. Copy the `firebaseConfig` object
7. Paste it into `firebase-config.js` (replace the placeholder)

Your config will look like:
```javascript
const firebaseConfig = {
  apiKey: "YOUR-API-KEY-HERE",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

### Step 6: Create Initial Users

1. Open `user-setup.html` in browser
2. This will create 4 sample users:
   - **Ken Green** (Admin) - ken.green@atlesnet.com / password123
   - **Ivy** (General Manager - Admin) - ivy.gm@atlesnet.com / password123
   - **Joseph** (Front Office Manager) - joseph.fom@atlesnet.com / password123
   - **Antwain** (Assistant Front Office Manager) - antwain.afom@atlesnet.com / password123
   - **Mike** (Group Sales Manager) - mike.sales@atlesnet.com / password123
   - **Demo Agent** (Staff) - agent.demo@atlesnet.com / password123

3. Check Firebase Console → Authentication → Users to verify they were created

### Step 7: Test the System

1. Open `login.html` in browser
2. Login with any of the sample accounts
3. See how navigation and content visibility changes based on role
4. Try accessing Group Guide with different roles (only Admin/Manager can see it)

---

## 🔐 Sample User Credentials

| Name | Email | Password | Role | Access Level |
|------|-------|----------|------|--------------|
| Ken Green | ken.green@atlesnet.com | password123 | Admin | Full access to everything |
| Ivy | ivy.gm@atlesnet.com | password123 | Admin | Full access to everything - General Manager |
| Joseph | joseph.fom@atlesnet.com | password123 | Manager | View all, edit content, post messages |
| Antwain | antwain.afom@atlesnet.com | password123 | Manager | View all, edit content, post messages |
| Mike | mike.sales@atlesnet.com | password123 | Dept Head | View all + edit Sales department |
| Demo Agent | agent.demo@atlesnet.com | password123 | Staff | View all content (no editing rights) |

**⚠️ Important:** Change these passwords before any real deployment!

---

## 📊 Permission Matrix

| Feature | Admin | Manager | Department Head | Staff |
|---------|-------|---------|-----------------|-------|
| View Training Binder | ✅ | ✅ | ✅ | ✅ |
| View Room Reference | ✅ | ✅ | ✅ | ✅ |
| View Group Guide | ✅ | ✅ | ❌ | ❌ |
| Edit Content | ✅ | ✅ | ⚠️ (Own dept) | ❌ |
| Post MOD Messages | ✅ | ✅ | ❌ | ❌ |
| Manage Users | ✅ | ❌ | ❌ | ❌ |
| View Parking Rates | ✅ | ✅ | ✅ | ✅ |
| Edit Parking Rates | ✅ | ⚠️ (Mgr+) | ❌ | ❌ |

---

## 🚀 Deployment Notes

### For GitHub Pages:
1. Upload all files to your repository
2. Make sure Firebase scripts are loaded from CDN
3. Update `firebase-config.js` with your Firebase credentials
4. Navigation will work automatically based on logged-in user role

### For Production (SharePoint):
- This Firebase demo shows the **concept**
- In production, migrate to SharePoint authentication
- User roles map to SharePoint permission groups
- Content visibility rules transfer to SharePoint security

---

## 🛡️ Security Notes

**This is a DEMONSTRATION system:**
- Sample passwords are weak (for demo only)
- Firebase free tier has limitations
- For production, use SharePoint/Microsoft 365 authentication
- This proves capability but isn't production-ready security

**When showing leadership:**
> "This demonstrates authentication and permission-based access. In production, we'd use SharePoint with Microsoft 365 credentials for enterprise-grade security, but this shows the functionality we're building toward."

---

## 📱 Features Demonstrated

1. **User Authentication**
   - Secure login/logout
   - Session management
   - Password protection

2. **Role-Based Access Control**
   - Different user roles
   - Permission-based navigation
   - Content visibility based on role

3. **User Profiles**
   - Name, email, role, department
   - Profile display
   - Role indicators

4. **Protected Content**
   - Group Guide (Managers only)
   - MOD Messaging (Managers can post)
   - Department editing (Department Heads)

5. **Professional UI**
   - Embassy Suites branding
   - Responsive design
   - User feedback (logged in as...)

---

## 💡 Next Steps

After Firebase demo is working:

1. **Show to Derrick/Leadership:**
   - Demonstrate login with different roles
   - Show how permissions work
   - Explain this proves capability

2. **Transition Plan to SharePoint:**
   - User roles → SharePoint groups
   - Firebase auth → Microsoft 365 SSO
   - Content permissions → SharePoint security

3. **Use as Leverage:**
   - "I can build enterprise features"
   - "This requires proper infrastructure"
   - "Demonstrates software development skills"

---

## 🎯 Strategic Positioning

**When presenting this to leadership:**

*"I've built a working authentication system that demonstrates role-based permissions and secure access control. This shows what's possible with proper infrastructure.*

*Right now it's using Firebase as a proof-of-concept, but in production we'd integrate with SharePoint and Microsoft 365 for enterprise-grade security. This demo proves I can build these features - it's just a matter of getting the right deployment platform.*

*This is enterprise software development work, not just building webpages. The system manages users, enforces permissions, secures sensitive data like the Group Guide, and provides different access levels based on roles. This is the kind of functionality that typically requires a dedicated development team."*

---

## 🔧 Troubleshooting

**"Firebase not loading"**
- Check that internet connection is active (needs CDN access)
- Verify firebaseConfig credentials are correct
- Check browser console for errors

**"Can't create users"**
- Make sure Email/Password auth is enabled in Firebase Console
- Check Firestore security rules are published
- Verify you're running from http://localhost or https://

**"Login not working"**
- Verify user was created in Firebase Console → Authentication
- Check password is correct (default: password123)
- Clear browser cache and try again

**"Content not showing based on role"**
- Check browser console for errors
- Verify user profile exists in Firestore
- Check that role is spelled correctly (case-sensitive)

---

## 📞 Support

This is a demonstration system built by Ken Green for ATL ESnet.

For questions about:
- **Firebase setup:** See Firebase documentation
- **Feature requests:** Contact Ken Green
- **Production deployment:** Coordinate with IT department
- **SharePoint migration:** Work with Derrick and IT

---

**Remember: This is a CAPABILITY DEMONSTRATION, not the final production system!**
