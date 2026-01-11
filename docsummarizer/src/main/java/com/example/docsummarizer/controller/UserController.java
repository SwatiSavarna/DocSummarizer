package com.example.docsummarizer.controller;

import com.example.docsummarizer.dto.UserProfileResponse;
import com.example.docsummarizer.model.User;
import com.example.docsummarizer.repository.UserRepository;
import com.example.docsummarizer.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    // ✅ Get logged-in user's profile
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(
            @RequestHeader("Authorization") String token
    ) {
        token = token.replace("Bearer ", "");
        String email = jwtUtil.extractUsername(token);

        User user = userRepository.findByEmail(email)
                .orElse(null);

        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }

        UserProfileResponse response = new UserProfileResponse(
                user.getId(),
                user.getFullname(),
                user.getEmail()
                
        );

        return ResponseEntity.ok(response);
    }
}
