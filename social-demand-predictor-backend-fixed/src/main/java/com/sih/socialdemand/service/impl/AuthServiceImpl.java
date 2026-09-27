package com.sih.socialdemand.service.impl;

import com.sih.socialdemand.dto.AuthResponse;
import com.sih.socialdemand.dto.LoginRequest;
import com.sih.socialdemand.dto.SignupRequest;
import com.sih.socialdemand.entity.User;
import com.sih.socialdemand.repository.UserRepository;
import com.sih.socialdemand.service.AuthException;
import com.sih.socialdemand.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public AuthResponse signup(SignupRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AuthException(HttpStatus.CONFLICT, "Email is already registered.");
        }

        String role = request.getRole() == null || request.getRole().isBlank()
                ? "USER"
                : request.getRole().toUpperCase();

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail().toLowerCase());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(role);

        User saved = userRepository.save(user);

        return new AuthResponse(saved.getId(), saved.getName(), saved.getEmail(), saved.getRole());
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail().toLowerCase())
                .orElseThrow(() -> new AuthException(HttpStatus.UNAUTHORIZED, "Invalid email or password."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new AuthException(HttpStatus.UNAUTHORIZED, "Invalid email or password.");
        }

        return new AuthResponse(user.getId(), user.getName(), user.getEmail(), user.getRole());
    }
}
