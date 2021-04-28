import React from "react";
import ReactDOM from "react-dom";
import HomeSystem from "../guest/Home";
import AboutSystem from "../guest/About";
import AdminClubActivitiy from "./AdminActivity";

class AdminApp extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = {show:"home"};
		this.roleChange = props.roleChange;
		this.userInfo = props.userInfo;
	}

    homeHandler(event)
	{
		this.setState({show:"home"});
	}
	editBookHandler(event)
	{
		this.setState({show:"editBook"});
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
		this.setState({show:"membersOnly"})
	} 

	render() {
        let navBar= <nav className="navbox">
		<ul className = "main-menu">
			<li className = {this.state.show == "home" ? "active" : null}><a onClick={this.homeHandler.bind(this)}>Home</a></li>
			<li className = {this.state.show == "editBook" ? "active" : null}><a onClick={this.editBookHandler.bind(this)}>EditBooks</a></li>
			<li className = {this.state.show == "about" ? "active" : null}><a onClick={this.aboutHandler.bind(this)}>About</a></li>
			<li className = {this.state.show == "logout" ? "active" : null}><a onClick={this.logoutHandler.bind(this)}>Logout</a></li>
			{/*<li className = {this.state.show == "membersOnly" ? "active" : null}><a onClick={this.membersOnlyHandler.bind(this)}>MembersOnly</a></li>*/}
		</ul>
	</nav> ;
	let info = <p>{this.userInfo.body.firstname} {this.userInfo.body.lastname}: {this.userInfo.body.role}</p> ;

   let contents = null;
	switch (this.state.show) {
            case "home":
                contents = <HomeSystem />;
                break;
            case "about":
                contents = <AboutSystem />;
                break;
            case "editBook":
                contents = <AdminClubActivitiy />;
                break;
            default:
                contents = <h2>This page is not implemented yet!!!</h2>;
        }
        return <div className="bodyStyle">{navBar}{info}{contents}</div>
    }
}
export default AdminApp;