import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function BorrowPage() {
  const [books, setBooks] = useState([]);
  const [borrowData, setBorrowData] = useState({ memberName: '', memberId: '', bookId: '', borrowDate: '', returnDate: '' });

  useEffect(() => {
    axios.get('http://localhost:8080/api/books')
      .then(response => {
        setBooks(response.data.filter(book => book.available === true));
      })
      .catch(error => console.error("Error fetching books:", error));
  }, []);

  const handleInputChange = (e) => {
    setBorrowData({ ...borrowData, [e.target.name]: e.target.value });
  };

  const handleBorrow = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:8080/api/borrows', borrowData)
      .then(() => {
        toast.success("Book borrowed successfully!");
        setBorrowData({ memberName: '', memberId: '', bookId: '', borrowDate: '', returnDate: '' });
        setBooks(books.filter(b => b.id.toString() !== borrowData.bookId.toString()));
      })
      .catch(() => toast.error("Error borrowing book."));
  };

  return (
    <div>
      <h2>Borrow a Book</h2>
      
      <form onSubmit={handleBorrow} style={styles.form}>
        <input type="text" name="memberName" placeholder="Member Name" value={borrowData.memberName} onChange={handleInputChange} required style={styles.input} />
        <input type="text" name="memberId" placeholder="Member ID" value={borrowData.memberId} onChange={handleInputChange} required style={styles.input} />
        
        <select name="bookId" value={borrowData.bookId} onChange={handleInputChange} required style={styles.input}>
          <option value="">-- Select an Available Book --</option>
          {books.map(book => (
            <option key={book.id} value={book.id}>{book.title} by {book.author}</option>
          ))}
        </select>

        <label style={styles.label}>Borrow Date:</label>
        <input type="date" name="borrowDate" value={borrowData.borrowDate} onChange={handleInputChange} required style={styles.input} />
        
        <label style={styles.label}>Return Date:</label>
        <input type="date" name="returnDate" value={borrowData.returnDate} onChange={handleInputChange} required style={styles.input} />

        <button type="submit" style={styles.button}>Submit Borrow Record</button>
      </form>
    </div>
  );
}

const styles = {
  form: { display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px', padding: '20px', border: '1px solid #333', backgroundColor: '#1e1e1e', borderRadius: '8px' },
  input: { padding: '10px', backgroundColor: '#2c2c2c', color: 'white', border: '1px solid #444', borderRadius: '4px' },
  label: { fontSize: '14px', color: '#a0a0a0', marginBottom: '-6px' },
  button: { padding: '12px', backgroundColor: '#03dac6', color: '#000', border: 'none', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px', marginTop: '10px' }
};

export default BorrowPage;