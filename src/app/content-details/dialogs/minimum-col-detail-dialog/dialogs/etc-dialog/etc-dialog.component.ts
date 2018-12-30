import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  etc: string;
}

@Component({
  selector: 'app-etc-dialog',
  templateUrl: './etc-dialog.component.html',
  styleUrls: ['./etc-dialog.component.scss']
})
export class EtcDialog implements OnInit {

  constructor(public dialogRef: MatDialogRef<EtcDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {

  }

  onCancelClick() {
    this.dialogRef.close();
  }
}
