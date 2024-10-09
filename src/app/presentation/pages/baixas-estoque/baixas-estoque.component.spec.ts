import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaixasEstoqueComponent } from './baixas-estoque.component';

describe('BaixasEstoqueComponent', () => {
  let component: BaixasEstoqueComponent;
  let fixture: ComponentFixture<BaixasEstoqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaixasEstoqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaixasEstoqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
