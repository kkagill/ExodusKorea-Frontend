import { DetailDialog } from './dialogs/detail-dialog/detail-dialog.component';
import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../shared/utils/items.service';
import { DataService } from '../../shared/services/data.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { IUploaderRanking } from '../../shared/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uploader-ranking-panel',
  templateUrl: './uploader-ranking-panel.component.html',
  styleUrls: ['./uploader-ranking-panel.component.scss']
})
export class UploaderRankingPanelComponent implements OnInit {
  uploaderRanking: IUploaderRanking[] = [];
  isUploaderRankingLoaded: boolean = false;
  backgroundUrl = '../../../assets/images/countries/';

  public constructor(public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router,
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
          let uploaderRanking = this.itemService.getSerialized<IUploaderRanking[]>(res.body);
          let count = 0;

          for (let ur of uploaderRanking) {
            if (count === 10) {
              break;
            } else {
              this.uploaderRanking.push(ur);
            }
            count++;
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

  onScoreClick(up: IUploaderRanking) {
    const dialogRef = this.dialog.open(DetailDialog, {
      width: '350px',
      data: { uploaderRanking: up }
    });
  }

  onClickMore() {
    this.router.navigate(['uploader-ranking']);
  }
}