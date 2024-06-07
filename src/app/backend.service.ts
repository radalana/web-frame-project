import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root"
})

export class BackendService {
    constructor(private http: HttpClient, private router: Router) {}
    //damit Daten in alle Requesten in json format verschikt werden (kann man auch direct in request)
    private token: string = "";
    httpOptions = {
        headers: new HttpHeaders(
            {'Content-Type': 'application/json'}
        ),
        withCredentials: true
    };
    
    
    isLoggedIn() {
        return !!this.token;
    }
    login(email: string, password: string) {
        this.http.post<{ Token: string }>('http://localhost:3000/sessions', {"email" : email, "password": password}, this.httpOptions)
            .subscribe({
                next: (response) => {
                    this.token = response.Token;
                    this.router.navigate(['/']);
                    console.log("token: " + this.token);
                },
                error: (error) => {
                    //TO-DO message in browser
                    console.log(error.statusText);
                }
            }
        );
    }
    getLandingPage() {
       return this.http.get<{message: string}>('http://localhost:3000/', this.httpOptions)
        .subscribe({
            next: (response) => {
                console.log(response.message)
                },
            error: (error) => {
                //TO-DO message
                console.log(error.statusText);
                this.router.navigate(['/login']);
            }
    });
    }
}