package com.quizWhiz.quizapp.service;

import com.quizWhiz.quizapp.modal.QuestionWrapper;
import com.quizWhiz.quizapp.modal.Question;
import com.quizWhiz.quizapp.modal.Quiz;
import com.quizWhiz.quizapp.modal.UserResponse;
import com.quizWhiz.quizapp.repository.QuestionRepo;
import com.quizWhiz.quizapp.repository.QuizRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuizService {

    @Autowired
    QuizRepo quizRepo;
    @Autowired
    QuestionRepo questionRepo;

    // Creating Quiz
    public ResponseEntity<String> createQuiz(String category, int numQ, String title) {
        try {
            List<Question> questions = questionRepo.findRandomQuestionByCategory(category,numQ);
            Quiz quiz = new Quiz();
            quiz.setTitle(title);
            quiz.setQuestionList(questions);
            quizRepo.save(quiz);
            return new ResponseEntity<>("Quiz Created", HttpStatus.CREATED);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("Failure",HttpStatus.BAD_REQUEST);
    }

    // Create Quiz of Random questions
    public ResponseEntity<String> createQuizFromRandomQuestions(Integer numQ, String title) {
        try{
            List<Question> questions = questionRepo.findRandomQuestion(numQ);
            Quiz quiz = new Quiz();
            quiz.setTitle(title);
            quiz.setQuestionList(questions);
            quizRepo.save(quiz);
            return new ResponseEntity<>("Quiz Created",HttpStatus.CREATED);
        } catch (Exception e){
            e.printStackTrace();
        }
        return  new ResponseEntity<>("Failure",HttpStatus.BAD_REQUEST);
    }

    // Get Questions of Quiz
    public ResponseEntity<List<QuestionWrapper>> getQuizQuestions(Integer id) {
        try {
            Optional<Quiz> quiz = quizRepo.findById(id);
            List<Question> questionsFromDb = quiz.get().getQuestionList();
            List<QuestionWrapper> questionsForUser = new ArrayList<>();
            for(Question q: questionsFromDb){
                QuestionWrapper questionWrapper = new QuestionWrapper(q.getId(),q.getQuestionTitle(),q.getOption1(),q.getOption2(),q.getOption3(),q.getOption4());
                questionsForUser.add(questionWrapper);
            }
            return new ResponseEntity<>(questionsForUser,HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.BAD_REQUEST);
    }

    // Calculate the result
    public ResponseEntity<String> calculateResult(Integer id, List<UserResponse> response) {
        try {
            Optional<Quiz> quiz = quizRepo.findById(id);
            List<Question> questions = quiz.get().getQuestionList();
            int right = 0;
            int i = 0;
            for(UserResponse res: response){
                if(res.getResponseOption().equals(questions.get(i).getRightAnswer())){
                    right++;
                }
                i++;
            }
            return new ResponseEntity<>(String.format("Scored %d out of %d", right, i), HttpStatus.ACCEPTED);
        } catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("Not Found",HttpStatus.NOT_FOUND);
    }

    // getting all the quizzes present in the db
    public ResponseEntity<List<Quiz>> getAllQuizzes() {
        try {
            return new ResponseEntity<>(quizRepo.findAll(),HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.BAD_REQUEST);
    }
}
