import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import QuestionList from "./components/questions/QuestionList";
import CreateQuiz from "./components/quiz/quizCreate";
import 'bootstrap/dist/css/bootstrap.min.css';


function App(){
  return(
    <Router>
      <Routes>
        <Route path="/questions" element={<QuestionList/>}/>
        <Route path="/quiz/Create" element={<CreateQuiz/>}/>
      </Routes>
    </Router>
  );
}

export default App;
