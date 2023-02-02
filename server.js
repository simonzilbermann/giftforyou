const http=require('http');
const port=process.env.PORT || 4477;
const app=require('./app');
const server=http.createServer(app);
server.listen(port,()=>{console.log("Server is on the Air")});
