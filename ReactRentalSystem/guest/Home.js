import React from "react";
import ReactDOM from "react-dom";
import indexImg from "../libimages/IndexImg.jpg";


function Home(props){ 
	return <div><main className ="box">
		<header>
			<h1 className="fh-custom-font"> Book Rental System</h1>
			<h2> Introduction</h2>
		</header>
		<p className="fh-custom-font-para">Welcome to the "BOOK RENTAL SYSTEMS". It is the most convinet way to rent the books while sitting at home.</p>
		<p className="fh-custom-font-para"> We provide all types of books ranging from science to novels.
		</p>

		<figure>
			<img src = {indexImg} alt="Book Image" id="indexImg"/>
			<figcaption>Book Rental.</figcaption>
		</figure>
	</main>
	<footer>&#127926;&copy; Copyright Book Rental &#127925; </footer></div>;
}

export default Home;
