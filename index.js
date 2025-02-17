const express = require("express"); 
const app = express();

const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors());

const connectDB = require("./config/db");
connectDB();

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

const requestLogger = require('./middleware/requestLogger');
app.use(requestLogger)

const authEndpoints = require("./endpoints/authEnpoints");
app.use(authEndpoints);

const secureEndpoints = require("./endpoints/secureEndpoints");
const authMiddleware = require("./middleware/authMiddleware");
app.use("/secure",authMiddleware,secureEndpoints)
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the server" });
});

const publicEndpoints = require('./endpoints/publicEndpoints')
app.use("/public", publicEndpoints)
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server is running on port 3000");
});