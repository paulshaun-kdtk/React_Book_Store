import { configureStore, combineReducers } from '@reduxjs/toolkit';
import categoriesReducer from './categories/categoriesSlice';
import booksReducer from './books/booksSlice';

// end immports

const rootReducer = combineReducers({
  categories: categoriesReducer,
  books: booksReducer,
});

const storeConfig = () => {
  const store = configureStore(rootReducer);
  return store;
};

export default storeConfig;
