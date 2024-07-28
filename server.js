
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors" 

import { mongoDbConnection } from "./config/mongodb.js";
import categoryRouter from "./routes/category.js"; 
import productRouter from "./routes/product.js"

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
  origin : "http://localhost:3000",
  credentials : true,
}));


// static folder 
app.use(express.static("public"));

// routes 
app.use("/api/v1/category", categoryRouter); 
app.use("/api/v1/product", productRouter); 


// listen server
app.listen(PORT, () => {
  mongoDbConnection(),
  console.log(`Server is running on port ${PORT}`.bgGreen.black);
})


