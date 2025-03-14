import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login with email and password
export const loginWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Get the user's ID token to fetch custom claims (org_id, user_id, role)
    const idTokenResult = await user.getIdTokenResult();
    const customClaims = idTokenResult.claims;
    
    return {
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        org_id: customClaims.org_id,
        user_id: customClaims.user_id,
        role: customClaims.role
      },
      token: await user.getIdToken()
    };
  } catch (error) {
    throw error;
  }
};

// Logout
export const logout = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    throw error;
  }
};

// Get current user
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (user) {
        user.getIdTokenResult().then((idTokenResult) => {
          const customClaims = idTokenResult.claims;
          resolve({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            org_id: customClaims.org_id,
            user_id: customClaims.user_id,
            role: customClaims.role
          });
        });
      } else {
        resolve(null);
      }
    }, reject);
  });
};

export default auth; 