import React from "react";
import ReactDOM from "react-dom";
import bookList from "../bookList.json";
import images from '../libimages/*.jpg';


function Activities(props) {
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
	{(bookList).map((books) => {
		return <tr key = {books.name}>
		<td>{books.name}</td>
		<td> {(books.dates).join(", ")}</td>
		</tr>
	}

	)}
	</tbody>
	</table>
	</main>
	<footer>&#127926;&copy; Copyright Book Rental &#127925;</footer></div>;
}
export default Activities;