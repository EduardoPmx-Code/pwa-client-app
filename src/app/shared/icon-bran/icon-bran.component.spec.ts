import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconBranComponent } from './icon-bran.component';

describe('IconBranComponent', () => {
  let component: IconBranComponent;
  let fixture: ComponentFixture<IconBranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconBranComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconBranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
