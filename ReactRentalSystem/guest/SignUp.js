import React from "react";
import ReactDOM from "react-dom";
import {Modal} from "./Modal.js"


class SignUp extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      show: false,
      successful: false
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.setSuccess = this.setSuccess.bind(this);
    this.setFailed = this.setFailed.bind(this);
    this.addUser = this.addUser.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  setSuccess = () => {
  	this.setState({ successful: true });
  }

  setFailed = () => {
  	this.setState({ successful: false });
  }
 
  addUser() {
	let that = this;
	console.log("reached here");
	console.log("address" + address.value);
    console.log("pincode" + pincode.value);
	let hashedPassword = that.passwordHash(password.value);
   if(username.value != "" && firstname.value != "" && lastname.value!= "" && email.value!= "" && password.value != "" && this.validateEmail(email.value) 
    	&& address.value !="" && pincode.value != "") {
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
	   			password: hashedPassword,
	   			role: "member",
	   			address: address.value,
	   			pincode: pincode.value
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
	   			return response.json();
	   		}
	   	}).then(function(data){
	   		 console.log(data.body);
	   		 if(data.body != "\"user already exist\"") {
	   		 	console.log("came here");
               that.setSuccess();
	   		   that.showModal();
	   		}else {
              alert("Username already exist! Please, try with different username.");
	   		}
	   	});
	 } else {
	  	that.setFailed();
	  	console.log("values are empty");
	  	that.showModal();
	  }
	}

  validateEmail(email) 
  {
   if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
    {
      return (true)
    }

    alert("Invalid Email");
      return (false)
  }

  passwordHash(password){
   	const bcrypt = require('bcryptjs');
   	console.log(password);
    // Hashing a password prior to storage
    let salt = bcrypt.genSaltSync(10); // New salt everytime!
    let passHash = bcrypt.hashSync(password, salt);
    return passHash;
   }

  render() {
		return (

			<div>
			    <Modal show={this.state.show} handleClose={this.hideModal}>
			    { this.state.successful ? <p>Signup was successful</p> : <p>Signup failed</p> }
                </Modal>
				<div className="box">
					<header>
						<h1 className="fh-custom-font">Signup</h1>
					</header>
					<section id="loginForm">
						<label>*Username:</label> <input id="username" type="text"/>
						<label>*First name:</label>
						<input id="firstname"  type="text"/>
						<label>*Last name:</label>
						<input id="lastname"  type="text" />
						<label htmlFor = "email">*Email: </label>
						<input type="email" id="email" placeholder="email" />
						<label htmlFor = "password">*Password: </label>
						<input type="password" id="password" placeholder="password"/>
						<label htmlFor = "address">*Address:</label>
						<textarea id="address" name="adress" rows="4" cols="10" maxLength = "50">
						</textarea>
						<label htmlFor = "pincode">*Pincode:</label>
						<input type="number" id="pincode" name="numbers" min="8" max="10"/>
						<button id="signUpBtn" onClick={this.addUser}>
							Sign me up!
						</button>
					</section>
					<p> * all fields are required</p>
				</div>
			</div>
		);
	}


}
export default SignUp;