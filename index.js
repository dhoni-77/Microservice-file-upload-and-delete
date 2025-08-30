const express = require("express");
const dotenv = require("dotenv");
const mediaRoutes = require("./routes/mediaRoutes");

const {connectDb} = require("./config/database");

dotenv.config();
const app = express();
const port = process.env.port ;


app.use(express.json());
app.use("/uploads", express.static("uploads")); 

// Routes
app.use("/api/media",mediaRoutes);


app.listen(port,() => {
    connectDb();
    console.log(`Server running on port ${port}`);
});
