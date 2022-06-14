import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAhgFUI9BVV_lshBcZINfz9OBHm7X9M8aU",
    authDomain: "crown-clothing-db-786a2.firebaseapp.com",
    projectId: "crown-clothing-db-786a2",
    storageBucket: "crown-clothing-db-786a2.appspot.com",
    messagingSenderId: "939968350673",
    appId: "1:939968350673:web:6c2ac6304685ab2959f8f0"
};

initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, "users", userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (e) {
            console.log("Error creating user:", e);
        }
    }

    return userDocRef;
}