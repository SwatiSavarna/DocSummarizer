package com.example.docsummarizer.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "documents")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"content", "summaries"}) // Exclude large fields
public class DocFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String filename;

    private String contentType;
    private String filePath;

    @Column(columnDefinition = "TEXT")
    private String content; // The text content of the document

    private LocalDateTime uploadedAt = LocalDateTime.now();

    // Many documents belong to One user
    @ManyToOne(fetch = FetchType.LAZY) // FetchType.LAZY is usually better for ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    // One document can have Many summaries
    @OneToMany(mappedBy = "docFile", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Summary> summaries = new ArrayList<>();
}