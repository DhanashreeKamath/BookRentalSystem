import React from "react";
import ReactDOM from "react-dom";
const bcrypt = require('bcryptjs');
import {Modal} from "./Modal.js"

class Login extends React.Component {
  constructor(props)
  {
    super(props)
    {
        this.roleChange = props.roleChange;
        this.loginParse = this.loginParse.bind(this);
        this.state = {
           show: false
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

 loginParse() {
    let that = this;

    fetch('https://l9el4bn6z9.execute-api.us-east-1.amazonaws.com/default/login', {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            username: username.value,
            // password: password.value
        })
        }).then(function(response) {
            // console.log('Request status code: ', response.statusText, response.status, response.type);
            if (response.status == 200) {
                return response.json();
            }
        }).then(function(data) {
            console.log(data.body);
            if (data.body != "Username or password is incorrect"){
              let verified = bcrypt.compareSync(password.value, data.body.password);
              if(verified) {
                  console.log("login successful")
                that.roleChange(data.body.role, data);
              } else {
                that.showModal();
              }
            } else {
                that.showModal();
            }
        });
}


render()
{
    return <div><main className ="box">
         <Modal show={this.state.show} handleClose={this.hideModal}>
                <p>Incorrect username / password</p>
        </Modal>
        <header>
            <h1 className="fh-custom-font">Login</h1>
        </header>
        <section id="loginForm">
            <label htmlFor="Username">Username: </label>
            <input type="username" name="username" id="username" required placeholder="username" />
            <label htmlFor="password">Password: </label>
            <input type="password" id="password" placeholder="password"/>
            <button type="button" id = "loginBtn" onClick={this.loginParse}>Login</button>
        </section>
    </main>
    <footer>&#127926;&copy; Copyright Book Rental &#127925; </footer>
    </div>;
}
    
}

export default Login;