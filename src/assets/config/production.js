import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import 'firebase/auth';

const app = initializeApp({
  apiKey: "AIzaSyBFDBt0BIn9mW-MUDMln0UH6rHCQpn3yBI",
  authDomain: "andhrapradeshtta.firebaseapp.com",
  projectId: "andhrapradeshtta",
  storageBucket: "andhrapradeshtta.appspot.com",
  messagingSenderId: "913556140450",
  appId: "1:913556140450:web:864eb9a60492df6a1802fb",
});

// export const auth = app.auth();

const db = getFirestore(app);
const storage = getStorage(app);
export { db, storage };

export default app;
