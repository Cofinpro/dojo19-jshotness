import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiFeedComponent } from './ui-feed.component';

describe('UiFeedComponent', () => {
  let component: UiFeedComponent;
  let fixture: ComponentFixture<UiFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
