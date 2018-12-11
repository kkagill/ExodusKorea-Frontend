import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { ItemsService } from '../shared/utils/items.service';
import { MatSnackBar } from '@angular/material';
import { ICountryInfoKOTRA } from '../shared/interfaces';

@Component({
  selector: 'app-country-info',
  templateUrl: './country-info.component.html',
  styleUrls: ['./country-info.component.scss']
})
export class CountryInfoComponent implements OnInit {
  isCountryInfoCanadaLoaded: boolean = false;
  countryInfoCanada: ICountryInfoKOTRA;

  public constructor(public snackBar: MatSnackBar,
    private dataService: DataService,
    private itemsService: ItemsService) { }

  ngOnInit() {
    this.loadCountryInfoCanada();
  }

  loadCountryInfoCanada() {
    this.dataService.getCountryInfoCanada()
      .subscribe(res => {
        if (res.status === 200) {
          this.isCountryInfoCanadaLoaded = true;
          this.countryInfoCanada = this.itemsService.getSerialized<ICountryInfoKOTRA>(res.body);
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
}
