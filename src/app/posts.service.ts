import { Injectable } from '@angular/core';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {

  constructor() { }
  private posts:Post[]=[];
getPosts(){
return this.posts;
}
addPost(title:string,description:string){

const post:Post={
  title:title,
  description:description
}
this.posts.push(post)
}



}
