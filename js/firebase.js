import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import  { getAuth  , GoogleAuthProvider} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";


 const firebaseConfig = {
   apiKey: "AIzaSyA74fayROb9BRJr-88JXB3ThUXxHHvxIPg",
   authDomain: "first-firebase-project-3ab72.firebaseapp.com",
   projectId: "first-firebase-project-3ab72",
   storageBucket: "first-firebase-project-3ab72.firebasestorage.app",
   messagingSenderId: "87733205782",
   appId: "1:87733205782:web:6351961811e1b82d1dae37",
   measurementId: "G-FLDJ2JCDNP"
 };

 // Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const Auth = getAuth(app);
 export const db = getFirestore(app);