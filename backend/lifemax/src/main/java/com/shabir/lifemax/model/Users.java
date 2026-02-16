package com.shabir.lifemax.model;

import jakarta.persistence.*;
import java.util.UUID;

/**
 * User Table Model
 * Allows creation of user accounts with email + password || Google auth
 * @author Shabir
 * @since 1.0
 * 
 * TODO: Actually configure auth logic (e.g., password hashing, Google token verification) in the service layer. This is just the data model.
 * Testing
 */

@Entity
@Table(name = "users") // Maps 'User' class to 'users' table
public class Users { // <--- Changed to Singular

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID uid;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "password_hash", nullable = true) 
    private String passwordHash;

    @Column(name = "first_name", nullable = false)
    private String firstName;
    
    @Column(name = "last_name", nullable = false)
    private String lastName;

    // empty constructor for JPA
    public Users() {
    }

    // password signup constructor
    public Users(String email, String passwordHash, String firstName, String lastName) {
        this.email = email;
        this.passwordHash = passwordHash;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // google auth constructor (no password)
    public Users(String email, String firstName, String lastName) {
        this(email, null, firstName, lastName);
    }

    // --- Getters and Setters ---
    public UUID getUid() {
        return this.uid;
    }

    public String getEmail() {
        return this.email;
    }

    public String getPasswordHash() {
        return this.passwordHash;
    }

    public void setFullName(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}