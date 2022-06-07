import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatFormComponentComponent } from './chat-form-component.component';

describe('ChatFormComponentComponent', () => {
  let component: ChatFormComponentComponent;
  let fixture: ComponentFixture<ChatFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatFormComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
