import React from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../redux/books/booksSlice';

const AddBookButton = () => {
  const dispatch = useDispatch();

  const handleAddBook = () => {
    const newBook = {
      item_id: 'item4',
      title: 'New Book',
      author: 'New Author',
      category: 'Fiction',
    };
    dispatch(addBook(newBook));
  };

  return (
    <button type="button" onClick={handleAddBook}>Add Book</button>
  );
};

export default AddBookButton;
