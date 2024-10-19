import { inject, Injectable } from '@angular/core';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor() { }
  http = inject(HttpClient);
  getPosts(): Observable<any[]> {
    // Return the observable directly
    return this.http.get<any[]>('http://127.0.0.1:3000/api/posts').pipe(map((postsdata) => {
      return postsdata.map(post => {
        return {
          title: post.title,
          description: post.description,
          id: post._id
        }
      })
    }));
  }
  addPost(title: string, description: string) {
    const post: Post = {
      title: title,
      description: description
    };
    return this.http.post('http://127.0.0.1:3000/api/posts', post)
  }


  deletePost(postId: string | undefined) {
    return this.http.delete(`http://127.0.0.1:3000/api/posts/${postId}`)
  }
  updatePost(postId: string, data: object) {
    return this.http.put(`http://127.0.0.1:3000/api/posts/${postId}`, data);

  }
}