import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATA_BASEURL,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};
export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
