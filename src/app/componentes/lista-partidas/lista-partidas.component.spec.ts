import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPartidasComponent } from './lista-partidas.component';

describe('ListaPartidasComponent', () => {
  let component: ListaPartidasComponent;
  let fixture: ComponentFixture<ListaPartidasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPartidasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPartidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
