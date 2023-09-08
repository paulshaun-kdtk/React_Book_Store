import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../redux/books/booksSlice';
import BookList from './BooksList';
import Header from './Header';
import './Main.css';

// end imports

const App = () => {
  const dispatch = useDispatch();

  const [book, setBook] = useState({
    title: '',
    author: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleAddBook = () => {
    const newBook = {
      item_id: `item${Date.now()}`,
      title: book.title,
      author: book.author,
      category: 'Fiction',
    };
    dispatch(addBook(newBook));
    setBook({ title: '', author: '' });
  };

  return (
    <div className="Container">
      <Header />
      <h1>My Bookstore</h1>
      <span>
        Title:
        <input
          type="text"
          name="title"
          value={book.title}
          onChange={handleChange}
        />
      </span>
      <span>
        Author:
        <input
          type="text"
          name="author"
          value={book.author}
          onChange={handleChange}
        />
      </span>
      <button type="button" onClick={handleAddBook}>Add Book</button>
      <BookList />
    </div>
  );
};

export default App;
