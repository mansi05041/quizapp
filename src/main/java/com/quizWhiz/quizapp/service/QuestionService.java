package com.quizWhiz.quizapp.service;

import com.quizWhiz.quizapp.modal.Question;
import com.quizWhiz.quizapp.repository.QuestionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

    @Autowired
    QuestionRepo questionRepo;

    // Read all the Questions
    public ResponseEntity<List<Question>> getAllQuestions(){
        try {
            return new ResponseEntity<>(questionRepo.findAll(), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
    }

    // Read the Questions by category
    public ResponseEntity<List<Question>> getQuestionByCategory(String category) {
        try {
            return new ResponseEntity<>(questionRepo.findByCategory(category),HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.BAD_REQUEST);
    }

    // Add the Question
    public ResponseEntity<String> addQuestion(Question question){
        try {
            questionRepo.save(question);
            return new ResponseEntity<>("Question Added Successfully",HttpStatus.CREATED);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("Failure",HttpStatus.BAD_REQUEST);
    }

    // To add all the questions
    public ResponseEntity<String> addAllQuestions(List<Question> questionList) {
        try {
            questionRepo.saveAll(questionList);
            return new ResponseEntity<>("Add all questions",HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>("Failure",HttpStatus.BAD_REQUEST);
        }
    }

    // Delete the Question
    public ResponseEntity<String> deleteQuestion(Integer id){
        try {
            questionRepo.deleteById(id);
            return new ResponseEntity<>("Question deleted",HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("Failure",HttpStatus.BAD_REQUEST);
    }

    // Update the Question
    public Optional<Question> updateQuestion(Integer id, Question newQuestion) {
        try{
            return questionRepo.findById(id).map(question -> {
                question.setQuestionTitle(newQuestion.getQuestionTitle());
                question.setCategory(newQuestion.getCategory());
                question.setDifficultyLevel(newQuestion.getDifficultyLevel());
                question.setOption1(newQuestion.getOption1());
                question.setOption2(newQuestion.getOption2());
                question.setOption3(newQuestion.getOption3());
                question.setOption4(newQuestion.getOption4());
                question.setRightAnswer(newQuestion.getRightAnswer());
                return questionRepo.save(question);
            });
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    // Give the List of categories
    public ResponseEntity<List<String>> getCategories() {
        try {
            return new ResponseEntity<>(questionRepo.findAllDistinctCategories(),HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
        }
        return  new ResponseEntity<>(new ArrayList<>(),HttpStatus.BAD_REQUEST);
    }

    // Give the number of Questions for specific categories
    public ResponseEntity<Integer> getQuestionCountByCategory(String category){
        try {
            return  new ResponseEntity<>(questionRepo.findCountQuestionByCategory(category),HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
        }
        return  new ResponseEntity<Integer>(0,HttpStatus.BAD_REQUEST);
    }

    // Give the total number of questions present in the db
    public ResponseEntity<Long> totalCountQuestions() {
        try {
            return new ResponseEntity<>(questionRepo.count(),HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(0L,HttpStatus.BAD_REQUEST);
    }
}
