// src/main/java/com/vit/result/repository/StudentRepository.java
package com.vit.result.repository;

import com.vit.result.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByPrn(String prn);
}
