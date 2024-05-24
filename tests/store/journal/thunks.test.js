import {addEmptyNote, savingNewNote, setActiveNote, startNewNote} from '../../../src/store/journal';
import {collection, deleteDoc, getDocs} from '@firebase/firestore/lite';
import {FirebaseDB} from '../../../src/firebase/config';

describe('Testing journal thunks', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('Should create a new note', async () => {
        const uid = 'TEST-UID';
        getState.mockReturnValue({auth: {uid: uid}});

        await startNewNote()(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith(savingNewNote());
        expect(dispatch).toHaveBeenCalledWith(addEmptyNote({
            'body': '',
            'date': expect.any(Number),
            'id': expect.any(String),
            'title': '',
        }));
        expect(dispatch).toHaveBeenCalledWith(setActiveNote({
            'body': '',
            'date': expect.any(Number),
            'id': expect.any(String),
            'title': '',
        }));

        // Delete notes
        const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
        const docs = await getDocs(collectionRef);

        const deletePromises = [];
        docs.forEach(doc => deletePromises.push(deleteDoc(doc.ref)));

        await Promise.all(deletePromises);
    });
});