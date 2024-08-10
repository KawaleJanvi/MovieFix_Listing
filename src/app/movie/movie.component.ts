import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { MovieListingComponent } from './movie-listing/movie-listing.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HttpInterfaceService } from '../services/http-interface.service';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule, MovieListingComponent, InfiniteScrollModule],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',
  providers: [HttpInterfaceService]
})
export class MovieComponent {
  @Input() selectedGenre: any;  // Inputs list of selected genre from header
  allMovies: any = [];    // Contains entire data for movies
  year: number = 2012;  // Default Year
  visitedYears = new Set; // Keep track for visited years

  constructor(public httpInterfaceService: HttpInterfaceService) { }

  ngOnInit() {
    //To set maximum of current year i.e 2024, to stop api call for non-existent years
    this.visitedYears.add(new Date().getFullYear() + 1);
    //API call for default year
    this.getMovies(this.year);
  }

  //Scrollevent used strictly for scroll Up
  @HostListener('window:scroll', ['$event'])
  scrollHandler(event: any) {
    //Checking for far top scroll up.
    if (event.currentTarget.scrollY >= 0 && event.currentTarget.scrollY <= (event.currentTarget.outerHeight * 0.2)) {

      //To get current visible year for api call example: If scrolled up from 2012 call 2011
      const elementsToTest: any = document.getElementById('main-container')?.querySelectorAll('div');
      const firstInViewport: any = Array.from(elementsToTest).find((element: any) => {
        const { top, bottom } = element.getBoundingClientRect();
        return bottom > 0 && top < window.innerHeight;
      });
      //Api call for upward scroll
      if (firstInViewport.id) { this.getMovies(Number(firstInViewport.id)); }
    }
  }

  //API calling function
  getMovies(year: any) {
    //To stop multiple API calls for same year
    if (!this.visitedYears.has(year)) {
      // To keep entry for visited year
      this.visitedYears.add(year);
      //API call
      this.httpInterfaceService.getMovieList(year).subscribe((response: any) => {
        //To replace data in an object which is used to show loader for years with no data visible on viewport
        let index = this.allMovies.findIndex((yr: any) => yr?.year == year);
        this.allMovies.splice(index, 1);
        this.allMovies.push({ year: year, list: response.results });

        //To show loader on the viewport
        //Previous year
        if (!this.visitedYears.has(year - 1)) {
          this.allMovies.push({ year: year - 1, list: [] });
        }
        //Next year
        if (!this.visitedYears.has(year + 1)) {
          this.allMovies.push({ year: year + 1, list: [] });
        }
        //To show data in descending order on UI
        this.allMovies.sort(function (a: any, b: any) {
          return a.year - b.year;
        });
      });

      //To scroll default year to the viewport
      if (year == this.year) {
        setTimeout(() => {
          // Distance is calculated according to the container top and added some values to it, to show top of the default year.
          let distance: any = document.getElementById(this.year.toString())?.getBoundingClientRect().top;
          window.scrollTo(0, distance - 130);
        }, 100);
      }
    }
  }

  //On scroll down event function call
  onScroll(event: any, year: any) {
    this.getMovies(year);
  }
}
