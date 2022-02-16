import React, { Component } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

const Exercise = props => (
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date.substring(0,10)}</td>
      <td>
        {/* props.deleteExercise tutaj dopiero nadajemy czym jest ID dla tego objektu */}
        {/* /edit/ edytujemy to co będziemy chcieli odnośnie ID */}
        <Link to={"/edit/" + props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
      </td>
    </tr>
  )

  export default class ExercisesList extends Component {
    constructor(props) {
      super(props);
  
      this.deleteExercise = this.deleteExercise.bind(this)
  
      this.state = {exercises: []};
    }

    // na samym początku musimy przywołać nasze dane z bazy danych z którymi chcemy zarządzać
    componentDidMount() {
        axios.get('http://localhost:5000/exercises/')
          .then(response => {
            this.setState({ exercises: response.data })
          })
          .catch((error) => {
            console.log(error);
          })
      }

    // będziemy usuwać exercises za pomocą ID wbudowanego w MongoDB
    deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/'+id)
          .then(response => { console.log(response.data)});

        // po tym jak usuniemy EXERCISES z MongoDB musimy równiez usunąć EXERCISES z frontendu
        // dlatego odwołujemy się jeszcze raz do bazy danych aby pobrać najnowsze dane
        this.setState({
          exercises: this.state.exercises.filter(el => el._id !== id)
        })
      }

      exerciseList() {
        // dla każdego komponentu w EXERCISES ARRAY tworzymy osobny komponent dla exercise
        return this.state.exercises.map(currentexercise => {

            // dzięki temu, że zwracamy this.state.exercise.map... to możemy wewnątrz KOMPONENTU Exercise odwoływać się
            // za pomocą PROPS do wszystkiego co było wewnątrz this.state.exercises
            return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
        })
      }

      render() {
        return (
          <div>
            <h3>Logged Exercises</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Username</th>
                  <th>Description</th>
                  <th>Duration</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                { this.exerciseList() }
              </tbody>
            </table>
          </div>
        )
      }
    }