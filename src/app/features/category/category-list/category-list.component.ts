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

  constructor(private categoryService:CategoryService) {
  }

  ngOnInit() {
    this.categories$ =this.categoryService.getAllCategories();

  }

  onSearch(query: string) {
    this.categories$ =this.categoryService.getAllCategories(query);
  }

  sort(sortBy: string, sortDireciton: string) {
    this.categories$ =this.categoryService.getAllCategories(undefined, sortBy, sortDireciton);
  }
}
