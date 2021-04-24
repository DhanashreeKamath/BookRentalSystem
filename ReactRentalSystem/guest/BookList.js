import React from "react";
import ReactDOM from "react-dom";
//import bookList from "../bookList.json";
import images from '../libimages/*.jpg';


class BookList extends React.Component {
	
	constructor(props)
	{
		super(props);
		this.state = {bookList:[]};
	}

	componentDidMount() {
		let that = this;
		fetch('https://51st8baw13.execute-api.us-east-1.amazonaws.com/default/getBooksList')
		.then(function(response) {
			console.log(response);
        	if (response.status == 200) {
        		return response.json();
        }
 
        })
        .then(function(data) {
        	console.log(data.body["Items"]);
        	if (data) {
            	that.setState({bookList:data.body["Items"]});
			}
        });
	}

    render(){

      let that=this;

      return <div><main className ="box">
		<header>
			<h1 className="fh-custom-font"> Book Rental System</h1>
			<h2> Our BookList</h2>
		</header>
		<table>
		<thead> 
		<tr> 
		<td>Book </td>
		<td> Authors </td>
		</tr>
		</thead>

       <tbody>
	  {(this.state.bookList).map((books) => {
		return <tr key = {books.title}>
		<td>{books.title}</td>
		<td> {(books.author).join(", ")}</td>
		</tr>
	  }

	  )}
	  </tbody>
	  </table>
	  </main>
	  <footer>&#127926;&copy; Copyright Book Rental &#127925;</footer></div>;
	}
}
export default BookList;