import React from "react";
import ReactDOM from "react-dom";
//import bookList from "../bookList.json";
import images from '../libimages/*.jpg';


class AdminActivity extends React.Component {
	
	constructor(props)
	{
		super(props);
		this.state = {bookList:[]};
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
    
	addBook() {

	  let that = this;
	  let authorArr = (author.value).split(",")
      fetch('https://16jf7g3elc.execute-api.us-east-1.amazonaws.com/default/addbooks', {
            method: 'POST', 
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "title":title.value,
                "author": authorArr
            }),
        }).then(function(response) {
        	console.log("hello**");
            console.log('Request status code: ', response.statusText, response.status, response.type);
            if (response.status == 200) {
            	that.refreshPage();
        		return response.json();
        	}
         });
	}

  

	deleteBook(i) {
	  let that = this;
	  console.log("id to delete"+i);

      fetch('https://5w0xedmfh4.execute-api.us-east-1.amazonaws.com/default/removebooks', {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "id":i,
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
	        {console.log(book.id)}
			return <tr key = {"book"+i}>
			<td><button type="button" id = "Delete" onClick={that.deleteBook.bind(that,book.id)}>Delete</button></td>
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