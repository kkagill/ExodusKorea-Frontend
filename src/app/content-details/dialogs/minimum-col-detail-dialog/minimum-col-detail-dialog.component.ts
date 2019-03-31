import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { DataService } from 'src/app/shared/services/data.service';
import { ItemsService } from 'src/app/shared/utils/items.service';
import { IMinimumCOL } from 'src/app/shared/interfaces';
import { MdbTableService } from 'ng-uikit-pro-standard';
import { EtcDialog } from './dialogs/etc-dialog/etc-dialog.component';

export interface DialogData {
  countryEN: string;
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
  headElements = ['닉네임', '날짜', '도시', '주거비', '교통비', '식비', '핸드폰비', '인터넷비', '기타비용', '설명', 'Total'];
  searchText: string;

  constructor(private dataService: DataService,
    private itemsService: ItemsService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private tableService: MdbTableService,
    public dialogRef: MatDialogRef<MinimumColDetailDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.loadMinimumColDetail();
  }

  loadMinimumColDetail() {
    this.dataService.getMinimumCoLDetail(this.data.countryEN)
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
          this.snackBar.open('정보를 불러오는 과정에서 오류가 났습니다.', '', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      );
  }

  onClickDetail(etc: string) {
    const dialogRef = this.dialog.open(EtcDialog, {
      width: '500px',
      data: { etc: etc }
    });
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}
