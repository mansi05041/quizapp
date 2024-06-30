package com.quizWhiz.quizapp.repository;

import com.quizWhiz.quizapp.modal.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizRepo extends JpaRepository<Quiz,Integer>{
}
