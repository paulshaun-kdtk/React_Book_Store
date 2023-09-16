import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgressbar } from 'react-circular-progressbar';
import { fetchBooksAsync, deleteBookAsync } from '../redux/books/booksSlice';
import 'react-circular-progressbar/dist/styles.css';
import './Book.css';
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
      <div className="listContainer">
        <div>
          <ul>
            <li>
              {' '}
              <i>Fiction </i>
            </li>
            <li className="li1">
              {title}
            </li>
            <li className="li2">
              {author}
            </li>
          </ul>

          <ul className="Actions">
            <li className="li3">Comments</li>
            <li
              className="li4"
              onClick={() => handleDelete(book.item_id)}
            >
              Remove
            </li>
            <li className="li5">Edit</li>
          </ul>

        </div>

        <div className="rContainer1">

          <div className="rContainer2">
            <CircularProgressbar value={percentage} />
            {' '}
            <b className="pText">
              {`${percentage}%`}
              {' '}
              <br />
              {' '}
              Completed
            </b>
          </div>

          <ul className="chapterSection">
            <li className="cSecli1">Current Chapter</li>
            <li className="cSecli2">Chapter 7</li>
            <li>
              <button
                className="cSecbtn"
                type="button"
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
