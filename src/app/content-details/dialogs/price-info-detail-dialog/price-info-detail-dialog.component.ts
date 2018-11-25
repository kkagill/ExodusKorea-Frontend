import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { IPriceInfoDetail } from 'src/app/shared/interfaces';
import { DataService } from 'src/app/shared/services/data.service';
import { ItemsService } from 'src/app/shared/utils/items.service';

export interface DialogData {
  country: string;
}

@Component({
  selector: 'app-price-info-detail-dialog',
  templateUrl: './price-info-detail-dialog.component.html',
  styleUrls: ['./price-info-detail-dialog.component.scss']
})
export class PriceInfoDetailDialog implements OnInit {
  priceInfoDetail: IPriceInfoDetail[];
  isPriceInfoDetailLoaded: boolean = false;
  
  constructor(private dataService: DataService,
    private itemsService: ItemsService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PriceInfoDetailDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.loadPriceInfoDetail();
  }

  loadPriceInfoDetail() {
    this.dataService.getPriceInfoDetail(this.data.country)
      .subscribe(res => {
        if (res.status === 200) {
          this.isPriceInfoDetailLoaded = true;
          this.priceInfoDetail = this.itemsService.getSerialized<IPriceInfoDetail[]>(res.body);
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

  onCancelClick() {
    this.dialogRef.close();
  }
}
