import { createStore } from 'redux';

const initialState = {
  books: [],
};

function booksReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_BOOK':
      return { ...state, books: [...state.books, action.payload] };
    case 'REMOVE_BOOK':
      return { ...state, books: state.books.filter((_, index) => index !== action.payload.index) };
    case 'UPDATE_PROGRESS':
      return {
        ...state,
        books: state.books.map((book, i) => (i === action.payload.index
          ? { ...book, progress: Math.min(book.progress + 5, 100) }
          : book)),
      };
    default:
      return state;
  }
}

const store = createStore(booksReducer);

export default store;
