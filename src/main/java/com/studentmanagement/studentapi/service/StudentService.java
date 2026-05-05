package com.studentmanagement.studentapi.service;

import com.studentmanagement.studentapi.model.Student;
import com.studentmanagement.studentapi.repository.StudentRepository;
import org.springframework.stereotype.Service;
import com.studentmanagement.studentapi.exception.ResourceNotFoundException;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    // ✅ ADD STUDENT WITH FULL VALIDATION
    public Student addStudent(Student student) {

        if (studentRepository.existsByRollNumber(student.getRollNumber())) {
            throw new RuntimeException("Roll number already exists");
        }

        if (studentRepository.existsByEmail(student.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        if (studentRepository.existsByPhoneNumber(student.getPhoneNumber())) {
            throw new RuntimeException("Phone number already exists");
        }

        return studentRepository.save(student);
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));
    }

    public void deleteStudentById(Long id) {
        if (!studentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Student not found");
        }
        studentRepository.deleteById(id);
    }

    // ✅ UPDATE WITH FULL DUPLICATE CHECK
    public Student updateStudent(Long id, Student updatedStudent) {

        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

        // Roll number check (ignore same record)
        if (!existingStudent.getRollNumber().equals(updatedStudent.getRollNumber()) &&
                studentRepository.existsByRollNumber(updatedStudent.getRollNumber())) {
            throw new RuntimeException("Roll number already exists");
        }

        // Email check (ignore same record)
        if (!existingStudent.getEmail().equals(updatedStudent.getEmail()) &&
                studentRepository.existsByEmail(updatedStudent.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        // Phone check (ignore same record)
        if (!existingStudent.getPhoneNumber().equals(updatedStudent.getPhoneNumber()) &&
                studentRepository.existsByPhoneNumber(updatedStudent.getPhoneNumber())) {
            throw new RuntimeException("Phone number already exists");
        }

        existingStudent.setName(updatedStudent.getName());
        existingStudent.setRollNumber(updatedStudent.getRollNumber());
        existingStudent.setEmail(updatedStudent.getEmail());
        existingStudent.setPhoneNumber(updatedStudent.getPhoneNumber());
        existingStudent.setCourse(updatedStudent.getCourse());

        return studentRepository.save(existingStudent);
    }
}