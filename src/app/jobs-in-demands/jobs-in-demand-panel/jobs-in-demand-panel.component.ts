import { JidDetailDialog } from './dialogs/jid-detail-dialog/jid-detail-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';
import { ItemsService } from 'src/app/shared/utils/items.service';
import { IJobsInDemand } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-jobs-in-demand-panel',
  templateUrl: './jobs-in-demand-panel.component.html',
  styleUrls: ['./jobs-in-demand-panel.component.scss']
})
export class JobsInDemandPanelComponent implements OnInit {
  jobsInDemand: IJobsInDemand[] = [];
  isJobsInDemandLoaded: boolean = false;
  currentYear: number = Date.now();
  
  public constructor(public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router,
    private dataService: DataService,
    private itemService: ItemsService) { }

  ngOnInit() {
    this.loadJobsInDemand();
  }

  loadJobsInDemand() {
    this.dataService.getJobsInDemandByAllCountries()
      .subscribe(res => {
        if (res.status === 200) {
          this.isJobsInDemandLoaded = true;
          this.jobsInDemand = this.itemService.getSerialized<IJobsInDemand[]>(res.body);  
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

  onClickTitle(description: string,
    jobsInDemandId: number,
    hasVideoPost: boolean,
    titleKR: string,
    titleEN: string,
    countryKR: string,
    difficultyLevel: string,
    link: string,
    jobSite: string,
    salary: number,
    currency: string) {
    const dialogRef = this.dialog.open(JidDetailDialog, {
      width: '350px',
      data: {
        description: description,
        jobsInDemandId: jobsInDemandId,
        hasVideoPost: hasVideoPost,
        titleKR: titleKR,
        titleEN: titleEN,
        countryKR: countryKR,
        difficultyLevel: difficultyLevel,
        link: link,
        jobSite: jobSite,
        salary: salary,
        currency: currency
      }
    });
  }

  onClickMore() {
    this.router.navigate(['jobs-in-demand']);
  }
}