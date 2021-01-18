import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoadmapSaveResponse } from 'src/app/pages/roadmap-page/model/roadmap-save-response-model';
import { RoadmapSaveRequest } from './model/roadmap-save-request';

@Injectable({
  providedIn: 'root'
})
export class RoadmapAdminService {

  constructor(private readonly http: HttpClient) { }

  create(roadmapToCreate: RoadmapSaveRequest): Observable<HttpResponse<object>>{
    return this.http.post('http://frozen-river-17298.herokuapp.com/api/v1/roadmaps', roadmapToCreate, {observe: 'response'});

  }

  findRoadmapByUrl(roadmapUrl: string): Observable<RoadmapSaveResponse> {
    console.log(roadmapUrl);
    return this.http.get<RoadmapSaveResponse>(`http://frozen-river-17298.herokuapp.com${roadmapUrl}`);
  }

  linkRoadmapToCareer(careerId: String, roadmapCreatedId: string) {
    let url = `http://frozen-river-17298.herokuapp.com/api/v1/careers/${careerId}/roadmaps`;
    console.log(url);
    let roadmapToAddId: number = +roadmapCreatedId;
    return this.http.patch(url, {roadmapId: roadmapToAddId});
  }
}
