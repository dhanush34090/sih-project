package com.sih.socialdemand.dto;

// Shape expected by the frontend's AuthContext: data.userId, data.name, data.email, data.role
public class AuthResponse {
    private Long userId;
    private String name;
    private String email;
    private String role;

    public AuthResponse() {}

    public AuthResponse(Long userId, String name, String email, String role) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    public Long getUserId() { return userId; }
    public void setUserId(Long v) { userId = v; }
    public String getName() { return name; }
    public void setName(String v) { name = v; }
    public String getEmail() { return email; }
    public void setEmail(String v) { email = v; }
    public String getRole() { return role; }
    public void setRole(String v) { role = v; }
}
