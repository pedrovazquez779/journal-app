import {fireEvent, render, screen} from '@testing-library/react';
import {LoginPage} from '../../../src/auth/pages';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {authSlice} from '../../../src/store/auth';
import {MemoryRouter} from 'react-router-dom';
import {notAuthenticatedState} from '../../fixtures/authFixtures';

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmailPassword: ({email, password}) => {
        return () => mockStartLoginWithEmailPassword({email, password});
    },
}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    // useDispatch: () => (fn) => fn(),
    useDispatch: () => {
        return (fn) => fn();
    },
}));

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
});

describe('Testing <LoginPage/>', () => {

    beforeEach(() => jest.clearAllMocks());

    test('Should render component', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
    });

    test('google button should call startGoogleSignIn', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        );

        const googleBtn = screen.getByLabelText('google-btn');
        fireEvent.click(googleBtn);

        expect(mockStartGoogleSignIn).toHaveBeenCalled();
    });

    test('submit should call startLoginWithEmailPassword', () => {
        const email = 'testuser@gmail.com';
        const password = '123456';

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        );

        const emailField = screen.getByRole('textbox', {name: 'email'});
        fireEvent.change(emailField, {target: {name: 'email', value: email}});

        const passwordField = screen.getByTestId('password');
        fireEvent.change(passwordField, {target: {name: 'password', value: password}});

        const logirForm = screen.getByLabelText('submit-form');
        fireEvent.submit(logirForm);

        expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
            email: email,
            password: password
        });
    });
});