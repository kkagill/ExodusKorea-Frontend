import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/shared/services/data.service';
import { ItemsService } from 'src/app/shared/utils/items.service';
import { IMinimumCOL } from 'src/app/shared/interfaces';
import { MdbTableService } from 'ng-uikit-pro-standard';

export interface DialogData {
  countryInEng: string;
  baseCurrency: string;
}

@Component({
  selector: 'app-minimum-col-detail-dialog',
  templateUrl: './minimum-col-detail-dialog.component.html',
  styleUrls: ['./minimum-col-detail-dialog.component.scss']
})
export class MinimumColDetailDialog implements OnInit {
  page: number = 1;
  isMinimumCoLLoaded: boolean = false;
  isSubmitted: boolean = false;
  minimumCoL: IMinimumCOL[];
  headElements = ['닉네임', '날짜', '도시', '룸쉐어', '교통비', '식비', '핸드폰비', '인터넷비', '설명', 'Total'];
  searchText: string;

  constructor(private dataService: DataService,
    private itemsService: ItemsService,
    public snackBar: MatSnackBar,
    private tableService: MdbTableService,
    public dialogRef: MatDialogRef<MinimumColDetailDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.loadMinimumColDetail();
  }

  loadMinimumColDetail() {
    this.dataService.getMinimumCoLDetail(this.data.countryInEng)
      .subscribe(res => {
        if (res.status === 200) {
          this.minimumCoL = this.itemsService.getSerialized<IMinimumCOL[]>(res.body);
          for (let m of this.minimumCoL) {        
            m.currency = this.data.baseCurrency;
          }
          this.tableService.setDataSource(this.minimumCoL);
          this.minimumCoL = this.tableService.getDataSource();       
          this.isMinimumCoLLoaded = true;
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
