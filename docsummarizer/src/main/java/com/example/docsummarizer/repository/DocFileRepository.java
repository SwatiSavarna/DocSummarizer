package com.example.docsummarizer.repository;

import com.example.docsummarizer.model.DocFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocFileRepository extends JpaRepository<DocFile, Long> {
}
