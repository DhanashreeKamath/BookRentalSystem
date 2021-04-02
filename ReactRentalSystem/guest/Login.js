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
    let userinfo = {"name": "Book Rental"};
    if(email.value == "admin@email.org")
        this.roleChange("admin", userinfo)
     else if (email.value == "member@email.org")  
        this.roleChange("member", userinfo)
     else
        this.roleChange("guest", userinfo)
}

render()
{
    return <div><main className ="box">
        <header>
            <h1 className="fh-custom-font">Login</h1>
        </header>
        <section id="loginForm">
            <label htmlFor="email">Email: </label>
            <input type="email" name="email" id="email" required placeholder="email" />
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