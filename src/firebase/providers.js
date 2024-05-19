import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile
} from 'firebase/auth';
import {FirebaseAuth} from './config';

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        const {displayName, email, photoURL, uid} = result.user;

        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        };
    } catch (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorCode,
            errorMessage
        };
    }
};

export const registerUserWithEmailPassword = async ({email, password, displayName}) => {

    try {

        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const {uid, photoURL} = resp.user;

        await updateProfile(FirebaseAuth.currentUser, {displayName});

        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        };

    } catch (error) {
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage
        };
    }

};

export const loginWithEmailPassword = async ({email, password}) => {

    try {

        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        // BE CAREFUL: I tried to destructure email and I got a weird error since it was colliding with the email coming as param
        const {displayName, photoURL, uid} = resp.user;

        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        };
    } catch (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorCode,
            errorMessage
        };
    }
};

export const logoutFirebabe = async () => {
    return await FirebaseAuth.signOut();
};