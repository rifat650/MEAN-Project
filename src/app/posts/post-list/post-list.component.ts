import { Component, inject, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Post } from '../../post.model';
import { MatButtonModule } from '@angular/material/button';
import { PostsService } from '../../posts.service';
import { PostEditComponent } from "../post-edit/post-edit.component";
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [MatExpansionModule, MatButtonModule, PostEditComponent, MatPaginatorModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  postService = inject(PostsService);
  EditingModeOn = false;
  postsPerPage = 5;
  totalPosts = 0;
  pageSizeOptions = [1, 2, 5, 10];
  currentPage = 1;

  editModeRevert() {
    this.EditingModeOn = !this.EditingModeOn;
  }

  fetchPosts(pageSize: number, currentPage: number) {
    this.postService.getPosts(pageSize, currentPage).subscribe({
      next: (postData) => {
        this.posts = postData.posts;
        this.totalPosts = postData.totalPosts;
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
      }
    });
  }

  ngOnInit() {
    this.fetchPosts(this.postsPerPage, this.currentPage);
  }

  onDelete(post: Post) {
    const id: string | undefined = post.id;
    this.postService.deletePost(id).subscribe({
      next: () => {
        this.fetchPosts(this.postsPerPage, this.currentPage);
      },
      error: (error) => {
        console.error('Error deleting post:', error);
      }
    });
  }

  postTitle = '';
  postDescription = '';
  postID: any = '';
  imagePath = '';

  onEdit(post: Post) {
    //this.editModeRevert();
    this.EditingModeOn=true;
    this.postTitle = post.title;
    this.postDescription = post.description;
    this.postID = post.id;
    this.imagePath = post.imagePath;
  }

  hideEditPopup() {
this.editModeRevert();
//this.EditingModeOn=false;
  }

  fetchingUpdatedPost(postData: { posts: Post[], totalPosts: number }) {
    this.posts = postData.posts;
    this.totalPosts = postData.totalPosts;
    this.editModeRevert();
    //this.EditingModeOn = false;
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.postsPerPage = event.pageSize;
    this.fetchPosts(this.postsPerPage, this.currentPage);
  }
}