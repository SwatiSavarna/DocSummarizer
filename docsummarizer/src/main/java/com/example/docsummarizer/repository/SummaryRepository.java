package com.example.docsummarizer.repository;

import com.example.docsummarizer.model.Summary;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface SummaryRepository extends JpaRepository<Summary, Long> {
    List<Summary> findByDocFile_User_Email(String email);
}
