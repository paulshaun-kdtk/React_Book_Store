import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  books: [],
  status: 'idle',
  error: null,
};

export const addBookAsync = createAsyncThunk(
  'books/addBookAsync',
  async ({ appID, newBook }) => {
    const response = await axios.post(`https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/${appID}/books`, newBook);
    return response.data;
  },
);

export const fetchBooksAsync = createAsyncThunk(
  'books/fetchBooksAsync',
  async (appID) => {
    const response = await axios.get(`https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/${appID}/books`);
    const booksWithItemIds = Object.keys(response.data).map((itemId) => ({
      itemId,
      title: response.data[itemId][0].title,
      author: response.data[itemId][0].author,
    }));
    return booksWithItemIds;
  },
);

export const deleteBookAsync = createAsyncThunk(
  'books/deleteBookAsync',
  async ({ appID, itemId }) => {
    try {
      const response = await axios.delete(
        `https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/${appID}/books/${itemId}`,
      );

      if (response.status === 204 || response.status === 201) {
        return itemId;
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
  reducers: {
    addBook: (state, action) => {
      state.status = 'succeeded';
      state.books.push(action.payload);
    },
  },
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
          itemId: book.itemId,
          title: book.title,
          author: book.author,
        }));
      })
      .addCase(deleteBookAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteBookAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.books = state.books.filter((book) => book.itemId !== action.payload);
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
