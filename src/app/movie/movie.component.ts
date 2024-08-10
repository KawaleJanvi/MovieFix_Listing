import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { MovieListingComponent } from './movie-listing/movie-listing.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingMovieComponent } from '../loading-movie/loading-movie.component';
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
  @Input() selectedGenre;
  allMovies: any = [];
  year: number = 2012;
  currentYear = this.year;
  visitedYears = new Set;
  constructor(public httpInterfaceService: HttpInterfaceService) { }
  ngOnInit() {
    // To get all the list of years for movies api 
    // let max = new Date().getFullYear()
    // let years = []
    // for (var i = max; i >= 2000; i--) {
    //   years.push(i)
    // }
    // years.map((year: any) => this.getMovies(year));
    this.visitedYears.add(new Date().getFullYear()+1)
    this.getMovies(this.year);
    // this.scrollChangeCallback = () => this.onContentScrolled(event);
    // window.addEventListener('scroll',this.scrollChangeCallback, true);
  }
  // private scrollChangeCallback: () => void;
  // currentPosition: any;
  // startPosition: number;

  // ngAfterViewInit() {

  // }

  //  onContentScrolled(e) {
  //   this.startPosition = e.srcElement.scrollTop;
  //   let scroll = e.srcElement.scrollTop;
  //   if(scroll){
  //   if (scroll > this.currentPosition) {
  //     console.log('up')
  //   } else {
  //     console.log('down');
  //     this.getMovies(this.year-1);
  //     this.year--;
  //   }}
  //   this.currentPosition = scroll;
  // }

  // lastScrollTop = 0;
  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    //   let currentScrollTop = event.currentTarget.scrollY
    //   if (this.lastScrollTop > 0) {
    //     if (currentScrollTop > this.lastScrollTop) { this.getMovies(this.year - 1); this.year-- }
    //     else { this.getMovies(this.year + 1); this.year++; }
    //   }
    //   this.lastScrollTop = currentScrollTop
    if (event.currentTarget.scrollY >= 0 && event.currentTarget.scrollY <= (event.currentTarget.outerHeight*0.2)) {
      // if (event.currentTarget.scrollY >= 0 && event.currentTarget.scrollY <= (event.currentTarget.outerHeight*0.2)) {//
      const elementsToTest = document.getElementById('main-container').querySelectorAll('div')

      const firstInViewport = Array.from(elementsToTest).find(element => {
        const { top, bottom } = element.getBoundingClientRect()
        return bottom > 0 && top < window.innerHeight
      })

      console.log(firstInViewport.id)
      if (firstInViewport.id) { this.getMovies(Number(firstInViewport.id)); }
      // else { this.getMovies(this.currentYear - 2); }
    }
  }
  getMovies(year: any) {
    if (!this.visitedYears.has(year)) {
      this.visitedYears.add(year);
      this.httpInterfaceService.getMovieList(year).subscribe((response: any) => {
        let index = this.allMovies.findIndex((yr) => yr?.year == year);
        //delete this.allMovies[index];
        this.allMovies.splice(index, 1);
        this.allMovies.push({ year: year, list: response.results });
        if (!this.visitedYears.has(year - 1)) {
          this.allMovies.push({ year: year - 1, list: [] });
        }
        if (!this.visitedYears.has(year + 1)) {
          this.allMovies.push({ year: year + 1, list: [] });
        }
        console.log(this, this.allMovies, '-', response)
        this.currentYear = year;
        // this.year = year;
        this.allMovies.sort(function (a, b) {
          return a.year - b.year;
        });
      });
      if (year == this.year) {
      setTimeout(() => {
        // document.getElementById('2012').scrollTo(0, document.getElementById('main-container').offsetTop);
        let distance= document.getElementById(this.year.toString())?.getBoundingClientRect().top;
        window.scrollTo(0, distance - 130)
      }, 100);
      }
    }
  }
  onScroll(event, year) {
    // console.log("scrolled!!",event, year);
    // if(year == this.year + 1){
    //   this.scrollTopPosition = event.currentScrollPosition;
    // }
    // else if(this.scrollTopPosition == event.currentScrollPosition){
    //   this.getMovies(this.year-1)
    //   return;
    // }
    // this.currentYear = year;
    this.currentYear = year;
    this.getMovies(year);
  }
  // ngOnDestroy() {
  //   window.removeEventListener('scroll', this.scrollChangeCallback, true);
  // }
}
