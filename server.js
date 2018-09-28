var express = require("express");
var app = express();
app.use(express.static(__dirname + "/game"));
 
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/game/main.html");
});
 
app.listen(9000, function () {
    console.log("Listening on port 9000");
});