import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosMedicoComponent } from './usuarios-medico.component';

describe('UsuariosMedicoComponent', () => {
  let component: UsuariosMedicoComponent;
  let fixture: ComponentFixture<UsuariosMedicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosMedicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
