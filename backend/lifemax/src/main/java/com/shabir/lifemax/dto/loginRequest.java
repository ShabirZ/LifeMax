package com.shabir.lifemax.dto;

public class loginRequest {
    private String email;
    private String password;

    public loginRequest() {}
    public loginRequest(String email, String passwordString) {
        this.email = email;
        this.password = passwordString;
    }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email ; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    
}

