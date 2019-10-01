//Dependencies
const express = require("express"); 
const mongoose = require("mongoose"); 
const routes = require("./routes"); 
const app = express(); 
const PORT = process.env.PORT || 3001; 

//Middleware
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build")); 
}
//Add routes
app.use(routes); 

//Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/booksdb"); 

//Sending requests to the REACT app
app.get("*", (req, res) => {
    res.sendFile(path.join(_dirname, "./client/build/index.html")); 
}); 

//Start the API server
app.listen(PORT, function()  {
    console.log(`🌎 ==> API Server running on on PORT ${PORT}!`); 
}); 
