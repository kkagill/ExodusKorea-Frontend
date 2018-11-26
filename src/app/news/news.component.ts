import { Component, OnInit, ViewChild } from '@angular/core';
import { INews, INewsDetail } from '../shared/interfaces';
import { Router } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { ItemsService } from '../shared/utils/items.service';
import { MatSnackBar } from '@angular/material';
import { TabsetComponent } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  @ViewChild('staticTabs') staticTabs: TabsetComponent;
  //p: number[] = [];  
  //news: INews[];
  page: number = 1;
  newsList: INewsDetail[];
  popularNews: INewsDetail[];
  isNewsLoaded: boolean = false;
  isPopularNewsLoaded: boolean = false;
  searchText: string;
  topic: string;

  public constructor(private router: Router,
    public snackBar: MatSnackBar,
    private dataService: DataService,
    private itemsService: ItemsService) { }

  ngOnInit() {
    //this.loadAllNews();
    let newsId = localStorage.getItem('newsId');
    let index = localStorage.getItem('index');

    if (newsId != null && +newsId > 0) {
      this.loadNewsList(+newsId);
      localStorage.removeItem('newsId');

      if (index != null && +index > 0) {
        let pIndex = Math.floor(((+index - 1) / 5) + 1); // Calculate the current page  
        this.page = pIndex;
        //this.p = [pIndex]; // set the current page where the user came from
        //this.staticTabs.setActiveTab(2);
        localStorage.removeItem('index');
      }
    } else {
      this.loadNewsList(1); // initial landing
    }

    this.loadPopularNews();
  }

  loadNewsList(newsId: number) {
    this.dataService.getNewsList(newsId)
      .subscribe(res => {
        if (res.status === 200) {
          this.isNewsLoaded = true;
          this.newsList = this.itemsService.getSerialized<INewsDetail[]>(res.body);
          let count = 1;
          for (let nl of this.newsList) {
            nl.index = count; // Manually add index for each item
            count++;
          }
          // Not sure why newsId comes as string so had to convert it back to number using +
          switch (+newsId) {
            case 1:
              this.topic = "경제/무역";
              break;
            case 2:
              this.topic = "통상/규제";
              break;
            case 3:
              this.topic = "일자리 동향";
              break;
          }
        }
      },
        error => {
          this.snackBar.open('오류가 났습니다. 페이지를 새로고침하고 다시 시도해주세요. 오류가 지속될시 admin@exoduscorea.com으로 연락주시기 바랍니다.', '', {
            duration: 60000,
            panelClass: ['error-snackbar']
          });
        }
      );
  }

  loadPopularNews() {
    this.dataService.getPopularNews()
      .subscribe(res => {
        if (res.status === 200) {
          this.isPopularNewsLoaded = true;
          this.popularNews = this.itemsService.getSerialized<INewsDetail[]>(res.body);
        }
      },
        error => {
          this.snackBar.open('오류가 났습니다. 페이지를 새로고침하고 다시 시도해주세요. 오류가 지속될시 admin@exoduscorea.com으로 연락주시기 바랍니다.', '', {
            duration: 60000,
            panelClass: ['error-snackbar']
          });
        }
      );
  }

  onPopularNewsClick(newsDetailId: number, newsId: number) {
    this.router.navigate(['news-detail', newsDetailId, newsId, 0]);
  }

  // loadAllNews() {
  //   this.dataService.getAllNews()
  //   .subscribe(res => {
  //     if (res.status === 200) {
  //       this.isNewsLoaded = true;
  //       this.news = this.itemsService.getSerialized<INews[]>(res.body);
  //       for (let n of this.news) {
  //         let count = 1;
  //         for (let nd of n.newsDetails) {
  //           nd.index = count; // Manually add index for each item
  //           count++;
  //         }
  //       }
  //     }
  //   },
  //     error => {
  //       this.snackBar.open('오류가 났습니다. 페이지를 새로고침하고 다시 시도해주세요. 오류가 지속될시 admin@exoduscorea.com으로 연락주시기 바랍니다.', '', {
  //         duration: 60000,
  //         panelClass: ['error-snackbar']
  //       });
  //     }
  //   );
  // }

  onNewsClick(newsDetailId: number, newsId: number, index: number) {
    this.router.navigate(['news-detail', newsDetailId, newsId, index]);
  }
}
