import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import NavbarMenu from "./components/navbar-menu.component.js"
import ExercisesList from "./components/exercises-list.component.js";
import EditExercise from "./components/edit-exercise.component.js";
import CreateExercise from "./components/create-exercise.component.js";
import CreateUser from "./components/create-user.component.js";

function App() {
  return (
    <BrowserRouter>
      <div className='container'>
        <NavbarMenu />
        <Routes>
            <Route path="/" element={<ExercisesList/>} />
            <Route path="/edit/:id" element={<EditExercise/>} />
            <Route path="/create" element={<CreateExercise/>} />
            <Route path="/user" element={<CreateUser/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;