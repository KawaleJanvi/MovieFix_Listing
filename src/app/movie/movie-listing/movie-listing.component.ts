import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { OrderByPipe } from '../../pipes/order-by.pipe';
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
  @Input() movieList = [];    // Contains list of original movie list
  @Input() year: any;     //Contains year of the movie list
  @Input()                // Inputs data of selected genre list.
  set selectedGenre(event: any) {
    if (event && event.length) { 
      //For filtering the movie list with genre
      this.updatedMovieListAsPerGenre = this.movieList.filter((movie: any) => event.some((id: any) => movie.genre_ids.includes(id)));
      //To Show or stop showing year on the ui if data is present or not present
      this.hasMoviesInGenre = Boolean(this.updatedMovieListAsPerGenre.length);
      //To remove loader from UI
      this.showLoading = false
    }else{    
      // Resetting or setting original movie list without genre selection
      this.updatedMovieListAsPerGenre = this.movieList;
      //To stop showing year on no data of genre or original movie list
      this.hasMoviesInGenre = Boolean(this.movieList.length);
      //To stop showing loader for empty list of genre selection
      if(this.movieList.length) this.showLoading = false
    }
  };
  hasMoviesInGenre: boolean = true;   //Flag to show year
  updatedMovieListAsPerGenre: any = []; // Filtered list of movies for genre
  showLoading: boolean = true;    // Flag to show and hide loader
  moviePoster = 'https://image.tmdb.org/t/p/w220_and_h330_face';  //Movie poster base link
}
