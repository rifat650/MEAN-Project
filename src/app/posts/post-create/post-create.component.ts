import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, NgForm } from '@angular/forms';
import { Post } from '../../post.model';
import { PostsService } from '../../posts.service';
@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatCardModule, MatButtonModule, FormsModule,],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent {
  postService=inject(PostsService);
  enteredTitle = "";
  enteredContent = "";
  onAddPost(postForm:NgForm) {
    this.postService.addPost(postForm.value.title, postForm.value.description);
    postForm.resetForm()
  }
}
