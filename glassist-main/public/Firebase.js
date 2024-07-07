import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyD-0RAh_0ypOm9gV1Gq_eKsin00ZsEvXFQ",
  authDomain: "temobstatik.firebaseapp.com",
  databaseURL: "https://temobstatik-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "temobstatik",
  storageBucket: "temobstatik.appspot.com",
  messagingSenderId: "510245449524",
  appId: "1:510245449524:web:cdd4c348dbbe9b6515bf61",
  measurementId: "G-T3PDXB2SM8"
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
export { database };
const realtimedb = getDatabase(app);
export { realtimedb };
const storage = getStorage(app)
export { storage }
export const auth = getAuth(app);
