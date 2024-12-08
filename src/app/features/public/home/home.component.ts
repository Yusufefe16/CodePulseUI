import {Component, OnInit} from '@angular/core';
import {BlogPostService} from '../../blog-post/services/blog-post.service';
import {async, Observable} from 'rxjs';
import {BlogImage} from '../../../shared/models/blogeImage.model';
import {BlogPost} from '../../blog-post/models/blog-post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  blogs$?: Observable<BlogPost[]>

  constructor(
    private blogPostService: BlogPostService
  ) {
  }

  ngOnInit() {
    this.blogs$ = this.blogPostService.getAllBlogPosts()
  }

  protected readonly async = async;
}
