const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/article", require("./routes/article"));
app.use("/comment", require("./routes/comment"));

app.listen(port, () => console.log(`cage-key running on port: ${port}`));
