import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBookAsync } from '../redux/books/booksSlice';
import BookList from './BooksList';
import Header from './Header';
import './Main.css';
import './Book.css';
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
      <BookList app_id={selectedApp} />
      <hr className="Divider" />
      <h1>ADD NEW BOOK</h1>
      <span className="additionForm">
        <input
          type="text"
          name="title"
          value={book.title}
          onChange={handleChange}
          placeholder="title"
          className="firstInput"
        />

        <input
          type="text"
          name="author"
          value={book.author}
          onChange={handleChange}
          placeholder="author"

        />
        <button type="button" onClick={handleAddBook}>Add Book</button>
      </span>
    </div>
  );
};

export default App;
