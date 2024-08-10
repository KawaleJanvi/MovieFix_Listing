import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MovieComponent } from './movie/movie.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MovieComponent, HeaderComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'movie_application';
  selectedGenre = [];

  //Emits selected genre list to movie component
  selectGenreFromList(e: any) {
    this.selectedGenre = e;
  }
}
