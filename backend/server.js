const http = require("http")
const app = require("./app.js")

const port = process.env.Port || 4000;


const server = http.createServer(app)


server.listen(port, ()=>{
    console.log(`Server listen on port number ${port}`)
})


