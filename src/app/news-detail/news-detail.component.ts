import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ItemsService } from '../shared/utils/items.service';
import { INewsDetail, ICategory } from '../shared/interfaces';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
  newsDetailId: any;
  newsId: any;
  index: any;
  newsDetail: INewsDetail;
  popularNews: INewsDetail[];
  categories: ICategory[];
  isNewsDetailLoaded: boolean = false;
  isPopularNewsLoaded: boolean = false;
  isCategoriesLoaded: boolean = false;
  selectedCategory: ICategory;

  constructor(private dataService: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public snackBar: MatSnackBar,
    private itemsService: ItemsService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {     
      this.newsDetailId = params.get('id1');
      this.newsId = params.get('id2');
      this.index = params.get('id3');

      localStorage.setItem('newsId', this.newsId);
      localStorage.setItem('index', this.index);
      this.loadAllCategories(this.newsId);
      this.updateViewsCount();
      this.loadPopularNews();
    });    
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

  updateViewsCount() {
    this.dataService.updateNewsViewsCount(this.newsDetailId)
      .subscribe(res => {
        if (res.status === 204) {
          this.loadNewsDetail(this.newsDetailId);
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

  loadNewsDetail(newsDetailId: number) {
    this.dataService.getNewsDetail(newsDetailId)
      .subscribe(res => {
        if (res.status === 200) {
          this.isNewsDetailLoaded = true;
          this.newsDetail = this.itemsService.getSerialized<INewsDetail>(res.body);
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

  loadNewsList(newsId: number) {
    localStorage.setItem('newsId', newsId.toString());
    this.router.navigate(['news']);
  }

  onSelectCategory(category: ICategory) {  
    this.loadNewsList(category.categoryId);
  }  

  onPopularNewsClick(newsDetailId: number, newsId: number) {   
    this.router.navigate(['news-detail', newsDetailId, newsId, 0]);
  }

  backToList() {
    this.router.navigate(['news']);
  }
}
