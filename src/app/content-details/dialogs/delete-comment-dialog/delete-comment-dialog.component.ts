import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  videoCommentId: number;
}

@Component({
  selector: 'app-delete-comment-dialogs',
  templateUrl: './delete-comment-dialog.component.html'
})
export class DeleteCommentDialog {

  constructor(
    public dialogRef: MatDialogRef<DeleteCommentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onCancelClick() {
    this.dialogRef.close();
  }
}
