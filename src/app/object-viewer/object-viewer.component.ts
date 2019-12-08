import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material';
import {apiUrl} from '../Config';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MyObject} from '../model/MyObject';
import * as moment from 'moment';
import 'moment/locale/pt-br';

@Component({
  selector: 'app-object-viewer',
  templateUrl: './object-viewer.component.html',
  styleUrls: ['./object-viewer.component.scss']
})
export class ObjectViewerComponent implements OnInit {

  private formData = new FormData();
  private form: FormGroup;

  constructor(private http: HttpClient, private dialog: MatDialog, private fb: FormBuilder) {
    moment.locale('pt-BR');
    const myObject: MyObject = {
      id: undefined,
      owner: undefined,
      signDate: undefined,
    };
    this.form = this.fb.group(myObject);
  }

  ngOnInit() {
  }

  submit() {
    if (this.allowSubmit()) {
      const myObject: MyObject = this.form.value;
      myObject.signDate = moment().toISOString(true);
      this.formData.append('annotation', JSON.stringify(myObject));
      const file: File = this.formData.get('file') as File;
      this.formData.append('size', file.size.toString());
      this.http.post(`${apiUrl}/upload-annotation/${file.name}`, this.formData).subscribe(() => {
        this.formData = new FormData();
      });
    }
  }

  allowSubmit(): boolean {
    const myObject: MyObject = this.form.value;
    const file = this.formData.get('file');
    return myObject && myObject.owner && myObject.id && file !== null;
  }

  fileInputChange($event: Event) {
    const target = $event.target as HTMLInputElement;
    if (target.files.length === 1) {
      const file = target.files[0];
      this.formData.append('file', file, file.name);
      // this.http.post(`${apiUrl}/upload/`, formData).subscribe(() => {
      //   // this.fetchData();
      // });
    }
  }

}
