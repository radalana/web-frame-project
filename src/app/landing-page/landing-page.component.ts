import { Component } from '@angular/core';
import { BackendService } from '../backend.service';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  constructor (private backendService: BackendService){}

  ngOnInit() {
    this.backendService.getLandingPage();
  }

  logout() {
    this.backendService.logout();
  }

}
