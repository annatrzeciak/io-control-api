const express = require("express");
const cors = require("cors");

const app = express();
const db = require("./app/models");

const corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });


require("./app/routes/user.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/product.routes")(app);
require("./app/routes/calculation.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

