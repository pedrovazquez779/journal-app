import {checkingCredentials, login, logout} from './';
import {
    loginWithEmailPassword,
    logoutFirebabe,
    registerUserWithEmailPassword,
    singInWithGoogle
} from '../../firebase/providers';
import {clearNotesLogout} from '../journal';

export const checkingAuthentication = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
    };
};

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const result = await singInWithGoogle();
        if (!result.ok) return dispatch(logout(result));

        dispatch(login(result));
    };
};

export const startCreatingUserWithEmailPassword = ({email, password, displayName}) => {
    return async (dispatch) => {

        dispatch(checkingCredentials());

        const {ok, uid, photoURL, errorMessage} = await registerUserWithEmailPassword({email, password, displayName});

        if (!ok) return dispatch(logout({errorMessage}));

        dispatch(login({uid, email, displayName, photoURL}));
    };
};

export const startLoginWithEmailPassword = ({email, password}) => {
    return async (dispatch) => {

        dispatch(checkingCredentials());

        const {ok, uid, photoURL, displayName, errorMessage} = await loginWithEmailPassword({email, password});

        if (!ok) return dispatch(logout({errorMessage}));

        dispatch(login({uid, email, displayName, photoURL}));
    };
};

export const startLogout = () => {
    return async (dispatch) => {

        await logoutFirebabe();
        dispatch(logout());
        dispatch(clearNotesLogout());
    };
};
