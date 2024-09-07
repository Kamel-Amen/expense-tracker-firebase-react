import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB3J_Fm5RjNcB2nd_4fAZS08VzVAyw4tdY',
  authDomain: 'expenses-tracker-4a54b.firebaseapp.com',
  projectId: 'expenses-tracker-4a54b',
  storageBucket: 'expenses-tracker-4a54b.appspot.com',
  messagingSenderId: '218299495034',
  appId: '1:218299495034:web:0a87667ec1135c851581c3',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

// firebase login
// firebase init
// firebase deploy
