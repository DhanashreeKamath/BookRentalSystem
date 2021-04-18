import React from "react";
import ReactDOM from "react-dom";
import bookList from "../bookList.json";
import images from '../libimages/*.jpg';

class MemberActivity extends React.Component {

	constructor(props) {
		super(props);
		this.state = {bookList:bookList};
	}

 
	rent(i) {
		let books = this.state.bookList;
		books[i].status = "issued";
		books[i].rentedby = "member";
		this.setState({bookList:books});
	}
	return(i) {
        let books = this.state.bookList;
        books[i].rentedby = null;
        books[i].status = "available";
        this.setState({bookList:books});

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
		    <td><button type="button" id = "Rent" onClick={that.rent.bind(that,i)} disabled = {
		    	books.status == "issued"}>Rent</button></td>
		    <td> 
		    {books.rentedby == "member" && <button type="button" id = "Return" onClick={that.return.bind(that,i)} >Return</button>}
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