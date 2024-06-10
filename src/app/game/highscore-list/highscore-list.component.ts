import { Component } from '@angular/core';
import { BackendService } from '../../backend.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-highscore-list',
  templateUrl: './highscore-list.component.html',
  styleUrl: './highscore-list.component.scss'
})
export class HighscoreListComponent {
  displayedColumns: string[] = ['position', 'email', 'score'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: any;
  constructor(private backendService: BackendService, private route: ActivatedRoute, private router: Router) {}
  ngOnInit() {
    this.route.params.subscribe(() => {
      this.getHighscores();
    });
  }
  getPosition(index: number): number {
    return index + 1;
  }
  getHighscores() {
    this.backendService.getHighscores()
    .subscribe({
      next: (response) => {
        console.log('in highscore-list',response.highscoreList);
        this.data = response.highscoreList;
        
      },
      error: (error) => {
        console.log(error.error.message);
        this.router.navigate(['/login']);
      }
    });
  }
}


/*
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
*/