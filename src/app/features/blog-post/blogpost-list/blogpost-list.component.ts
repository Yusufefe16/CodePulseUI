import {Component, OnInit} from '@angular/core';
import {BlogPostService} from '../services/blog-post.service';
import {Observable} from 'rxjs';
import {BlogPost} from '../models/blog-post.model';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrl: './blogpost-list.component.scss'
})
export class BlogpostListComponent implements OnInit{
  blogPosts$?:Observable<BlogPost[]>;

  constructor(
    private blogPostService:BlogPostService
  ) {
  }
  ngOnInit() {
    this.blogPosts$ = this.blogPostService.getAllBlogPosts();
  }
}
