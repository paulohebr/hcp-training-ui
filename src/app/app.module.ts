import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatDialogModule, MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatListModule,
  MatSidenavModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import { FileViewerComponent } from './file-viewer/file-viewer.component';
import {HttpClientModule} from '@angular/common/http';
import { ModalFileViewerComponent } from './modal-file-viewer/modal-file-viewer.component';
import { ObjectViewerComponent } from './object-viewer/object-viewer.component';
import {ReactiveFormsModule} from '@angular/forms';

const appRoutes: Routes = [
  {
    path: '', component: HomeComponent, data: {
      breadcrumb: 'Home'
    }
  },
  {
    path: 'file-viewer', component: FileViewerComponent, data: {
      breadcrumb: 'File Viewer'
    }
  },
  {
    path: 'object-viewer', component: ObjectViewerComponent, data: {
      breadcrumb: 'Object Viewer'
    }
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FileViewerComponent,
    ModalFileViewerComponent,
    ObjectViewerComponent
  ],
  entryComponents: [
    ModalFileViewerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    MatButtonModule,
    RouterModule.forRoot(appRoutes),
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}



