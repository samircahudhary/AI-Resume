package com.airesume.backendresume.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@Document(collection = "resumes")
public class Resume {

    @Id
    private String id;

    // ---- Owner (from Clerk) ----
    private String userId;        // Clerk user ID
    private String userEmail;
    private String userName;

    // ---- Meta ----
    private String title;
    private String template;      // classic / modern / minimal / bold
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // ---- Personal Details ----
    private String fullName;
    private String email;
    private String phone;
    private String address;
    private String linkedin;
    private String github;

    // ---- Professional ----
    private String jobTitle;
    private String summary;
    private String skills;

    // ---- Experience (array) ----
    private List<Experience> experiences;

    // ---- Education ----
    private String college;
    private String degree;
    private String branch;
    private String cgpa;
    private String twelth;
    private String tenth;

    // ---- Projects (array) ----
    private List<Project> projects;

    // ---- Additional ----
    private String portfolio;
    private String certifications;
    private String achievements;
    private String hobbies;
    private String internships;

    // ---- Nested Classes ----
    @Data
    @NoArgsConstructor
    public static class Experience {
        private String company;
        private String position;
        private String duration;
        private String description;
    }

    @Data
    @NoArgsConstructor
    public static class Project {
        private String title;
        private String description;
        private String link;
    }
}
