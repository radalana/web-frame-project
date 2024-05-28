import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  constructor (private http: HttpClient){}
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  getLandingPage() {
    return this.http.get<{message: string}>('http://localhost:3000/', this.httpOptions)
    .subscribe((response) => {console.log(response.message)
    });
  }
}
