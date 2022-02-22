import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormapoliceComponent } from './formapolice.component';

describe('FormapoliceComponent', () => {
  let component: FormapoliceComponent;
  let fixture: ComponentFixture<FormapoliceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormapoliceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormapoliceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
