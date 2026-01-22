// auth-system.js
// Complete authentication and permission management system

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    createUserWithEmailAndPassword
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc 
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { firebaseConfig } from './firebase-config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ========================================
// PERMISSION DEFINITIONS
// ========================================

const ROLES = {
    ADMIN: 'Admin',
    MANAGER: 'Manager',
    DEPARTMENT_HEAD: 'DepartmentHead',
    STAFF: 'Staff'
};

const PERMISSIONS = {
    // View permissions
    VIEW_ALL: 'viewAll',
    VIEW_GROUP_GUIDE: 'viewGroupGuide',
    VIEW_FINANCIALS: 'viewFinancials',
    
    // Edit permissions
    EDIT_CONTENT: 'editContent',
    EDIT_DEPARTMENT: 'editDepartment',
    
    // Action permissions
    POST_MESSAGES: 'postMessages',
    MANAGE_USERS: 'manageUsers',
    MANAGE_SETTINGS: 'manageSettings'
};

// Permission matrix: what each role can do
const ROLE_PERMISSIONS = {
    [ROLES.ADMIN]: {
        [PERMISSIONS.VIEW_ALL]: true,
        [PERMISSIONS.VIEW_GROUP_GUIDE]: true,
        [PERMISSIONS.VIEW_FINANCIALS]: true,
        [PERMISSIONS.EDIT_CONTENT]: true,
        [PERMISSIONS.EDIT_DEPARTMENT]: true,
        [PERMISSIONS.POST_MESSAGES]: true,
        [PERMISSIONS.MANAGE_USERS]: true,
        [PERMISSIONS.MANAGE_SETTINGS]: true
    },
    [ROLES.MANAGER]: {
        [PERMISSIONS.VIEW_ALL]: true,
        [PERMISSIONS.VIEW_GROUP_GUIDE]: true,
        [PERMISSIONS.VIEW_FINANCIALS]: true,
        [PERMISSIONS.EDIT_CONTENT]: true,
        [PERMISSIONS.EDIT_DEPARTMENT]: false,
        [PERMISSIONS.POST_MESSAGES]: true,
        [PERMISSIONS.MANAGE_USERS]: false,
        [PERMISSIONS.MANAGE_SETTINGS]: false
    },
    [ROLES.DEPARTMENT_HEAD]: {
        [PERMISSIONS.VIEW_ALL]: true,
        [PERMISSIONS.VIEW_GROUP_GUIDE]: false,
        [PERMISSIONS.VIEW_FINANCIALS]: false,
        [PERMISSIONS.EDIT_CONTENT]: false,
        [PERMISSIONS.EDIT_DEPARTMENT]: true,
        [PERMISSIONS.POST_MESSAGES]: false,
        [PERMISSIONS.MANAGE_USERS]: false,
        [PERMISSIONS.MANAGE_SETTINGS]: false
    },
    [ROLES.STAFF]: {
        [PERMISSIONS.VIEW_ALL]: true,
        [PERMISSIONS.VIEW_GROUP_GUIDE]: false,
        [PERMISSIONS.VIEW_FINANCIALS]: false,
        [PERMISSIONS.EDIT_CONTENT]: false,
        [PERMISSIONS.EDIT_DEPARTMENT]: false,
        [PERMISSIONS.POST_MESSAGES]: false,
        [PERMISSIONS.MANAGE_USERS]: false,
        [PERMISSIONS.MANAGE_SETTINGS]: false
    }
};

// Pages that require specific permissions
const PROTECTED_PAGES = {
    'group-guide.html': PERMISSIONS.VIEW_GROUP_GUIDE,
    'financial-reports.html': PERMISSIONS.VIEW_FINANCIALS,
    'user-management.html': PERMISSIONS.MANAGE_USERS,
    'post-message.html': PERMISSIONS.POST_MESSAGES
};

// ========================================
// USER PROFILE MANAGEMENT
// ========================================

/**
 * Get user profile from Firestore
 */
async function getUserProfile(userId) {
    try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
            return userDoc.data();
        }
        return null;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return null;
    }
}

/**
 * Create user profile in Firestore
 */
async function createUserProfile(userId, profileData) {
    try {
        await setDoc(doc(db, 'users', userId), {
            ...profileData,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString()
        });
        return true;
    } catch (error) {
        console.error('Error creating user profile:', error);
        return false;
    }
}

/**
 * Update last login time
 */
async function updateLastLogin(userId) {
    try {
        const userRef = doc(db, 'users', userId);
        await setDoc(userRef, {
            lastLogin: new Date().toISOString()
        }, { merge: true });
    } catch (error) {
        console.error('Error updating last login:', error);
    }
}

// ========================================
// AUTHENTICATION FUNCTIONS
// ========================================

/**
 * Sign in user
 */
async function signIn(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        await updateLastLogin(userCredential.user.uid);
        return { success: true, user: userCredential.user };
    } catch (error) {
        console.error('Sign in error:', error);
        return { success: false, error: error.code };
    }
}

/**
 * Sign out user
 */
async function signOutUser() {
    try {
        await signOut(auth);
        sessionStorage.clear();
        return { success: true };
    } catch (error) {
        console.error('Sign out error:', error);
        return { success: false, error: error.code };
    }
}

/**
 * Create new user (admin only)
 */
async function createUser(email, password, profileData) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await createUserProfile(userCredential.user.uid, profileData);
        return { success: true, user: userCredential.user };
    } catch (error) {
        console.error('Create user error:', error);
        return { success: false, error: error.code };
    }
}

// ========================================
// PERMISSION CHECKING
// ========================================

/**
 * Check if user has specific permission
 */
function hasPermission(userProfile, permission) {
    if (!userProfile || !userProfile.role) return false;
    return ROLE_PERMISSIONS[userProfile.role]?.[permission] || false;
}

