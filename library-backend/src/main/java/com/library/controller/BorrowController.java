package com.library.controller;

import com.library.model.Book;
import com.library.model.Borrow;
import com.library.repository.BookRepository;
import com.library.repository.BorrowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/borrows")
public class BorrowController {

    @Autowired
    private BorrowRepository borrowRepository;

    @Autowired
    private BookRepository bookRepository;

    @GetMapping
    public ResponseEntity<List<Borrow>> getAllBorrows() {
        return new ResponseEntity<>(borrowRepository.findAll(), HttpStatus.OK); // 200
    }

    @PostMapping
    public ResponseEntity<Borrow> createBorrow(@RequestBody Borrow borrow) {
        // Find the book to mark it as unavailable
        Optional<Book> bookOpt = bookRepository.findById(borrow.getBookId());
        if (bookOpt.isPresent()) {
            Book book = bookOpt.get();
            if (!book.isAvailable()) {
                // Book is already borrowed
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST); 
            }
            book.setAvailable(false);
            bookRepository.save(book); // Update book status
            
            Borrow savedBorrow = borrowRepository.save(borrow);
            return new ResponseEntity<>(savedBorrow, HttpStatus.CREATED); // 201
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 if book doesn't exist
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> returnBook(@PathVariable Long id) {
        Optional<Borrow> borrowOpt = borrowRepository.findById(id);
        if (borrowOpt.isPresent()) {
            Borrow borrow = borrowOpt.get();
            
            // Find the book and mark it as available again
            Optional<Book> bookOpt = bookRepository.findById(borrow.getBookId());
            if (bookOpt.isPresent()) {
                Book book = bookOpt.get();
                book.setAvailable(true);
                bookRepository.save(book);
            }

            borrowRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404
    }
}