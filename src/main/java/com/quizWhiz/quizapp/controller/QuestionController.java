package com.quizWhiz.quizapp.controller;

import com.quizWhiz.quizapp.modal.Question;
import com.quizWhiz.quizapp.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("question")
public class QuestionController {

    @Autowired
    QuestionService questionService;

    // To get all the questions
    @GetMapping("allQuestions")
    public ResponseEntity<List<Question>> getAllQuestions(){
        return questionService.getAllQuestions();
    }

    // To get the questions by category
    @GetMapping("category/{category}")
    public ResponseEntity<List<Question>> getQuestionByCategory(@PathVariable String category){
        return questionService.getQuestionByCategory(category);
    }

    // To get the List of categories
    @GetMapping("category")
    public ResponseEntity<List<String>> getCategories(){
        return questionService.getCategories();
    }

    // To get the number od Questions for a Category
    @GetMapping("category/{category}/count")
    public ResponseEntity<Integer> getCategoryQuestionCount(@PathVariable String category){
        return questionService.getQuestionCountByCategory(category);
    }

    // To add the question
    @PostMapping("addQuestion")
    public ResponseEntity<String> AddQuestion(@RequestBody Question question){
        return questionService.addQuestion(question);
    }

    // To add all the questions
    @PostMapping("addAll")
    public ResponseEntity<String> AddAllQuestions(@RequestBody List<Question> questionList){
        return questionService.addAllQuestions(questionList);
    }

    // To delete the question
    @DeleteMapping("deleteQuestion/{id}")
    public  ResponseEntity<String> DeleteQuestion(@PathVariable Integer id){
        return questionService.deleteQuestion(id);
    }

    // To update the question
    @PutMapping("updateQuestion/{id}")
    public ResponseEntity<Question> UpdateQuestion(@PathVariable Integer id, @RequestBody Question newQuestion){
        Optional<Question> updatedQuestion = questionService.updateQuestion(id,newQuestion);
        return updatedQuestion.map(ResponseEntity::ok).orElseGet(()->ResponseEntity.notFound().build());
    }
}




