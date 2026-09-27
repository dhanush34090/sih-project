package com.sih.socialdemand.dto;

import jakarta.validation.constraints.NotBlank;

public class LoginRequest {
    @NotBlank private String email;
    @NotBlank private String password;

    public LoginRequest() {}

    public String getEmail() { return email; }
    public void setEmail(String v) { email = v; }
    public String getPassword() { return password; }
    public void setPassword(String v) { password = v; }
}
