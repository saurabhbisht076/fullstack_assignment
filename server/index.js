const express = require('express')
const app = express();
var cors = require('cors')
app.use(cors())
const {getAllCards,addCardData,cardByTitle} = require('./controllers/card.controller');
const mongoose = require('mongoose');
app.use(express.json())
mongoose.connect("mongodb+srv://bsaurabh482:RIlH9Rzn1VObPaRM@cluster0.gepxo.mongodb.net/saurabh?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to the saurabh database on localhost');
}).catch((error) => {
  console.error('Error connecting to the database', error);
});




app.get('/cards',async (req,res)=>{
    await getAllCards(req,res);
})

app.get('/cards/:title',async (req,res)=>{
    await cardByTitle(req,res);
})
app.post('/addcards/',async (req,res)=>{
    await addCardData(req,res);
})

app.listen(4000),async ()=>{
    console.log("started");
}

