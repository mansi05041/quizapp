import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const HomePage = () =>{
    return(
        <div className='container mt-5 homepage-container'>
            <h1 className='text-center mb-4'>Welcome to the Quiz Application</h1>
            <div className='list-group'>
                <Link to="/quiz/create" className='list-group-item list-group-item-action m-2'>
                Create Quiz
                </Link>
                <Link to="/quiz/play" className='list-group-item list-group-item-action m-2'>
                Play Quiz
                </Link>
                <Link to="/questions" className='list-group-item list-group-item-action m-2'>
                Manage Questions
                </Link>
            </div>
        </div>
    );
};

export default HomePage;