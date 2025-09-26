import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDgrAHLswZ6PKugQ6MOVdCazQN0E2R68D0",
  authDomain: "d-react-d933c.firebaseapp.com",
  projectId: "d-react-d933c",
  storageBucket: "d-react-d933c.firebasestorage.app",
  messagingSenderId: "60438636587",
  appId: "1:60438636587:web:50c052058cafa2777a626e",
  measurementId: "G-YRS867J0GN"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);