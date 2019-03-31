import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  difficultyLevel: string;
  description: string;
  link: string,
  jobSite: string,
  salary: number,
  currency: string
  titleKR: string,
  titleEN: string
}

@Component({
  selector: 'app-jid-description-dialog',
  templateUrl: './jid-description-dialog.component.html',
  styleUrls: ['./jid-description-dialog.component.scss']
})
export class JidDescriptionDialog implements OnInit {

  constructor(public dialogRef: MatDialogRef<JidDescriptionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}
