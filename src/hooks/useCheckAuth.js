import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {onAuthStateChanged} from '@firebase/auth';
import {FirebaseAuth} from '../firebase/config';
import {login, logout} from '../store/auth';

export const useCheckAuth = () => {

    const {status} = useSelector(state => state.auth);
    const dispatch = useDispatch(state => state.auth);

    useEffect(() => {
        onAuthStateChanged(FirebaseAuth, async (user) => {
            console.log("onAuthStateChanged");

            if (!user) return dispatch(logout());

            const {uid, email, displayName, photoURL} = user;
            dispatch(login({uid, email, displayName, photoURL}));
        });
    }, []);

    return {
        status
    };
};