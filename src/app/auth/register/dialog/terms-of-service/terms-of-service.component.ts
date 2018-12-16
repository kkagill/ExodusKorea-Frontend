import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-terms-of-service',
  templateUrl: './terms-of-service.component.html',
  styleUrls: ['./terms-of-service.component.scss']
})
export class TermsOfServiceDialog implements OnInit {

  constructor(public dialogRef: MatDialogRef<TermsOfServiceDialog>) { }

  ngOnInit() {
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}
