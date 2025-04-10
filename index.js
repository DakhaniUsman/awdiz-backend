import express from "express";
import { Login, Register } from "./controllers/auth.controllers.js";
import { Product } from "./controllers/product.controllers.js";
import AllRoutes from "./routes/index.js";

console.log("Hello from Index");

// here we are going to create express server

const books = [{ id: 1, name: "Death Note", author: "Light Yagami" }];

const app = express();

app.use(express.json())

app.use("/api/v1", AllRoutes)

app.get("/", (req, res) => {
   res.send("Welcome to Express Server 0_0 ");
});
app.get("/books", (req,res)=>{
  console.log("Inside Books!")
   res.send(`${books.map((book)=>(
    `${book.id}. ${book.name} by ${book.author}`
  ))}`)
});

app.get("/products", (req,res)=>{
  console.log("Inside Products!")

  res.send("My Products...")
})

app.get("/greet", (req,res)=>{
  console.log("Inside Greet!")

  res.send("Welcome!")
})

app.post("/register", Register);
app.post("/products",Product);
app.post("/login", Login);

app.get("/hello", (req,res)=>{
  res.send("Welcome to Aincrad")
})

app.get("/sao", (req,res)=>{
  res.send("Welcome to SAO")
})

app.use((req, res) => {
  res.status(404).send("OOPS Looks like you are lost >_<");
});


const backendPort = 8000;

app.listen(backendPort, () => {
  console.log(`Server is running on port ${backendPort}`);
});
