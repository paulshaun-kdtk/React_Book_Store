import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBookAsync } from '../redux/books/booksSlice';
import BookList from './BooksList';
import Header from './Header';
import './Main.css';

// end imports

const App = () => {
  const dispatch = useDispatch();
  const [selectedApp] = useState('0ICO70fIeXQxoTuacmSl'); // Replace 'abc123' with your actual app ID

  const [book, setBook] = useState({
    title: '',
    author: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  const handleAddBook = async () => {
    const newBook = {
      item_id: generateUUID(),
      title: 'New Book',
      author: 'New Author',
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
      <BookList app_id={selectedApp} />
    </div>
  );
};

export default App;
