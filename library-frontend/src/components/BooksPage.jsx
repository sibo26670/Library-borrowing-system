import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function BooksPage() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', category: '' });

  const fetchBooks = () => {
    axios.get('http://localhost:8080/api/books')
      .then(response => setBooks(response.data))
      .catch(error => console.error("Error fetching books:", error));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleInputChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const handleAddBook = (e) => {
    e.preventDefault();
    const bookData = { ...newBook, available: true };

    axios.post('http://localhost:8080/api/books', bookData)
      .then(() => {
        toast.success("Book added successfully!");
        setNewBook({ title: '', author: '', category: '' });
        fetchBooks();
      })
      .catch(() => toast.error("Failed to add book."));
  };

  return (
    <div>
      <h2>Manage Books</h2>
      
      <form onSubmit={handleAddBook} style={styles.form}>
        <h3 style={{ marginTop: 0 }}>Add New Book</h3>
        <input type="text" name="title" placeholder="Title" value={newBook.title} onChange={handleInputChange} required style={styles.input} />
        <input type="text" name="author" placeholder="Author" value={newBook.author} onChange={handleInputChange} required style={styles.input} />
        <input type="text" name="category" placeholder="Category" value={newBook.category} onChange={handleInputChange} required style={styles.input} />
        <button type="submit" style={styles.button}>Add Book</button>
      </form>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Title</th>
            <th style={styles.th}>Author</th>
            <th style={styles.th}>Category</th>
            <th style={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td style={styles.td}>{book.id}</td>
              <td style={styles.td}>{book.title}</td>
              <td style={styles.td}>{book.author}</td>
              <td style={styles.td}>{book.category}</td>
              <td style={styles.td}>
                <span style={{ color: book.available ? '#03dac6' : '#cf6679' }}>
                  {book.available ? "Available" : "Borrowed"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  form: { display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '350px', marginBottom: '30px', padding: '20px', border: '1px solid #333', backgroundColor: '#1e1e1e', borderRadius: '8px' },
  input: { padding: '10px', backgroundColor: '#2c2c2c', color: 'white', border: '1px solid #444', borderRadius: '4px' },
  button: { padding: '10px', backgroundColor: '#bb86fc', color: '#000', border: 'none', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px', marginTop: '5px' },
  table: { width: '100%', borderCollapse: 'collapse', backgroundColor: '#1e1e1e', borderRadius: '8px', overflow: 'hidden' },
  th: { borderBottom: '2px solid #333', padding: '12px', backgroundColor: '#2c2c2c', textAlign: 'left', color: '#e0e0e0' },
  td: { borderBottom: '1px solid #333', padding: '12px', color: '#e0e0e0' }
};

export default BooksPage;