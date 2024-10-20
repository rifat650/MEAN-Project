import { Router } from '@angular/router';
import { PostsService } from '../../posts.service';
import { PostUtilityService } from './../post-utility.service';
import { Component, inject, OnInit } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './post-create.component.html',
  styleUrl:'./post-create.component.css'
})
export class PostCreateComponent implements OnInit {
  postService = inject(PostsService);
  postUtilityService = inject(PostUtilityService);
  router = inject(Router);
  reactiveForm = this.postUtilityService.createPostForm({ title: '', description: '', image: '' });
  imagePreview = '';

  ngOnInit() {
    this.reactiveForm = this.postUtilityService.createPostForm({ title: '', description: '', image: '' });
  }

  onImageChanged(event: Event) {
    this.postUtilityService.handleImageUpload(event, this.reactiveForm, (imagePreview) => {
      this.imagePreview = imagePreview;
    });
  }

  onAddPost() {
    if (this.reactiveForm.invalid) return;

    this.postService.addPost(this.reactiveForm.value.title, this.reactiveForm.value.description, this.reactiveForm.value.image).subscribe({
      next: () => {
        this.reactiveForm.reset();
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error adding post:', error);
      }
    });
  }
}
