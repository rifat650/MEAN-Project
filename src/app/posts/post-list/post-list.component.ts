import { Component, inject, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Post } from '../../post.model';
import { MatButtonModule } from '@angular/material/button';
import { PostsService } from '../../posts.service';
import { PostEditComponent } from "../post-edit/post-edit.component";
@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [MatExpansionModule, MatButtonModule, PostEditComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  postService = inject(PostsService);
  EditingModeOn = false;
  editModeRevert() {
    this.EditingModeOn = !this.EditingModeOn
  }
  fetchPosts() {
    this.postService.getPosts().subscribe({
      next: (posts: Post[]) => {
        this.posts = posts;
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
      }
    });
  }
  ngOnInit() {
    this.fetchPosts()
  }

  onDelete(post: Post) {
    const id: string | undefined = post.id;
    this.postService.deletePost(id).subscribe({
      next: (value) => {
        this.fetchPosts();
      }
    })

  }
  postTitle = '';
  postDescription = '';
  postID: any = '';
  imagePath = ''
  onEdit(post: Post) {
    this.editModeRevert()
    this.postTitle = post.title;
    this.postDescription = post.description;
    this.postID = post.id;
    this.imagePath = post.imagePath;
  }
  hideEditPopup() {
    this.editModeRevert()
  }
  fetchingUpdatedPost(postValue: Post[]) {
    this.posts = postValue;
    this.editModeRevert()
  }
}
