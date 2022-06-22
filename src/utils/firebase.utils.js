import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs, } from "firebase/firestore";

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

export const addCollectionAndDocuments = async (collectionKey, documents) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    documents.forEach(document => {
        const documentRef = doc(collectionRef, document.title.toLowerCase());
        batch.set(documentRef, document);
    });

    await batch.commit();
}

export const createUserDocumentFromAuth = async (userAuth, additionalFields = {}) => {
    if (!userAuth) return;

    const userDocRef = doc(db, "users", userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalFields
            });
        } catch (e) {
            console.log("Error creating user:", e);
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) {
        return;
    }

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) {
        return;
    }

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => {
    await signOut(auth);
}

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const collectionQuery = query(collectionRef);
    const collectionSnapshot = await getDocs(collectionQuery);
    const categoryDocs = collectionSnapshot.docs.reduce((map, document) => {
        const { title, items } = document.data();
        map[title.toLowerCase()] = items;

        return map;
    }, {});

    return categoryDocs;
}