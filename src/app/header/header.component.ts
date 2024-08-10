import { Component, EventEmitter, Output, output } from '@angular/core';
import { HttpInterfaceService } from '../services/http-interface.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [HttpInterfaceService]
})
export class HeaderComponent {
  genreList: any = [];  //Has  genre list from API call
  @Output() selectedList = new EventEmitter();      //Emits selected genres list
  selectedGenre = new Set;     // To keep selected genre list

  constructor(public httpService: HttpInterfaceService) { }

  ngOnInit() {
    //API call for genres
    this.httpService.getGenres().subscribe((response: any) => {
      this.genreList = response.genres;
    });
  }

  // To show selected genre color css
  getToggleClass(genre: any){
    return this.selectedGenre.has(genre) ? 'selected' : 'not-selected';
  }

  //Toggle behavior. Emits selected list to app component
  toggleGenre(genre: any) {
   this.selectedGenre.has(genre) ? this.selectedGenre.delete(genre) : this.selectedGenre.add(genre);
   this.selectedList.emit(Array.from(this.selectedGenre));
  }
}
