package com.example.docsummarizer.service;

import com.example.docsummarizer.model.DocFile;
import com.example.docsummarizer.model.User;
import com.example.docsummarizer.repository.DocFileRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Service
public class DocumentService {

    private final DocFileRepository docFileRepository;
    private final FileStorageService fileStorageService;
    private final PdfExtractorService pdfExtractorService;

    public DocumentService(
            DocFileRepository docFileRepository,
            FileStorageService fileStorageService,
            PdfExtractorService pdfExtractorService
    ) {
        this.docFileRepository = docFileRepository;
        this.fileStorageService = fileStorageService;
        this.pdfExtractorService = pdfExtractorService;
    }

    public DocFile uploadDocument(MultipartFile file, User user) throws Exception {

        // 1️⃣ Save file
        String filePath = fileStorageService.storeFile(file);

        // 2️⃣ Extract text
        String extractedText = pdfExtractorService.extractText(filePath);

        // 3️⃣ Save metadata to DB
        DocFile doc = new DocFile();
        doc.setFilename(file.getOriginalFilename());
        doc.setContentType(file.getContentType());
        doc.setFilePath(filePath);
        doc.setContent(extractedText);
        doc.setUploadedAt(LocalDateTime.now());
        doc.setUser(user);

        return docFileRepository.save(doc);
    }
}
