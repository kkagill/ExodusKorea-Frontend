import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { ItemsService } from '../shared/utils/items.service';
import { MatSnackBar } from '@angular/material';
import { IImmigrationVisa } from '../shared/interfaces';

@Component({
  selector: 'app-immigration-visa',
  templateUrl: './immigration-visa.component.html',
  styleUrls: ['./immigration-visa.component.scss']
})
export class ImmigrationVisaComponent implements OnInit {
  isImmigrationVisaLoaded: boolean = false;
  immigrationVisas: IImmigrationVisa[];

  public constructor(private router: Router,
    public snackBar: MatSnackBar,
    private dataService: DataService,
    private itemsService: ItemsService) { }

  ngOnInit() {
    this.loadImmmigrationVisa();
  }

  loadImmmigrationVisa() {
    this.dataService.getAllImmigrationVisa()
      .subscribe(res => {
        if (res.status === 200) {
          this.isImmigrationVisaLoaded = true;
          this.immigrationVisas = this.itemsService.getSerialized<IImmigrationVisa[]>(res.body);
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
}
