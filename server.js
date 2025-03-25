import express from "express";
import morgan from 'morgan';
import methodOverride from 'method-override';
import "./db/connection.js";
import carsRouter from "./controllers/carroutes.js";

const app = express();
const PORT = process.env.PORT || "3000";

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(morgan('dev'));


// Routes
app.use("/", carsRouter);

app.listen(PORT, () => {
    console.log(`App is running on port: ${PORT}`);
  });