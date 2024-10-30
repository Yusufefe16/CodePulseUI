import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {CategoryService} from '../services/category.service';
import {Category} from '../models/category.model';
import {UpdateCategoryRequest} from '../models/update-category-request';
import {resolve} from '@angular/compiler-cli';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.scss'
})
export class EditCategoryComponent implements  OnInit, OnDestroy{

  id:string |null= "";
  paramsSubscription?: Subscription;
  editCateforySubscription?: Subscription;
  category?: Category
  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) =>{
        this.id = params.get('id')

        if (this.id){
          this.categoryService.getCategoryById(this.id)
            .subscribe({
              next:(res)=>{
                this.category=res
              }
          })
        }
      }
    })
  }

  onFormSubmit() {
    const updateCategoryRequest :UpdateCategoryRequest = {
      name: this.category?.name ?? '',
      urlHandle: this.category?.urlHandle ?? '',
    }
    if (this.id) this.editCateforySubscription = this.categoryService.updateCategory(this.id, updateCategoryRequest)
      .subscribe({
        next:(response) =>{
          this.router.navigateByUrl('/admin/categories')
        }
      })
  }

  ngOnDestroy() {
    this.paramsSubscription?.unsubscribe()
    this.editCateforySubscription?.unsubscribe()
  }

  onDelete() {
    if (this.id) {
      this.categoryService.deleteCategory(this.id).subscribe({
        next:(resolve)=>{
          this.router.navigateByUrl('/admin/categories');
        }
      })
    }  }
}
