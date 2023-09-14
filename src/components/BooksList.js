import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgressbar } from 'react-circular-progressbar';
import { fetchBooksAsync, deleteBookAsync } from '../redux/books/booksSlice';
import 'react-circular-progressbar/dist/styles.css';

// end imports

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
    return (
      <div>
        loading ...  ...
      </div>
    );
  }

  if (status === 'failed') {
    return <div>Error: Unable to fetch books.</div>;
  }
  const percentage = 64;
  const bookElements = [];

  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const { title } = book;
    const { author } = book;

    bookElements.push(
      <div style={{
        display: 'flex', justifyContent: 'space-between', border: '1px solid #e8e8e8', padding: '10px', margin: '2% 5% 0 0', background: '#ffffff',
      }}
      >
        <div>
          <ul style={{ listStyle: 'none' }}>
            <li>
              {' '}
              <i>Fiction </i>
            </li>
            <li style={{ fontSize: '1.375rem', fontWeight: 'bold' }}>
              {title}
            </li>
            <li style={{ color: '#0290FF' }}>
              {author}
            </li>
          </ul>

          <ul style={{ listStyle: 'none', display: 'flex' }}>
            <li style={{ marginRight: '2%' }}>Comments</li>
            <li
              onClick={() => handleDelete(book.item_id)}
              style={{
                paddingInlineStart: '2%', borderLeft: '2px solid #e8e8e8', marginRight: '2%', cursor: 'pointer',
              }}
            >
              Remove
            </li>
            <li style={{ borderLeft: '2px solid #e8e8e8', paddingInlineStart: '2%' }}>Edit</li>
          </ul>

        </div>

        <div style={{
          width: '60%', display: 'flex', paddingInlineEnd: '10%', justifyContent: 'space-evenly',
        }}
        >

          <div style={{ width: '25%', display: 'flex', justifyContent: 'space-evenly' }}>
            <CircularProgressbar value={percentage} />
            {' '}
            <b style={{ margin: 'auto', padding: '8%' }}>
              {`${percentage}%`}
              {' '}
              <br />
              {' '}
              Completed
            </b>
          </div>

          <ul style={{ paddingInline: '5%', borderLeft: '1.4px solid #e8e8e8', listStyle: 'none' }}>
            <li style={{ padding: '10px', fontSize: '0.813', fontWeight: '300' }}>Current Chapter</li>
            <li style={{ padding: '10px', fontSize: '1rem', fontWeight: '600' }}>Chapter 7</li>
            <li style={{ padding: '10px' }}>
              <button
                type="button"
                style={{
                  backgroundColor: '#0290FF', padding: '10px', color: '#fff', border: 'none', cursor: 'pointer',
                }}
              >
                Update Chaper
              </button>
            </li>
          </ul>
        </div>

      </div>,

    );
  }
  return (
    <div>
      <div>
        {' '}
        {bookElements}
        {' '}
      </div>
    </div>
  );
};

export default BookList;
