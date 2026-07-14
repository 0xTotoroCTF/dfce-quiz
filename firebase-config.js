// Firebase config for the shared, cross-device leaderboard.
//
// 1. Go to https://console.firebase.google.com -> Add project (free "Spark" plan is enough).
// 2. In the project, go to Build > Firestore Database > Create database (start in "production mode").
// 3. Go to Project settings (gear icon) > General > "Your apps" > Add app > Web (</>).
// 4. Copy the firebaseConfig object it gives you and paste the values below.
// 5. In Firestore > Rules, paste the contents of firestore.rules from this folder, then Publish.
//
// If you leave this as-is (apiKey still "YOUR_API_KEY"), the quiz automatically falls back to a
// local-only leaderboard (localStorage) so it still works for local testing without Firebase.

const firebaseConfig = {
  apiKey: "AIzaSyC2YFpieBlmBFXKEycRVu6SChgfXI1HNlQ",
  authDomain: "dfce2026.firebaseapp.com",
  projectId: "dfce2026",
  storageBucket: "dfce2026.firebasestorage.app",
  messagingSenderId: "151193790062",
  appId: "1:151193790062:web:9c8045d38a03ef3dbf287f",
};

window.QUIZ_DB = null;
try {
  const isConfigured =
    typeof firebase !== "undefined" &&
    firebaseConfig.apiKey &&
    firebaseConfig.apiKey !== "YOUR_API_KEY";

  if (isConfigured) {
    firebase.initializeApp(firebaseConfig);
    window.QUIZ_DB = firebase.firestore();
  } else {
    console.info("[DFCE Quiz] Firebase not configured — using local-only leaderboard. See firebase-config.js.");
  }
} catch (err) {
  console.warn("[DFCE Quiz] Firebase init failed — falling back to local-only leaderboard.", err);
  window.QUIZ_DB = null;
}
