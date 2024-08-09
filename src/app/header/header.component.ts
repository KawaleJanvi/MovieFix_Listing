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
  genreList: any = [];
  @Output() selectedList = new EventEmitter();
  selectedGenre = new Set;
  constructor(public httpService: HttpInterfaceService) { }

  ngOnInit() {
    this.httpService.getGenres().subscribe((response: any) => {
      this.genreList = response.genres;
    });
  }
  getToggleClass(genre){
    return this.selectedGenre.has(genre) ? 'selected' : 'not-selected';
  }
  toggleGenre(genre) {
   this.selectedGenre.has(genre) ? this.selectedGenre.delete(genre) : this.selectedGenre.add(genre);
    // if (this.selectedGenre.size) {
      this.selectedList.emit(Array.from(this.selectedGenre));
    // }
  }
}
