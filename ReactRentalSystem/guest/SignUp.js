import React from "react";
import ReactDOM from "react-dom";
import {Modal} from "./Modal.js"

class SignUp extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      show: false
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.addUser = this.addUser.bind(this);
  }
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
 
  addUser() {
	let that = this;
	fetch(
		"https://qen9j6ly9b.execute-api.us-east-1.amazonaws.com/default/adduser",
		{
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({
				username: username.value,
				firstname: firstname.value,
				lastname: lastname.value,
				email: email.value,
				password: password.value,
				role: "member"
			})
			}
		).then(function(response) {
			console.log(
				"Request status code: ",
				response.statusText,
				response.status,
				response.type
			);
			if (response.status == 200) {
				that.showModal();
				return response.json();
			}
		});
	}

  render() {
		return (
			<div>
			    <Modal show={this.state.show} handleClose={this.hideModal}>
			    <p>Signup was successful</p>
                </Modal>
				<div className="box">
					<header>
						<h1 className="fh-custom-font">Signup</h1>
					</header>
					<section id="loginForm">
						<label>Username</label> <input id="username" type="text" />
						<label>First name:</label>
						<input id="firstname" type="text" />
						<label>Last name:</label>
						<input id="lastname" type="text" />
						<label>Email</label>
						<input id="email" type="text" />
						<label>Password:</label>
						<input id="password" type="text" />
						<button id="loginBtn" onClick={this.addUser}>
							Sign me up!
						</button>
					</section>
				</div>
			</div>
		);
	}


}
export default SignUp;