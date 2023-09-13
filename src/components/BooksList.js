import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooksAsync, deleteBookAsync } from '../redux/books/booksSlice';

const appID = 'bMrmeF1Ldn440EWBDcT5';

const BookList = () => {
  const dispatch = useDispatch();
  // const books = useSelector((state) => Object.values(state.books.books));
  const books = useSelector((state) => state.books.books);
  const status = useSelector((state) => state.books.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooksAsync(appID));
    }
  }, [status, dispatch]);

  const handleDelete = (itemId) => {
    dispatch(deleteBookAsync({ appID, itemId }));
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: Unable to fetch books.</div>;
  }

  const bookElements = [];

  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const { title } = book;
    const { author } = book;

    bookElements.push(
      <div key={book.itemId}>
        <h3 style={{ color: '#0290FF' }}>
          title:
          {title}
        </h3>
        <p>
          author:
          {author}
        </p>
        <button type="button" onClick={() => handleDelete(book.itemId)}>Delete</button>
      </div>,
    );
  }
  return (
    <div>
      <h2>Book List</h2>
      {bookElements}
    </div>
  );
};

export default BookList;
