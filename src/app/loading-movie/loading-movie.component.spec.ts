import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingMovieComponent } from './loading-movie.component';

describe('LoadingMovieComponent', () => {
  let component: LoadingMovieComponent;
  let fixture: ComponentFixture<LoadingMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingMovieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
