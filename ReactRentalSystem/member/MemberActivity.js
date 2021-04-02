import React from "react";
import ReactDOM from "react-dom";
import bookList from "../bookList.json";
import images from '../libimages/*.jpg';

class MemberActivity extends React.Component {

	constructor(props) {
		super(props);
		this.state = {bookList:bookList};
	}

	render(){
    return <div><main className ="box">
		<header>
			<h1 className="fh-custom-font"> Book Rental System</h1>
			<h2> Our BookList</h2>
		</header>
		<table>
		<thead> 
		<tr> 
		<td>Book </td>
		<td> Author </td>
		</tr>
		</thead>

     <tbody>
     {console.log(this.state.bookList)}
	{(this.state.bookList).map((books) => {
		console.log(books);
		return <tr key = {books.title}>
		<td>{books.title}</td>
		<td> {(books.author).join(", ")}</td>
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