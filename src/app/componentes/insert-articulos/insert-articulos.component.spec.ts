import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertArticulosComponent } from './insert-articulos.component';

describe('InsertArticulosComponent', () => {
  let component: InsertArticulosComponent;
  let fixture: ComponentFixture<InsertArticulosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertArticulosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
