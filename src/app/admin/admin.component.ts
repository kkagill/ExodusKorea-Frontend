import { AddSalaryInfoDialog } from './dialogs/add-salary-info-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DataSharingService } from '../shared/services/data-sharing.service';
import { AuthService } from '../shared/services/auth.service';
import { ItemsService } from '../shared/utils/items.service';
import { DataService } from '../shared/services/data.service';
import { ICategoryCountry, ISalaryInfo } from '../shared/interfaces';
import { LoginComponent } from '../auth/login/login.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  @ViewChild('f') form : NgForm;
  categories: Array<any> = [];
  countries: Array<any> = [];
  countriesForSalary: Array<any> = [];
  occupations: Array<any> = [];
  isChecked: boolean = false;
  isDDLLoaded: boolean = false;
  isCountriesLoaded: boolean = false;
  isOccupationsLoaded: boolean = false;
  isSubmitted: boolean = false;
  isLinkSubmitted: boolean = false;
  email: string;
  password: string;
  model: any = {};

  constructor(private dataService: DataService,
    private itemsService: ItemsService,
    private authService: AuthService,
    private dataSharingService: DataSharingService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.loadDDLInfo();
    this.onLoadCountries();
  }

  loadDDLInfo() {
    this.dataService.getCategoryCountry()
      .subscribe(res => {
        if (res.status === 200) {
          this.isDDLLoaded = true;
          let result = this.itemsService.getSerialized<ICategoryCountry>(res.body);
          for (let c of result.categories) {
            if (c.categoryId !== 1) {
              this.categories.push({ value: c.categoryId, label: c.name });
            }
          }
          for (let c of result.countries) {
            this.countries.push({ value: c.countryId, label: c.nameKR });
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

  onSubmit(value: any) {
    if (!this.authService.isAuthenticated() || !this.authService.isAdmin()) {
      const dialogRef = this.dialog.open(LoginComponent, {
        width: '410px',
        data: { email: this.email, password: this.password }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (this.authService.isAuthenticated() && this.authService.isAdmin()) {
          this.dataSharingService.loggedIn.next(true); // pass data to header.component.ts
        }
      });
      return;
    }

    this.isSubmitted = true;

    let body = {
      'categoryId': value.categoryId,
      'countryId': value.countryId,
      'salaryInfoId': value.salaryInfoId,
      'title': value.title,
      'uploader': value.uploader,
      'youTubeVideoId': value.youTubeVideoId,
      'vimeoId': value.vimeoId,
      'sharerId': value.sharerId
    };

    this.dataService.addNewVideoPost(body)
      .subscribe(res => {
        if (res.status === 201) {
          this.isSubmitted = false;
          this.form.reset()

          setTimeout(() => {
            this.snackBar.open('추가되었습니다.', '', {
              duration: 2000,
              panelClass: ['green-snackbar']
            });
          }, 500);
        }
      },
        error => {
          this.isSubmitted = false;
          this.snackBar.open(error.message, '', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      );
  }

  onAddNewSalaryInfo() {
    const dialogRef = this.dialog.open(AddSalaryInfoDialog, {
      width: '500px'
    });
  }

  onLoadCountries() {
    this.dataService.getCategoryCountry()
      .subscribe(res => {
        if (res.status === 200) {
          this.isCountriesLoaded = true;
          let result = this.itemsService.getSerialized<ICategoryCountry>(res.body);
          for (let c of result.countries) {
            this.countriesForSalary.push({ value: c.nameKR, label: c.nameKR });
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

  onSelectCountry(nameKR: string) {
    this.dataService.getSalaryInfoOccupations(nameKR)
      .subscribe(res => {
        if (res.status === 200) {
          this.occupations = [];
          this.isOccupationsLoaded = true;
          let result = this.itemsService.getSerialized<ISalaryInfo[]>(res.body);
          for (let r of result) {
            this.occupations.push({ value: r.salaryInfoId, label: r.occupation });
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
}
