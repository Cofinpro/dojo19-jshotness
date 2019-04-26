import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiPlayComponent } from './ui-play.component';

describe('UiPlayComponent', () => {
  let component: UiPlayComponent;
  let fixture: ComponentFixture<UiPlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiPlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
