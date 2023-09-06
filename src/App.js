import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './components/Home';
import Books from './components/Books';
import Components from './components/Components';
import store from './components/redux/store';
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
