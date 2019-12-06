import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {HCPEntry} from '../model/HCPEntry';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {HCPDirectory} from '../model/HCPDirectory';
import {ModalFileViewerComponent} from '../modal-file-viewer/modal-file-viewer.component';
import {HCPObject} from '../model/HCPObject';
import {HCPDirectoryMetadata} from '../model/HCPDirectoryMetadata';
import {apiUrl} from '../Config';

@Component({
  selector: 'app-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.scss']
})
export class FileViewerComponent implements OnInit {
  private currentDirectory = '';
  dataSource: DataSource<HCPEntry>;
  dataSource2: DataSource<HCPObject>;
  displayedColumns: string[] = ['urlName', 'type', 'size', 'hash', 'view', 'delete'];
  displayedColumns2: string[] = ['urlName', 'size', 'hash', 'created', 'changed'];
  @ViewChild('createDirectoryInput', {static: false})
  createDirectoryInput: ElementRef;

  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.fetchData();
  }

  private fetchData() {
    this.http.get<HCPDirectory>(`${apiUrl}/directory/${this.currentDirectory}`).subscribe(result => {
      this.dataSource = new MatTableDataSource(result.entries);
    });
    this.http.get<HCPDirectoryMetadata>(`${apiUrl}/directory-metadata/${this.currentDirectory}`).subscribe(result => {
      this.dataSource2 = new MatTableDataSource(result.objects);
    });
  }

  ngOnInit() {
  }

  viewHCPEntry(element: HCPEntry) {
    if (element.type === 'object') {
      this.dialog.open(ModalFileViewerComponent, {
        data: {
          urlName: this.currentDirectory + element.urlName
        }
      });
    } else if (element.type === 'directory') {
      this.currentDirectory = this.currentDirectory + element.urlName + '/';
      this.fetchData();
    }
  }

  fileInputChange($event: Event) {
    const target = $event.target as HTMLInputElement;
    if (target.files.length === 1) {
      const file = target.files[0];
      const formData = new FormData();
      formData.append('file', file, file.name);
      this.http.post(`${apiUrl}/upload/${this.currentDirectory + file.name}`, formData).subscribe(() => {
        this.fetchData();
      });
    }
  }

  delete(hcpEntry: HCPEntry) {
    this.http.delete(`${apiUrl}/delete/${this.currentDirectory + hcpEntry.urlName}`).subscribe(() => {
      this.fetchData();
    });
  }

  onCreateDirectory() {
    const nativeElement = this.createDirectoryInput.nativeElement as HTMLInputElement;
    const value = nativeElement.value;
    if (value) {
      this.http.post(`${apiUrl}/directory/${this.currentDirectory + value}`, null).subscribe(() => {
        this.fetchData();
      });
    }
  }

  onBackDirectory() {
    const strings = this.currentDirectory.split('/').filter(d => !!(d));
    if (strings.length >= 1) {
      strings.splice(strings.length - 1, 1);
    }
    this.currentDirectory = strings.join('/');
    this.fetchData();
  }
}
