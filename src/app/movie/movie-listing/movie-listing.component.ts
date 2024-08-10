import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { OrderByPipe } from '../../order-by.pipe';
import { LoadingMovieComponent } from '../../loading-movie/loading-movie.component';

@Component({
  selector: 'app-movie-listing',
  standalone: true,
  imports: [CommonModule, OrderByPipe, LoadingMovieComponent],
  templateUrl: './movie-listing.component.html',
  styleUrl: './movie-listing.component.css',
  providers: [OrderByPipe],
})
export class MovieListingComponent {
  @Input() movieList = [];
  @Input() year;
  @Input()
  set selectedGenre(event) {
    if (event && event.length) {
      this.updatedMovieListAsPerGenre = this.movieList.filter((movie: any) => event.some((id) => movie.genre_ids.includes(id)));
      this.hasMoviesInGenre = Boolean(this.updatedMovieListAsPerGenre.length);
      this.showLoading = false
    }else{
      this.updatedMovieListAsPerGenre = this.movieList;
      this.hasMoviesInGenre = Boolean(this.movieList.length);
      if(this.movieList.length) this.showLoading = false
    }
  };
  hasMoviesInGenre: boolean = true;
  updatedMovieListAsPerGenre: any = [];
  showLoading: boolean = true;
  moviePoster = 'https://image.tmdb.org/t/p/w220_and_h330_face';
}
