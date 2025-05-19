package com.vit.result.service;

import com.vit.result.model.Mark;
import com.vit.result.model.Student;
import com.vit.result.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepo;

    /** Save student + marks, computing weighted score for each subject. */
    @Transactional
    public Student saveWithMarks(Student s) {

        for (Mark m : s.getMarks()) {
            // Set back-reference & weightage
            m.setStudent(s);
            double weighted = m.getMse() * 0.30 + m.getEse() * 0.70;
            m.setFinalScore(weighted);
        }
        return studentRepo.save(s);
    }

    public Optional<Student> findByPrn(String prn) {
        return studentRepo.findByPrn(prn);
    }
}
