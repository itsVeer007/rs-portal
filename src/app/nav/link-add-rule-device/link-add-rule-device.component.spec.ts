import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkAddRuleDeviceComponent } from './link-add-rule-device.component';

describe('LinkAddRuleDeviceComponent', () => {
  let component: LinkAddRuleDeviceComponent;
  let fixture: ComponentFixture<LinkAddRuleDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkAddRuleDeviceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkAddRuleDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
