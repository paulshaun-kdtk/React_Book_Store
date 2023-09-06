import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [],
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
    removeBook: (state, action) => {
      state.books = state.books.filter((_, index) => index !== action.payload.index);
    },
    updateProgress: (state, action) => {
      const { index } = action.payload;
      const book = state.books[index];
      if (book) {
        book.progress = Math.min(book.progress + 5, 100);
      }
    },
  },
});

export const { addBook, removeBook, updateProgress } = booksSlice.actions;
export default booksSlice.reducer;
