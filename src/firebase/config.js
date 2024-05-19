// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDqJjIJUrYCx2a-2XWciuUaIEiFcmyroAc',
    authDomain: 'react-journal-app-4daac.firebaseapp.com',
    projectId: 'react-journal-app-4daac',
    storageBucket: 'react-journal-app-4daac.appspot.com',
    messagingSenderId: '953926460981',
    appId: '1:953926460981:web:4b8c7de06bd8aa3833737c'
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);

