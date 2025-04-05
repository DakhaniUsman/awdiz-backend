import express from "express";

console.log("Hello from Index");

// here we are going to create express server

const app = express();

app.get("/", (req, res) => {
  return res.send("Welcome to Express Server 0_0 ");
});

const backendPort = 8000;

app.listen(backendPort, () => {
  console.log("Server is running on port 8000");
});
