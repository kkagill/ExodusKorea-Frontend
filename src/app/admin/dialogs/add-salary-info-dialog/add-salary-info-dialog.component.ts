import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog, MatDialogRef } from '@angular/material';
import { DataSharingService } from '../../../shared/services/data-sharing.service';
import { AuthService } from '../../../shared/services/auth.service';
import { ItemsService } from '../../../shared/utils/items.service';
import { DataService } from '../../../shared/services/data.service';
import { ICategoryCountryUploader } from '../../../shared/interfaces';
import { LoginComponent } from '../../../auth/login/login.component';

@Component({
  selector: 'app-add-salary-info-dialog',
  templateUrl: './add-salary-info-dialog.component.html',
  styleUrls: ['./add-salary-info-dialog.component.scss']
})
export class AddSalaryInfoDialog implements OnInit {  
  countriesForSalary: Array<any> = [];
  isCountriesLoaded: boolean = false;
  isSubmitted: boolean = false;
  email: string;
  password: string;
  model: any = {};

  constructor(private dataService: DataService,
    private itemsService: ItemsService,
    private authService: AuthService,
    private dataSharingService: DataSharingService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddSalaryInfoDialog>,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.onLoadCountries();
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
      'country': value.nameKR,
      'currency': value.currency,
      'high': value.high,
      'low': value.low,
      'median': value.median,
      'occupation': value.occupation
    };

    this.dataService.addNewSalaryInfo(body)
      .subscribe(res => {
        if (res.status === 201) {
          this.isSubmitted = false;
          this.dialogRef.close();
            
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

  onLoadCountries() {
    this.dataService.getCategoryCountryUploader()
      .subscribe(res => {
        if (res.status === 200) {
          this.isCountriesLoaded = true;
          let result = this.itemsService.getSerialized<ICategoryCountryUploader>(res.body);
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
}