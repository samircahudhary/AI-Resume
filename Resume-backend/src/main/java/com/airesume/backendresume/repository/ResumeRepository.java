package com.airesume.backendresume.repository;

import com.airesume.backendresume.model.Resume;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ResumeRepository extends MongoRepository<Resume, String> {

    // Find all resumes for a specific user (by Clerk userId)
    List<Resume> findByUserIdOrderByUpdatedAtDesc(String userId);

    // Find all resumes by email fallback
    List<Resume> findByUserEmail(String userEmail);
}
