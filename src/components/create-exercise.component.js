import React, { Component } from "react";
import DatePicker from "react-datepicker";

import axios from "axios";

import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {

    constructor(props) {
        super(props);

        // odwołujemy się tutaj do metod (funkcji w JS) ponieważ musimy przypomnieć co zmieniliśmy programowi
        // nadaliśmy nowy stan np. w onChangeUsername ale on będzie odczytywany już tylko poniżej w render()
        // a natomiast wszystko co jest w render będzie się odwoływać do this.state = {} w konstruktorze
        // dlatego musimy po zmianie w onChangeUsername nadpisać poprzez .BIND() nowo przypisany this
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // jeśli będziemy coś zmieniać w this.state wew. componentu wtedy cała strona
        // będzie zmieniana bo główny this.state zmienia się
        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    // kod wewnątrz componentDidMount uaktywnia się jeszcze przed załadowaniem strony !!!
    componentDidMount() {
        axios.get('http://localhost:5000/users/')
            .then(res => {
                // jeśli jest co najmniej jeden użytkownik w bazie danych
                if (res.data.length > 0) {
                    this.setState({
                        users: res.data.map(databaseUser => databaseUser.username),
                        username: res.data[0].username
                    })
                }
            })
    }

    // tutaj będziemy zarządzać this.state.username
    onChangeUsername(e) {
        // metoda setState pozwala nam zmieniać this.state.username globalnie
        this.setState({
            // będziemy zmieniać pole textbox
            username: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    // przycisk w formularzu
    onSubmit(e) {
        // zapobiegnięcie naciśnięcia przycisku. W HTML preventDefault() === return false
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
          }

        console.log('exercise', exercise);

        axios.post('http://localhost:5000/exercises/add', exercise)
          .then(res => console.log(res.data));

        // jeśli naciśniemy Submit wtedy przeniesie nas do '/'
        // window.location = '/'
    }

    render() {
        return (
        <div>
          <h3>Create New Exercise Log</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
              <label>Username: </label>
              <select
                  required
                  className="form-control"
                  value={this.state.username}
                  onChange={this.onChangeUsername}>
                  {
                    this.state.users.map(function(user) {
                      return <option 
                        key={user}
                        value={user}>{user}
                        </option>;
                    })
                  }
              </select>
            </div>
            <div className="form-group"> 
              <label>Description: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  />
            </div>
            <div className="form-group">
              <label>Duration (in minutes): </label>
              <input 
                  type="text" 
                  className="form-control"
                  value={this.state.duration}
                  onChange={this.onChangeDuration}
                  />
            </div>
            <div className="form-group">
              <label>Date: </label>
              <div>
                <DatePicker
                  selected={this.state.date}
                  onChange={this.onChangeDate}
                />
              </div>
            </div>
    
            <div className="form-group">
              <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
            </div>
          </form>
        </div>
        )
      }
}