package com.example.docsummarizer.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.*;

@Service
public class AISummaryService {

    @Value("${huggingface.api.url}")
    private String apiUrl;

    @Value("${huggingface.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public String generateSummary(String text) {
        if (text == null || text.isBlank()) {
            return "No content available to summarize.";
        }

        // 1. Keep the truncation fix to avoid "index out of range"
        String safeText = text.length() > 3500 ? text.substring(0, 3500) : text;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        // REMOVE THIS LINE OR CHANGE IT:
        // headers.setAccept(List.of(MediaType.APPLICATION_JSON));

        // Instead, use the simpler setter if you must have it:
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        Map<String, Object> body = new HashMap<>();
        body.put("inputs", safeText);

        Map<String, Object> options = new HashMap<>();
        options.put("wait_for_model", true);
        body.put("options", options);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<List<Map<String, Object>>> response = restTemplate.exchange(
                    apiUrl,
                    HttpMethod.POST,
                    entity,
                    new ParameterizedTypeReference<List<Map<String, Object>>>() {}
            );

            if (response.getBody() != null && !response.getBody().isEmpty()) {
                return response.getBody().get(0).get("summary_text").toString();
            }
            return "Empty response from AI.";

        } catch (Exception e) {
            // This will now catch and print the specific error to your console
            System.err.println("AI Service Error: " + e.getMessage());
            throw new RuntimeException("AI Service Error: " + e.getMessage());
        }
    }
}









//package com.example.docsummarizer.service;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.core.ParameterizedTypeReference;
//import org.springframework.http.*;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestTemplate;
//import com.fasterxml.jackson.databind.ObjectMapper;
//
//
//import java.util.*;
//
//
//
//@Service
//public class AISummaryService {
//
//    private static final String HF_URL =
//            "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";
//
//    @Value("${huggingface.api.key}")
//    private String apiKey;
//
//    private final RestTemplate restTemplate = new RestTemplate();
//
//    public String generateSummary(String text) {
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//        headers.setBearerAuth(apiKey);
//
//        Map<String, Object> body = new HashMap<>();
//        body.put("inputs", text);
//        // Add wait_for_model to prevent errors while the model is starting up
//        Map<String, Object> options = new HashMap<>();
//        options.put("wait_for_model", true);
//        body.put("options", options);
//
//        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
//
//        try {
//            ResponseEntity<List<Map<String, Object>>> response = restTemplate.exchange(
//                    HF_URL,
//                    HttpMethod.POST,
//                    entity,
//                    new ParameterizedTypeReference<List<Map<String, Object>>>() {}
//            );
//
//            if (response.getBody() != null && !response.getBody().isEmpty()) {
//                return response.getBody().get(0).get("summary_text").toString();
//            }
//        } catch (Exception e) {
//            // Log the actual error to your console to see if it's a 401 (Auth) or 429 (Quota)
//            System.err.println("Error calling Hugging Face: " + e.getMessage());
//            throw new RuntimeException("AI Service failed: " + e.getMessage());
//        }
//        return "Summary could not be generated.";
//    }
//}







//
//@Service
//public class AISummaryService {
//
//    @Value("${huggingface.api.url}")
//    private String apiUrl;
//
//    @Value("${huggingface.api.key}")
//    private String apiKey;
//
//    private final RestTemplate restTemplate = new RestTemplate();
//
//    public String generateSummary(String content) {
//
//        if (content == null || content.isBlank()) {
//            throw new RuntimeException("Document content is empty");
//        }
//
//        String trimmedContent = content.length() > 3000
//                ? content.substring(0, 3000)
//                : content;
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//        headers.setBearerAuth(apiKey);
//
//        Map<String, Object> body = new HashMap<>();
//        body.put("inputs", trimmedContent);
//
//        Map<String, Object> params = new HashMap<>();
//        params.put("max_length", 150);
//        params.put("min_length", 50);
//        params.put("do_sample", false);
//
//        body.put("parameters", params);
//
//        HttpEntity<Map<String, Object>> request =
//                new HttpEntity<>(body, headers);
//
//        ResponseEntity<String> response =
//                restTemplate.exchange(
//                        apiUrl,
//                        HttpMethod.POST,
//                        request,
//                        String.class
//                );
//
//        try {
//            ObjectMapper mapper = new ObjectMapper();
//            List<Map<String, Object>> result =
//                    mapper.readValue(response.getBody(), List.class);
//
//            return result.get(0).get("summary_text").toString();
//
//        } catch (Exception e) {
//            throw new RuntimeException("Failed to parse AI response", e);
//        }
//    }
//
//}