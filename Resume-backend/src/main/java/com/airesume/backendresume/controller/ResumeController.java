package com.airesume.backendresume.controller;

import com.airesume.backendresume.model.Resume;
import com.airesume.backendresume.repository.ResumeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/resumes")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
    "https://ai-resume-bszzlub1t-samircahudharys-projects.vercel.app"
})
public class ResumeController {

    private final ResumeRepository repository;

    public ResumeController(ResumeRepository repository) {
        this.repository = repository;
    }

    // ---- CREATE ----
    @PostMapping
    public Resume createResume(@RequestBody Resume resume) {
        resume.setCreatedAt(LocalDateTime.now());
        resume.setUpdatedAt(LocalDateTime.now());
        return repository.save(resume);
    }

    // ---- GET ALL resumes for a user ----
    @GetMapping("/user/{userId}")
    public List<Resume> getUserResumes(@PathVariable String userId) {
        return repository.findByUserIdOrderByUpdatedAtDesc(userId);
    }

    // ---- GET single resume ----
    @GetMapping("/{id}")
    public ResponseEntity<Resume> getResume(@PathVariable String id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ---- UPDATE ----
    @PutMapping("/{id}")
    public ResponseEntity<Resume> updateResume(
            @PathVariable String id,
            @RequestBody Resume updatedData) {

        return repository.findById(id)
                .map(resume -> {
                    // Personal
                    if (updatedData.getFullName() != null) resume.setFullName(updatedData.getFullName());
                    if (updatedData.getEmail() != null) resume.setEmail(updatedData.getEmail());
                    if (updatedData.getPhone() != null) resume.setPhone(updatedData.getPhone());
                    if (updatedData.getAddress() != null) resume.setAddress(updatedData.getAddress());
                    if (updatedData.getLinkedin() != null) resume.setLinkedin(updatedData.getLinkedin());
                    if (updatedData.getGithub() != null) resume.setGithub(updatedData.getGithub());

                    // Professional
                    if (updatedData.getJobTitle() != null) resume.setJobTitle(updatedData.getJobTitle());
                    if (updatedData.getSummary() != null) resume.setSummary(updatedData.getSummary());
                    if (updatedData.getSkills() != null) resume.setSkills(updatedData.getSkills());

                    // Experience & Projects
                    if (updatedData.getExperiences() != null) resume.setExperiences(updatedData.getExperiences());
                    if (updatedData.getProjects() != null) resume.setProjects(updatedData.getProjects());

                    // Education
                    if (updatedData.getCollege() != null) resume.setCollege(updatedData.getCollege());
                    if (updatedData.getDegree() != null) resume.setDegree(updatedData.getDegree());
                    if (updatedData.getBranch() != null) resume.setBranch(updatedData.getBranch());
                    if (updatedData.getCgpa() != null) resume.setCgpa(updatedData.getCgpa());
                    if (updatedData.getTwelth() != null) resume.setTwelth(updatedData.getTwelth());
                    if (updatedData.getTenth() != null) resume.setTenth(updatedData.getTenth());

                    // Additional
                    if (updatedData.getPortfolio() != null) resume.setPortfolio(updatedData.getPortfolio());
                    if (updatedData.getCertifications() != null) resume.setCertifications(updatedData.getCertifications());
                    if (updatedData.getAchievements() != null) resume.setAchievements(updatedData.getAchievements());
                    if (updatedData.getHobbies() != null) resume.setHobbies(updatedData.getHobbies());
                    if (updatedData.getInternships() != null) resume.setInternships(updatedData.getInternships());

                    // Template
                    if (updatedData.getTemplate() != null) resume.setTemplate(updatedData.getTemplate());

                    resume.setUpdatedAt(LocalDateTime.now());
                    return ResponseEntity.ok(repository.save(resume));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // ---- DELETE ----
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResume(@PathVariable String id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
