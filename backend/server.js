import http from "http";
import app from "./app/app.js";

//create server
const Port = process.env.Port || 8000;
const server = http.createServer(app);
server.listen(Port, console.log(`Server is currently running at port ${Port}`));
