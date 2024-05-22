import {createSlice} from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
        // active: {
        //     id: 'ABC123',
        //     title: '',
        //     body: '',
        //     date: 1234567,
        //     imageURLs: []
        // },
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addEmptyNote: (state, action) => {
            // This mutation can only be done because we are working with redux
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
            state.messageSaved = '';
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updateNote: (state, {payload}) => { // payload is a note
            state.isSaving = false;
            state.notes = state.notes.map(note => {
                return note.id === payload.id ? payload : note;
            });

            state.messageSaved = `${payload.title}, successfully updated`;
        },
        deleteNoteById: (state, {payload}) => {
            state.active = null;
            state.notes = state.notes.filter((note) => {
                return note.id !== payload
            });
        },
        setPhotosToActiveNote: (state, {payload}) => {
            state.active.imageUrls = [...state.active.imageUrls, ...payload];
            state.isSaving = false;
        },
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    savingNewNote,
    addEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById,
    setPhotosToActiveNote,
    clearNotesLogout
} = journalSlice.actions;