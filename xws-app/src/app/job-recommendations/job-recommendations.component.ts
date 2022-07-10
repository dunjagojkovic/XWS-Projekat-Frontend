import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { JobOfferService } from '../service/job-offer.service';

@Component({
  selector: 'app-job-recommendations',
  templateUrl: './job-recommendations.component.html',
  styleUrls: ['./job-recommendations.component.css']
})
export class JobRecommendationsComponent implements OnInit {


  offer: any = {} as any
  public jobs: any[]
  userAccount: any = {} as any;
  jobRecommend: any = {} as any;
  recommendations : any[]
  recommend: any = {} as any
  ids : any[]

  constructor(public service: JobOfferService, public api: ApiService) { }

  ngOnInit(): void {

    var user = localStorage.getItem('username');
    this.api.currentUser(user).subscribe((response: any) => {
      this.userAccount = response;
      console.log(this.userAccount)
      this.service.jobOffers().subscribe((response: any) => {
        this.offer = response
        this.jobs = this.offer.offers

        var skills = [] 
        if(this.userAccount.interest != ""){
          skills.push(this.userAccount.interest)
        }

        let data = {
          id: this.userAccount.id,
          experiences: this.userAccount.workExperiences,
          skills: skills,
          jobOffers: this.jobs,
        }
        this.api.jobRecommendations(data).subscribe((response: any) => {
          this.jobRecommend = response;
          this.ids = this.jobRecommend.ids
          console.log(this.ids)
          let data = {
            ids: this.ids
          }
          this.service.jobRecommendations(data).subscribe((response: any) => {
            this.recommend = response;
            this.recommendations = this.recommend.offers
            console.log(this.recommendations)
          })
        })

      })

    })
  }

}
