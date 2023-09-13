import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  books: [],
  status: 'idle',
  error: null,
};

export const fetchBooksAsync = createAsyncThunk(
  'books/fetchBooksAsync',
  async (app_id) => {
    const response = await axios.get(`https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/${app_id}/books`);
    const booksWithitem_ids = Object.keys(response.data).map((item_id) => ({
      item_id,
      title: response.data[item_id][0].title,
      author: response.data[item_id][0].author,
    }));
    return booksWithitem_ids;
  },
);

export const addBookAsync = createAsyncThunk(
  'books/addBookAsync',
  async ({ app_id, newBook }, { dispatch }) => {
    const response = await axios.post(`https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/${app_id}/books`, newBook);
    dispatch(fetchBooksAsync(app_id)); // fetch the updated list of books after adding a new book
    return response.data;
  },
);

export const deleteBookAsync = createAsyncThunk(
  'books/deleteBookAsync',
  async ({ app_id, item_id }) => {
    try {
      const response = await axios.delete(
        `https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/${app_id}/books/${item_id}`,
      );

      if (response.status === 204 || response.status === 201) {
        return item_id;
      }
      throw new Error(`Deletion failed with status code: ${response.status}`);
    } catch (error) {
      throw new Error(`Deletion failed: ${error.message}`);
    }
  },
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBookAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addBookAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.books.push(action.payload);
      })
      .addCase(addBookAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'something went wrong, please try again later';
        console.error('Error adding book:', action.error);
      })
      .addCase(fetchBooksAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.books = action.payload.map((book) => ({
          item_id: book.item_id,
          title: book.title,
          author: book.author,
        }));
      })
      .addCase(deleteBookAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteBookAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.books = state.books.filter((book) => book.item_id !== action.payload);
      })
      .addCase(deleteBookAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = `Deletion failed: ${action.error.message}`;
        console.error('Error deleting book:', action.error);
      });
  },
});

export const { addBook } = booksSlice.actions;
export default booksSlice.reducer;
