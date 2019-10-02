const path = require("path"); 
const router = require("express").Router(); 
const apiRoutes = require("./api"); 

//API Routes

router.use("/api", apiRoutes); 

//If no API routes are hit, send in the React app
router.use(function(req, res) {
    res.sendFile(path.join(_dirname, "../client/build/index.html")); 
}); 

module.exports = router; 