import React, { Component } from "react";

// łaczenie FrontEnd z BackEnd. Za pomocą AXIOS wysyłamy HTTPS request z FrontEnd do BackEndu czyli wysyłamy dane z Frontu do Backendu. A potem
// z BackEndu wysyłamy to co chcemy do MongoDB do naszej bazy danych
import axios from 'axios';

export default class CreateUser extends Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
        }
    }


    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username
        }

        console.log('user', user);

        // wysyłamy dane z frontu na backend i bierzemy /add to co stworzyliśmy dla łączenia się z serwerem na backend folderze
        // drugi argument USER to jest to co będziemy wysyłać (musimy dać tutaj jakiś argument)
        axios.post('http://localhost:5000/users/add', user)
            // jeżeli przejdzie POST wtedy robimy .then
            .then(res => console.log(res.data));

        this.setState({
            username: ''
        })
    }

    render() {
        return (
            <div>
                <h3>Create new user</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type='text'
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>    
                        </input>
                    </div>

                    <div className="form-group">
                        <input type='submit' value='Create user' className='btn btn-primary'></input>
                    </div>
                </form>
            </div>
        )
    }
}