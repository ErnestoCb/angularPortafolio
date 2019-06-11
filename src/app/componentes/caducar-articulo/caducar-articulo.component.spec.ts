import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaducarArticuloComponent } from './caducar-articulo.component';

describe('CaducarArticuloComponent', () => {
  let component: CaducarArticuloComponent;
  let fixture: ComponentFixture<CaducarArticuloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaducarArticuloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaducarArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
