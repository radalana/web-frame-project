import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
    providedIn: "root"
})

export class BackendService {
    constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {}
    //damit Daten in alle Requesten in json format verschikt werden (kann man auch direct in request)
    httpOptions = {
        headers: new HttpHeaders(
            {'Content-Type': 'application/json'}
        ),
        withCredentials: true
    };
    signUp(email: string, password: string, company?: string, address?: string, city?: string, postal_code?: number) {
        return this.http.post<{ message: string, token: string }>('http://localhost:3000/users', {"email" : email, "password": password, "company": company, "address": address, "city": city, "postal_code": postal_code}, this.httpOptions)
            .subscribe({
                next: (response) => {
                    console.log(response.message, response.token);
                    this.showFlashMessage(response.message);
                    this.router.navigate(['/']);
                },
                error: (error) => {
                    //TO-DO message in browser
                    this.showFlashMessage(error.error.message);
                    console.log(error.error.message);
                }
            });
    }
    login(email: string, password: string) {
        this.http.post<{ message: string }>('http://localhost:3000/sessions', {"email" : email, "password": password}, this.httpOptions)
            .subscribe({
                next: (response) => {
                    this.showFlashMessage(response.message);
                    console.log(response.message);
                    this.router.navigate(['/']);
                },
                error: (error) => {
                    //TO-DO message in browser
                    this.showFlashMessage(error.error.message);
                    console.log(error.statusText);
                }
            }
        );
    }
    logout() {
        return this.http.delete<{ message: string }>('http://localhost:3000/sessions', this.httpOptions)
            .subscribe({
                next: (response) => { 
                    console.log(response.message);
                    this.router.navigate(['/login']);
                },
                error: (error) => {
                    //TO-DO message in browser
                    console.log(error.statusText);
                }
            });
    }
    
    getLandingPage() {
       return this.http.get<{message: string, scores: number}>('http://localhost:3000/', this.httpOptions)
        .subscribe({
            next: (response) => {
                console.log(response.message)
                // отправить scores в компонент LandingPageComponent
                },
            error: (error) => {
                console.log(error.statusText);
                this.router.navigate(['/login']);
            }
    });
    }

    sendUserScores(scores: number) {
        return this.http.post<{ message: string }>('http://localhost:3000/highscores', {"scores": scores}, this.httpOptions)
        .subscribe({
            next: (response) => {
                console.log(response.message);
                this.showFlashMessage(response.message);
            },
            error: (error) => {
                console.log(error.statusText);
                this.showFlashMessage(error.error.message);
            }
        });
    }

    getHighscores() {
        return this.http.get<{highscoreList: any}>('http://localhost:3000/highscores', this.httpOptions);
    }

    public showFlashMessage(message: string) {
        this.snackBar.open(message, 'Close', {
          duration: 3000,
          verticalPosition: 'top'
        });
      }
}