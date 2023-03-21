/*
CSC 337
Daniel Peabody
3/14/2023

This is the server for the client  of the chat app.
It takes the request from the client and sends that data to the 
database to be stored.It then responds to the client with the 
messages every second to update the chat.
*/


const express = require('express')
const fs      = require('fs');
const app     = express();
const port    = 3000;
const path = require('path');
const mongoose = require('mongoose');
const { response } = require('express');


app.use(express.static('public_html'))

app.listen(port,'143.244.147.253', () => 
  console.log(`App listening at http://localhost:${port}`))
mongoose.set('strictQuery', true);
const connection_string ="mongodb://143.244.147.253/";

mongoose.connect(connection_string, {useNewUrlParser:true});
mongoose.connection.on('error', () => {
  console.log('error');
})
const Schema = mongoose.Schema;
var ChatMessageSchema = new Schema({
  time: Number,
  alias: String,
  message: String
});
var ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema );
// Save the new model instance, passing a callback
app.use(express.json())
app.post('/',(req,res)=>{
  const chat_instance = new ChatMessage({ time: Date.now(), alias: req.body.title,message: req.body.body});
  chat_instance.save()
})

async function finder(){
  const chattys = await ChatMessage.find()
  let chats = {};
  let alias = '';
  let message = '';
  let time = 0;
  for(let i = 0; i < chattys.length; i++){
    alias = chattys[i].alias;
    mess = chattys[i].message;
    time = chattys[i].time;
    chats[i] = [alias,mess,time];
  }
  return chats
}

app.get('/chats',(req,res) => {
  let retVals = []
  results = finder()
  .then((response) => {
    res.send(response)
  })
    .catch((error) => {
        console.log('THERE WAS A PROBLEM');
        console.log(error);
    });
})








