import React from "react";
import ReactDOM from "react-dom";
import HomeSystem from "./Home";
import AboutSystem from "./About";
import ClubLogin from "./Login";
import BookList from "./bookList";

class GuestApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {show: "home"}
		this.roleChange = props.roleChange
	}
	homeHandler(event)
	{
		this.setState({show:"home"});
	}
	aboutHandler(event)
	{
		this.setState({show:"about"});
	}

	loginHandler(event)
	{
        this.setState({show:"login"});
	}
	bookListHandler(event)
	{
		this.setState({show:"bookList"});
	}
	membershipHandler(event)
	{
		this.setState({show:"membership"})
	}
   


 render(){ 
        let navBar = <nav className="navbox">
		<ul className = "main-menu">
			<li className = {this.state.show == "home" ? "active" : null}><a onClick={this.homeHandler.bind(this)}>Home</a></li>
			<li className = {this.state.show == "bookList" ? "active" : null}><a onClick={this.bookListHandler.bind(this)}>BookList</a></li> 
			<li className = {this.state.show == "about" ? "active" : null}><a onClick={this.aboutHandler.bind(this)}>About</a></li>
			<li className = {this.state.show == "login" ? "active" : null}><a onClick={this.loginHandler.bind(this)}>Login</a></li>
			<li className = {this.state.show == "membership" ? "active" : null}><a onClick={this.membershipHandler.bind(this)}>Membership</a></li>
		</ul>
	</nav>;
	
	let contents = null;
	switch (this.state.show) {
            case "home":
                contents = <HomeSystem role={this.state.home}/>;
                break;
            case "about":
                contents = <AboutSystem role={this.state.about}/>;
                break;
            case "login":
                contents = <ClubLogin role={this.state.login} roleChange={this.roleChange}/>;
                break;
            case "bookList":
                contents = <BookList role={this.state.bookList}/>;
                break;
            default:
                contents = <h2>This page is not implemented yet!!!</h2>;
        }
        return <div className="bodyStyle">{navBar}{contents}</div>
    }

}

export default GuestApp;