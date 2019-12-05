import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {apiUrl} from '../Config';

@Component({
  selector: 'app-modal-file-viewer',
  templateUrl: './modal-file-viewer.component.html',
  styleUrls: ['./modal-file-viewer.component.scss']
})
export class ModalFileViewerComponent implements OnInit {
  imgUrl: string;

  constructor(
    private dialogRef: MatDialogRef<ModalFileViewerComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.imgUrl = `${apiUrl}/download/${data.urlName}`;
  }

  ngOnInit() {
  }

}
