import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosFarmaceuticoComponent } from './usuarios-farmaceutico.component';

describe('UsuariosFarmaceuticoComponent', () => {
  let component: UsuariosFarmaceuticoComponent;
  let fixture: ComponentFixture<UsuariosFarmaceuticoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosFarmaceuticoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosFarmaceuticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
