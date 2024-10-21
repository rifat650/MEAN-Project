import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor() { }
  http = inject(HttpClient);

  getPosts(postsPerPage: number, currentPage: number): Observable<{ posts: Post[], totalPosts: number }> {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    return this.http.get<{ posts: any[], totalPosts: number }>('http://127.0.0.1:3000/api/posts' + queryParams)
      .pipe(
        map((postData) => {
          return {
            posts: postData.posts.map(post => {
              return {
                title: post.title,
                description: post.description,
                id: post._id,
                imagePath: post.imagePath,
              };
            }),
            totalPosts: postData.totalPosts
          };
        })
      );
  }

  addPost(title: string, description: string, image: File) {
    const post = new FormData();
    post.append('title', title);
    post.append('description', description);
    post.append('image', image, title);
    return this.http.post('http://127.0.0.1:3000/api/posts', post)
  }

  deletePost(postId: string | undefined) {
    return this.http.delete(`http://127.0.0.1:3000/api/posts/${postId}`)
  }

  updatePost(postId: string, title: string, description: string, image: File | null) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('description', description);
    if (image) {
      postData.append('image', image, title);
    }
    return this.http.put(`http://127.0.0.1:3000/api/posts/${postId}`, postData);
  }
}