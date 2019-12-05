import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFileViewerComponent } from './modal-file-viewer.component';

describe('ModalFileViewerComponent', () => {
  let component: ModalFileViewerComponent;
  let fixture: ComponentFixture<ModalFileViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFileViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFileViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
