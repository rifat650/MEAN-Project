import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class EventTransferService {

  constructor() { }
  posts: Post[] = []

  createPost(postData: Post) {
    this.posts.push(postData);
    return this.posts;
  }

  getPosts() {
    return this.posts;
  }

}
