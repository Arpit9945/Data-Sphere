
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDdxv3roP_7WzW8CmsnDe-dBIkbL1wNp4E",
  authDomain: "data-sphere-d414f.firebaseapp.com",
  projectId: "data-sphere-d414f",
  storageBucket: "data-sphere-d414f.appspot.com",
  messagingSenderId: "523173259430",
  appId: "1:523173259430:web:6b956c1741f38d6414ac67",
  measurementId: "G-GL069ZD578"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
