import { configureStore, combineReducers } from '@reduxjs/toolkit';
import categoriesReducer from './categories/categoriesSlice';
import booksReducer from './books/booksSlice';

const rootReducer = combineReducers({
  categories: categoriesReducer,
  books: booksReducer,
});

const storeConfig = () => {
  const store = configureStore({
    reducer: rootReducer,
  });
  return store;
};

export default storeConfig;
