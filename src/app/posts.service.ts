import { inject, Injectable } from '@angular/core';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {

  constructor() { }
  http = inject(HttpClient);

  getPosts(): Observable<Post[]> {
    // Return the observable directly
    return this.http.get<Post[]>('http://127.0.0.1:3000/api/posts');
  }

  addPost(title: string, description: string) {
    const post: Post = {
      title: title,
      description: description
    };
    // Push to local array or make a POST request to the server to add
    this.http.post('http://127.0.0.1:3000/api/posts',post).subscribe({
      next(value) {
        console.log(value)
      },
    });
  }
}