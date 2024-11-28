import { Component } from '@angular/core';
import {ImageService} from './image.service';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.scss'
})
export class ImageSelectorComponent {

  file?:File;
  fileName: string = '';
  title: string = '';

  constructor(
    private imageService: ImageService
  ) {
  }

  onFileUploadChange(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0]
  }

  uploadImage() {
    if (this.file && this.fileName !== '' && this.title !== ''){
      this.imageService.uploadImage(this.file,this.fileName,this.title).subscribe({
        next: res=>{
          console.log(res)
        },
        error: err => {

        }
      })
    }
  }
}
