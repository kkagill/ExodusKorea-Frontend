import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DataService } from 'src/app/shared/services/data.service';
import { ItemsService } from 'src/app/shared/utils/items.service';
import { IUploaderRanking } from 'src/app/shared/interfaces';
import { DetailDialog } from '../uploader-ranking-panel/dialogs/detail-dialog/detail-dialog.component';

@Component({
  selector: 'app-uploader-ranking',
  templateUrl: './uploader-ranking.component.html',
  styleUrls: ['./uploader-ranking.component.scss']
})
export class UploaderRankingComponent implements OnInit {
  uploaderRanking: IUploaderRanking[] = [];
  isUploaderRankingLoaded: boolean = false;

  public constructor(public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private dataService: DataService,
    private itemService: ItemsService) { }

  ngOnInit() {
    this.loadUploaderRanking();
  }

  loadUploaderRanking() {
    this.dataService.getUploaderRanking()
      .subscribe(res => {
        if (res.status === 200) {
          this.isUploaderRankingLoaded = true;
          this.uploaderRanking = this.itemService.getSerialized<IUploaderRanking[]>(res.body);
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

  onRowClick(up: IUploaderRanking) {
    const dialogRef = this.dialog.open(DetailDialog, {
      width: '350px',
      data: { uploaderRanking: up }
    });
  }
}