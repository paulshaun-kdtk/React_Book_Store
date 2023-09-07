import React from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../redux/books/booksSlice';
import BookList from './BooksList';
import Header from './Header';

// end imports

const App = () => {
  const dispatch = useDispatch();

  const handleAddBook = () => {
    const newBook = {
      item_id: `item${Date.now()}`,
      title: 'New Book',
      author: 'Unknown Author',
      category: 'Fiction',
    };
    dispatch(addBook(newBook));
  };

  return (
    <div>
      <Header />
      <h1>My Bookstore</h1>
      <button type="button" onClick={handleAddBook}> Add Book</button>
      <BookList />
    </div>
  );
};

export default App;
