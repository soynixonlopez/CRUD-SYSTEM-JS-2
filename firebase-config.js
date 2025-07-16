
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";
  import {getFirestore} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAx9KAaJGmWSzjnLZ8SXmBHWAMbGeASTj0",
    authDomain: "project-it-7713e.firebaseapp.com",
    projectId: "project-it-7713e",
    storageBucket: "project-it-7713e.firebasestorage.app",
    messagingSenderId: "347539249965",
    appId: "1:347539249965:web:ed9fbbe6d4d9c514c891a4",
    measurementId: "G-46CC4SRTXN"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);

  export {db, analytics, app};