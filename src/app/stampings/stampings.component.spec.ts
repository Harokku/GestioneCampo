/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StampingsComponent } from './stampings.component';

describe('StampingsComponent', () => {
  let component: StampingsComponent;
  let fixture: ComponentFixture<StampingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StampingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StampingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
