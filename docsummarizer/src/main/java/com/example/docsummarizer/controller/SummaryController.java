package com.example.docsummarizer.controller;

import com.example.docsummarizer.model.DocFile;
import com.example.docsummarizer.model.Summary;
import com.example.docsummarizer.repository.DocFileRepository;
import com.example.docsummarizer.repository.SummaryRepository;
import com.example.docsummarizer.service.AISummaryService;
import java.util.List;
import org.springframework.http.ResponseEntity;   // ✅ ADD THIS
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
@RestController
@RequestMapping("/api/summaries")
@CrossOrigin("*")
public class SummaryController {

    private final DocFileRepository docFileRepository;
    private final SummaryRepository summaryRepository;
    private final AISummaryService aiSummaryService;

    public SummaryController(
            DocFileRepository docFileRepository,
            SummaryRepository summaryRepository,
            AISummaryService aiSummaryService
    ) {
        this.docFileRepository = docFileRepository;
        this.summaryRepository = summaryRepository;
        this.aiSummaryService = aiSummaryService;
    }
    @GetMapping("/{id}/text")
    public ResponseEntity<String> getSummaryTextOnly(@PathVariable Long id) {
        Summary summary = summaryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Summary not found"));

        // Return only the text field
        return ResponseEntity.ok(summary.getSummaryText());
    }
   @GetMapping
public ResponseEntity<?> getAllSummaries(Authentication authentication) {
    if (authentication == null) {
        return ResponseEntity.status(401).body("Unauthorized");
    }

    String email = authentication.getName();
    
    // Fetch only summaries belonging to this specific email
    List<Summary> userSummaries = summaryRepository.findByDocFile_User_Email(email);
    
    return ResponseEntity.ok(userSummaries);
}

    @PostMapping("/generate/{docId}")
    public ResponseEntity<Summary> generateSummary(@PathVariable Long docId,Authentication authentication) {
        if (authentication == null) return ResponseEntity.status(401).build();
String email = authentication.getName();
        DocFile doc = docFileRepository.findById(docId)
                .orElseThrow(() -> new RuntimeException("Document not found"));

        String aiSummary = aiSummaryService.generateSummary(doc.getContent());

        Summary summary = new Summary();
        summary.setSummaryText(aiSummary);
        summary.setLanguage("English");
        summary.setDocFile(doc);

        summaryRepository.save(summary);

        return ResponseEntity.ok(summary);
    }
}
