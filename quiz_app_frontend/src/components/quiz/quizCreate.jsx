import React, {useEffect, useState} from "react";
import axios from "axios";
import './quizCreate.css';


const CreateQuiz = () =>{
    const [categories, setCategories] = useState([]);
    const[quizDetails, setQuizDetails] = useState({
        title: '',
        numberOfQuestions: '',
        category: ''
    });
    const [message, setMessage] = useState('');
    const [maxQuestions, setMaxQuestions] = useState(0);

    // getting the all categories
    useEffect(()=>{
        const fetchCategories = async() =>{
            try{
                const response = await axios.get('http://localhost:8080/question/category');
                setCategories(response.data);
            }catch(error){
                console.error("Error",error);
            }
        };
        fetchCategories();
    },[]);

    // setting message
    useEffect(()=>{
        if(message){
            const timer = setTimeout(()=> setMessage(''),3000);
            return() => clearTimeout(timer);
        }
    },[message]);

    // handling the category change
    const hadleCategoryChange = async (category) =>{
        setQuizDetails((prev) => ({...prev, category}));
        if(category){
            try{
                const response = await axios.get(`http://localhost:8080/question/category/${category}/count`);
                setMaxQuestions(response.data);
                setQuizDetails((prev) => ({...prev, numberOfQuestions: ''}));
            }catch(error){
                console.error("Error: ",error);
            }
        }else{
            setMaxQuestions(0);
            setQuizDetails((prev) => ({...prev,numberOfQuestions: ''}));
        }      
    };

    // handling the change
    const handleChange = (e) =>{
        const {name, value} = e.target;
        setQuizDetails((prev) => ({...prev,[name]:value}));
    };

    // on submit the quiz
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            await axios.post('http://localhost:8080/quiz/createQuiz',null,{
                params:{
                    title: quizDetails.title,
                    numQ: quizDetails.numberOfQuestions,
                    category: quizDetails.category
                }
            });
            setMessage("Quiz created successfully!");
            setQuizDetails({
                title: '',
                numberOfQuestions: '',
                category: ''
            });
        }catch(error){
            setMessage("Error in creating Quiz");
            console.error(error);
        }
    };

    return(
        <div className="container-fluid bg-light-grey p-5 rounded">
            <h2 className="text-dark-grey text-center">Create a New Quiz</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title" className="text-dark-grey">Quiz Titile</label>
                    <input
                    type="text"
                    className="form-control bg-grey text-dark-grey"
                    id="title"
                    name="title"
                    value={quizDetails.title}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category" className="text-dark-grey">Category</label>
                    <select
                    className="form-select custom-select custom-select-sm bg-grey text-dark-grey"
                    id="category"
                    name="category"
                    value={quizDetails.category}
                    onChange={(e) => hadleCategoryChange(e.target.value)}
                    required
                    >
                    <option value="">Select Category</option>
                    {categories.map((category,index)=>(
                        <option key={index} value={category}>{category}</option>
                    ))}
                    </select>
                </div>
                {quizDetails.category &&(
                    <div className="form-group">
                        <label htmlFor="numberOfQuestions" className="text-dark-grey">Number of Questions</label>
                        <input
                            type="number"
                            className="form-control bg-grey text-dark-grey"
                            id="numberOfQuestions"
                            name="numberOfQuestions"
                            value={quizDetails.numberOfQuestions}
                            onChange={handleChange}
                            min="1"
                            max={maxQuestions}
                            placeholder={`Can only add up to ${maxQuestions}`}
                            required
                        />
                    </div>
                )}
                <div className="submit-button">
                <button type="submit" className="btn btn-dark">Create Quiz</button>
                </div>
            </form>
            {message && <div className="alert alert-info mt-3">{message}</div>}
        </div>
    );
};

export default CreateQuiz;
