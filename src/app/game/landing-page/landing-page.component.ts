import { Component } from '@angular/core';
import { BackendService } from '../../backend.service';
import { ScoreComponent } from '../score/score.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  constructor (private backendService: BackendService, private score: ScoreComponent){}
  ngOnInit() {
    // get scores
    this.backendService.getLandingPage();
  }

  logout() {
    this.backendService.logout();
  }
  saveScores() {
    // get scores
    const scores = this.score.getScores();
    this.backendService.sendUserScores(scores);
  }
}