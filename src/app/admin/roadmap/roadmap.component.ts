import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CareerPageService } from 'src/app/pages/career-page/career-page.service';
import { CareerSaveResponse } from 'src/app/pages/career-page/model/career-response-model';
import { RoadmapSaveResponse } from 'src/app/pages/roadmap-page/model/roadmap-save-response-model';
import { RoadmapSaveRequest } from './model/roadmap-save-request';
import { RoadmapAdminService } from './roadmap-admin.service';

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.css']
})
export class RoadmapComponent implements OnInit {

  careerId: String

  careerInfo: CareerSaveResponse;

  createRoadmapForm: FormGroup;

  roadmapsList: RoadmapSaveResponse[] = [];

  page: Number;

  constructor(private readonly route: ActivatedRoute, private readonly careerPageService: CareerPageService, private _builder: FormBuilder,
    private readonly roadmapAdminService: RoadmapAdminService) { 
    this.createRoadmapForm = this._builder.group(
      {
        name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(45)])],
        description: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(700)])],
        detail: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
      }
    )

  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.careerId = params.get('id');
      this.getCareerInfo();

    })
  }

  createRoadmap(value){
    const roadmapToCreate: RoadmapSaveRequest = {
      name: value.name,
      description: value.description,
      detail: value.detail
    }

    this.roadmapAdminService.create(roadmapToCreate).subscribe(x =>{
       let roadmapCreatedId = x.headers.get('location').split('/')[4];
       this.roadmapAdminService.linkRoadmapToCareer(this.careerId, roadmapCreatedId).subscribe(y => {
         console.log(y);
         this.getCareerInfo();
       });
    } );
    this.createRoadmapForm.reset();
  }

  getCareerInfo(){
    this.careerPageService.getCareerById(this.careerId).subscribe(res => {
      this.careerInfo = res;
      for(let roadmapLink of this.careerInfo.roadmaps){
        this.roadmapAdminService.findRoadmapByUrl(roadmapLink).subscribe(
          roadmap => this.roadmapsList.push(roadmap));
      }
    
    });

    
  }

}


