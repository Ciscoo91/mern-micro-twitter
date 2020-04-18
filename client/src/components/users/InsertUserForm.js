import React from 'react'
import axios from 'axios'

class InsertUserFrom extends React.Component {

    constructor() {
        super()
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            poste: ""
        }

        this.handleChange = this.handleChange.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }

    submitForm(event) {
        // event.preventDefault()

        axios.post('http://localhost:3001/users/insert', {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            phone: this.state.phone,
            poste: this.state.poste
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    render() {

        return (
            <form className="form" onSubmit={this.submitForm}>
                <div className="form-group">
                    <label htmlFor="">Firstname</label>
                    <input className="form-control" type="text" name="firstname" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="">Lastname</label>
                    <input className="form-control" type="text" name="lastname" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="">Email</label>
                    <input className="form-control" type="text" name="email" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="">Phone</label>
                    <input className="form-control" type="text" name="phone" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="">Poste</label>
                    <input className="form-control" type="text" name="poste" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <input type="submit" className="btn btn-primary" value="Submit" />
                </div>
            </form>
        )
    }
}

export default InsertUserFrom