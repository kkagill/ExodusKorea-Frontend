import { DataSharingService } from 'src/app/shared/services/data-sharing.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { DataService } from 'src/app/shared/services/data.service';
import { ItemsService } from 'src/app/shared/utils/items.service';
import { ICity, IMinimumCOL } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoginComponent } from 'src/app/auth/login/login.component';

export interface DialogData {
  country: string;
  countryInEng: string;
  baseCurrency: string;
}

@Component({
  selector: 'app-add-minimum-col-dialog',
  templateUrl: './add-minimum-col-dialog.component.html',
  styleUrls: ['./add-minimum-col-dialog.component.scss']
})
export class AddMinimumColDialog implements OnInit {
  cities: Array<any> = [];
  isCitiesLoaded: boolean = false;
  isSubmitted: boolean = false;
  model: any = {};
  email: string;
  password: string;

  constructor(private dataService: DataService,
    private itemsService: ItemsService,
    private authService: AuthService,
    private dataSharingService: DataSharingService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddMinimumColDialog>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.loadCities();
  }

  loadCities() {
    this.dataService.getCitiesByCountry(this.data.country)
      .subscribe(res => {
        if (res.status === 200) {
          this.isCitiesLoaded = true;
          let result = this.itemsService.getSerialized<ICity[]>(res.body);
          for (let c of result) {
            this.cities.push({ value: c.cityId, label: c.name });
          }
          this.cities.push({ value: 0, label: "기타" });
        }
      },
        error => {
          this.snackBar.open('오류가 났습니다. 페이지를 새로고침하고 다시 시도해주세요. 오류가 지속될시 admin@exodusKorea.com으로 연락주시기 바랍니다.', '', {
            duration: 60000,
            panelClass: ['error-snackbar']
          });
        }
      );
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  onSubmit(value: any) {
    if (!this.authService.isAuthenticated()) {
      const dialogRef = this.dialog.open(LoginComponent, {
        width: '410px',
        data: { email: this.email, password: this.password }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (this.authService.isAuthenticated()) {
          this.dataSharingService.loggedIn.next(true); // pass data to header.component.ts
        }
      });
      return;
    }

    if (value.rent <= 0 || value.transportation <= -1 || value.food <= 0 || value.cell <= -1 || value.internet <= -1) {
      this.snackBar.open('0.00 보다 큰 값을 입력해 주세요.', '', {
        duration: 3000,
        panelClass: ['warning-snackbar']
      });
      return;
    }
    let body = {
      'country': this.data.countryInEng,
      'cityId': value.cityId,
      'city': value.city,
      'rent': value.rent,
      'transportation': value.transportation,
      'food': value.food,
      'cell': value.cell,
      'internet': value.internet,
      'etc': value.etc
    };
    this.isSubmitted = false;
    this.dataService.addMinimumCoL(body)
      .subscribe(res => {
        if (res.status === 201) {
          this.isSubmitted = true;
          this.onCancelClick();

          setTimeout(() => {           
            this.snackBar.open('소중한 정보 감사합니다.', '', {
              duration: 2000,
              panelClass: ['green-snackbar']
            });
          }, 500);
        }
      },
        error => {
          this.isSubmitted = true;
          if (error.status === 401 && this.authService.isTokenExpired()) {
            this.snackBar.open('세션이 만료됐습니다. 다시 로그인을 해주세요.', '', {
              duration: 10000,
              panelClass: ['warning-snackbar']
            });
            this.authService.logout();
            const dialogRef = this.dialog.open(LoginComponent, {
              width: '410px',
              data: { email: this.email, password: this.password }
            });
            dialogRef.afterClosed().subscribe(result => {
              if (this.authService.isAuthenticated()) {
                this.dataSharingService.loggedIn.next(true); // pass data to header.component.ts
              }
            });
          }
          else {
            this.snackBar.open('오류가 났습니다. 페이지를 새로고침하고 다시 시도해주세요. 오류가 지속될시 admin@exodusKorea.com으로 연락주시기 바랍니다.', '', {
              duration: 60000,
              panelClass: ['error-snackbar']
            });
          }
        }
      );
  }
}