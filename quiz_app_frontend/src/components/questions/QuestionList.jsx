import React, { useState, useEffect } from "react";
import axios from "axios";
import "./QuestionList.css";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editQuestionId, setEditQuestionId] = useState(null);
  const [newQuestion, setNewQuestion] = useState({
    questionTitle: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    rightAnswer: '',
    difficultyLevel: '',
    category: ''
  });
  const [selectedCategory, setSelectedCategory] = useState('');
  
  useEffect(() => {
    fetchData();
  }, []);

  // fetching all the questions present in the db or by categories
  const fetchData = async (category='') => {
    setIsLoading(true);
    setError(null);
    try {
      const response = category 
      ? await axios.get(`http://localhost:8080/question/category/${category}`)
      : await axios.get("http://localhost:8080/question/allQuestions");
      setQuestions(response.data);
      if(!category){
        const uniqueCategories = [...new Set(response.data.map(q => q.category))];
        setCategories(uniqueCategories);
    }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // handling the add question or update question
  const handleAddQuestion = async () =>{
    
      if (!newQuestion.questionTitle ||
        !newQuestion.option1 ||
        !newQuestion.option2 ||
        !newQuestion.option3 ||
        !newQuestion.option4 ||
        !newQuestion.rightAnswer ||
        !newQuestion.difficultyLevel ||
        !newQuestion.category) {
          alert("Please fill in all fields.");
          return;
        }
      try{
      if(isEditing){
        console.log(editQuestionId);
        await axios.put(`http://localhost:8080/question/updateQuestion/${editQuestionId}`,newQuestion);
        const updatedQuestions = questions.map(question => 
          question.id === editQuestionId ? {...question, ...newQuestion} : question);
        setQuestions(updatedQuestions);
        setIsEditing(false);
        setEditQuestionId(null);
        window.location.reload();
        alert("Question updated successfully!");
      }else{
      const response = await axios.post('http://localhost:8080/question/addQuestion',newQuestion);
      setQuestions([...questions, response.data])
      setShowModal(false);
      setNewQuestion({
        questionTitle: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        rightAnswer: '',
        difficultyLevel: '',
        category: ''
      });
      window.location.reload();
      alert("Question added successfully!");
      }
    }catch(error){
      setError(error);
    }
  };

  // handling the deletion of question
  const handleDeleteQuestion = async (id) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await axios.delete(`http://localhost:8080/question/deleteQuestion/${id}`);
        const updatedQuestions = questions.filter(question => question.id !== id);
        setQuestions(updatedQuestions);
        alert("Question deleted successfully!");
      } catch (error) {
        setError(error);
      }
    }
  };

  // handling the editing of question
  const handleEditQuestion = (question) => {
    setIsEditing(true);
    setEditQuestionId(question.id);
    setNewQuestion({
      questionTitle: question.questionTitle,
      option1: question.option1,
      option2: question.option2,
      option3: question.option3,
      option4: question.option4,
      rightAnswer: question.rightAnswer,
      difficultyLevel: question.difficultyLevel,
      category: question.category
    });
    setShowModal(true);
  }

  // handling the change of question
  const handleChange = (e) =>{
    const {name, value} = e.target;
    setNewQuestion((prev) => ({...prev, [name]:value}));
  };

  // handling the category change
  const handleCategoryChange = (category) =>{
    setSelectedCategory(category);
    try{
      if(category===''){
        fetchData(); // fetching all questions
      }
      else{
        fetchData(category); // fetching questions by selected categories
      }
    }catch(error){
      setError(error);
    }
  }


  // HTML structure
  return (
    <div className="container p-2">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Question List</h2>
        <button className="btn btn-dark" onClick={()=> setShowModal(true)}>
          Add Question
        </button>
      </div>
      <div className="mb-3">
        <label htmlFor="categoryFilter" className="form-label filter">Filter by Category</label>
        <select
          id="categoryFilter"
          className="form-select form-select-sm mb-3"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category,index)=>(
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>
      {isLoading && <p>Loading questions...</p>}
      {error && <p>Error: {error.message}</p>}
      {!isLoading && !error && questions.length > 0 && (
        <div className="table-responsive question-list-table">
          <table className="table table-striped table-bordered">
            <thead className="sticky-header">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Question Title</th>
                <th scope="col">Option 1</th>
                <th scope="col">Option 2</th>
                <th scope="col">Option 3</th>
                <th scope="col">Option 4</th>
                <th scope="col">Right Answer</th>
                <th scope="col">Difficulty</th>
                <th scope="col">Category</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question,index) => (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{question.questionTitle}</td>
                  <td>{question.option1}</td>
                  <td>{question.option2}</td>
                  <td>{question.option3}</td>
                  <td>{question.option4}</td>
                  <td>{question.rightAnswer}</td>
                  <td>{question.difficultyLevel}</td>
                  <td>{question.category}</td>
                  <td>
                    <button className="btn btn-primary btn-sm mr-2" onClick={()=> handleEditQuestion(question)}>Update</button>
                    <button className="btn btn-danger btn-sm m-2" onClick={()=> handleDeleteQuestion(question.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!isLoading && !error && questions.length === 0 && (
        <p>No questions found.</p>
      )}

      {/*Modal*/}
      {showModal && (
        <div className="modal show d-block m-5" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{isEditing? 'Update Question':'Add New Question'}</h5>
              </div>
              <div className="modal-body p-4">
                <form>
                  <div className="form-group">
                    <label>Question Title</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    name="questionTitle" 
                    value={newQuestion.questionTitle} 
                    onChange={handleChange}
                    required/>
                  </div>
                  <div className="form-group">
                    <label>Option 1</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    name="option1" 
                    value={newQuestion.option1} 
                    onChange={handleChange}
                    required/>
                  </div>
                  <div className="form-group">
                    <label>Option 2</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    name="option2" 
                    value={newQuestion.option2} 
                    onChange={handleChange}
                    required/>
                  </div>
                  <div className="form-group">
                    <label>Option 3</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    name="option3" 
                    value={newQuestion.option3} 
                    onChange={handleChange}
                    required/>
                  </div>
                  <div className="form-group">
                    <label>Option 4</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    name="option4" 
                    value={newQuestion.option4} 
                    onChange={handleChange}
                    required/>
                  </div>
                  <div className="form-group">
                    <label>Right Answer</label>
                    <select
                    className="form-control" 
                    name="rightAnswer" 
                    value={newQuestion.rightAnswer} 
                    onChange={handleChange}
                    required>
                      <option value="">Select the Right Option</option>
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                      <option value="option4">Option 4</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Difficulty Level</label>
                    <select
                    className="form-control" 
                    name="difficultyLevel" 
                    value={newQuestion.difficultyLevel} 
                    onChange={handleChange}
                    required>
                      <option value="">Select Difficulty Level</option>
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    name="category" 
                    value={newQuestion.category} 
                    onChange={handleChange}
                    required/>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={()=>setShowModal(false)}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={handleAddQuestion}>Add</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionList;