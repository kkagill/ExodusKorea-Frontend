import { Component, OnInit } from '@angular/core';
import { ICountry, ICareer, IVideoPost } from '../shared/interfaces';
import { DataService } from '../shared/services/data.service';
import { ItemsService } from '../shared/utils/items.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-videos',
  templateUrl: './search-videos.component.html',
  styleUrls: ['./search-videos.component.scss']
})
export class SearchVideosComponent implements OnInit {  
  page: number = 1;
  selectedCountry: ICountry;
  selectedCareer: ICareer;
  all: string = '';
  searchResult: IVideoPost[];
  countries: ICountry[];
  isSearchResultLoaded: boolean = false;
  isCountriesLoaded: boolean = false;
  backgroundUrl = '../../../assets/images/countries/';
  searchText: string;

  careers: ICareer[] = [
    { name: '프로그래머' },
    { name: '간호사' },
    { name: '바리스타' },
    { name: '목수' }
  ];

  constructor(private router: Router,
    public snackBar: MatSnackBar,
    private dataService: DataService,
    private itemsService: ItemsService) { }

  ngOnInit() {
    this.all = "initial";
    this.loadAllCountries();
    this.loadAllSearchResult();
  }

  loadAllCountries() {
    this.dataService.getAllCountries()
      .subscribe(res => {
        if (res.status === 200) {
          this.isCountriesLoaded = true;
          this.countries = this.itemsService.getSerialized<ICountry[]>(res.body.result);
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

  loadAllSearchResult() {
    this.dataService.getAllSearchResult()
      .subscribe(res => {
        if (res.status === 200) {
          this.isSearchResultLoaded = true;
          this.searchResult = this.itemsService.getSerialized<IVideoPost[]>(res.body);
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

  onSelectAll() {
    this.selectedCareer = null;
    this.selectedCountry = null;
    this.all = "initial";
    this.loadAllSearchResult();
  }

  onSelectCountry(country: ICountry) {
    this.all = '';
    this.selectedCareer = null;
    this.selectedCountry = country;
    this.dataService.getSearchResultByCountryId(country.countryId)
      .subscribe(res => {
        if (res.status === 200) {
          this.isSearchResultLoaded = true;
          this.searchResult = this.itemsService.getSerialized<IVideoPost[]>(res.body);
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

  onSelectCareer(career: ICareer) {
    this.all = '';
    this.selectedCountry = null;
    this.selectedCareer = career;
  }

  onMatCardClick(videoPostId, videoId) {
    this.router.navigate(['content-details', videoPostId, videoId]);
  }
}
