import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBarHeaderComponent } from './app-bar-header.component';

describe('AppBarHeaderComponent', () => {
  let component: AppBarHeaderComponent;
  let fixture: ComponentFixture<AppBarHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppBarHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppBarHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
