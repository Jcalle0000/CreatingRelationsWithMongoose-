const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

app.set('view engine','ejs') // EJS - html with JS

mongoose.connect(process.env.DB_CONNECT, { // Connected to ThirdDatabase 
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
  
mongoose.connection
  .once("open", 
        () => console.log("Connected - Referencing Models Backend"
        + "\nlocalhost:2525/api/people "
        )
  )
  .on("error", (error) => {
    console.log("Your error", error);
});

// BodyParser - POST Requests
// Sending data in some form of a data object
//( req.body is an object)
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //
// app.use(cookieParser());

// Import Routes
const peopleRoute = require("./routes/people");
const storiesRoute = require("./routes/stories");

app.use("/api/people", peopleRoute);
app.use("/api/stories", storiesRoute);

app.listen(process.env.PORT || 2525);