var express = require("express");
var app = express();

app.use("/", express.static("./static"))
app.listen(8080, () => {
    console.log("Server started successfully on port 8080");
  });