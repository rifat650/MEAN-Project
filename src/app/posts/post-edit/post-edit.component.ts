import { Component, EventEmitter, inject, Input, Output, OnChanges } from '@angular/core';
import { PostUtilityService } from './../post-utility.service';
import { PostsService } from '../../posts.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Post } from '../../post.model';

@Component({
  selector: 'app-post-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnChanges {
  postService = inject(PostsService);
  postUtilityService = inject(PostUtilityService);

  @Input() titleFeildValue = '';
  @Input() descriptionFeildValue = '';
  @Input() postPerPAge: number = 5;
  @Input() CurrentPAge: number = 1;
  @Input() imagepathValue = '';
  @Output() CancleBtnclicked = new EventEmitter<void>();
  @Input() postId = '';
  @Output() getUpdatedPost = new EventEmitter<{ posts: Post[], totalPosts: number }>();

  reactiveForm = this.postUtilityService.createPostForm({
    title: this.titleFeildValue,
    description: this.descriptionFeildValue,
    image: this.imagepathValue
  });

  imageFile: File | null = null;

  ngOnChanges() {
    this.reactiveForm = this.postUtilityService.createPostForm({
      title: this.titleFeildValue,
      description: this.descriptionFeildValue,
      image: this.imagepathValue
    });
    this.imageFile = null;
  }

  cancleClicked() {
    this.CancleBtnclicked.emit();
  }

  newimageAdded(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.imageFile = file;
      this.postUtilityService.handleImageUpload(event, this.reactiveForm, (imagePreview) => {
        this.imagepathValue = imagePreview;
      });
    }
  }

  updatePost() {
    if (this.reactiveForm.valid) {
      const title = this.reactiveForm.get('title')?.value;
      const description = this.reactiveForm.get('description')?.value;

      this.postService.updatePost(this.postId, title, description, this.imageFile).subscribe({
        next: () => {
          this.postService.getPosts(this.postPerPAge, this.CurrentPAge).subscribe({
            next: (postData) => {
              this.getUpdatedPost.emit(postData);
              this.cancleClicked();
            },
            error: (error) => {
              console.error('Error fetching updated posts:', error);
            }
          });
        },
        error: (error) => {
          console.error('Error updating post:', error);
        }
      });
    }
  }
}