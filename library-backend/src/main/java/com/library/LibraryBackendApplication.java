package com.library;

import com.library.model.Book;
import com.library.repository.BookRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Arrays;

@SpringBootApplication
public class LibraryBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(LibraryBackendApplication.class, args);
    }

    // This Bean runs automatically when the app starts to seed the database
    @Bean
    public CommandLineRunner seedDatabase(BookRepository bookRepository) {
        return args -> {
            // We only insert data if the database is currently empty
            if (bookRepository.count() == 0) {
                Book book1 = new Book();
                book1.setTitle("Clean Code");
                book1.setAuthor("Robert C. Martin");
                book1.setCategory("Software Engineering");
                book1.setAvailable(true);

                Book book2 = new Book();
                book2.setTitle("The Pragmatic Programmer");
                book2.setAuthor("Andrew Hunt");
                book2.setCategory("Software Engineering");
                book2.setAvailable(true);

                Book book3 = new Book();
                book3.setTitle("Introduction to Algorithms");
                book3.setAuthor("Thomas H. Cormen");
                book3.setCategory("Computer Science");
                book3.setAvailable(true);

                bookRepository.saveAll(Arrays.asList(book1, book2, book3));
                System.out.println("Database successfully seeded with books!");
            }
        };
    }
}