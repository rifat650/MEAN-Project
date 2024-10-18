import { Component, inject, Input, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Post } from '../../post.model';
import { MatButtonModule } from '@angular/material/button';
import { PostsService } from '../../posts.service';
@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [MatExpansionModule, MatButtonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit {
posts:Post[]=[];

  postService=inject(PostsService);

  ngOnInit(){
this.posts=this.postService.getPosts()
  }
}
