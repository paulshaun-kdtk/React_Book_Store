import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Home from './components/Home';
import Components from './redux/categories/Components';
import Books from './redux/books/Books';

// end imports

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/categories" element={<Components />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
