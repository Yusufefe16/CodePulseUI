import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {BlogPostService} from '../services/blog-post.service';
import {BlogPost} from '../models/blog-post.model';
import {CategoryService} from '../../category/services/category.service';
import {Category} from '../../category/models/category.model';
import {UpdateBlogPost} from '../models/update-blog-post.model';
import {ImageService} from '../../../shared/components/image-selector/image.service';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrl: './edit-blogpost.component.scss'
})
export class EditBlogpostComponent implements OnInit, OnDestroy{
  id: string | null;
  model?: BlogPost
  selectedCategories ?: string[]
  categories$ ?: Observable<Category[]>
  isImageSelectorVisible: boolean = false;

  routeSubscription?: Subscription
  updateBlogPostSubscription?: Subscription
  getBlogPostSubscription?: Subscription
  deleteBlogPostSubscription?: Subscription
  imageSelectSubscription?: Subscription


  constructor(
    private route: ActivatedRoute,
    private blogPostService: BlogPostService,
    private categoryService: CategoryService,
    private router: Router,
    private imageService: ImageService
  ) {
  }
  ngOnInit() {
    this.categories$ = this.categoryService.getAllCategories()

    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params)=>{
        this.id = params.get('id')

        //get blogpost from Api
        if (this.id) {
          this.getBlogPostSubscription = this.blogPostService.getBlogPostById(this.id).subscribe({
            next:(res)=>{
              this.model = res
              this.selectedCategories = res.categories.map(x => x.id)
            },
            error:(err)=>{
              console.log(err)
            }
          })
        }

        this.imageSelectSubscription = this.imageService.onSelectImage()
          .subscribe({
            next: (res)=>{
              if (this.model){
                this.model.featuredImageUrl = res.url;
                this.isImageSelectorVisible = false
              }
            },
            error:(err)=>{
              console.log(err)
            }
          })
      }
    })
  }

  onFormSubmit() {
    if (this.model && this.id){
      var updateBlogPost: UpdateBlogPost = {
        author: this.model.author,
        content: this.model.content,
        shortDescription: this.model.shortDescription,
        featuredImageUrl: this.model.featuredImageUrl,
        isVisible: this.model.isVisible,
        publishedDate:this.model.publishedDate,
        title: this.model.title,
        urlHandle: this.model.urlHandle,
        categories: this.selectedCategories ?? []
      }

      this.updateBlogPostSubscription = this.blogPostService.updateBlogPostById(this.id, updateBlogPost).subscribe({
        next: (res) =>{
          this.router.navigateByUrl('/admin/blogposts')
        }
      })



    }

  }

  onDelete() {
    if (this.id){
      this.deleteBlogPostSubscription = this.blogPostService.deleteBlogPost(this.id)
        .subscribe({
          next: res=>{
            this.router.navigateByUrl('/admin/blogposts')
          },
          error: err =>{
            console.log(err)
          }
        })
    }
  }

  openImageSelector() {
    this.isImageSelectorVisible = true
  }

  closeImageSelector() {
    this.isImageSelectorVisible = false
  }

  ngOnDestroy() {
    this.routeSubscription?.unsubscribe()
    this.getBlogPostSubscription?.unsubscribe()
    this.updateBlogPostSubscription?.unsubscribe()
    this.deleteBlogPostSubscription?.unsubscribe()
    this.imageSelectSubscription?.unsubscribe()
  }



}
