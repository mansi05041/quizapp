import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import QuestionList from "./components/questions/QuestionList";
import 'bootstrap/dist/css/bootstrap.min.css';


function App(){
  return(
    <Router>
      <Routes>
        <Route path="/questions" element={<QuestionList/>}/>
      </Routes>
    </Router>
  );
}

export default App;
