import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CliensComponent } from './cliens.component';

describe('CliensComponent', () => {
  let component: CliensComponent;
  let fixture: ComponentFixture<CliensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CliensComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CliensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
