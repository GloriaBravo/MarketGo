import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDS421b5Cqxtq8WyxbrNCZLxdHNcgmvHQI",
  authDomain: "lista-de-productos-58644.firebaseapp.com",
  projectId: "lista-de-productos-58644",
  storageBucket: "lista-de-productos-58644.appspot.com",
  messagingSenderId: "421139492537",
  appId: "1:421139492537:web:899c432d8e07e65b167568"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const githubProvider = new GithubAuthProvider();
githubProvider.setCustomParameters({ prompt: "select_account" });
