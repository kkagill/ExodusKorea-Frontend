import { DetailDialog } from './dialogs/detail-dialog/detail-dialog.component';
import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../shared/utils/items.service';
import { DataService } from '../shared/services/data.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { IUploaderRanking } from '../shared/interfaces';

@Component({
  selector: 'app-uploader-ranking',
  templateUrl: './uploader-ranking.component.html',
  styleUrls: ['./uploader-ranking.component.scss']
})
export class UploaderRankingComponent implements OnInit {
  uploaderRanking: IUploaderRanking[];
  isUploaderRankingLoaded: boolean = false;
  backgroundUrl = '../../../assets/images/countries/';

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

  onScoreClick(up: IUploaderRanking) {
    const dialogRef = this.dialog.open(DetailDialog, {
      width: '550px',
      data: { uploaderRanking: up }
    });
  }
}