/*
CSC 337
Daniel Peabody
3/14/2023

This is the script for the client side of the chat app.
It takes the input from the user and sends that data to the 
server to be stored in a database. It then requests the message
data every second to update the chat.
*/
const sendButton = document.getElementById("send");
const alias = document.getElementById('alias');
const message = document.getElementById('message');
const holder = document.getElementById('messageHolder');



let url = '/chats'
let p = fetch(url);
p.then((response) => response.json())
.then((data) => {
    if(Object.keys(data).length > holder.childElementCount){
        alias.value = '';
        message.value = '';
        for(let i = 0; i < Object.keys(data).length; i ++){
            const node = document.createElement("h2");
            const textnode = document.createTextNode(data[i][0] + ":" + data[i][1]);
            node.appendChild(textnode);
            holder.appendChild(node);
    }
    }
}
)
.catch((error) => {
console.log('THERE WAS A PROBLEM');
console.log(error);
});


sendButton.addEventListener('click',(event) =>{
    let url = '/'
    fetch(url, {
    // Adding method type
    method: "POST",
    // Adding body or contents to send
    body: JSON.stringify({
        title: alias.value,
        body: message.value,
        userId: 1
    }),
    // Adding headers to the request
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})

setInterval(function () {
    let url = '/chats'
    let p = fetch(url);
    p.then((response) => response.json())
    .then((data) => {
        if(Object.keys(data).length > holder.childElementCount){
            alias.value = '';
            message.value = '';
            for(let i = Object.keys(data).length - 1; i < Object.keys(data).length; i ++){
                const node = document.createElement("h2");
                const textnode = document.createTextNode(data[i][0] + ":" + data[i][1]);
                node.appendChild(textnode);
                holder.appendChild(node);
        }
        }
    }
    )
    .catch((error) => {
    console.log('THERE WAS A PROBLEM');
    console.log(error);
});
}, 1000);
});



