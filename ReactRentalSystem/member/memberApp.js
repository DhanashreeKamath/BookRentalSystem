import React from "react";
import ReactDOM from "react-dom";
import HomeSystem from "../guest/Home";
import AboutSystem from "../guest/About";
import MemberActivity from "./MemberActivity";

class MemberApp extends React.Component {
	constructor(props){
		super(props);
		this.state = {show: "home"};
		this.roleChange = props.roleChange;
		this.userInfo = props.userInfo;
	}

	homeHandler(event)
	{
		this.setState({show:"home"});
	}
	bookListHandler(event)
	{
		this.setState({show:"bookList"});
	}
	aboutHandler(event)
	{
		this.setState({show:"about"});
	}

	logoutHandler(event)
	{
		this.setState({show:"logout"});
		this.roleChange("guest",null);
	}
	
	membersOnlyHandler(event)
	{
		this.setState({show:"history"})
	}

	render(){
		let navBar = <nav className="navbox">
		<ul className = "main-menu">
		<li className = {this.state.show == "home" ? "active" : null}><a onClick={this.homeHandler.bind(this)}>Home</a></li>
		<li className = {this.state.show == "bookList" ? "active" : null}><a onClick={this.bookListHandler.bind(this)}>BookList</a></li>
		<li className = {this.state.show == "about" ? "active" : null}><a onClick={this.aboutHandler.bind(this)}>About</a></li>
		<li className = {this.state.show == "logout" ? "active" : null}><a onClick={this.logoutHandler.bind(this)}>Logout</a></li>
		<li className = {this.state.show == "history" ? "active" : null}><a onClick={this.membersOnlyHandler.bind(this)}>History</a></li>
		</ul>
		</nav>;

		let info = <p>{this.userInfo.firstName} {this.userInfo.lastName}: {this.userInfo.role}</p> ;

		let contents = null;
		switch (this.state.show) {
			case "home":
			contents = <HomeSystem />;
			break;
			case "about":
			contents = <AboutSystem />;
			break;
			case "bookList":
			contents = <MemberActivity userInfo={this.userInfo}/>;
			break;
			default:
			contents = <h2>This page is not implemented yet!!!</h2>;
		}
		return <div className="bodyStyle" >{navBar}{info}{contents}</div>
	}
}
export default MemberApp;