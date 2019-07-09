import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaducadoComponent } from './caducado.component';

describe('CaducadoComponent', () => {
  let component: CaducadoComponent;
  let fixture: ComponentFixture<CaducadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaducadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaducadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
