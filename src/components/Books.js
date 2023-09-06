import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import Header from './Header';
import 'react-circular-progressbar/dist/styles.css';
import './Book.css';
import './Main.css';

function Book({
  title, author, progress, category, onProgressUpdate, onRemoveBook,
}) {
  return (
    <div className="bookCard">

      <div className="bookInfo">
        <div className="book">
          <div className="bookDetails">
            <span>
              {' '}
              {category}
              {' '}
              <br />
              <b>
                {' '}
                {title}
              </b>
              <br />
              <p>
                {' '}
                {author}
                {' '}
              </p>
            </span>

            <ul className="list">
              <li onClick={onRemoveBook} className="firstListItem">remove</li>
              <li>edit</li>
              <li>delete</li>
            </ul>
          </div>
        </div>

        <div className="progressDiv">
          <CircularProgressbar
            className="progress"
            value={progress}
            text={`${progress}%`}
            styles={buildStyles({
              textSize: '16px',
              pathColor: `rgba(62, 152, 199, ${progress / 100})`,
              textColor: '#f88',
              trailColor: '#d6d6d6',
            })}
          />
        </div>
        <div className="onPBtn" style={{ display: 'flex', flexDirection: 'column', paddingInlineEnd: '20%' }}>
          <i>Current Chapter</i>
          <button type="button" onClick={onProgressUpdate}>Update Progress</button>
        </div>
      </div>
    </div>
  );
}

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log('Error saving to local storage');
    }
  };

  return [storedValue, setValue];
}

function AdditionForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [books, setBooks] = useLocalStorage('books', []);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    const newBook = {
      title, author, category, progress: 0,
    };
    dispatch({
      type: 'ADD_BOOK',
      payload: newBook,
    });
    setBooks([...books, newBook]);
    setTitle('');
    setAuthor('');
    setCategory('');
  };

  const onUpdateProgressBarClick = (index) => {
    dispatch({
      type: 'UPDATE_PROGRESS',
      payload: { index },
    });
    const updatedBooks = [...books];
    updatedBooks[index].progress += 1;
    setBooks(updatedBooks);
  };

  const onRemoveBookClick = (index) => {
    dispatch({
      type: 'REMOVE_BOOK',
      payload: { index },
    });
    const updatedBooks = [...books];
    updatedBooks.splice(index, 1);
    setBooks(updatedBooks);
  };

  return (
    <div className="Container">
      <Header />
      <div id="dynamicDisplay">
        {books.map((book, index) => (
          <Book
            key={index}
            title={book.title}
            author={book.author}
            progress={book.progress}
            category={book.category}
            onProgressUpdate={() => onUpdateProgressBarClick(index)}
            onRemoveBook={() => onRemoveBookClick(index)}
          />
        ))}
      </div>

      <div className="additionForm">
        <h1> Add Book </h1>
        <form onSubmit={onSubmit}>
          <input
            className="formInputTitle"
            type="text"
            placeholder="book title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <button type="submit" className="formButton">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdditionForm;
