import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container" style={{ backgroundColor: "#c2d5a8" }}>
        <Navbar />
        <br />
        <Switch>
          <Route path="/edit/:id" exact component={EditExercise} />
          <Route path="/create" exact component={CreateExercise} />
          <Route path="/user" exact component={CreateUser} />
          <Route path="/*" component={ExercisesList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
