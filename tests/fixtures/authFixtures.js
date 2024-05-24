export const initialState = {
    status: 'checking', // 'checking', 'not-authenticated', 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
};

export const authenticatedState = {
    status: 'authenticated', // 'checking', 'not-authenticated', 'authenticated'
    uid: 'ABC123',
    email: 'test@gmail.com',
    displayName: 'John Doe',
    photoURL: 'https://john.jpg',
    errorMessage: null,
};

export const notAuthenticatedState = {
    status: 'not-authenticated', // 'checking', 'not-authenticated', 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
};

export const testUser = {
    uid: 'ABC123',
    email: 'test@gmail.com',
    displayName: 'John Doe',
    photoURL: 'https://john.jpg',
}