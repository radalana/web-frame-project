import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-highscore-list',
  templateUrl: './highscore-list.component.html',
  styleUrl: './highscore-list.component.scss'
})
export class HighscoreListComponent {
  displayedColumns: string[] = ['position', 'email', 'score'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data = highscores
  getPosition(index: number): number {
    return index + 1;
  }
} 
const highscores = [
  {email: 'wI8Kz@example.com', score: 100 },
  { email: 'jD3Rb@example.com', score: 150 },
  { email: 'aF4Tm@example.com', score: 200 },
  { email: 'bL7Yp@example.com', score: 250 },
  { email: 'cV2Ex@example.com', score: 300 },
  { email: 'dN5Gh@example.com', score: 350 },
  { email: 'eQ8Ju@example.com', score: 400 },
  { email: 'fR1Km@example.com', score: 450 },
  { email: 'gS6Ln@example.com', score: 500 },
  { email: 'hT9Po@example.com', score: 550 }
]