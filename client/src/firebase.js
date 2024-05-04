import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyCKrMfExwUdmGNofUbBOA-bXJbu7yBnzwk",
  authDomain: "video-4c797.firebaseapp.com",
  projectId: "video-4c797",
  storageBucket: "video-4c797.appspot.com",
  messagingSenderId: "450128105998",
  appId: "1:450128105998:web:b89498ac4b84e4a7cba25f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider()

export default app