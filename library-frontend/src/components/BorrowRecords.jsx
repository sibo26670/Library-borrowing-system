import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function BorrowRecords() {
  const [records, setRecords] = useState([]);

  const fetchRecords = () => {
    axios.get('http://localhost:8080/api/borrows')
      .then(response => setRecords(response.data))
      .catch(error => console.error("Error fetching records:", error));
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleReturn = (id) => {
    axios.delete(`http://localhost:8080/api/borrows/${id}`)
      .then(() => {
        toast.info("Book returned successfully!");
        fetchRecords();
      })
      .catch(() => toast.error("Error returning book."));
  };

  return (
    <div>
      <h2>Borrow Records</h2>
      
      {records.length === 0 ? (
        <p style={{ color: '#a0a0a0' }}>No active borrow records.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Record ID</th>
              <th style={styles.th}>Member Name</th>
              <th style={styles.th}>Member ID</th>
              <th style={styles.th}>Book ID</th>
              <th style={styles.th}>Borrow Date</th>
              <th style={styles.th}>Return Date</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map(record => (
              <tr key={record.id}>
                <td style={styles.td}>{record.id}</td>
                <td style={styles.td}>{record.memberName}</td>
                <td style={styles.td}>{record.memberId}</td>
                <td style={styles.td}>{record.bookId}</td>
                <td style={styles.td}>{record.borrowDate}</td>
                <td style={styles.td}>{record.returnDate}</td>
                <td style={styles.td}>
                  <button onClick={() => handleReturn(record.id)} style={styles.button}>
                    Return Book
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '20px', backgroundColor: '#1e1e1e', borderRadius: '8px', overflow: 'hidden' },
  th: { borderBottom: '2px solid #333', padding: '12px', backgroundColor: '#2c2c2c', textAlign: 'left', color: '#e0e0e0' },
  td: { borderBottom: '1px solid #333', padding: '12px', color: '#e0e0e0' },
  button: { padding: '8px 14px', backgroundColor: '#cf6679', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' }
};

export default BorrowRecords;