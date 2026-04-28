import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import BooksPage from './components/BooksPage';
import BorrowPage from './components/BorrowPage';
import BorrowRecords from './components/BorrowRecords';

function App() {
  return (
    <Router>
      <div style={styles.container}>
        <nav style={styles.nav}>
          <h2 style={{ margin: 0, color: 'white' }}>Library System</h2>
          <div style={styles.links}>
            <NavLink to="/" end style={({ isActive }) => ({ ...styles.link, textDecoration: isActive ? 'underline' : 'none' })}>Books</NavLink>
            <NavLink to="/borrow" style={({ isActive }) => ({ ...styles.link, textDecoration: isActive ? 'underline' : 'none' })}>Borrow a Book</NavLink>
            <NavLink to="/records" style={({ isActive }) => ({ ...styles.link, textDecoration: isActive ? 'underline' : 'none' })}>Borrow Records</NavLink>
          </div>
        </nav>

        <div style={styles.content}>
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route path="/borrow" element={<BorrowPage />} />
            <Route path="/records" element={<BorrowRecords />} />
            {/* Catch-all for undefined routes */}
            <Route path="*" element={<h2>404 - Page Not Found</h2>} />
          </Routes>
        </div>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
}

const styles = {
  container: { fontFamily: 'sans-serif' },
  nav: {
    backgroundColor: '#333',
    padding: '15px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  links: { display: 'flex', gap: '15px' },
  link: { color: 'white', fontSize: '16px' },
  content: { padding: '20px' }
};

export default App;