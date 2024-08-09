import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { OrderByPipe } from '../../order-by.pipe';

@Component({
  selector: 'app-movie-listing',
  standalone: true,
  imports: [CommonModule, OrderByPipe],
  templateUrl: './movie-listing.component.html',
  styleUrl: './movie-listing.component.css',
  providers: [OrderByPipe],
})
export class MovieListingComponent {
  @Input() movieList = [];
  @Input()
  set selectedGenre(event) {
    if (event && event.length) {
      this.updatedMovieListAsPerGenre = this.movieList.filter((movie: any) => event.some((id) => movie.genre_ids.includes(id)));
    }else{
      this.updatedMovieListAsPerGenre = this.movieList;
    }
  };
  updatedMovieListAsPerGenre: any;
  moviePoster = 'https://image.tmdb.org/t/p/w220_and_h330_face';
}
