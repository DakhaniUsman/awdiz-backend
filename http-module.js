const http = require("http");

const server = http.createServer((req,res)=>{
    console.log("Inside Server...")

    
    if (req.method == "GET" && req.url=="/books"){
        console.log("Inside if")
        res.end("My Books")
    } else if (req.method == "GET" && req.url == "/products"){
        console.log("Inside Else If")
        res.end
    }
})

const backendPort = 8000;

server.listen(backendPort, ()=> {
    console.log("Server is running on port 8000");
})