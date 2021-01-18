import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponsePagination } from 'src/app/home/model/response-pagination-model';
import { CareerSaveRequest } from './model/career-save-request';

@Injectable({
  providedIn: 'root'
})
export class CareerAdminService {

  constructor(private readonly http: HttpClient) { }

  create(careerToCreate: CareerSaveRequest) {
    return this.http.post('http://localhost:8080/api/v1/careers', careerToCreate);
  }


  findByParameters(page: number): Observable<ResponsePagination> {
    return this.http.get<ResponsePagination>(`http://localhost:8080/api/v1/careers?page=${page}&size=4`);
  }
}
