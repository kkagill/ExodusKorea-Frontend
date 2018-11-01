import { ICountryInfo, IPriceInfo, ICurrencyInfo, IYouTubeComment } from './../shared/interfaces';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from '../shared/utils/items.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-content-details',
  templateUrl: './content-details.component.html',
  styleUrls: ['./content-details.component.scss']
})
export class ContentDetailsComponent implements OnInit {
  safeURL: any;
  youtubeId: any;
  countryInfo: ICountryInfo;
  priceInfo: IPriceInfo;
  currencyInfo: ICurrencyInfo;
  youTubeComments: IYouTubeComment;
  isCountryInfoLoaded: boolean = false;
  isPriceInfoLoaded: boolean = false;
  isCurrencyInfoLoaded: boolean = false;
  isYouTubeCommentLoaded: boolean = false;

  constructor(private dataService: DataService,
              private activedRoute: ActivatedRoute,
              private itemService: ItemsService,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.youtubeId = this.activedRoute.snapshot.paramMap.get('id');
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.youtubeId}${'?autoplay=1'}`); 
    this.loadCountryInfo();
    this.loadPriceInfo();
    this.loadCurrencyInfo();
    this.loadYouTubeComment();
  }

  loadCountryInfo() {
    this.dataService.getCountryInfo(this.youtubeId)
    .subscribe(res => {
      if (res.status === 200) {
        this.isCountryInfoLoaded = true;
        this.countryInfo = this.itemService.getSerialized<ICountryInfo>(res.body);
      }
      else {
      
      }
    });
  }

  loadPriceInfo() {
    this.dataService.getPriceInfo(this.youtubeId)
    .subscribe(res => {
      if (res.status === 200) {
        this.isPriceInfoLoaded = true;
        this.priceInfo = this.itemService.getSerialized<IPriceInfo>(res.body);       
      }
      else {
      
      }
    });
  }

  loadCurrencyInfo() {
    this.dataService.getCurrencyInfo(this.youtubeId)
    .subscribe(res => {
      if (res.status === 200) {
        this.isCurrencyInfoLoaded = true;
        this.currencyInfo = this.itemService.getSerialized<ICurrencyInfo>(res.body); 
      }
      else {
      
      }
    });
  }

  loadYouTubeComment() {
    this.dataService.getYouTubeComments(this.youtubeId)
    .subscribe(res => {
      if (res.status === 200) {
        this.isYouTubeCommentLoaded = true;
        this.youTubeComments = this.itemService.getSerialized<IYouTubeComment>(res.body.comments); 
      }
      else {
      
      }
    });
  }
}
