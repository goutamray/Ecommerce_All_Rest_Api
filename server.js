import dotenv from "dotenv";
import express from "express";
import colors from "colors"; 
import { mongoDbConnection } from "./config/mongodb.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import categoryRouter from "./routes/category.js";
import productRouter from "./routes/product.js";
import cors from "cors";
import bodyParser from "body-parser";

// enviroment variable
dotenv.config();

// port config
const PORT = process.env.PORT || 6060 

// init express 
const app = express();


// set middlewares  
app.use(express.json());
app.use(express.urlencoded({ extends : false }));
app.use(bodyParser.json()); 
app.use(cors({
  origin : "http://localhost:3001",
  credentials : true,
}));


// static folder 
app.use(express.static("public"));

// routes 
app.use("/api/v1/category", categoryRouter); 
app.use("/api/v1/product", productRouter); 

// error handler 
app.use(errorHandler); 


// listen server
app.listen(PORT, () => {
  mongoDbConnection(),
  console.log(` Server is running on port ${PORT}`.bgGreen.black);
})


