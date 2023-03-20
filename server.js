/*
CSC 337
Daniel Peabody
3/14/2023
*/


const express = require('express')
const fs      = require('fs');
const app     = express();
const port    = 3000;
const path = require('path');
const mongoose = require('mongoose');
const { response } = require('express');


app.use(express.static('public_html'))

app.listen(port, () => 
  console.log(`App listening at http://localhost:${port}`))
mongoose.set('strictQuery', true);
const connection_string ="mongodb+srv://danielpeabody:bulldog1297@cluster0.un7mu3u.mongodb.net/?retryWrites=true&w=majority";

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








