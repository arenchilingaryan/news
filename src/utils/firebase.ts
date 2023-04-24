import firebase, { initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCk3snh4G1TTqY18SREOX3LweHoe01A4nA",
  authDomain: "news-app-1ca4a.firebaseapp.com",
  projectId: "news-app-1ca4a",
  storageBucket: "news-app-1ca4a.appspot.com",
  messagingSenderId: "137287378511",
  appId: "1:137287378511:web:f70bf976292d06cb95ec3a",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app) as Auth & { signInWithEmailAndPassword: (email: string, password: string) => void; };

export { db, auth };
