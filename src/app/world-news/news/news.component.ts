import { DataSharingService } from './../../shared/services/data-sharing.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { INewsDetail, ICategory } from '../../shared/interfaces';
import { Router } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { ItemsService } from '../../shared/utils/items.service';
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
  categories: ICategory[];
  isNewsLoaded: boolean = false;
  isPopularNewsLoaded: boolean = false;
  isCategoriesLoaded: boolean = false;
  searchText: string;
  selectedCategory: ICategory;

  public constructor(private router: Router,
    public snackBar: MatSnackBar,
    private dataService: DataService,
    private dataSharingService: DataSharingService,
    private itemsService: ItemsService) { }

  ngOnInit() {   
    let newsId = localStorage.getItem('newsId');
    let index = localStorage.getItem('index');

    if (newsId != null && +newsId >= 0) {
      this.loadNewsList(+newsId);
      localStorage.removeItem('newsId');

      if (index != null && +index > 0) {
        let pIndex = Math.floor(((+index - 1) / 10) + 1); // Calculate the current page  
        this.page = pIndex;
        //this.p = [pIndex]; // set the current page where the user came from
        //this.staticTabs.setActiveTab(2);
        localStorage.removeItem('index');
      }      
      this.loadAllCategories(+newsId, false);
    // initial landing
    } else { 
      this.loadAllCategories(0, true);
      this.loadNewsList(1); 
    }
    //this.loadPopularNews();
  }

  loadAllCategories(newsId: number, isInitial: boolean) {
    this.dataService.getAllCategories()
      .subscribe(res => {
        if (res.status === 200) {
          this.isCategoriesLoaded = true;
          this.categories = this.itemsService.getSerialized<ICategory[]>(res.body);
          if (isInitial) {
            this.selectedCategory = this.categories[newsId];
          } else {
            this.selectedCategory = this.categories[newsId-1];
          }      
        }
      },
        error => {
          this.snackBar.open('정보를 불러오는 과정에서 오류가 났습니다.', '', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      );
  }

  loadNewsList(newsId: number) {
    this.dataService.getNewsList(newsId)
      .subscribe(res => {
        if (res.status === 200) {
          this.isNewsLoaded = true;
          this.newsList = this.itemsService.getSerialized<INewsDetail[]>(res.body);
          let count = 1;
          for (let nl of this.newsList) {
            nl.newsId = newsId;
            nl.index = count; // Manually add index for each item
            count++;
          }
        }
      },
        error => {
          this.snackBar.open('정보를 불러오는 과정에서 오류가 났습니다.', '', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      );
  }

  // loadPopularNews() {
  //   this.dataService.getPopularNews()
  //     .subscribe(res => {
  //       if (res.status === 200) {
  //         this.isPopularNewsLoaded = true;
  //         this.popularNews = this.itemsService.getSerialized<INewsDetail[]>(res.body);
  //       }
  //     },
  //       error => {
  //         this.snackBar.open('정보를 불러오는 과정에서 오류가 났습니다.', '', {
  //           duration: 5000,
  //           panelClass: ['error-snackbar']
  //         });
  //       }
  //     );
  // }

  // onPopularNewsClick(newsDetailId: number, newsId: number) {
  //   this.router.navigate(['news-detail', newsDetailId, newsId, 0]);
  // }

  onSelectCategory(category: ICategory) {  
    this.isNewsLoaded = false; 
    this.selectedCategory = category;
    this.page = 1;
    this.loadNewsList(category.categoryId);
  }  

  onNewsClick(nl: any) {
    this.dataSharingService.nl.next(nl);    
    this.router.navigate(['news-detail', nl.newsId, nl.index]);
  }
}