package com.example.backend_projeto.controller.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid; // ✅ Import necessário para @Valid
import com.example.backend_projeto.dto.auth.RegisterRequest; // ✅ Import do DTO
import com.example.backend_projeto.models.User;
import com.example.backend_projeto.service.auth.AuthService;
import com.example.backend_projeto.dto.auth.AuthResponse;
import com.example.backend_projeto.dto.auth.LoginRequest;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {
        String token = authService.authenticateUser(
                loginRequest.getEmail(),
                loginRequest.getPassword());
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody @Valid RegisterRequest request) {
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(request.getPassword())
                .city(request.getCity())
                .build();

        User createdUser = authService.registerUser(user);
        return ResponseEntity.ok(createdUser);
    }

}
