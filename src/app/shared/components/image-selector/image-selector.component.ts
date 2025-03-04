import {Component, OnInit, ViewChild} from '@angular/core';
import {ImageService} from './image.service';
import {Observable} from 'rxjs';
import {BlogImage} from '../../models/blogeImage.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.scss'
})
export class ImageSelectorComponent implements OnInit{

  file?:File;
  fileName: string = '';
  title: string = '';
  images$: Observable<BlogImage[]>

  @ViewChild('form', {static:false}) imageUploadForm?: NgForm;

  constructor(
    private imageService: ImageService
  ) {

  }

  ngOnInit() {
    this.getImages();
  }
  selectImage(image: BlogImage) {
    this.imageService.selectImage(image)
  }
  onFileUploadChange(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0]
  }

  uploadImage() {
    if (this.file && this.fileName !== '' && this.title !== ''){
      this.imageService.uploadImage(this.file,this.fileName,this.title).subscribe({
        next: res=>{
          //console.log(res)
          this.imageUploadForm?.resetForm()
          this.getImages();
        },
        error: err => {

        }
      })
    }
  }

  private getImages(){
    this.images$ =this.imageService.getAllImages();
  }



}
