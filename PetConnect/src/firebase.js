import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBGRMct6d7dRJBtUjJ3pEPRPNW68kDqBcA",
  authDomain: "project16-1479a.firebaseapp.com",
  projectId: "project16-1479a",
  storageBucket: "project16-1479a.firebasestorage.app",
  messagingSenderId: "648982252331",
  appId: "1:648982252331:web:9bbc2dc18412d6c8c1536e",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, ref, uploadBytesResumable, getDownloadURL };