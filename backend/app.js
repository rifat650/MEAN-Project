const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://darcygravan:k97oB8oseO3lhj1A@cluster0.kcyuj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
   .then(() => console.log('connected to data base'))
   .catch((error) => console.log('connection faild', error))

const express = require('express');
const app = express();
const Post = require('./post')
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(cors());
app.use(cors({
   origin: 'http://localhost:4200'
}));
app.use(cors({
   origin: 'http://localhost:4200',
   methods: ['GET', 'POST', 'PUT', 'DELETE'],
   allowedHeaders: ['Content-Type', 'Authorization']
}));


app.get('/api/posts', (req, res) => {
   Post.find().then((documents) => {
      res.status(200).json(documents)
   })

})

app.post('/api/posts', (req, res) => {
   const post = new Post({
      title: req.body.title,
      description: req.body.description
   });

   post.save()
      .then(() => {
         res.status(201).json({
            message: 'post added successfully'
         });
      })
      .catch((error) => {
         console.error('Error saving post:', error);
         res.status(500).json({
            message: 'Error saving post'
         });
      });
});

app.delete('/api/posts/:id', (req, res) => {
   Post.deleteOne({ _id: req.params.id }).then((result) => {
      res.status(200).json({
         mesage: 'post deleted succcessfully'
      })
   })

})
module.exports = app;