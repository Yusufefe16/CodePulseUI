import { Component } from '@angular/core';
import {AddBlogPost} from '../models/add-blog-post.model';
import {BlogPostService} from '../services/blog-post.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.scss'
})
export class AddBlogpostComponent {
  model: AddBlogPost;

  constructor(
    private blogPostService:BlogPostService,
    private router: Router
  ) {
    this.model = {
      title: '',
      shortDescription: '',
      urlHandle: '',
      content: '',
      featuredImageUrl: '',
      author: '',
      isVisible: true,
      publishedDate: new Date()
    }
  }


  onFormSubmit() {
    console.log(this.model)
    this.blogPostService.createBlogPost(this.model).subscribe({
      next:(res)=>{
        this.router.navigateByUrl('/admin/blogposts')
      },
      error:err=>{
        console.log(err)
      }
    })
  }
}
