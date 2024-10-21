const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://darcygravan:k97oB8oseO3lhj1A@cluster0.kcyuj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
   .then(() => console.log('connected to data base'))
   .catch((error) => console.log('connection faild', error))
const path=require('path')
const express = require('express');
const app = express();
const Post = require('./post')
const cors = require('cors');
const bodyParser = require('body-parser');
const multer=require('multer');
const MIME_TYPE_MAP={
   'image/png':'png',
   'image/jpeg':'jpg',
   'image/jpg':'jpg'
}
const storage=multer.diskStorage({
   destination:(request,file,callback)=>{
      const isVAlid=MIME_TYPE_MAP[file.mimetype];
      let error=new Error("invalid mime type");
      if(isVAlid){
         error=null
      }
      callback(error,'backend/images')
   },
   filename: (request, file, callback) => {
      const name=file.originalname.toLowerCase().split(' ').join('-')
      const extention=MIME_TYPE_MAP[file.mimetype];
      callback(null,name+'-'+Date.now()+'.'+extention)
   }
})

app.use(bodyParser.json());
app.use('/images/',express.static(path.join('backend/images')))
app.use(cors());
app.use(cors({
   origin: 'http://localhost:4200'
}));
app.use(cors({
   origin: 'http://localhost:4200',
   methods: ['GET', 'POST', 'PUT', 'DELETE'],
   allowedHeaders: ['Content-Type', 'Authorization']
}));

const deletePost = (req, res) => {
   Post.deleteOne({ _id: req.params.id }).then((result) => {
      res.status(200).json({
         mesage: 'post deleted succcessfully'
      })
   })

}
const updatePost = (req, res) => {
   let imagePath = req.body.imagePath;
   if (req.file) {
      const url = req.protocol + '://' + req.get('host');
      imagePath = url + '/images/' + req.file.filename;
   }
   const post = new Post({
      _id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      imagePath: imagePath
   });

   Post.updateOne({ _id: req.params.id }, post).then((result) => {
      console.log(result);
      res.status(200).json({ message: 'Update successful!', imagePath: imagePath });
   }).catch(error => {
      res.status(500).json({ message: "Couldn't update post!" });
   });
}
const getAllPosts = (req, res) => {
   const pageSize = Number(req.query.pagesize);
   const currentPage = Number(req.query.page);
   let fetchedPosts;
   const postQuery = Post.find();

   if (pageSize && currentPage) {
      postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
   }

   postQuery.then((documents) => {
      fetchedPosts = documents;
      return Post.countDocuments();
   }).then(count => {
      res.status(200).json({
         posts: fetchedPosts,
         totalPosts: count
      });
   }).catch(error => {
      res.status(500).json({
         message: "Fetching posts failed!"
      });
   });
}
const createNewPost = (req, res) => {
   const url=req.protocol+'://'+req.get('host')
   const post = new Post({
      title: req.body.title,
      description: req.body.description,
      imagePath:url+'/images/'+req.file.filename
   });

   post.save()
      .then((createdPost) => {
         res.status(201).json({
            message: 'post added successfully',
            post:{
               id:createdPost._id,
               title: createdPost.title,
               description: createdPost.description,
               imagePath: createdPost.imagePath
            }
         });
      })
      .catch((error) => {
         console.error('Error saving post:', error);
         res.status(500).json({
            message: 'Error saving post'
         });
      });
}


app.route('/api/posts/:id').delete(deletePost).put(multer({ storage: storage }).single('image'), updatePost);

app.route('/api/posts').get(getAllPosts).post(multer({ storage: storage }).single('image'), createNewPost);

module.exports = app;