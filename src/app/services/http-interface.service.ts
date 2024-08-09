import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterfaceService {
  API_KEY: string = '5accf2d468fbca600b00f2ce427b226e';
  constructor(public httpClient: HttpClient) { }

  getGenres(): Observable<any> {
    return this.httpClient.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.API_KEY}`)
  }
  getMovieList(year: any): Observable<any> {
    return this.httpClient.get(`https://api.themoviedb.org/3/discover/movie?api_key=${this.API_KEY}&sort_by=popularity.desc&primary_release_year=${year}&page=1&vote_count.gte=100`)
  }
}
