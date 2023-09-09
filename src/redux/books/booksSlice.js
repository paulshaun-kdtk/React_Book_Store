import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// end imports

const initialState = {
  books: [],
  status: 'idle',
  error: null
};


export const addBookAsync = createAsyncThunk(
  'books/addBookAsync',
  async ({ app_id, newBook }) => {
    const response = await axios.post(`https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/${app_id}/books`, newBook);
    return response.data; 
  }
);

export const fetchBooksAsync = createAsyncThunk(
  'books/fetchBooksAsync',
  async (app_id) => {
    const response = await axios.get(`https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/${app_id}/books`);
    return response.data;
  }
);


const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    updateProgress: (state, action) => {
      const { index } = action.payload;
      const book = state.books[index];
      if (book) {
        book.progress = Math.min(book.progress + 5, 100);
      }
    },
  }, extraReducers: (builder) => {
    builder
      .addCase(addBookAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addBookAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.books.push(action.payload); // Add the new book to the state
      })
      .addCase(addBookAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'something went wrong, please try again later';
        console.error('Error adding book:', action.error); 
      })
      .addCase(fetchBooksAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (Array.isArray(action.payload)) {
          state.books = action.payload;
        }
      });
  },  
});

export const { addBook, removeBook, updateProgress } = booksSlice.actions;
export default booksSlice.reducer;
