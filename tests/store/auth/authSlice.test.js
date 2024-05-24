import {authSlice, checkingCredentials, login, logout} from '../../../src/store/auth';
import {authenticatedState, initialState, testUser} from '../../fixtures/authFixtures';

describe('Testing authSlice', () => {
    test('Should return initial state and name should be "auth"', () => {
        // Send an initial state and no action
        const state = authSlice.reducer(initialState, {});

        expect(state).toBe(initialState);
        expect(authSlice.name).toBe('auth');
    });

    test('Should authenticate user', () => {
        // console.log(login(testUser));

        // Send an initial state and login action creator.
        // Action creator returns an object with the info required for the reducer.
        const state = authSlice.reducer(initialState, login(testUser));

        expect(state).toEqual({
            status: 'authenticated',
            uid: testUser.uid,
            email: testUser.email,
            displayName: testUser.displayName,
            photoURL: testUser.photoURL,
            errorMessage: null,
        });
    });

    test('Should logout user without error message', () => {
        const state = authSlice.reducer(authenticatedState, logout());

        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined,
        });
    });

    test('Should logout user with error message', () => {
        const errorMessage = 'Incorrect credentials';
        const state = authSlice.reducer(authenticatedState, logout({
            errorMessage
        }));

        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage,
        });
    });

    test('Should change to checking state', () => {
        // Send an initial state and no action
        const state = authSlice.reducer(authenticatedState, checkingCredentials());
        expect(state.status).toBe('checking');
    });
});