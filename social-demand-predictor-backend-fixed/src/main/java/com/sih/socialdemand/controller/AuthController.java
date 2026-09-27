package com.sih.socialdemand.controller;

import com.sih.socialdemand.dto.AuthResponse;
import com.sih.socialdemand.dto.LoginRequest;
import com.sih.socialdemand.dto.SignupRequest;
import com.sih.socialdemand.service.AuthException;
import com.sih.socialdemand.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest request) {
        try {
            AuthResponse response = authService.signup(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (AuthException ex) {
            return ResponseEntity.status(ex.getStatus()).body(Map.of("message", ex.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            AuthResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (AuthException ex) {
            return ResponseEntity.status(ex.getStatus()).body(Map.of("message", ex.getMessage()));
        }
    }
}
