const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const mongoose = require("mongoose");
const UserModel = require("./models/UserModel")

const app = express();


app.use(cors());
app.use(express.json());

const connectionURL = 'mongodb://127.0.0.1:27017/flixxit';


mongoose.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Connected to MongoDB');

        try {
            // Query and retrieve data from the "fc" collection
            const users = await UserModel.find({});
            console.log(users);
        } catch (err) {
            console.error('Error retrieving data:', err);
        } finally {
            // Disconnect from the database
            mongoose.disconnect();
        }
    })
    .catch(error => {
        console.error('Error connecting to database:', error);
    });
app.use("/api/user", userRoutes);

app.listen(5000, () => {
  console.log("server started on port 5000");
});
