import React, {useState, useEffect} from "react";
import axios from "axios";

const QuestionList = () => {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        const fetchData = async () => {
          setIsLoading(true);
          setError(null);
          try {
            const response = await axios.get('http://localhost:8080/question/allQuestions');
            console.log('Fetched questions:', response.data); // Log fetched data
            setQuestions(response.data);
          } catch (error) {
            setError(error);
          } finally {
            setIsLoading(false);
          }
        };
      
        fetchData();
      }, []);
    return (
        <div className="container-fluid p-5">
          {isLoading && <p>Loading questions...</p>}
          {error && <p>Error: {error.message}</p>}
          {!isLoading && !error && questions.length > 0 && (
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Question Title</th>
                    <th scope="col">Option 1</th>
                    <th scope="col">Option 2</th>
                    <th scope="col">Option 3</th>
                    <th scope="col">Option 4</th>
                    <th scope="col">Right Answer</th>
                    <th scope="col">Difficulty</th>
                    <th scope="col">Category</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((question) => (
                  <tr key={question.id}>
                    <td>{question.id}</td>
                    <td>{question.questionTitle}</td>
                    <td>{question.option1}</td>
                    <td>{question.option2}</td>
                    <td>{question.option3}</td>
                    <td>{question.option4}</td>
                    <td>{question.rightAnswer}</td>
                    <td>{question.difficultyLevel}</td>
                    <td>{question.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!isLoading && !error && questions.length === 0 && <p>No questions found.</p>}
        </div>
    );
};

export default QuestionList;