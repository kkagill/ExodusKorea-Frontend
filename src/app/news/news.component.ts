import { Component, OnInit, ViewChild } from '@angular/core';
import { INewsDetail, ICategory } from '../shared/interfaces';
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
  categories: ICategory[];
  isNewsLoaded: boolean = false;
  isPopularNewsLoaded: boolean = false;
  isCategoriesLoaded: boolean = false;
  searchText: string;
  selectedCategory: ICategory;

  public constructor(private router: Router,
    public snackBar: MatSnackBar,
    private dataService: DataService,
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
      this.loadAllCategories(+newsId);
    // initial landing
    } else { 
      this.loadAllCategories(0);
      this.loadNewsList(0); 
    }
    this.loadPopularNews();
  }

  loadAllCategories(newsId: number) {
    this.dataService.getAllCategories()
      .subscribe(res => {
        if (res.status === 200) {
          this.isCategoriesLoaded = true;
          this.categories = this.itemsService.getSerialized<ICategory[]>(res.body);
          this.selectedCategory = this.categories[newsId];
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

  onSelectCategory(category: ICategory) {   
    this.selectedCategory = category;
    this.page = 1;
    this.loadNewsList(category.categoryId);
  }  

  onNewsClick(newsDetailId: number, newsId: number, index: number) {
    this.router.navigate(['news-detail', newsDetailId, newsId, index]);
  }
}
