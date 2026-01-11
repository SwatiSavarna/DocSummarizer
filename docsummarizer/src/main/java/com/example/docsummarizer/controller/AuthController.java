package com.example.docsummarizer.controller;
import com.example.docsummarizer.security.CustomUserDetails;

import com.example.docsummarizer.model.User;
import com.example.docsummarizer.repository.UserRepository;
import com.example.docsummarizer.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Allow frontend to access
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    // Inject the PasswordEncoder bean
    @Autowired
    private PasswordEncoder passwordEncoder;

    // 🟢 Register
//    @PostMapping("/register")
//    public ResponseEntity<?> registerUser(@RequestBody User user) {
//        if (userRepository.existsByEmail(user.getEmail())) {
//            return ResponseEntity.badRequest().body("❌ Email already exists");
//        }
//
//        // Take the plain text password from the request and hash it
////        String hashedPassword = passwordEncoder.encode(user.getHashedPassword());
////        user.setHashedPassword(hashedPassword);
//        String hashed = passwordEncoder.encode(user.getPassword());
//        user.setPassword(hashed);
//
//
//
//        userRepository.save(user);
//        return ResponseEntity.ok("✅ User registered successfully!");
//    }


    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body(" Email already exists");
        }

        String hashed = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashed);

        userRepository.save(user);
        return ResponseEntity.ok(" User registered successfully!");
    }


    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {

        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElse(null);

        if (user == null) {
            return ResponseEntity.status(404).body(" User not found");
        }

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).body(" Invalid email or password");
        }

        //  IMPORTANT: wrap User into UserDetails
        CustomUserDetails userDetails = new CustomUserDetails(user);

        String token = jwtUtil.generateToken(userDetails);

        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("message", " Login successful");

        return ResponseEntity.ok(response);
    }



    //  Token verify example
    @GetMapping("/verify")
    public ResponseEntity<?> verifyToken(@RequestHeader("Authorization") String token) {
        token = token.replace("Bearer ", "");
        String email = jwtUtil.extractUsername(token);
        return ResponseEntity.ok(" Token valid for: " + email);
    }

}
