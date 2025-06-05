import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCardListComponent } from './client-card-list.component';

describe('ClientCardListComponent', () => {
  let component: ClientCardListComponent;
  let fixture: ComponentFixture<ClientCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientCardListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
