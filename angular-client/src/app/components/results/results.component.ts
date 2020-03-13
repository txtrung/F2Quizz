import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ResultsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {

  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onGetPrize(): void {

  }

  onContinuePlay(): void {

  }
}
