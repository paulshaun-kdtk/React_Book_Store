import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooksAsync, deleteBookAsync } from '../redux/books/booksSlice';

const BookList = ({ app_id }) => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  const status = useSelector((state) => state.books.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooksAsync(app_id));
    }
  }, [status, dispatch]);

  const handleDelete = (item_id) => {
    dispatch(deleteBookAsync({ app_id, item_id }));
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
      <div>
        <h3 style={{ color: '#0290FF' }}>
          title:
          {title}
        </h3>
        <p>
          author:
          {author}
        </p>
        <button type="button" onClick={() => handleDelete(book.item_id)}>Delete</button>
      </div>,
    );
  }
  return (
    <div>
      <h2>Book List</h2>
      <div>
        {' '}
        {bookElements}
        {' '}
      </div>
    </div>
  );
};

export default BookList;
