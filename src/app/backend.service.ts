import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root"
})

export class BackendService {
    constructor(private http: HttpClient, private router: Router) {}
    //damit Daten in alle Requesten in json format verschikt werden (kann man auch direct in request)
    httpOptions = {
        headers: new HttpHeaders(
            {'Content-Type': 'application/json'}
        ),
        withCredentials: true
    };
    signUp(email: string, password: string, company?: string, address?: string, city?: string, postal_code?: number) {
        return this.http.post<{ message: string }>('http://localhost:3000/users', {"email" : email, "password": password, "company": company, "address": address, "city": city, "postal_code": postal_code}, this.httpOptions)
            .subscribe({
                next: (response) => {
                    console.log(response.message);
                   // this.router.navigate(['/login']);
                },
                error: (error) => {
                    //TO-DO message in browser
                    console.log(error.statusText);
                }
            });
    }
    login(email: string, password: string) {
        this.http.post<{ Token: string }>('http://localhost:3000/sessions', {"email" : email, "password": password}, this.httpOptions)
            .subscribe({
                next: (response) => {
                    this.router.navigate(['/']);
                },
                error: (error) => {
                    //TO-DO message in browser
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