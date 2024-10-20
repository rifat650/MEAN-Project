import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PostUtilityService {

  createPostForm(initialValues: { title: string, description: string, image: string }): FormGroup {
    return new FormGroup({
      title: new FormControl(initialValues.title, Validators.required),
      description: new FormControl(initialValues.description, Validators.required),
      image: new FormControl(initialValues.image, Validators.required)
    });
  }

  handleImageUpload(event: Event, reactiveForm: FormGroup, callback: (imagePreview: string) => void): void {
    let reader = new FileReader();
    let files = (event.target as HTMLInputElement).files[0];
    reader.readAsDataURL(files);
    reader.onload = () => {
      callback(reader.result as string);
    };
    reactiveForm.patchValue({ image: files });
    reactiveForm.get('image').updateValueAndValidity();
  }
}
