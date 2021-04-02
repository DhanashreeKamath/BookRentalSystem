import React from "react";
import ReactDOM from "react-dom";
import indexImg from "./libimages/IndexImg.jpg";
import "./club.css";
import MemberApp from "./member/memberApp";
import AdminApp from "./admin/adminApp";
import GuestApp from "./guest/guestApp";


class App extends React.Component {
	constructor(props) {
		super(props);
		this.roleChange = this.roleChange.bind(this);
        this.state = {role: "guest", userInfo:{}}; 
        //this.userInfo = null;// We will have "user" and "admin" roles too.
    }

    roleChange(roleVal, userInfo) {
     	this.setState({role: roleVal, userInfo:userInfo});
     	console.log(userInfo)
    }
    // Renders component based on current state and props
    render() {
    let contents = null;
        switch (this.state.role) {
            case "member":
                contents = <MemberApp roleChange={this.roleChange} userInfo={this.state.userInfo}/>;
                break;
            case "admin":
                contents = <AdminApp  roleChange={this.roleChange} userInfo={this.state.userInfo}/>;
                break;
            case "guest":
                contents = <GuestApp  roleChange={this.roleChange}/>;
                break;
            default:
                contents = <h2>Warning something went wrong!!!</h2>;
        }
        return <div>
        {contents}
        </div>
   
    }
}
ReactDOM.render(<App />, document.getElementById("root"));