import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AddCategoryRequest} from '../models/add-category-request.model';
import {HttpClient} from '@angular/common/http';
import {Category} from '../models/category.model';
import {environment} from '../../../../environments/environment.development';
import {UpdateCategoryRequest} from '../models/update-category-request';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http:HttpClient
  ) { }

  addCategory(model: AddCategoryRequest):Observable<void>{
    return  this.http.post<void>(`${environment.apiBaseUrl}/api/categories`,model)
  }

  getAllCategories():Observable<Category[]>{
    return this.http.get<Category[]>(`${environment.apiBaseUrl}/api/Categories`)
  }

  getCategoryById(id:string):Observable<Category>{
    return this.http.get<Category>(`${environment.apiBaseUrl}/api/Categories/${id}`)
  }

  updateCategory(id:string, updateCategoryRequest: UpdateCategoryRequest):Observable<Category>{
    return this.http.put<Category>(`${environment.apiBaseUrl}/api/Categories/${id}`,updateCategoryRequest)
  }

  deleteCategory(id:string):Observable<Category>{
    return this.http.delete<Category>(`${environment.apiBaseUrl}/api/Categories/${id}`)
  }
}
