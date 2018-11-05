import { ICountryInfo, IPriceInfo, ICurrencyInfo, IVideoComment } from './../shared/interfaces';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from '../shared/utils/items.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-content-details',
  templateUrl: './content-details.component.html',
  styleUrls: ['./content-details.component.scss']
})
export class ContentDetailsComponent implements OnInit {
  page: number = 1;
  likes: string;
  safeURL: any;
  newVideoId: any;
  youtubeId: any;
  countryInfo: ICountryInfo;
  priceInfo: IPriceInfo;
  currencyInfo: ICurrencyInfo;
  videoComments: IVideoComment[];
  isCountryInfoLoaded: boolean = false;
  isPriceInfoLoaded: boolean = false;
  isCurrencyInfoLoaded: boolean = false;
  isYouTubeLikesLoaded: boolean = false;
  isVideoCommentsLoaded: boolean = false;
  commentForm: any;

  constructor(private dataService: DataService,
    private activedRoute: ActivatedRoute,
    private itemService: ItemsService,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder) {
    this.commentForm = this.formBuilder.group({
      comment: [null, Validators.compose(
        [
          Validators.required, 
          Validators.minLength(5), 
          Validators.maxLength(500)
        ])]
    });
  }

  ngOnInit() {
    this.newVideoId = this.activedRoute.snapshot.paramMap.get('id1');
    this.youtubeId = this.activedRoute.snapshot.paramMap.get('id2');
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.youtubeId}${'?autoplay=1'}`);
    this.loadCountryInfo();
    this.loadPriceInfo();
    this.loadCurrencyInfo();
    this.loadYouTubeLikes();
    this.loadVideoComments();
  }

  loadCountryInfo() {
    this.dataService.getCountryInfo(this.newVideoId)
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
    this.dataService.getPriceInfo(this.newVideoId)
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
    this.dataService.getCurrencyInfo(this.newVideoId)
      .subscribe(res => {
        if (res.status === 200) {
          this.isCurrencyInfoLoaded = true;
          this.currencyInfo = this.itemService.getSerialized<ICurrencyInfo>(res.body);
        }
        else {

        }
      });
  }

  loadYouTubeLikes() {
    this.dataService.getYouTubeLikes(this.youtubeId)
      .subscribe(res => {
        if (res.status === 200) {
          this.isYouTubeLikesLoaded = true;
          this.likes = this.itemService.getSerialized<string>(res.body);
        }
        else {

        }
      });
  }

  loadVideoComments() {
    this.dataService.getVideoComments(this.newVideoId, this.youtubeId)
      .subscribe(res => {
        if (res.status === 200) {
          this.isVideoCommentsLoaded = true;
          this.videoComments = this.itemService.getSerialized<IVideoComment[]>(res.body);       
        }
        else {

        }
      });
  }

  onSubmit() {
    if (this.commentForm.invalid) {
      return;
    }    
    let body = {
      'comment': this.commentForm.value
    };
    // this.dataService.register(body)
    //   .subscribe(res => {
    //     if (res.status === 201) {
    //       this.error = '';
    //       this.success = res.body.email +
    //         '으로 인증 메일이 발송되었습니다. 3시간 이내로 인증을 받으셔야 가입이 완료됩니다.' + '<br/><br/>' +
    //         '인증 메일을 받지 못하셨다면 인증메일을 재발송해주세요.' + '<br/><br/>';

    //       localStorage.setItem('email', res.body.email);
    //       this.spinner.hide();
    //     }
    //   },
    //     error => {
    //       if (error.status === 400) {
    //         if (error.error === "Passwords do not match") {
    //           this.error = '입력된 두 비밀번호가 일치하지 않습니다.';
    //         }
    //         else if (error.error[0].code === "DuplicateUserName") {
    //           this.error = '이미 등록된 계정입니다.';
    //         }
    //       }
    //       else {
    //         this.error = '오류가 발생했습니다. 다시 시도해주세요.';
    //       }
    //       this.spinner.hide();
    //     }
    //   );
  }
}
