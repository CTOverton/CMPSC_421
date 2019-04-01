import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NowPlayingBarComponent } from './now-playing-bar.component';

describe('NowPlayingBarComponent', () => {
  let component: NowPlayingBarComponent;
  let fixture: ComponentFixture<NowPlayingBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NowPlayingBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NowPlayingBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
