import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBookAsync } from '../redux/books/booksSlice';
import BookList from './BooksList';
import Header from './Header';
import './Main.css';

// end imports

const App = () => {
  const dispatch = useDispatch();
  const [selectedApp] = useState('bMrmeF1Ldn440EWBDcT5');

  const [book, setBook] = useState({
    title: '',
    author: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0; const
        v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  const handleAddBook = async () => {
    const newBook = {
      item_id: generateUUID(),
      title: book.title,
      author: book.author,
      category: 'Fiction',
    };

    try {
      await dispatch(addBookAsync({ app_id: selectedApp, newBook }));
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div className="Container">
      <Header />
      <h1>My Bookstore</h1>
      <BookList app_id={selectedApp} />
      <h1>Add Book</h1>
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
    </div>
  );
};

export default App;
