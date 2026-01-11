package com.example.docsummarizer.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "summaries")
@Data
@ToString(exclude = "summaryText") // Exclude large field
public class Summary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String summaryText;

    private String language; // e.g., 'English', 'Spanish'

    private LocalDateTime generatedAt = LocalDateTime.now();

    // Many summaries belong to One DocFile
    @ManyToOne(fetch = FetchType.LAZY) // FetchType.LAZY is usually better for ManyToOne
    @JoinColumn(name = "document_id")
    @JsonIgnore
    private DocFile docFile;
}