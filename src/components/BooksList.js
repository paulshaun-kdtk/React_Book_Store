import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooksAsync } from '../redux/books/booksSlice';


// end imports
let app_id = '0ICO70fIeXQxoTuacmSl';


const BookList = () => {
  const dispatch = useDispatch();
  const { books, status } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooksAsync(app_id));
  }, []);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: Unable to fetch books.</div>;
  }

  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={books.id}>
            <h3>{books.title}</h3>
            <p>{books.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
