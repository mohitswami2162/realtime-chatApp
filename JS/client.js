const socket = io('http://localhost:8000');

const form = document.getElementById("send-container");
const msgInp = document.getElementById("msgInp");
const msgCont = document.querySelector(".container");

var audio = new Audio("sounds/Drop.mp3");

const append = (message,position) => {
    const msgElement = document.createElement("div");
    msgElement.innerText = message;
    msgElement.classList.add("message");
    msgElement.classList.add(position);
    msgCont.append(msgElement);
    if(position=="left"){
        audio.play();
    }
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const message = msgInp.value;
    append(`you: ${message}`,"right");
    socket.emit("send",message);
    msgInp.value = "";
})

const name = prompt("Enter your name");
socket.emit("new-user-joined", name);

socket.on("user-joined",name =>{
    append(`${name} joined the chat`,"right");
})

socket.on("recieve",data =>{
    append(`${data.name}: ${data.message}`,"left");
})

socket.on("leave",name =>{
    append(`${name} left the chat`,"left");
})