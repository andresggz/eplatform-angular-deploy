import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseList } from './model/course-list-model';
import { RoadmapSaveResponse } from './model/roadmap-save-response-model';

@Injectable({
  providedIn: 'root'
})
export class RoadmapPageService {


  constructor(private readonly http: HttpClient) { }

  getRoadmapById(id: String): Observable<RoadmapSaveResponse>{

    return this.http.get<RoadmapSaveResponse>(`https://frozen-river-17298.herokuapp.com/api/v1/roadmaps/${id}`);
  }

  getCourse(url: string): Observable<CourseList>{
    return this.http.get<CourseList>(`https://frozen-river-17298.herokuapp.com${url}`);
  }
}
