package com.example.backend_projeto.service.auth;

import com.example.backend_projeto.models.User;
import com.example.backend_projeto.repository.user.UserRepository;
import com.example.backend_projeto.util.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public String authenticateUser(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("Usuário não encontrado");
        }

        User user = userOpt.get();

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Credenciais inválidas");
        }

        return jwtUtil.generateToken(user.getEmail());
    }

    public User registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email já está em uso");
        }

        User newUser = User.builder()
                .name(user.getName())
                .email(user.getEmail())
                .password(passwordEncoder.encode(user.getPassword()))
                .city(user.getCity())
                .build();

        return userRepository.save(newUser);
    }
}
