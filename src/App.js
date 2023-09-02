import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Books from './components/Books';
import Components from './components/Components';

// end imports

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/components" element={<Components />} />
      </Routes>
    </Router>
  );
}

export default App;
