import React, {useState, useEffect} from "react";
import axios from "axios";
import './quizCreate.css';

const PlayQuiz = () =>{
    const [quizzes, setQuizzes] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState('');
    const [questions, setQuestions] = useState([]);
    const [answers,setAnswers] = useState({});
    const [message,setMessage] = useState('');


useEffect(()=>{
    const fetchQuizzes = async() => {
        try{
            const response = await axios.get('http://localhost:8080/quiz/getQuiz');
            setQuizzes(response.data);
        }catch(error){
            console.log('Error in fetching Quizzes:',error);
        }
    };
    fetchQuizzes();
},[]);

const handleQuizChange = async(quizId) =>{
    setSelectedQuiz(quizId);
    try{
        const response = await axios.get(`http://localhost:8080/quiz/getQuiz/${quizId}`);
        setQuestions(response.data);
        setAnswers({
            question_id:'',
            chooseResponse:''
        });
    }catch(error){
        console.error('Error: ',error);
    }
};

const handleAnswerChange = (questionId, responseOption) => {
    setAnswers((prev) => ({
        ...prev,
        [questionId]: {
            id: questionId,
            responseOption
        }
    }));
};

const handleSubmit = async (e) => {
    e.preventDefault();
    const answeredQuestions = Object.values(answers).filter(
        (answer) => answer.id && answer.responseOption
      );
      
      const answersArray = answeredQuestions.map((answer) => ({
        question_id: answer.id,
        responseOption: answer.responseOption,
      }));
      
    console.log("Payload: ", answersArray); // Log the modified payload
  
    try {
      console.log( `http://localhost:8080/quiz/submit/${selectedQuiz}`)
      const response = await axios.post(
        `http://localhost:8080/quiz/submit/${selectedQuiz}`,
        answersArray,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response);
      // Extract the score from the response data
      const score = response.data;
      setMessage('Quiz submitted successfully!');
      setTimeout(() => setMessage(''), 3000);
      // Display the score in an alert box
      alert(`Your score: ${score}`);
      window.location.replace(window.location.href);
    } catch (error) {
      console.error("Error in submitting quiz: ", error);
      setMessage('Error in submitting quiz');
      setTimeout(() => setMessage(''), 3000);
    }
  };
  
   
return (
    <div className="container-fluid">
        <h2 className="text-center">Play Quiz</h2>
        <div className="form-group">
            <label className="text-dark-grey p-2">Select Quiz</label>
            <select
                className="form-control custom-select custom-select-sm bg-grey text-dark-grey"
                value={selectedQuiz}
                onChange={(e) => handleQuizChange(e.target.value)}
            >
                <option value="">Select a Quiz</option>
                {quizzes.map((quiz) => (
                    <option key={quiz.id} value={quiz.id}>
                        {quiz.title}
                    </option>
                ))}
            </select>
        </div>
        {questions.length > 0 && (
            <form onSubmit={handleSubmit}>
                {questions.map((question, index) => (
                    <div key={question.id} className="form-group p-2">
                        <label>{index + 1}. {question.questionTitle}</label>
                        <div>
                            {['option1', 'option2', 'option3', 'option4'].map((option) => (
                                <div key={option} className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name={`question-${question.id}`}
                                        value={option}
                                        onChange={() => handleAnswerChange(question.id, option)}
                                        required
                                    />
                                    <label className="form-check-label">
                                        {question[option]}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="text-center">
                    <button type="submit" className="btn btn-dark">Submit Quiz</button>
                </div>
            </form>
        )}
        {message && <div className="alert alert-success mt-3">{message}</div>}
    </div>
    );
};

export default PlayQuiz;