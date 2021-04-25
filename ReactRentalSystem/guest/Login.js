import React from "react";
import ReactDOM from "react-dom";



class Login extends React.Component {
  constructor(props)
  {
    super(props)
    {
        this.roleChange = props.roleChange;
        this.loginParse = this.loginParse.bind(this);
    }
  }

 loginParse() {
    let that = this;
    //console.log(username.value, password.value);

    fetch('https://l9el4bn6z9.execute-api.us-east-1.amazonaws.com/default/login', {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            username: username.value,
            password: password.value
        })
        }).then(function(response) {
            // console.log('Request status code: ', response.statusText, response.status, response.type);
            if (response.status == 200) {
                return response.json();
            }
        }).then(function(data) {
            console.log(data.body.role);
            if (data){
            
            that.roleChange(data.body.role, data);
         }
        });
}

render()
{
    return <div><main className ="box">
        <header>
            <h1 className="fh-custom-font">Login</h1>
        </header>
        <section id="loginForm">
            <label htmlFor="username">username: </label>
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