/**
 * Check if user can access current page
 */
function canAccessPage(userProfile, pageName) {
    // If page is not in protected pages list, allow access
    if (!PROTECTED_PAGES[pageName]) return true;
    
    // Check if user has required permission
    const requiredPermission = PROTECTED_PAGES[pageName];
    return hasPermission(userProfile, requiredPermission);
}

/**
 * Get user's role display info
 */
function getRoleInfo(role) {
    const roleInfo = {
        [ROLES.ADMIN]: {
            badge: '👑',
            color: '#C7A961',
            label: 'Administrator'
        },
        [ROLES.MANAGER]: {
            badge: '👔',
            color: '#0057A0',
            label: 'Manager'
        },
        [ROLES.DEPARTMENT_HEAD]: {
            badge: '📊',
            color: '#6B7280',
            label: 'Department Head'
        },
        [ROLES.STAFF]: {
            badge: '👤',
            color: '#9CA3AF',
            label: 'Staff'
        }
    };
    
    return roleInfo[role] || roleInfo[ROLES.STAFF];
}

// ========================================
// UI HELPER FUNCTIONS
// ========================================

/**
 * Show/hide elements based on permissions
 */
function applyPermissions(userProfile) {
    // Hide elements that require specific permissions
    document.querySelectorAll('[data-permission]').forEach(element => {
        const requiredPermission = element.getAttribute('data-permission');
        if (!hasPermission(userProfile, requiredPermission)) {
            element.style.display = 'none';
        }
    });
    
    // Hide navigation links to pages user can't access
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href && !canAccessPage(userProfile, href)) {
            link.style.display = 'none';
        }
    });
}

/**
 * Display user info in header
 */
function displayUserInfo(userProfile) {
    const userInfoElement = document.getElementById('userInfo');
    if (userInfoElement && userProfile) {
        const roleInfo = getRoleInfo(userProfile.role);
        userInfoElement.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px; font-size: 13px;">
                <div style="
                    background: ${roleInfo.color};
                    color: white;
                    padding: 4px 10px;
                    border-radius: 12px;
                    font-weight: 600;
                    font-size: 11px;
                ">
                    ${roleInfo.badge} ${roleInfo.label}
                </div>
                <div>
                    <strong>${userProfile.name}</strong><br>
                    <span style="opacity: 0.8;">${userProfile.department || userProfile.title}</span>
                </div>
            </div>
        `;
    }
}

/**
 * Add logout button functionality
 */
function setupLogoutButton() {
    const logoutBtn = document.getElementById('logoutButton');
    if (logoutBtn) {
        logoutBtn.style.display = 'block';
        logoutBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const result = await signOutUser();
            if (result.success) {
                window.location.href = 'login.html';
            }
        });
    }
}

/**
 * Show access denied page
 */
function showAccessDenied() {
    document.body.innerHTML = `
        <div style="
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #003057 0%, #0057A0 100%);
            font-family: 'Segoe UI', sans-serif;
            padding: 20px;
        ">
            <div style="
                background: white;
                padding: 50px;
                border-radius: 20px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                max-width: 500px;
                text-align: center;
            ">
                <div style="font-size: 64px; margin-bottom: 20px;">🔒</div>
                <h1 style="color: #003057; font-size: 28px; margin-bottom: 15px;">Access Denied</h1>
                <p style="color: #666; margin-bottom: 30px; line-height: 1.6;">
                    You don't have permission to access this content. This page requires higher-level access.
                </p>
                <div style="display: flex; gap: 15px; justify-content: center;">
                    <a href="index.html" style="
                        background: linear-gradient(135deg, #0057A0 0%, #003057 100%);
                        color: white;
                        padding: 12px 30px;
                        border-radius: 8px;
                        text-decoration: none;
                        font-weight: 600;
                    ">
                        Return to Portal
                    </a>
                    <a href="login.html" style="
                        background: #6B7280;
                        color: white;
                        padding: 12px 30px;
                        border-radius: 8px;
                        text-decoration: none;
                        font-weight: 600;
                    ">
                        Change Account
                    </a>
                </div>
            </div>
        </div>
    `;
}

// ========================================
// PAGE PROTECTION
// ========================================

/**
 * Protect current page - call this on pages that need authentication
 */
async function protectPage() {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, async (user) => {
            if (!user) {
                // Not logged in, redirect to login
                window.location.href = 'login.html';
                reject('Not authenticated');
                return;
            }
            
            // Get user profile
            const userProfile = await getUserProfile(user.uid);
            
            if (!userProfile) {
                // Profile not found, sign out and redirect
                await signOutUser();
                window.location.href = 'login.html';
                reject('Profile not found');
                return;
            }
            
            // Check if user can access this page
            const currentPage = window.location.pathname.split('/').pop();
            if (!canAccessPage(userProfile, currentPage)) {
                showAccessDenied();
                reject('Access denied');
                return;
            }
            
            // Apply permissions to page elements
            applyPermissions(userProfile);
            
            // Display user info
            displayUserInfo(userProfile);
            
            // Setup logout button
            setupLogoutButton();
            
            // Store user data in window for other scripts to use
            window.currentUser = {
                uid: user.uid,
                email: user.email,
                profile: userProfile
            };
            
            resolve(userProfile);
        });
    });
}

// ========================================
// EXPORTS
// ========================================

export {
    // Auth functions
    signIn,
    signOutUser,
    createUser,
    
    // Profile functions
    getUserProfile,
    createUserProfile,
    
    // Permission functions
    hasPermission,
    canAccessPage,
    PERMISSIONS,
    ROLES,
    
    // UI functions
    protectPage,
    applyPermissions,
    displayUserInfo,
    getRoleInfo,
    
    // Firebase instances
    auth,
    db
};
