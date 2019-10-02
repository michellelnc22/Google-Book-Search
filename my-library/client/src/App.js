import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; 
import Books from "./pages/books"; 
import Home from "./pages/home"; 
import Nav from "./components/nav"; 
import './App.css';

function App() {
  return (
    <Router>
    <div>
    <Nav />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/books" component={Books} />
    </Switch>
    </div>
    </Router>
  );
}

export default App;
