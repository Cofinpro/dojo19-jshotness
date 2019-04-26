import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCuddleComponent } from './ui-cuddle.component';

describe('UiCuddleComponent', () => {
  let component: UiCuddleComponent;
  let fixture: ComponentFixture<UiCuddleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiCuddleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiCuddleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
