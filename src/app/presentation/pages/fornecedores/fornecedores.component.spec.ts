import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FornecedoresComponent } from './fornecedores.component';

describe('FornecedoresComponent', () => {
  let component: FornecedoresComponent;
  let fixture: ComponentFixture<FornecedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FornecedoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FornecedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
