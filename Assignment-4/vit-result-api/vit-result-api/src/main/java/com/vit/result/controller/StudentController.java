package com.vit.result.controller;

import com.vit.result.model.Student;
import com.vit.result.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")    // React dev port
public class StudentController {

    private final StudentService service;

    /* ---- POST  /api/students  : add student & marks ---- */
    @PostMapping
    public ResponseEntity<Student> create(@RequestBody Student student) {
        Student saved = service.saveWithMarks(student);
        return ResponseEntity.ok(saved);
    }

    /* ---- GET   /api/students/{prn} : fetch by PRN ---- */
    @GetMapping("/{prn}")
    public ResponseEntity<Student> get(@PathVariable String prn) {
        return service.findByPrn(prn)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
