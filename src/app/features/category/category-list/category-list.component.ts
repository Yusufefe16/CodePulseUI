import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../services/category.service';
import {Category} from '../models/category.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnInit{

  categories$?: Observable<Category[]>;
  totalCount?: number;
  list: number[] = []
  pageNumber = 1;
  pageSize = 5

  constructor(private categoryService:CategoryService) {
  }

  ngOnInit() {
    this.categoryService.getCategoryCount()
      .subscribe({
        next: (res)=>{
          this.totalCount = res
          this.list = new Array(Math.ceil(res / this.pageSize))
          this.categories$ =this.categoryService.getAllCategories(
            undefined,
            undefined,
            undefined,
            this.pageNumber,
            this.pageSize
          );
        },
        error: (err)=>{
          console.log(err)
        }
      })

  }

  onSearch(query: string) {
    this.categories$ =this.categoryService.getAllCategories(query);
  }

  sort(sortBy: string, sortDireciton: string) {
    this.categories$ =this.categoryService.getAllCategories(undefined, sortBy, sortDireciton);
  }

  getPage(pageNumber: number) {
    this.pageNumber = pageNumber
    this.categories$ =this.categoryService.getAllCategories(
      undefined,
      undefined,
      undefined,
      pageNumber,
      this.pageSize
    );
  }

  getPrevPage() {
    if (this.pageNumber - 1 < 1) return;

    this.pageNumber -= 1;
    this.categories$ =this.categoryService.getAllCategories(
      undefined,
      undefined,
      undefined,
      this.pageNumber - 1,
      this.pageSize
    );
  }

  getNextPage() {
    if (this.pageNumber + 1 > this.list.length) return;

    this.pageNumber += 1;
    this.categories$ =this.categoryService.getAllCategories(
      undefined,
      undefined,
      undefined,
      this.pageNumber + 1,
      this.pageSize
    );
  }
}
