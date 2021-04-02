import React from "react";
import ReactDOM from "react-dom";
import bookList from "../bookList.json";
import images from '../libimages/*.jpg';


class AdminActivity extends React.Component {
	
	constructor(props)
	{
		super(props);
		this.state = { bookList:bookList};
	}

	addBook() {
		let authorArr = (author.value).split(",")
		let newBookDict = {title:title.value,author: authorArr};
		this.setState({bookList:this.state.bookList.concat(newBookDict)});

	}

	deleteBook(i) {
		let newArray = this.state.bookList.filter(function(book, index){
			if (index === i) 
				return false;
			else 
				return true;
		})
		console.log(newArray)
		this.setState({bookList:newArray});

	}

	render(){

		let that=this;

		return <div><main className ="box">
		<header>
		<h1 className="fh-custom-font"> Book Rental System</h1>
		<h2> Book Management</h2>
		</header>
		<details>
		<summary>Add Book</summary>
		<section id = "loginForm">
		<label htmlFor="name">Title: </label>
		<input type="text" name="title" id="title" required placeholder="Title"/>
		<label htmlFor="author">Author(s): </label>
		<input type="text" name="author" id="author" placeholder="Author"/>
		
		<button type="button" id = "Add" onClick = {this.addBook.bind(this)} >Add</button>
		</section>
		</details>

		{/* Book tabel*/}
		<h3> Books</h3>
		
		<table><thead><tr> 
		<td></td>
		<td>Title</td>
		<td>Author</td>
		</tr></thead>

		<tbody>
		{/*<ul className="ListofBooks">*/}

		{(this.state.bookList).map((book,i) => {
	        {console.log(book)}
			return <tr key = {"book"+i}>
			<td><button type="button" id = "Delete" onClick={that.deleteBook.bind(that,i)}>Delete</button></td>
			<td>{book.title} </td>
			<td> {(book.author).join(", ")}</td>
			</tr>
			}
		)}
		</tbody>
		</table>
		</main>
		<footer>&#127926;&copy; Copyright Book Rental &#127925;</footer></div>;
	}
}
export default AdminActivity;