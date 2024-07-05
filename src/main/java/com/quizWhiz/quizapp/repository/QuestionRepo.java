package com.quizWhiz.quizapp.repository;

import com.quizWhiz.quizapp.modal.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepo extends JpaRepository<Question,Integer> {

    List<Question> findByCategory(String category);

    @Query(value = "SELECT * FROM question WHERE category = :category ORDER BY RANDOM() LIMIT :numQ",nativeQuery = true)
    List<Question> findRandomQuestionByCategory(String category, int numQ);

    @Query(value = "SELECT DISTINCT q.category FROM question q",nativeQuery = true)
    List<String> findAllDistinctCategories();

    @Query(value = "SELECT COUNT(*) FROM question WHERE category= :category",nativeQuery = true)
    Integer findCountQuestionByCategory(String category);
}
