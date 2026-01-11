package com.example.docsummarizer.controller;
import org.springframework.security.core.Authentication;
import com.example.docsummarizer.repository.UserRepository;

import com.example.docsummarizer.model.DocFile;
import com.example.docsummarizer.model.User;
import com.example.docsummarizer.service.DocumentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    private final DocumentService documentService;
    private final UserRepository userRepository;
    public DocumentController(DocumentService documentService,
                              UserRepository userRepository) {
        this.documentService = documentService;
        this.userRepository = userRepository;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> upload(
            @RequestParam("file") MultipartFile file,
            Authentication authentication
    ) throws Exception {

        if (authentication == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        DocFile doc = documentService.uploadDocument(file, user);
System.out.println("Saved Document ID: " + doc.getId());
   return ResponseEntity.ok(Map.of(
        "id", doc.getId(),
        "filename", doc.getFilename()
    ));
    }



}



//    @PostMapping("/upload")
//    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file) throws Exception {
//
//        if (file.isEmpty()) {
//            return ResponseEntity.badRequest().body("File is empty");
//        }
//
//        // TEMP user (until auth is ready)
//        User user = null;
//
//        DocFile doc = documentService.uploadDocument(file, user);
//
//        return ResponseEntity.ok(Map.of(
//                "message", "Document uploaded & processed",
//                "documentId", doc.getId()
//        ));
//    }