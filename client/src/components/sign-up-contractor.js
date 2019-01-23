import React, { Component } from 'react'
import axios from 'axios'


class ContractorSignup extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
            password: '',
            email: '',
			contractor: '',
			confirmPassword: '',

		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleSubmit(event) {
		console.log('sign-up handleSubmit, username: ')
        console.log("username: " + this.state.username)
        console.log("contractor: " + this.state.contractor)
		event.preventDefault()

		//request to server to add a new username/password
		axios.post('/user/', {
			username: this.state.username,
			password: this.state.password,
            contractor: this.state.contractor,
            email: this.state.email,
		})
		.then(response => {
			axios
			  .post("/nodemailer/send-email", {
				email: this.state.email
			  })
			  .then(response => {
				console.log(response);
				if (!response.data.errmsg) {
				  console.log("successful signup");
				  this.setState({
					//redirect to login page
					redirectTo: "/login"
				  });
				} else {
				  console.log("username already taken");
				}
			  });
		  })
			.catch(error => {
				console.log('signup error: ')
				console.log(error);

			});
	}


render() {
	return (
		<div className="SignupForm">
			<h4>Contractor Sign up</h4>
			<form className="form-horizontal">
				<div className="form-group">
					<div className="col-1 col-ml-auto">
						<label className="form-label" htmlFor="username">Username</label>
					</div>
					<div className="col-3 col-mr-auto">
						<input className="form-input"
							type="text"
							id="username"
							name="username"
							placeholder="Username"
							value={this.state.username}
							onChange={this.handleChange}
						/>
					</div>
				</div>
				<div className="form-group">
					<div className="col-1 col-ml-auto">
						<label className="form-label" htmlFor="password">Password: </label>
					</div>
					<div className="col-3 col-mr-auto">
						<input className="form-input"
							placeholder="password"
							type="password"
							name="password"
							value={this.state.password}
							onChange={this.handleChange}
						/>
					</div>
				</div>
                <div className="form-group">
					<div className="col-1 col-ml-auto">
						<label className="form-label" htmlFor="email">Email: </label>
					</div>
					<div className="col-3 col-mr-auto">
						<input className="form-input"
							placeholder="Email"
							type="email"
							name="email"
							value={this.state.email}
							onChange={this.handleChange}
						/>
					</div>
				</div>
				<div className="form-group">
					<div className="col-1 col-ml-auto">
						<label className="form-label" htmlFor="contractor">Contractor: </label>
					</div>
					<div className="col-3 col-mr-auto">
						<input className="form-input"
							placeholder="Contractor"
							type="contractor"
							name="contractor"
							value={this.state.contractor}
							onChange={this.handleChange}
						/>
					</div>
				</div>
				<div className="form-group ">
					<div className="col-7"></div>
					<button
						className="btn btn-primary col-1 col-mr-auto"
						onClick={this.handleSubmit}
						type="submit"
					>Sign up</button>
				</div>
			</form>
		</div>

	)
}
}

export default ContractorSignup
