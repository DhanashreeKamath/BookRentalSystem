import React from "react";
import ReactDOM from "react-dom";
// import bookList from "../bookList.json";
import images from '../libimages/*.jpg';

class MemberActivity extends React.Component {

	constructor(props) {
		super(props);
		this.state = {bookList:[]};
		this.userInfo = props.userInfo;
	}
    
     componentDidMount() {
		let that = this;
		fetch('https://51st8baw13.execute-api.us-east-1.amazonaws.com/default/getBooksList')
		.then(function(response) {
			//console.log(response);
        	if (response.status == 200) {
        		return response.json();
        }
 
        })
        .then(function(data) {
        	//console.log(data.body["Items"]);
        	if (data) {
            	that.setState({bookList:data.body["Items"]});
			}
        });
	}

	refreshPage() {
       this.componentDidMount();
    }
 
	rent(i) {
	  let that = this;
      fetch('https://c5aga9wn6k.execute-api.us-east-1.amazonaws.com/default/updateBookStatus', {
            method: 'POST', 
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "statusupdateto":"notAvailable",
                "id": i,
                "rentedby" : that.userInfo.body.username
            }),
        }).then(function(response) {
            console.log('Request status code: ', response.statusText, response.status, response.type);
            if (response.status == 200) {
            	that.refreshPage();
        		return response.json();
        	}
         });
	}

	return(i) {
      let that = this;
      fetch('https://c5aga9wn6k.execute-api.us-east-1.amazonaws.com/default/updateBookStatus', {
            method: 'POST', 
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "statusupdateto":"available",
                "id": i,
                "rentedby" : "admin"
            }),
        }).then(function(response) {
            console.log('Request status code: ', response.statusText, response.status, response.type);
            if (response.status == 200) {
            	that.refreshPage();
        		return response.json();
        	}
         });
	}

	render(){
	    let that = this;
        return <div><main className ="box">
		<header>
			<h1 className="fh-custom-font"> Book Rental System</h1>
			<h2> Our BookList</h2>
		</header>
		<table>
		<thead> 
		<tr> 
		<td>Book </td>
		<td>Author </td>
		<td>Availability</td>
		<td>Rent</td>
		<td>Return</td>
		</tr>
		</thead>

       <tbody>
       {console.log(this.state.bookList)}
	   {(this.state.bookList).map((books,i) => {
		    console.log(books);
		    return <tr key = {"book"+i}>
		    <td>{books.title}</td>
		    <td>{(books.author).join(", ")}</td> 
		    <td>{books.status}</td>
		    <td><button type="button" id = "Rent" onClick={that.rent.bind(that,books.id)} disabled = {
		    	books.status == "notAvailable"}>Rent</button></td>
		    <td> 
		    {books.rentedby == that.userInfo.body.username && <button type="button" id = "Return" onClick={that.return.bind(that,books.id)} >Return</button>}
		    </td>
		    </tr>
		}
	)}
	</tbody>
	</table>
	</main>
	<footer>&#127926;&copy; Copyright Union City Book Rental &#127925;</footer></div>;
}
}
export default MemberActivity;