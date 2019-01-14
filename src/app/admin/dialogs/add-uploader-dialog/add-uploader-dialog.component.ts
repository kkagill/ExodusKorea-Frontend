import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog, MatDialogRef } from '@angular/material';
import { DataSharingService } from '../../../shared/services/data-sharing.service';
import { AuthService } from '../../../shared/services/auth.service';
import { DataService } from '../../../shared/services/data.service';
import { LoginComponent } from '../../../auth/login/login.component';

@Component({
  selector: 'app-add-uploader-dialog',
  templateUrl: './add-uploader-dialog.component.html',
  styleUrls: ['./add-uploader-dialog.component.scss']
})
export class AddUploaderDialog implements OnInit {
  countriesForSalary: Array<any> = [];
  isCountriesLoaded: boolean = false;
  isSubmitted: boolean = false;
  email: string;
  password: string;
  model: any = {};

  constructor(private dataService: DataService,
    private authService: AuthService,
    private dataSharingService: DataSharingService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddUploaderDialog>,
    public dialog: MatDialog) { }

  ngOnInit() {
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
      'name': value.uploader
    };

    this.dataService.addNewUploader(body)
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
          
          if (error.error === "duplicate") {
            this.snackBar.open("중복되는 작성자가 있습니다.", '', {
              duration: 5000,
              panelClass: ['warning-snackbar']
            });
          }
          else {
            this.snackBar.open(error.message, '', {
              duration: 5000,
              panelClass: ['error-snackbar']
            });
          }         
        }
      );
  }
}