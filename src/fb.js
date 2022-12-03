import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCRDnIRRbsSoFLkIKJjsGxzho67h50zOXk",
  authDomain: "sbr-test-78d68.firebaseapp.com",
  projectId: "sbr-test-78d68",
  storageBucket: "sbr-test-78d68.appspot.com",
  messagingSenderId: "167706816430",
  appId: "1:167706816430:web:f8e5ab783cc1994e5d223f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export default app;
