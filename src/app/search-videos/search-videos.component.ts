import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ICareer, IVideoPost, ICategory, ICountry } from '../shared/interfaces';
import { DataService } from '../shared/services/data.service';
import { ItemsService } from '../shared/utils/items.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DataSharingService } from '../shared/services/data-sharing.service';
import { LoginComponent } from '../auth/login/login.component';

@Component({
  selector: 'app-search-videos',
  templateUrl: './search-videos.component.html',
  styleUrls: ['./search-videos.component.scss']
})
export class SearchVideosComponent implements OnInit {
  page: number = 1;
  selectedCategory: ICategory;
  //selectedCareer: ICareer;
  //all: string = '';
  searchResult: IVideoPost[];
  categories: ICategory[];
  countries: ICountry[];
  //careers: ICareer[];
  isSearchResultLoaded: boolean = false;
  isCategoriesLoaded: boolean = false;
  isCountriesLoaded: boolean = false;
  //isCareersLoaded: boolean = false;
  backgroundUrl = '../../../assets/images/countries/';
  searchText: string;
  //expandCategory: boolean = false;
  //expandCareer: boolean = false;
  email: string;
  password: string;

  constructor(private router: Router,
    public snackBar: MatSnackBar,
    private authService: AuthService,
    private dataService: DataService,
    private dataSharingService: DataSharingService,
    public dialog: MatDialog,
    private itemsService: ItemsService) { }

  ngOnInit() {
    let categoryId = localStorage.getItem('categoryId');
    //let careerId = localStorage.getItem('careerId');

    if (categoryId != null) {
      localStorage.removeItem('categoryId');
      // this.expandCategory = true;
      this.loadAllCategories(+categoryId);
      //this.loadAllCareers(0);
      // } else if (careerId != null) {
      //   localStorage.removeItem('careerId');
      //   this.expandCareer = true;
      //   this.loadAllCategories(0);
      //   this.loadAllCareers(+careerId);
    } else if (categoryId == null) { // } else if (categoryId == null && careerId == null) {
      //this.all = "initial";
      this.loadAllCategories(1);
      this.loadAllCountries();
      //this.loadAllCareers(0);
      //this.loadAllSearchResult();
    }
  }

  loadAllCategories(categoryId: number) {
    this.dataService.getAllSearchVideoCategories()
      .subscribe(res => {
        if (res.status === 200) {
          this.isCategoriesLoaded = true;
          this.categories = this.itemsService.getSerialized<ICategory[]>(res.body);

          if (categoryId > 0) {
            for (let c of this.categories) {
              if (c.categoryId === categoryId) {
                this.selectedCategory = c;
                if (categoryId === 1) {
                  this.loadAllSearchResult();
                } else {
                  this.loadSearchResultByCategory(c.categoryId);
                }
              }
            }
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

  loadAllCountries() {
    this.dataService.getAllCountries()
      .subscribe(res => {
        if (res.status === 200) {
          this.isCountriesLoaded = true;
          this.countries = this.itemsService.getSerialized<ICountry[]>(res.body);
          let selectedCountries = this.countries.map(x => x.nameKR);
          // checkbox for country is pre-selected only when search result contains corresponding country
          if (this.isSearchResultLoaded) {
            for (let sr of this.searchResult) {
              if (selectedCountries.includes(sr.countryKR)) {
                //this.countries.find(x => x.nameKR === sr.countryKR).isChecked = true;
                this.countries.find(x => x.nameKR === sr.countryKR).isNotDisabled = true;
              }
            }
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

  // loadAllCareers(careerId: number) {
  //   this.dataService.getAllCareers()
  //     .subscribe(res => {
  //       if (res.status === 200) {
  //         this.isCareersLoaded = true;
  //         this.careers = this.itemsService.getSerialized<ICareer[]>(res.body);

  //         if (careerId > 0) {
  //           for (let c of this.careers) {
  //             if (c.careerId === careerId) {
  //               this.selectedCareer = c;
  //               this.loadSearchResultByCareer(c.careerId);
  //             }
  //           }
  //         }
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

  loadAllSearchResult() {
    this.dataService.getAllSearchResult()
      .subscribe(res => {
        if (res.status === 200) {
          this.isSearchResultLoaded = true;
          this.searchResult = this.itemsService.getSerialized<IVideoPost[]>(res.body);
          for (let sr of this.searchResult) {
            sr.categoryId = 1;
          }
          localStorage.setItem('searchResult', JSON.stringify(this.searchResult))
          this.loadAllCountries();
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

  loadSearchResultByCategory(categoryId: number) {
    this.dataService.getSearchResultByCategory(categoryId)
      .subscribe(res => {
        if (res.status === 200) {
          this.isSearchResultLoaded = true;
          this.searchResult = this.itemsService.getSerialized<IVideoPost[]>(res.body);
          localStorage.setItem('searchResult', JSON.stringify(this.searchResult))
          this.loadAllCountries();
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

  getVideosByCountry() {
    let searchResult = JSON.parse(localStorage.getItem('searchResult'))
    let selectedCountries = this.countries.filter(x => x.isChecked === true).map(x => x.nameKR);
    this.searchResult = [];

    if (selectedCountries.length <= 0) {
      for (let sr of searchResult) {       
          this.searchResult.push(sr);
      }
    } else {
      for (let sr of searchResult) {
        if (selectedCountries.includes(sr.countryKR)) {
          this.searchResult.push(sr);
        }
      }
    }
  }

  // loadSearchResultByCareer(careerId: number) {
  //   this.dataService.getSearchResultByCareer(careerId)
  //     .subscribe(res => {
  //       if (res.status === 200) {
  //         this.isSearchResultLoaded = true;
  //         this.searchResult = this.itemsService.getSerialized<IVideoPost[]>(res.body);
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

  // onSelectAll() {
  //   this.selectedCareer = null;
  //   this.selectedCategory = null;
  //   this.all = "initial";
  //   this.expandCategory = false;
  //   this.expandCareer = false;
  //   this.loadAllSearchResult();
  // }

  onSelectCategory(category: ICategory) {
    if (category.categoryId === 1) {
      this.loadAllSearchResult();
      this.selectedCategory = category;
      return;
    }
    //this.all = '';
    //this.selectedCareer = null;
    this.selectedCategory = category;
    this.loadSearchResultByCategory(category.categoryId);
  }

  // onSelectCareer(career: ICareer) {
  //   this.all = '';
  //   this.selectedCategory = null;
  //   this.selectedCareer = career;
  //   this.loadSearchResultByCareer(career.careerId);
  // }

  onMatCardClick(videoPostId: number, videoId: string, categoryId: number, isGoogleDriveVideo: number) {
    if (this.selectedCategory != null) {
      localStorage.setItem('categoryId', categoryId.toString());
    }
    if (isGoogleDriveVideo === 1 && !this.authService.isAuthenticated()) {
      const dialogRef = this.dialog.open(LoginComponent, {
        width: '410px',
        data: { email: this.email, password: this.password }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (this.authService.isAuthenticated()) {
          this.dataSharingService.loggedIn.next(true); // pass data to header.component.ts
        }
      });
    } else {
      this.router.navigate(['content-details', videoPostId, videoId, isGoogleDriveVideo]);
    }
    // if (this.selectedCareer != null) {
    //   let serializedCareer = this.itemsService.getSerialized<ICareer>(this.selectedCareer);
    //   localStorage.setItem('careerId', serializedCareer.careerId.toString());
    // } else if (this.selectedCategory != null) {    
  }
}
