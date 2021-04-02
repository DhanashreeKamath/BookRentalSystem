import React from "react";
import ReactDOM from "react-dom";
import indexImg from "../libimages/IndexImg.jpg";


function Home(props){ 
	return <div><main className ="box">
		<header>
			<h1 className="fh-custom-font"> Book Rental System</h1>
			<h2> Introduction</h2>
		</header>
		<p>Union city music is the best destination for the music lovers to interact and perform.It provides ways for people to learn , mentor and play music. It is not only for professionals but also for hobbyists.Learn from expert teachers.</p>
		<figure>
			<img src = {indexImg} alt="Book Image" id="indexImg"/>
			<figcaption>Book Rental.</figcaption>
		</figure>
	</main>
	<footer>&#127926;&copy; Copyright Book Rental &#127925; </footer></div>;
}

export default Home;
