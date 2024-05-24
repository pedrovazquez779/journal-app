import {
    checkingAuthentication,
    checkingCredentials,
    login,
    logout,
    startGoogleSignIn,
    startLoginWithEmailPassword, startLogout
} from '../../../src/store/auth/';
import {testUser} from '../../fixtures/authFixtures';
import {loginWithEmailPassword, logoutFirebabe, singInWithGoogle} from '../../../src/firebase/providers';
import {clearNotesLogout} from '../../../src/store/journal';

jest.mock('../../../src/firebase/providers');

describe('Testing auth thunks', () => {
    const dispatch = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('Should call checkingAuthentication', async () => {
        await checkingAuthentication()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());

        // expect(dispatch).toHaveBeenCalledWith({
        //     'type': 'auth/checkingCredentials',
        //     'payload': undefined
        // });
    });

    test('startGoogleSignIn should call login on success', async () => {
        const loginData = {ok: true, ...testUser};

        await singInWithGoogle.mockResolvedValue(loginData);
        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));
    });

    test('startGoogleSignIn should call logout on failure', async () => {
        const loginData = {ok: false, errorMessage: 'something went wrong'};

        await singInWithGoogle.mockResolvedValue(loginData);
        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loginData));
    });

    test('startLoginWithEmailPassword should call login on success', async () => {
        const loginData = {ok: true, ...testUser};
        const formData = {email: testUser.email, password: '1234'};

        await loginWithEmailPassword.mockResolvedValue(loginData);
        await startLoginWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(testUser));
    });

    test('startLogout should call logout and clearNotes', async () => {
        await startLogout()(dispatch);

        expect(logoutFirebabe).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(logout());
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
    });
});