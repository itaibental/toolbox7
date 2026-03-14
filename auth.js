import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, collection, doc, getDoc, setDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCuo4N-w-5JFu2pLwmNmPrnuB56q0-9Ikc",
    authDomain: "pedagogical-tools.firebaseapp.com",
    projectId: "pedagogical-tools",
    storageBucket: "pedagogical-tools.firebasestorage.app",
    messagingSenderId: "439078826304",
    appId: "1:439078826304:web:182cbafb97abab137a4aa5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = "pedagogical-tools";

let dbUsers = [];
let currentLoggedInUserId = null;

const submitBtn = document.getElementById('submitBtn');
const loginView = document.getElementById('login-view');
const welcomeOverlay = document.getElementById('welcomeOverlay');
const welcomeName = document.getElementById('welcomeName');
const dashboardView = document.getElementById('dashboard-view');

async function loadAndCacheUsers() {
    submitBtn.disabled = true;
    submitBtn.innerText = 'טוען נתונים...';
    try {
        const usersRef = collection(db, 'artifacts', appId, 'public', 'data', 'users');
        const usersSnapshot = await getDocs(usersRef);
        dbUsers = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        submitBtn.disabled = false;
        submitBtn.innerText = 'כניסה למערכת';
    } catch (e) { console.error("Load failed", e); }
}

signInAnonymously(auth).then(loadAndCacheUsers);

window.saveUserPreferences = async function(choices) {
    if (!currentLoggedInUserId) return;
    try {
        const userDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'users', currentLoggedInUserId);
        await setDoc(userDocRef, { myChoices: choices }, { merge: true });
    } catch (e) { console.error("Save failed", e); }
};

async function doLogin(fName, lName, userId) {
    currentLoggedInUserId = userId;
    welcomeName.innerText = `שלום ${fName}`;
    welcomeOverlay.style.display = 'flex';

    try {
        const userDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'users', userId);
        const userDoc = await getDoc(userDocRef);
        window.userChoices = (userDoc.exists() && userDoc.data().myChoices) ? userDoc.data().myChoices : [];
    } catch (e) { window.userChoices = []; }

    setTimeout(() => {
        welcomeOverlay.style.display = 'none';
        loginView.style.display = 'none';
        dashboardView.style.display = 'block';
        if (window.initDashboard) window.initDashboard();
    }, 1500);
}

submitBtn.addEventListener('click', () => {
    const id = document.getElementById('idInput').value.trim();
    const user = dbUsers.find(u => u.id === id);
    if (user) doLogin(user.firstName, user.lastName, user.id);
    else document.getElementById('errorMessage').style.display = 'block';
});
