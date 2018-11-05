import { INewVideo } from './../../shared/interfaces';
import { ItemsService } from './../../shared/utils/items.service';
import { DataService } from './../../shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  allNewVideos: INewVideo[]; 
  slides: any = [[]];  
  backgroundUrl = '../../../assets/images/countries/';
  isNewVideosLoaded: boolean = false;

  public constructor(private router: Router,
    public http: HttpClient,
    private dataService: DataService,
    private itemService: ItemsService) { }

  ngOnInit() {
    this.dataService.getNewVideos() 
    .subscribe(res => {
      if (res.status === 200) {
        this.isNewVideosLoaded = true;
        this.allNewVideos = this.itemService.getSerialized<INewVideo[]>(res.body);
        this.slides = this.chunk(this.allNewVideos, 4); 
      }
      else {

      }
    });
  }

  chunk(arr, chunkSize) { 
    let R = []; 
    for (let i = 0, len = arr.length; i < len; i += chunkSize) { 
      R.push(arr.slice(i, i + chunkSize)); 
    } 
    return R; 
  } 

  // public isLoggedIn(): boolean {
  //   return this.authService.isAuthenticated();
  // }

  onMatCardClick(newVideoid, videoId) {
    this.router.navigate(['content-details', newVideoid, videoId]);
  }
}