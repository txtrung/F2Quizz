import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftExchangeComponent } from './gift-exchange.component';

describe('GiftExchangeComponent', () => {
  let component: GiftExchangeComponent;
  let fixture: ComponentFixture<GiftExchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftExchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
