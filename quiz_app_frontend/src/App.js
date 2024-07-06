import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import QuestionList from "./components/questions/QuestionList";
import CreateQuiz from "./components/quiz/quizCreate";
import 'bootstrap/dist/css/bootstrap.min.css';
import PlayQuiz from "./components/quiz/quizPlay";
import HomePage from "./Home";



function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/questions" element={<QuestionList/>}/>
        <Route path="/quiz/Create" element={<CreateQuiz/>}/>
        <Route path="/quiz/Play" element={<PlayQuiz/>}/>
      </Routes>
    </Router>
  );
}

export default App;
