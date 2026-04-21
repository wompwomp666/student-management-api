package com.studentmanagement.studentapi.repository;

import com.studentmanagement.studentapi.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {

}