package com.vit.result.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "marks")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Mark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /* ---------- raw scores ---------- */
    @Column(nullable = false, length = 40)
    private String subject;

    @Column(nullable = false)
    private int mse;             // 0-100

    @Column(nullable = false)
    private int ese;             // 0-100

    /* ---------- derived field ---------- */
    @Column(name = "final_score", nullable = false)
    private double finalScore;   // 0-100 after weightage

    /* ---------- FK back to student ----- */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    @JsonBackReference           // <<—— stops the back-pointer during serialisation
    private Student student;
}
