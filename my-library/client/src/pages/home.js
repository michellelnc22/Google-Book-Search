import React, { Component } from "react"; 
import Nav from "../components/nav"; 
import Jumbotron from "../components/jumbotron"; 
import API from "../utilities/API"; 
import Search from "../components/search/search"; 
import Result from "../components/search/results";

class Home extends Component {

    state = {

        books: [], 
        title: "", 
        author: "", 
        synopsis: ""
    }; 

    componentDidMount() {
        this.loadBooks(); 
    }

    loadBooks = () => {
        API.getBooks()
        .then(res =>
            this.setState({ books: res.data})
            )
            .catch(err => console.log(err)); 
    }; 

    handleInputChange = event => {
        const { name, value} = event.target; 
        this.setState({
            [name]: value
        }); 
    }; 

    handleFormSubmit = event => {
        event.preventDefault(); 
        API.getGoogleSearchBooks(this.state.title)
        .this(res => {
            this.setState({
                results: res.data.items
            })
        }).catch(err => console.log(err)); 
    }; 

    handleSaveBook = event => {
        event.preventDefault(); 

        const bookId = event.target.getAttribute("data-id")
        const newState = {...this.state}
        let targetBook = this.state.results.filter(book => book.id === bookId)

        const newBook = {
            title: targetBook[0].volumeInfo.title, 
            author: targetBook[0].volumeInfo.authors, 
            synopsis: targetBook[0].volumeInfo.description, 
            image: targetBook[0].volumeInfo.imageLinks.thumbnail, 
            link: targetBook[0].volumeInfo.infoLink
        }

        if (this.state.books[bookId]) {
            console.log("You already have that book")
            return 
        } else {
            newState.books[bookId] = newBook 
        }

        this.setState(newState)

        API.saveBook({
            title: targetBook[0].volumeInfo.title, 
            author: targetBook[0].volumeInfo.authors, 
            synopsis: targetBook[0].volumeInfo.description, 
            image: targetBook[0].volumeInfo.imageLinks.thumbnail, 
            link: targetBook[0].volumeInfo.infoLink
        })
    }

    render() {
        return(
            <div>
                <Nav />
                <Jumbotron>
                    <h1>Books in My Collection</h1>
                </Jumbotron>
                <div className="container">
                <Search
                  handleFormSubmit = {this.handleFormSubmit}
                  handleInputChange = {this.handleInputChange} 
                />

                <div className="container=fluid" id="results-area">
                    {this.state.results.map((book) => {

                        return (
                            <Result
                            key={book.id}
                            title={book.volumeInfo.title}
                            id={book.id}
                            author={book.volumeInfo.authors}
                            image={book.volumeInfo.imageLinks.thumbnail}
                            description={book.volumeInfo.description}
                            link={book.volumeInfo.infoLink}
                            saveBook={this.handleSaveBook}
                            />
                        )
                    
                    })}
                </div>
                </div>
            </div>
        ); 

    }

}

export default Home; 