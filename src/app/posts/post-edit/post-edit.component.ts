import { Component, EventEmitter, inject, input, Input, Output } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PostsService } from '../../posts.service';
@Component({
  selector: 'app-post-edit',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, FormsModule],
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent {
  constructor() { }
  postService = inject(PostsService);
  @Input() titleFeildValue: string = '';
  @Input() descriptionFeildValue: string = '';
  onSubmit(form: HTMLFormElement): void {
  }
  @Output() CancleBtnclicked = new EventEmitter()
  cancleClicked() {
    this.CancleBtnclicked.emit()
  }
  @Input() postId = '';
  @Output() getUpdatedPost = new EventEmitter()
  updatePost(title: string, description: string) {
    let dataObj = {
      title: title,
      description: description
    }
    this.postService.updatePost(this.postId, dataObj).subscribe({
      next:()=>{
        this.postService.getPosts().subscribe({
          next: (value) => this.getUpdatedPost.emit(value)
        })
      }
    })

  }
}
