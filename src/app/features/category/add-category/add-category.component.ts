import {Component, OnDestroy} from '@angular/core';
import {AddCategoryRequest} from '../models/add-category-request.model';
import {CategoryService} from '../services/category.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent implements OnDestroy{

  model:AddCategoryRequest
  private addCategorySubscription ?: Subscription;

  constructor(
    private categoryService:CategoryService,
    private router: Router
  ) {
    this.model = {
      name:'',
      urlHandle:''
    };
  }

  ngOnDestroy() {
    this.addCategorySubscription?.unsubscribe();
  }

  onFormSubmit() {
    console.log(this.model)
    this.addCategorySubscription = this.categoryService.addCategory(this.model).subscribe({
      next:(res) => {
        console.log("Adding is successfull")
        this.router.navigateByUrl(`/admin/categories`)
      },
      error:(error)=>{}
    })
  }


}
