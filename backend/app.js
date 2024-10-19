const express=require('express');
const app=express();
const cors=require('cors');
const bodyParser=require('body-parser');
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


app.get('/api/posts',(req,res)=>{
   const posts = [
      {
         id: 1,
         title: "Learn Angular",
         description: "A beginner-friendly guide to learning Angular and building web applications."
      },
      {
         id: 2,
         title: "Master Node.js",
         description: "Comprehensive tutorial on building server-side applications with Node.js."
      },
      {
         id: 3,
         title: "Explore C++",
         description: "An in-depth guide to learning C++, from basics to advanced concepts."
      }
   ];
   res.status(200).json(posts)
})
app.post('/api/posts',(req,res)=>{
const post=req.body;
console.log(post);
res.status(201).json({
   massage:'post added successfully'
})
})
module.exports=app;