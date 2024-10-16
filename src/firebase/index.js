import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyAW5cX3qPIhh60JwC-nWYmDvnmekd7FT5Q",
  authDomain: "m26-upload-file-daf8e.firebaseapp.com",
  projectId: "m26-upload-file-daf8e",
  storageBucket: "m26-upload-file-daf8e.appspot.com",
  messagingSenderId: "841999494012",
  appId: "1:841999494012:web:3efc82a7386e6ad63f52f9"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export {storage};