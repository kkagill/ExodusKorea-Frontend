import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { ItemsService } from '../shared/utils/items.service';
import { MatSnackBar } from '@angular/material';
import { ISettlementGuide } from '../shared/interfaces';

@Component({
  selector: 'app-settlement-guide',
  templateUrl: './settlement-guide.component.html',
  styleUrls: ['./settlement-guide.component.scss']
})
export class SettlementGuideComponent implements OnInit {
  isSettlementGuideLoaded: boolean = false;
  settlementGuides: ISettlementGuide[];

  public constructor(private router: Router,
    public snackBar: MatSnackBar,
    private dataService: DataService,
    private itemsService: ItemsService) { }

  ngOnInit() {
    this.loadSettlementGuide();
  }

  loadSettlementGuide() {
    this.dataService.getAllSettlementGuides()
      .subscribe(res => {
        if (res.status === 200) {
          this.isSettlementGuideLoaded = true;
          this.settlementGuides = this.itemsService.getSerialized<ISettlementGuide[]>(res.body);
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
