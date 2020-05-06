var socket = new WebSocket("ws://172.17.0.1:8080/ws");
//http://localhost:5003/socket.io/socket.io.js
//ws://35.184.187.153:8080/ws
//ws://172.17.0.1:8080/hereIsWS
let connect = cb => {
    console.log("connecting");

    socket.onopen = () => {
        console.log("Successfully Connected");
    };

    socket.onmessage = msg => {
        console.log("-----MENSAJE NUEVOOOOO------")
        console.log(msg);


        console.log("-----------")
        cb(msg);
    };

    socket.onclose = event => {
        console.log("Socket Closed Connection: ", event);
    };

    socket.onerror = error => {
        console.log("Socket Error: ", error);
    };
};

let sendMsg = msg => {
    console.log("sending msg: ", msg);
    socket.send(msg);
};  

export { connect, sendMsg };