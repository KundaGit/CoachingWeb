import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockResultComponent } from './mock-result.component';

describe('MockResultComponent', () => {
  let component: MockResultComponent;
  let fixture: ComponentFixture<MockResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MockResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
